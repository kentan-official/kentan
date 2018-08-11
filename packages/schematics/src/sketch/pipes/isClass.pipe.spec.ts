import { SketchMetaData } from '@lib/contracts';
import { isClass } from './isClass.pipe';

describe('@isClass', () => {
  let sketch: SketchMetaData;

  beforeEach(() => {
    sketch = {
      name: '',
      dir: '',
      modelImportPath: '',
      model: {
        isClass: true,
        name: ''
      }
    };
  });

  describe('When a Sketch is created for class', () => {
    it('should indicate that the model is a class', () => {
      const isModelClass = isClass(JSON.stringify(sketch));
      expect(isModelClass).toBe(true);
    });
  });
});


