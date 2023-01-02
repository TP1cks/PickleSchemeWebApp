import {
  CallExpression,
  DefineExpression,
  Expression,
  IfExpression,
  LambdaExpression,
  LetExpression,
  LiteralExpression,
  NULL_VALUE,
  SetExpression,
  SymbolExpression,
} from "./types";
import { Environment } from "./environment";
import { PrimitiveProcedure, Procedure } from "./procedure";

export class Interpreter {
  readonly environment: Environment;
  readonly outputCallback: (output: any) => void;
  constructor(outputCallback: (output: any) => void) {
    this.environment = this.getBaseEnvironment();
    this.outputCallback = outputCallback;
  }

  evaluateExpressions(expressions: Expression[]): any {
    let result;
    for (const expression of expressions) {
      result = this.evaluateExpression(expression, this.environment);
    }
    return result;
  }

  evaluateExpression(expression: Expression, environment: Environment): any {
    while (true) {
      if (expression instanceof LiteralExpression) {
        return expression.value;
      }
      if (expression instanceof SymbolExpression) {
        return environment.get(expression.symbol);
      }
      if (expression instanceof IfExpression) {
        const testExpressionResult = this.evaluateExpression(
          expression.testExpression,
          environment
        );
        if (testExpressionResult !== false) {
          return this.evaluateExpression(expression.consequent, environment);
        } else if (expression.alternative) {
          return this.evaluateExpression(expression.alternative, environment);
        }
        return;
      }
      if (expression instanceof CallExpression) {
        const callee: any = this.evaluateExpression(
          expression.callee,
          environment
        );
        const args: any[] = expression.args.map((arg) =>
          this.evaluateExpression(arg, environment)
        );
        if (callee instanceof Procedure) {
          if (callee.declaration.args.length !== expression.args.length) {
            throw Error(
              `Evaluation error: ${callee} expected ${callee.declaration.args.length} args but got ${expression.args.length}`
            );
          }
          const callEnv = new Environment(environment);
          callee.declaration.args.forEach((calleeArg, argIndex) => {
            callEnv.define(calleeArg, args[argIndex]);
          });
          for (const callBodyExpression of callee.declaration.body.slice(
            0,
            -1
          )) {
            this.evaluateExpression(callBodyExpression, callEnv);
          }
          expression =
            callee.declaration.body[callee.declaration.body.length - 1];
          environment = callEnv;
          continue;
        }
        if (callee instanceof PrimitiveProcedure) {
          return callee.call(args);
        }
        throw new Error(
          `Interpreter error, cannot evaluate invalid procedure: ${callee}`
        );
      }
      if (expression instanceof DefineExpression) {
        const value = this.evaluateExpression(expression.value, environment);
        this.environment.define(expression.name, value);
        return;
      }
      if (expression instanceof SetExpression) {
        const value = this.evaluateExpression(expression.value, environment);
        this.environment.set(expression.name, value);
        return;
      }
      if (expression instanceof LetExpression) {
        const localEnv = new Environment(this.environment);
        expression.bindings.forEach((binding) => {
          localEnv.define(
            binding.name,
            this.evaluateExpression(binding.value, localEnv)
          );
        });
        let letExpressionResult;
        for (const bodyExpression of expression.body) {
          letExpressionResult = this.evaluateExpression(
            bodyExpression,
            localEnv
          );
        }
        return letExpressionResult;
      }
      if (expression instanceof LambdaExpression) {
        return new Procedure(expression, this.environment);
      }
      throw Error(
        `Interpreter error, cannot evaluate unknown expression type: ${expression}`
      );
    }
  }

  getBaseEnvironment(): Environment {
    const baseEnvironmentEntries: Record<string, any> = {
      "*": new PrimitiveProcedure(([a, b]: [any, any]) => a * b),
      "+": new PrimitiveProcedure(([a, b]: [any, any]) => a + b),
      "/": new PrimitiveProcedure(([a, b]: [any, any]) => a / b),
      "-": new PrimitiveProcedure(([a, b]: [any, any]) => a - b),
      "=": new PrimitiveProcedure(([a, b]: [any, any]) => a === b),
      "!=": new PrimitiveProcedure(([a, b]: [any, any]) => a !== b),
      ">": new PrimitiveProcedure(([a, b]: [any, any]) => a > b),
      "<": new PrimitiveProcedure(([a, b]: [any, any]) => a < b),
      ">=": new PrimitiveProcedure(([a, b]: [any, any]) => a >= b),
      "<=": new PrimitiveProcedure(([a, b]: [any, any]) => a <= b),
      not: new PrimitiveProcedure(([arg]: [any]) => !arg),
      "null?": new PrimitiveProcedure((arg: any) => arg === NULL_VALUE),
      list: new PrimitiveProcedure((args: any) => args),
      "list?": new PrimitiveProcedure((arg: any) => arg instanceof Array),
      "string-append": new PrimitiveProcedure(([a, b]: [string, string]) =>
        a.concat(b)
      ),
      length: new PrimitiveProcedure((arg: any) => arg.length),
      "number?": new PrimitiveProcedure((arg: any) => arg instanceof Number),
      "procedure?": new PrimitiveProcedure(
        (arg: any) =>
          arg instanceof Procedure || arg instanceof PrimitiveProcedure
      ),
      car: new PrimitiveProcedure(([arg]: [any]) => arg[0]),
      cdr: new PrimitiveProcedure(([arg]: [any]) =>
        arg.length > 1 ? arg.slice(1) : NULL_VALUE
      ),
      cons: new PrimitiveProcedure(([a, b]: [any, any]) => [a, ...b]),
      remainder: new PrimitiveProcedure(([a, b]: [number, number]) => a % b),
      apply: new PrimitiveProcedure(
        ([proc, args]: [PrimitiveProcedure | Procedure, any[]]) =>
          proc instanceof PrimitiveProcedure
            ? proc.call(args)
            : proc.call(this, args)
      ),
      print: new PrimitiveProcedure((arg: any) => this.outputCallback(arg)),
    };
    const env = new Environment();
    Object.entries(baseEnvironmentEntries).forEach(
      ([identifier, value]: [string, PrimitiveProcedure]) => {
        env.define(identifier, value);
      }
    );
    return env;
  }
}
