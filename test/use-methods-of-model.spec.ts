import { Kentan, Sketch } from '../src/kentan';

class ContainParameterlessMethod {
  foo(): string {
    return 'Hi';
  }
}

class ForContainParameterlessMethod extends Sketch<ContainParameterlessMethod> {
  constructor() {
    super(ContainParameterlessMethod);
  }
}

describe('When a method of the model is called', () => {
  it('should execute the method', () => {
    const model = Kentan.sketch(ForContainParameterlessMethod).model();
    expect(true).toBe(true);
  });
});
