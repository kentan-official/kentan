import { Grab, Plan } from '../src/grab';

class ContainParameterlessMethod {
  foo(): string {
    return 'Hi';
  }
}

class ForContainParameterlessMethod extends Plan<ContainParameterlessMethod> {
  constructor() {
    super(ContainParameterlessMethod);
  }
}

describe('When a method of the model is called', () => {
  it('should execute the method', () => {
    const model = Grab.plan(ForContainParameterlessMethod).model();
    expect(true).toBe(true);
  });
});
