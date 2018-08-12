import {
  UnitTestTree,
  SchematicTestRunner
} from '@angular-devkit/schematics/testing';
import { VirtualTree } from '@angular-devkit/schematics';
import { join } from 'path';

describe('ng g @kentan-official:sketch-barrel', () => {
  let collectionPath: string;
  let runner: SchematicTestRunner;
  let tree: UnitTestTree;
  let logger: any;
  let childLogger: { info: Function; fatal: Function };

  beforeEach(() => {
    const config = { apps: [{ root: 'src' }] };

    collectionPath = join(__dirname, '../collection.json');
    runner = new SchematicTestRunner('kentan', collectionPath);

    childLogger = {
      info: jest.fn(),
      fatal: jest.fn()
    };

    logger = { createChild: () => childLogger };
    runner['_logger'] = logger;

    tree = new UnitTestTree(new VirtualTree());
    tree.create('.angular-cli.json', JSON.stringify(config));
  });

  describe('When a barrel is created for sketches', () => {
    it('should create an index.ts file in the sketch directory', () => {
      const newTree = runner.runSchematic('sketch-barrel', {}, tree);

      expect(newTree.exists('src/app/test/sketches/index.ts')).toBe(true);
    });
  });
});
