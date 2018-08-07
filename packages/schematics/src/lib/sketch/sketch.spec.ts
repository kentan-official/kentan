const mockFileSync = jest.fn();
const mockReadSync = jest.fn();

const mockFs = { readFileSync: mockReadSync };
const mockFind = { fileSync: mockFileSync };

jest.resetModules();
jest.mock('fs', () => mockFs);
jest.mock('find', () => mockFind);

import { ModelFinder } from '../model-finder/model-finder';
import { ModelInterpreter } from '../model-interpreter/model-interpreter';
import { SketchCreator } from './sketch';

describe('Sketch', () => {
  describe('When a model exists for a sketch', () => {
    let name: string;
    let dir: string;
    let modelDir: string;
    let modelContent: string;
    let root: string;
    let finder: ModelFinder;
    let interpreter: ModelInterpreter
    let factory: SketchCreator;

    beforeEach(() => {
      root = 'src/app';
      name = 'customer';
      dir = 'test/sketches';
      modelDir = `${root}/models/${name}.ts`;
      modelContent = 'export class Customer {';
      finder = new ModelFinder();
      interpreter = new ModelInterpreter();
      factory = new SketchCreator(root, finder, interpreter);

      mockFileSync.mockReturnValueOnce([modelDir]);
      mockReadSync.mockReturnValueOnce(modelContent);
    });

    it('should yield the name of the sketch', () => {
      const sketch = factory.create(name, dir);
      expect(sketch.name).toBe(name);
    });

    it('should yield the directory where the sketch should be created', () => {
      const expectedPath = `${root}/${dir}`;
      const sketch = factory.create(name, dir);
      expect(sketch.dir).toBe(expectedPath);
    });

    it('should yield the relative path to the model', () => {
      const sketch = factory.create(name, dir);
      expect(sketch.modelImportPath.length).toBeDefined();
    });

    it('should yield the name of the model', () => {
      const sketch = factory.create(name, dir);
      expect(sketch.model.name).toBe('Customer');
    });

    it('should indicate if the model is a class', () => {
      const sketch = factory.create(name, dir);
      expect(sketch.model.isClass).toBe(true);
    });
  });
});
