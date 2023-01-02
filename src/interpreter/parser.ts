import {
  CallExpression,
  DefineExpression,
  Expression,
  IfExpression,
  LambdaExpression,
  LetBinding,
  LetExpression,
  LiteralExpression,
  NULL_VALUE,
  SetExpression,
  SymbolExpression,
  Token,
  TokenType,
} from "./types";

export class Parser {
  private tokens: Token[] = [];
  private expressions: Expression[];

  constructor() {
    this.tokens = [];
    this.expressions = [];
  }

  private initialize(tokens: Token[]) {
    this.tokens = tokens;
    this.expressions = [];
  }

  parse(tokens: Token[]) {
    this.initialize(tokens);

    while (!this.complete()) {
      this.expressions.push(this.parseExpression());
    }
    return this.expressions;
  }

  private parseExpression(): Expression {
    if (this.consumeLeftParen()) {
      if (this.consumeRightParen()) {
        return new LiteralExpression(NULL_VALUE);
      }
      if (this.consumeDefine()) {
        return this.parseDefine();
      }
      if (this.consumeSet()) {
        return this.parseSet();
      }
      if (this.consumeIf()) {
        return this.parseIf();
      }
      if (this.consumeLet()) {
        return this.parseLet();
      }
      if (this.consumeLambda()) {
        return this.parseLambda();
      }
      return this.parseCall();
    }
    return this.parseAtom();
  }

  private parseLambda(): LambdaExpression {
    this.consumeLeftParen(); // consume opening paren
    const args: string[] = [];
    let argsClosingParen = this.consumeRightParen();
    while (!argsClosingParen) {
      const argSymbol = this.consumeSymbol();
      if (!argSymbol) {
        throw Error(
          `Error parsing Lambda definition expected argument symbol, found: ${this.peekToken()}`
        );
      }
      args.push(argSymbol.value);
      argsClosingParen = this.consumeRightParen();
    }
    const body: Expression[] = [];
    let lambdaClosingParen = this.consumeRightParen();
    while (!lambdaClosingParen) {
      body.push(this.parseExpression());
      lambdaClosingParen = this.consumeRightParen();
    }
    return new LambdaExpression(args, body);
  }

  private parseSet(): SetExpression {
    const name = this.consumeSymbol();
    if (!name) {
      throw Error(`Error parsing set statement, invalid name: ${name}`);
    }
    const value = this.parseExpression();
    this.consumeRightParen();
    return new DefineExpression(name.value, value);
  }

  private parseDefine(): DefineExpression {
    const name = this.consumeSymbol();
    if (!name) {
      throw Error(`Error parsing define statement, invalid name: ${name}`);
    }
    const value = this.parseExpression();
    this.consumeRightParen();
    return new DefineExpression(name.value, value);
  }

  private parseAtom(): Expression {
    const symbol = this.consumeSymbol();
    if (symbol) {
      return new SymbolExpression(symbol.value);
    }
    const number = this.consumeNumber();
    if (number) {
      return new LiteralExpression(number.value);
    }
    const string = this.consumeString();
    if (string) {
      return new LiteralExpression(string.value);
    }
    const boolean = this.consumeBoolean();
    if (boolean) {
      return new LiteralExpression(boolean.value);
    }
    throw Error(`Parse error, expected atom, found: ${this.peekToken()}`);
  }

  private parseCall(): CallExpression {
    const callee = this.parseExpression();
    const args: Expression[] = [];
    let rightParen = this.consumeRightParen();
    while (!rightParen) {
      args.push(this.parseExpression());
      rightParen = this.consumeRightParen();
    }
    return new CallExpression(callee, args);
  }

  private parseIf(): IfExpression {
    const testExpression = this.parseExpression();
    const consequentExpression = this.parseExpression();
    if (this.consumeRightParen()) {
      return new IfExpression(testExpression, consequentExpression);
    } else {
      const alternativeExpression = this.parseExpression();
      this.consumeRightParen();
      return new IfExpression(
        testExpression,
        consequentExpression,
        alternativeExpression
      );
    }
  }

  private parseLet(): LetExpression {
    this.consumeLeftParen();
    const bindings: LetBinding[] = [];
    let bindingsRightParen = this.consumeRightParen();
    while (!bindingsRightParen) {
      bindings.push(this.parseLetBinding());
      bindingsRightParen = this.consumeRightParen();
    }
    const body: Expression[] = [];
    let letExpressionRightParen = this.consumeRightParen();
    while (!letExpressionRightParen) {
      body.push(this.parseExpression());
      letExpressionRightParen = this.consumeRightParen();
    }
    return new LetExpression(bindings, body);
  }

  private parseLetBinding(): LetBinding {
    this.consumeLeftParen();
    const name = this.consumeSymbol();
    if (!name) {
      throw Error(
        `Error parsing Let Binding, expected symbol, found: ${this.peekToken()}`
      );
    }
    const value = this.parseExpression();
    this.consumeRightParen();
    return new LetBinding(name.value, value);
  }

  private consumeString(): Token | undefined {
    return this.consumeToken(TokenType.String);
  }

  private consumeBoolean(): Token | undefined {
    return this.consumeToken(TokenType.Boolean);
  }

  private consumeNumber(): Token | undefined {
    return this.consumeToken(TokenType.Number);
  }

  private consumeSymbol(): Token | undefined {
    return this.consumeToken(TokenType.Symbol);
  }

  private consumeToken(
    tokenType: TokenType,
    tokenValue?: any
  ): Token | undefined {
    const expected = tokenValue
      ? `${tokenType} with value: ${tokenValue}`
      : `${tokenType}`;
    const token = this.peekToken(expected);
    if (tokenValue) {
      return token.tokenType === tokenType && token.value === tokenValue
        ? this.nextToken(expected)
        : undefined;
    }
    return token.tokenType === tokenType ? this.nextToken(expected) : undefined;
  }

  private consumeLambda(): Token | undefined {
    return this.consumeToken(TokenType.Symbol, "lambda");
  }

  private consumeLet(): Token | undefined {
    return this.consumeToken(TokenType.Symbol, "let");
  }

  private consumeSet(): Token | undefined {
    return this.consumeToken(TokenType.Symbol, "set!");
  }

  private consumeDefine(): Token | undefined {
    return this.consumeToken(TokenType.Symbol, "define");
  }

  private consumeIf(): Token | undefined {
    return this.consumeToken(TokenType.Symbol, "if");
  }

  private consumeLeftParen(): Token | undefined {
    return this.consumeToken(TokenType.LeftParen);
  }

  private consumeRightParen(): Token | undefined {
    return this.consumeToken(TokenType.RightParen);
  }

  private peekToken(expecting?: string): Token {
    if (this.complete()) {
      throw expecting
        ? Error(`Parse error, expected ${expecting}, but reached end of source`)
        : Error();
    }
    return this.tokens.at(0) as Token;
  }

  private nextToken(expecting?: string): Token {
    if (this.complete()) {
      throw expecting
        ? Error(`Parse error, expected ${expecting}, but reached end of source`)
        : Error();
    }
    const result = this.tokens.at(0) as Token;
    this.tokens = this.tokens.slice(1);
    return result;
  }

  private complete(): boolean {
    return this.tokens.length === 0;
  }
}
