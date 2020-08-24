export class Callable extends Function {
  _bound: any;

  constructor() {
    super("...args", "return this._bound.function(...args)");
    this._bound = this.bind(this);

    return this._bound;
  }

  function(...args: any[]) {
    throw new Error("super class has no method named 'function'");
  }
}
