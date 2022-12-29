import { Environment } from "./environment";
import { Interpreter } from "./interpreter";
import { LambdaExpression } from "./types";

export class Procedure {
  readonly declaration: LambdaExpression;
  readonly closure: Environment;
  constructor(decleration: LambdaExpression, closure: Environment) {
    this.declaration = decleration;
    this.closure = closure;
  }

  call(interpreter: Interpreter, procedureCallArguments: any[]) {
    if (procedureCallArguments.length !== this.declaration.args.length) {
      throw Error(
        `Evaluation error, procedure requires ${this.declaration.args.length} arguments, but only received ${procedureCallArguments.length}`
      );
    }
    const lambdaEnv = new Environment(this.closure);
    this.declaration.args.forEach((procedureArgument, index) => {
      lambdaEnv.define(procedureArgument, procedureCallArguments[index]);
    });
    let lambdaResult;
    for (const lambdaBodyExpression of this.declaration.body) {
      lambdaResult = interpreter.evaluateExpression(
        lambdaBodyExpression,
        lambdaEnv
      );
    }
    return lambdaResult;
  }
}

export class PrimitiveProcedure {
  readonly declaration: Function;
  constructor(declaration: Function) {
    this.declaration = declaration;
  }
  call(procedureArguments: any[]): any {
    return this.declaration(procedureArguments);
  }
}
