import { Kentan, Sketch } from '../src/kentan';

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

describe('When a value somewhere in the data structure has to be set', () => {
  it('should be allowed to overwrite it by using a selector', () => {
    const expected = 'overridden value';
    const sketch = Kentan.sketch(ForStructure);

    const structure = sketch
      .set(m => (m.some.thing.nested.inside = expected))
      .model();

    expect(structure.some.thing.nested.inside).toBe(expected);
  });
});

describe('When some value in the data structure is not defined', () => {
  it('should raise an error', () => {
    const sketch = Kentan.sketch(ForStructure).set(
      m => (m.some.thing = undefined)
    );

    expect(() =>
      sketch.set(m => (m.some.thing.nested.inside = 'some'))
    ).toThrow("Kentan: Cannot read property 'nested' of undefined");
  });
});
