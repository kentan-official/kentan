jest.resetModules();
const mockFileSync = jest.fn();
mockFileSync.mockReturnValue([]);
const mockFind = { fileSync: mockFileSync };

jest.mock('find', () => mockFind);

import { VirtualTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { mockLogger } from '@lib/test/mock-logger';
import { Match, Warning } from '@lib/index';
import { None } from '@lib/option-type/none';
import { Some } from '@lib/option-type/some';

describe('ng g sketch --for <model>', () => {
  let collectionPath: string;
  let runner: SchematicTestRunner;
  let actualTree: UnitTestTree;

  describe("When a sketch is created and the specified model doesn't exist", () => {
    beforeEach(() => {
      const config = { apps: [{ root: 'src' }] };
      collectionPath = join(__dirname, '../collection.json');
      runner = new SchematicTestRunner('kentan', collectionPath);
      actualTree = new UnitTestTree(new VirtualTree());
      actualTree.create('.angular-cli.json', JSON.stringify(config));
      useModelFinderMock();
    });

    it("should create the sketch in '/test/sketches/<model>.sketch.ts'", () => {
      const tree = runner.runSchematic(
        'sketch',
        { name: 'customer' },
        actualTree
      );

      expect(tree.exists('src/app/test/sketches/customer.sketch.ts')).toBe(
        true
      );
    });

    it('should create the class definition for a sketch', () => {
      const expected = 'export class ForCustomer extends Sketch<Customer>';
      const tree = runner.runSchematic(
        'sketch',
        { name: 'customer' },
        actualTree
      );

      const content = tree.readContent(
        'src/app/test/sketches/customer.sketch.ts'
      );
      expect(content).toContain(expected);
    });

    it('should create super call inside the constructor', () => {
      const expected = 'super({});';
      const tree = runner.runSchematic(
        'sketch',
        { name: 'customer' },
        actualTree
      );

      const content = tree.readContent(
        'src/app/test/sketches/customer.sketch.ts'
      );

      expect(content).toContain(expected);
    });
  });

  describe('When a sketch is created for an existing model interface', () => {
    beforeEach(() => {
      const config = { apps: [{ root: 'src' }] };
      runner = new SchematicTestRunner('kentan', collectionPath);
      actualTree = new UnitTestTree(new VirtualTree());
      actualTree.create('.angular-cli.json', JSON.stringify(config));

      jest.resetModules();
      jest.mock('@angular-devkit/core/node', () => mockLogger.factory);
    });

    it('should show a success message that the existing model was found', () => {
      useModelFinderMock();
      const expected = Match('Auto generate import for found model "customer"');

      actualTree.create('/customer.ts', '');
      runner.runSchematic('sketch', { name: 'customer' }, actualTree);
      expect(mockLogger.log.info).toBeCalledWith(expected);
    });

    it('should show a warning if no model was found', () => {
      useModelFinderMock({ notFound: true, path: '', content: '' });

      const expected = Warning(
        'Model not found. Could not generate import for "customer"'
      );

      runner.runSchematic('sketch', { name: 'customer' }, actualTree);

      expect(mockLogger.log.info).toBeCalledWith(expected);
    });

    it('should add the path of the class to the sketch template', () => {
      useModelFinderMock();

      const expected = "import { Customer } from '../../models/customer';";

      const tree = runner.runSchematic(
        'sketch',
        { name: 'customer' },
        actualTree
      );

      const content = tree.readContent(
        'src/app/test/sketches/customer.sketch.ts'
      );

      expect(content).toContain(expected);
    });
  });

  describe('When a sketch is created for a existing model class', () => {
    beforeEach(() => {
      const config = { apps: [{ root: 'src' }] };
      runner = new SchematicTestRunner('kentan', collectionPath);
      actualTree = new UnitTestTree(new VirtualTree());
      actualTree.create('.angular-cli.json', JSON.stringify(config));

      jest.resetModules();
      jest.mock('@angular-devkit/core/node', () => mockLogger.factory);
      useModelFinderMock({
        notFound: false,
        path: 'src/app/models/customer.ts',
        content: 'export class Customer {'
      });
    });

    it('should add the class token to the super call', () => {
      const expected = 'super(Customer, {})';

      const tree = runner.runSchematic(
        'sketch',
        { name: 'customer' },
        actualTree
      );

      const content = tree.readContent(
        'src/app/test/sketches/customer.sketch.ts'
      );

      expect(content).toContain(expected);
    });
  });
});

const defaultSearchResult = {
  notFound: false,
  path: 'src/app/models/customer.ts',
  content: 'export interface Customer {'
};

function useModelFinderMock(sketch = defaultSearchResult) {
  const modelFinder = require('../lib/model-finder/model-finder').default;

  const result = sketch.notFound
    ? new None({ explanation: '' })
    : new Some(sketch);

  modelFinder.prototype.find = jest.fn();
  modelFinder.prototype.find.mockImplementation(() => result);
}
