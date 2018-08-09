import { Observable, of, throwError } from 'rxjs';
import {
  SchematicTestRunner,
  UnitTestTree
} from '../../../../node_modules/@angular-devkit/schematics/testing';
import { join } from 'path';
import { VirtualTree } from '../../../../node_modules/@angular-devkit/schematics';

// describe("When a sketch is created and the specified model doesn't exist", () => {
//   beforeEach(() => {
//     const config = { apps: [{ root: 'src' }] };
//     collectionPath = join(__dirname, '../collection.json');
//     runner = new SchematicTestRunner('kentan', collectionPath);
//     actualTree = new UnitTestTree(new VirtualTree());
//     actualTree.create('.angular-cli.json', JSON.stringify(config));
//     useModelFinderMock();
//   });

//   it("should create the sketch in '/test/sketches/<model>.sketch.ts'", () => {
//     const tree = runner.runSchematic(
//       'sketch',
//       { name: 'customer' },
//       actualTree
//     );

describe('ng add @kentan-official/schematics', () => {
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

    UseMock.globalCliConfiguration();
  });
  
  describe('When Kentan is installed successfully', () => {
    it('should log an info message', () => {
      UseMock.packageInstaller(of(tree));
      runner.runSchematic('ng-add', {}, tree);
      expect(childLogger.info).toHaveBeenCalled();
    });
  });

  describe('When Kentan could not be installed', () => {
    it('should log an error message', () => {
      UseMock.packageInstaller(throwError(''));

      runner.runSchematic('ng-add', {}, tree);
      expect(childLogger.fatal).toHaveBeenCalled();
    });
  });
});

class UseMock {
  static packageInstaller(result: Observable<any>) {
    const installer = require('../lib/package-managers/node-package-installer-base')
      .default;

    installer.prototype.installDev = jest.fn();
    installer.prototype.installDev.mockImplementation(() => result);
  }

  static globalCliConfiguration() {
    const global = require('../lib/angular-project/global-cli-configuration')
      .default;

    global.prototype.readPackageManager = jest.fn();
    global.prototype.readPackageManager.mockImplementation(() => 'npm');
  }
}
