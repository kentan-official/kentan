import { Kentan, Sketch } from '../src/core';

class Empty {
  id: string;
}

class EmptyNumericId {
  id: number;
}

class ForEmpty extends Sketch<Empty> {
  constructor() {
    super(Empty);
  }
}
class ForEmptyNumericId extends Sketch<EmptyNumericId> {
  constructor() {
    super(Empty);
  }
}

describe('When a list of test data is needed', () => {
  it('should be possible to generate a list of sketches', () => {
    const sketches = Kentan.sketch(ForEmpty).take(2);
    expect(sketches.all().length).toBe(2);
  });

  it('should allow to get the models from the sketch list', () => {
    const models = Kentan.sketch(ForEmpty)
      .take(1)
      .models();

    expect(models[0]).toBeInstanceOf(Empty);
  });

  it('should be allowed to pass a factory for a property', () => {
    const id = '12-34-56-78';
    const models = Kentan.sketch(ForEmpty)
      .take(1)
      .models({
        id: () => id
      });

    expect(models[0].id).toBe(id);
  });

  it('should pass the index of the respective model', () => {
    const id = '12-34-56-78-';
    const expectedId = '12-34-56-78-0';

    const models = Kentan.sketch(ForEmpty)
      .take(1)
      .models({
        id: index => `${id}${index}`
      });

    expect(models[0].id).toBe(expectedId);
  });

  it('should pass the index of the respective model when more than one items are added', () => {
    const id = '12-34-56-78-';
    const expectedId = '12-34-56-78-2';

    const models = Kentan.sketch(ForEmpty)
      .take(3)
      .models({
        id: index => `${id}${index}`
      });

    expect(models[2].id).toBe(expectedId);
  });

  it('should pass different indexes to elements in list', () => {
    const models = Kentan.sketch(ForEmpty)
      .take(3)
      .models({
        id: index => index.toString()
      });

    expect(models[0].id).toBe('0');
    expect(models[1].id).toBe('1');
    expect(models[2].id).toBe('2');
  });

  it('should pass different numeric indexes to elements in list', () => {
    const models = Kentan.sketch(ForEmptyNumericId)
      .take(3)
      .models({
        id: index => index
      });

    expect(models[0].id).toBe(0);
    expect(models[1].id).toBe(1);
    expect(models[2].id).toBe(2);
  });
});
