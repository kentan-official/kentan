import { Sketch, Kentan } from '../src/core';

class ModelA {
  modelB: ModelB;
}

class ModelB {
  someProperty: string;
}

class ForModelA extends Sketch<ModelA> {
  constructor() {
    super(ModelA, {
      modelB: Kentan.sketch(ForModelB).model()
    });
  }
}

class ForModelB extends Sketch<ModelB> {
  constructor() {
    super(ModelB, {
      someProperty: 'default value'
    });
  }
}

describe('When a "ModelA" has a property of type "ModelB"', () => {
  describe('using default values', () => {
    it('should use a plan for "ModelB" to create plan for "ModalA"', () => {
      const expected = new ForModelB().model().someProperty;
      const plan = Kentan.sketch(ForModelA);

      expect(plan.model().modelB.someProperty).toBe(expected);
    });
  });

  describe('use overrides', () => {
    it('should be possible to provide own test data', () => {
      const expected = 'generated on the fly';

      const modelA = Kentan.sketch(ForModelA).model({
        modelB: Kentan.sketch(ForModelB).model({ someProperty: expected })
      });

      expect(modelA.modelB.someProperty).toBe(expected);
    });
  });
});
