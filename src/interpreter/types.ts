export enum TokenType {
  LeftParen = "LeftParen",
  RightParen = "RightParen",
  Symbol = "Symbol",
  Number = "Number",
  Boolean = "Boolean",
  String = "String",
}

export interface Token {
  tokenType: TokenType;
  value?: any;
}

export const NULL_VALUE: any[] = [];

export class Expression {}

export class DefineExpression extends Expression {
  readonly name: string;
  readonly value: Expression;
  constructor(name: string, value: Expression) {
    super();
    this.name = name;
    this.value = value;
  }
}

export class SetExpression extends Expression {
  readonly name: string;
  readonly value: Expression;
  constructor(name: string, value: Expression) {
    super();
    this.name = name;
    this.value = value;
  }
}

export class CallExpression extends Expression {
  readonly callee: Expression;
  readonly args: Expression[];
  constructor(callee: Expression, args: Expression[]) {
    super();
    this.callee = callee;
    this.args = args;
  }
}

export class SymbolExpression extends Expression {
  readonly symbol: string;
  constructor(symbol: string) {
    super();
    this.symbol = symbol;
  }
}

export class LiteralExpression extends Expression {
  readonly value: string | number | boolean;
  constructor(value: any) {
    super();
    this.value = value;
  }
}

export class IfExpression extends Expression {
  readonly testExpression: Expression;
  readonly consequent: Expression;
  readonly alternative?: Expression;
  constructor(
    testExpression: Expression,
    consequent: Expression,
    alternative?: Expression
  ) {
    super();
    this.testExpression = testExpression;
    this.consequent = consequent;
    this.alternative = alternative;
  }
}

export class LetExpression extends Expression {
  readonly bindings: LetBinding[];
  readonly body: Expression[];
  constructor(bindings: LetBinding[], body: Expression[]) {
    super();
    this.bindings = bindings;
    this.body = body;
  }
}

export class LetBinding {
  readonly name: string;
  readonly value: Expression;
  constructor(name: string, value: Expression) {
    this.name = name;
    this.value = value;
  }
}

export class LambdaExpression extends Expression {
  readonly args: string[];
  readonly body: Expression[];
  constructor(args: string[], body: Expression[]) {
    super();
    this.args = args;
    this.body = body;
  }
}
