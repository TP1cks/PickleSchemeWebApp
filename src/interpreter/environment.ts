export class Environment {
  readonly outerEnvironment?: Environment;
  readonly entries: Map<string, any>;

  constructor(outerEnvironment?: Environment) {
    this.outerEnvironment = outerEnvironment;
    this.entries = new Map<string, any>();
  }

  get(identifier: string): any {
    if (this.entries.has(identifier)) {
      return this.entries.get(identifier);
    } else if (this.outerEnvironment) {
      return this.outerEnvironment.get(identifier);
    }
    throw Error(
      `Environment error, cannot retrieve unmapped identifier: ${identifier}`
    );
  }

  set(identifier: string, value: any) {
    if (this.entries.has(identifier)) {
      this.entries.set(identifier, value);
    } else {
      throw Error(
        `Environment error, cannot set unmapped identifier: ${identifier}`
      );
    }
  }

  define(identifier: string, value: any) {
    this.entries.set(identifier, value);
  }

  remove(identifier: string) {
    this.entries.delete(identifier);
  }
}
