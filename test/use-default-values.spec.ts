import { Kentan, Sketch } from '../src/kentan';

class Empty {}

class ForEmpty extends Sketch<Empty> {
  constructor() {
    super(Empty);
  }
}

describe('When a plan is requested', () => {
  let plan: Sketch<Empty>;

  beforeEach(() => {
    plan = Kentan.sketch(ForEmpty);
  });

  it('should yield the desired plan', () => {
    expect(plan).toBeDefined();
  });

  it('should yield an empty model', () => {
    expect(plan.model()).toBeDefined();
  });

  it('should yield an instance of the empty model', () => {
    expect(plan.model()).toBeInstanceOf(Empty);
  });
});

describe('When "null" is requested', () => {
  it('should raise an error', () => {
    expect(() => Kentan.sketch(null)).toThrowError(
      'Grab: Please provide a token for a class type extending "Plan<T>"'
    );
  });
});

describe('When "undefined" is requested', () => {
  it('should raise an error', () => {
    expect(() => Kentan.sketch(undefined)).toThrowError(
      'Grab: Please provide a token for a class type extending "Plan<T>"'
    );
  });
});
