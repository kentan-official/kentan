import { VirtualTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { Observable, of, throwError } from 'rxjs';

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

  afterEach(() => jest.resetAllMocks());
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
