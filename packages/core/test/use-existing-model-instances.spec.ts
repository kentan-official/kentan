import { Sketch, useInstance } from '../src/core';

export class HasConstructorParameter {
  constructor(public paramter: string) {}

  greet() {
    return this.paramter;
  }
}

export class ForHasConstructorParameter extends Sketch<
  HasConstructorParameter
> {}

describe("When a model class has parameters in it's constructor", () => {
  it('should provide an instance of that class', () => {
    const expected = "set the constructor's parameter";
    const model = new HasConstructorParameter(expected);
    const plan = new ForHasConstructorParameter(useInstance(model));

    expect(plan.model().paramter).toBe(expected);
  });

  it("should be possible to exectute it's functions", () => {
    const expected = "set the constructor's parameter";
    const model = new HasConstructorParameter(expected);
    const plan = new ForHasConstructorParameter(useInstance(model));

    expect(plan.model().greet()).toBe(expected);
  });
});
