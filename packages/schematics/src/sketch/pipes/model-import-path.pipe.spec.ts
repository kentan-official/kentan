import { SketchMetaData } from '../../lib/contracts';
import { modelImportPath } from './model-import-path.pipe';

describe('@modelImportPath', () => {
  let sketch: SketchMetaData;

  beforeEach(() => {
    sketch = {
      name: '',
      dir: '',
      modelImportPath: 'some/path/model.ts',
      model: {
        isClass: true,
        name: ''
      }
    };
  });

  describe('When a Sketch has a name defined', () => {
    it("should yields  it's name", () => {
      const isModelClass = modelImportPath(JSON.stringify(sketch));
      expect(isModelClass).toBe('some/path/model.ts');
    });
  });
});
