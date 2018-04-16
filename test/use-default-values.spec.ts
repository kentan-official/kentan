import { Grab, Plan } from '../src/grab';

class Empty {}

class ForEmpty extends Plan<Empty> {}

describe('When a plan is requested', () => {
  let plan: Plan<Empty>;

  beforeEach(() => {
    plan = Grab.plan(ForEmpty);
  });

  it('should yield the desired plan', () => {
    expect(plan).toBeDefined();
  });

  it('should provide an empty model', () => {
    expect(plan.model()).toBeDefined();
  });
});

describe('When "null" is requested', () => {
  it('should raise an error', () => {
    expect(() => Grab.plan(null)).toThrowError(
      'Grab: Please provide a token for a class type extending "Plan<T>"'
    );
  });
});

describe('When "undefined" is requested', () => {
  it('should raise an error', () => {
    expect(() => Grab.plan(undefined)).toThrowError(
      'Grab: Please provide a token for a class type extending "Plan<T>"'
    );
  });
});
