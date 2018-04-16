import { Plan, Grab } from '../src/grab';

class ModelA {
  modelB: ModelB;
}

class ModelB {
  someProperty: string;
}

class ForModelA extends Plan<ModelA> {
  constructor() {
    super(ModelA, {
      modelB: Grab.plan(ForModelB).model()
    });
  }
}

class ForModelB extends Plan<ModelB> {
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
      const plan = Grab.plan(ForModelA);

      expect(plan.model().modelB.someProperty).toBe(expected);
    });
  });

  describe('use overrides', () => {
    it('should be possible to provide own test data', () => {
      const expected = 'generated on the fly';

      const modelA = Grab.plan(ForModelA).model({
        modelB: Grab.plan(ForModelB).model({ someProperty: expected })
      });

      expect(modelA.modelB.someProperty).toBe(expected);
    });
  });
});
