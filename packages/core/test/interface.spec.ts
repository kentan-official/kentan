import { Kentan, Sketch } from '../src/core';

interface Sample {
  id: string;
}

class ForSample extends Sketch<Sample> {
  constructor() {
    super({ id: '23042' });
  }
}

describe('Creating Data for an interface', () => {
  it('should work', () => {
    const model = Kentan.sketch(ForSample).model();

    expect(model.id).toBe('23042');
  });
});
