import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

export class PickleScheme {
  private readonly lexer: Lexer;
  private readonly parser: Parser;
  private readonly interpreter: Interpreter;
  private readonly outputCallback: (output: any) => void;

  constructor(outputCallback: (output: any) => void) {
    this.lexer = new Lexer();
    this.parser = new Parser();
    this.outputCallback = outputCallback;
    this.interpreter = new Interpreter(outputCallback);
  }

  run(program: string): any {
    const tokens = this.lexer.tokenize(program);
    const expressions = this.parser.parse(tokens);
    return this.interpreter.evaluateExpressions(expressions);
  }
}
