import { SketchMetaData } from '@lib/contracts';
import { name } from './name.pipe';

describe('@name', () => {
  let sketch: SketchMetaData;

  beforeEach(() => {
    sketch = {
      name: 'customer',
      dir: '',
      modelImportPath: '',
      model: {
        isClass: true,
        name: ''
      }
    };
  });

  describe('When a Sketch has a name defined', () => {
    it('should yields  it\'s name', () => {
      const isModelClass = name(JSON.stringify(sketch));
      expect(isModelClass).toBe('customer');
    });
  });
});
