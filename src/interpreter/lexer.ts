import {Token, TokenType} from "./types";

export class Lexer {
  private tokens: Token[];
  private source: string = "";
  private lineIndex = 1;
  private columnIndex = 1;
  constructor() {
    this.tokens = [];
  }

  private initialize(source: string) {
    this.tokens = [];
    this.source = source;
    this.lineIndex = 1;
    this.columnIndex = 1;
  }

  tokenize(source: string) {
    this.initialize(source);

    while (!this.complete()) {
      const char = this.peek();
      if (isParen(char)) {
        this.consumeParen();
      } else if (isBoolean(char)) {
        this.consumeBoolean();
      } else if (isWhiteSpace(char)) {
        this.next();
      } else if (isString(char)) {
        this.consumeString();
      } else if (isDigit0To9(char)) {
        this.consumeNumber();
      } else if (isSymbol(char)) {
        this.consumeSymbol();
      } else {
        throw Error(
          `Tokenization error: unexpected input at line: ${this.lineIndex}, column: ${this.columnIndex}`
        );
      }
    }
    return this.tokens;
  }

  private consumeParen() {
    this.tokens.push({
      tokenType: this.next("Paren") === "(" ? TokenType.LeftParen : TokenType.RightParen,
    });
  }

  private consumeBoolean() {
    this.next("boolean prefix '#'"); // consume boolean prefix
    const booleanValue = this.next("boolean value: 't' or 'f'");
    if (booleanValue === "t" || booleanValue === "f") {
      this.tokens.push({
        tokenType: TokenType.Boolean,
        value: booleanValue === "t",
      });
    } else {
      throw Error(
        `Invalid boolean syntax, expected 't' or 'f' on line: ${this.lineIndex}, column: ${this.columnIndex}`
      );
    }
  }

  private consumeSymbol(){
    let symbol = "";
    while (!this.complete() && (isLetter(this.peek()) || isSpecialCharacter(this.peek()) || isDigit0To9(this.peek()))) {
      symbol = symbol.concat(this.next("letter, special character, or digit"));
    }
    this.tokens.push({tokenType: TokenType.Symbol, value: symbol});
  }

  private consumeString() {
    this.next("\""); //consume opening '"'
    let stringValue = "";
    while (this.peek() !== '"') {
      stringValue = stringValue.concat(this.next("string literal"));
    }
    this.next("\""); // consume closing '"'
    this.tokens.push({
      tokenType: TokenType.String,
      value: stringValue,
    });
  }

  private consumeNumber() {
    let number = "";
    while (!this.complete() && (isDigit0To9(this.peek())  || isDot(this.peek()))) {
      number = number.concat(this.next("digit or '.'"));
    }
    const numberValue = Number(number);
    if (isNaN(numberValue)) {
      throw Error(
        `Invalid number syntax at line: ${this.lineIndex}, column: ${this.columnIndex}`
      );
    }
    this.tokens.push({ tokenType: TokenType.Number, value: numberValue });
  }

  private peek(expecting?: string): string {
    if (this.complete()) {
      throw expecting ? Error(`Unexpected end of source, was expecting: ${expecting}`) : Error();
    }
    return this.source.charAt(0);
  }

  private next(expecting?: string): string {
    if (this.complete()) {
      throw expecting ? Error(`Unexpected end of source, was expecting: ${expecting}`) : Error();
    }
    const result = this.source.charAt(0);
    if (result === "\n") {
      this.lineIndex++;
      this.columnIndex = 1;
    } else {
      this.columnIndex++;
    }
    this.source = this.source.substring(1);
    return result;
  }

  private complete(): boolean {
    return this.source.length === 0;
  }
}

function isParen(input: string): boolean {
  return input === "(" || input === ")";
}

function isBoolean(input: string): boolean {
  return input === "#";
}

function isString(input: string): boolean {
  return input === '"';
}

function isSymbol(input: string): boolean {
  return isLetter(input) || isSpecialCharacter(input);
}

function isDigit0To9(input: string): boolean {
  return input >= "0" && input <= "9";
}

function isDot(input: string): boolean {
  return input === ".";
}

function isLetter(input: string): boolean {
  return (input >= "a" && input <= "z") || (input >= "A" && input <= "Z");
}

function isSpecialCharacter(input: string): boolean {
  switch (input) {
    case "!":
    case "$":
    case "%":
    case "&":
    case "*":
    case "/":
    case ":":
    case "<":
    case "=":
    case ">":
    case "?":
    case "@":
    case "^":
    case "_":
    case "~":
    case "+":
    case "-":
    case ".":
      return true;
    default:
      return false;
  }
}

function isWhiteSpace(input: string): boolean {
  switch (input) {
    case " ":
    case "\r":
    case "\t":
    case "\n":
      return true;
    default:
      return false;
  }
}
