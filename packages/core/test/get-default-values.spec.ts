import { Kentan, Sketch } from '../src/core';

class Structure {
  some: { thing: { nested: { inside: string } } };
}

class ForStructure extends Sketch<Structure> {
  constructor() {
    super({
      some: { thing: { nested: { inside: 'default value' } } }
    });
  }
}

describe('When one of the default values is needed for a test', () => {
  it('should be possible to query a certain value', () => {
    const expected = 'default value';
    const sketch = Kentan.sketch(ForStructure);
    const selected = sketch.get(m => m.some.thing.nested.inside);

    expect(selected).toBe(expected);
  });
});

describe('When one of the default values is not set some how', () => {
  it('should raise an error', () => {
    const sketch = Kentan.sketch(ForStructure).set(m => (m.some.thing = null));
    expect(() => sketch.get(m => m.some.thing.nested.inside)).toThrowError(
      "Kentan: Cannot read property 'nested' of null"
    );
  });
});
