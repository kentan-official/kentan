const mockFileSync = jest.fn();
const mockReadSync = jest.fn();

const mockFs = { readFileSync: mockReadSync };
const mockFind = { fileSync: mockFileSync };

jest.resetModules();
jest.mock('fs', () => mockFs);
jest.mock('find', () => mockFind);

import { ModelFinder } from './model-finder';

describe('Model Finder', () => {
  let content: string;
  let root: string;
  let name: string;
  let modelPath: string;
  let modelFinder: ModelFinder;

  beforeEach(() => {
    content = 'class Customer';
    root = 'src/app';
    name = 'customer';
    modelPath = `${root}/models/${name}.ts`;
    modelFinder = new ModelFinder();
  });

  describe('When a model exist on a certain path', () => {
    beforeEach(() => {
      mockFileSync.mockReturnValueOnce([modelPath]);
      mockReadSync.mockReturnValueOnce(content);
    });

    it('should yield the path to the file', () => {
      modelFinder
        .find(root, name)
        .match(found => expect(found.path).toBe(modelPath), _never => {});
    });

    it('should yield the content of the file', () => {
      modelFinder
        .find(root, name)
        .match(found => expect(found.content).toBe(content), _never => {});
    });

    it('should yield the model was found', () => {
      modelFinder
        .find(root, name)
        .match(found => expect(found.notFound).toBe(false), _never => {});
    });
  });

  describe('When a model does not exist on a certain path', () => {
    beforeEach(() => {
      mockFileSync.mockReturnValueOnce([]);
    });

    it('should indicate that the model was not found', () => {
      modelFinder
        .find(root, name)
        .match(
          _never => {},
          reason =>
            expect(reason.explanation).toBe(
              `Could not find "${name}" in "${root}"`
            )
        );
    });
  });
});
