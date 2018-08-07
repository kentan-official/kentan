import { Kentan, Sketch } from '../src/core';

class WithProperty {
  myProperty: string;
}

class ForWithProperty extends Sketch<WithProperty> {
  constructor() {
    super(WithProperty, { myProperty: 'my default value' });
  }
}

describe('When a plan provides default values', () => {
  describe('using the initial data', () => {
    it('should provide the initial test data', () => {
      const expected = new ForWithProperty().model().myProperty;
      const model = Kentan.sketch(ForWithProperty).model();

      expect(model.myProperty).toBe(expected);
    });
  });

  describe('overwrite the defaults', () => {
    it('should provide the overwritten test data', () => {
      const expected = 'my new value';
      const overrides: WithProperty = { myProperty: expected };
      const model = Kentan.sketch(ForWithProperty).model(overrides);

      expect(model.myProperty).toBe(expected);
    });
  });
});
