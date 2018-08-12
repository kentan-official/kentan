const mockFileSync = jest.fn();
const mockFind = { fileSync: mockFileSync };

jest.resetModules();
jest.mock('find', () => mockFind);

import { ImportPath } from './import-path';

describe('ImportPath', () => {
  let root: string;
  let importPath: ImportPath;

  beforeEach(() => {
    root = 'src/app';
    importPath = new ImportPath(root);
  });

  describe('When no "from" parameter is provided', () => {
    it('should yield null', () => {
      const path = importPath.resolve(null, '/some/path');
      expect(path).toBeNull();
    });
  });

  describe('When no "to" parameter is provided', () => {
    it('should yield null', () => {
      const path = importPath.resolve('/some/path', null);
      expect(path).toBeNull();
    });
  });

  describe('When target does not exist', () => {
    it('schould yield null', () => {
      mockFileSync.mockReturnValueOnce([]);

      const path = importPath.resolve(
        '/sketches/some.sketch.ts',
        '/does/not/exist'
      );

      expect(path).toBeNull();
    });
  });

  describe('When target exists', () => {
    it('schould yield relative path', () => {
      mockFileSync.mockReturnValueOnce(['src/app/models/some.ts']);

      const path = importPath.resolve(
        'src/app/sketches/some.sketch.ts',
        'src/app/models/some.ts'
      );

      expect(path).toBe('../../models/some');
    });
  });

  describe('When target exists on Windows', () => {
    it('schould yield relative path', () => {
      mockFileSync.mockReturnValueOnce(['src\\app\\models\\some.ts']);

      const path = importPath.resolve(
        'src/app/sketches/some.sketch.ts',
        'some.ts'
      );

      expect(path).toBe('../../models/some');
    });
  });
});
