import { dir } from './dir.pipe';

describe('@dir', () => {
  describe('When sketch contains a property dir', () => {
    it("yields it's value", () => {
      const expectedDir = '/test/sketches/some.sketch.ts';
      const sketch = { dir: expectedDir };

      const value = dir(JSON.stringify(sketch));
      expect(value).toBe(expectedDir);
    });
  });
});
