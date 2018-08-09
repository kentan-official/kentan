import { VirtualTree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';

import { AngularProject } from '../angular-project/angular-project';
import { AngularCliProject } from '../contracts/angular-cli-project';
import { GlobalCliConfiguration } from '../angular-project/global-cli-configuration.spec';

describe('Angular Project does not configure a package manager', () => {
  describe('When no package manager is configured', () => {
    it('should default to npm', () => {
      const detector = new CliPackageManagerDetector();
      const command = detector.detect(
        {} as AngularCliProject,
        { readPackageManager: () => 'npm' } as any
      );

      expect(command).toBe('npm');
    });
  });

  describe('When the global angular configuration configures a package manager', () => {
    it('should yield the configured package manager', () => {
      const detector = new CliPackageManagerDetector();
      const command = detector.detect(
        {} as AngularCliProject,
        { readPackageManager: () => 'pnpm' } as any
      );

      expect(command).toBe('pnpm');
    });
  });

  describe('When no package manager is configured globally', () => {
    // it('should default to npm');
  });
});

describe('When an Angular Project has a package manager configured', () => {
  it('should take the configured package manager', () => {
    const configuration = {
      cli: { packageManager: 'pnpm' },
      projects: { app: { root: ' ' } }
    };
    const tree = new UnitTestTree(new VirtualTree());
    tree.create('angular.json', JSON.stringify(configuration));

    const projectConfiguration = new AngularProject(tree);
    const detector = new CliPackageManagerDetector();
    const command = detector.detect(projectConfiguration, {} as any);

    expect(command).toBe('pnpm');
  });
});

export class CliPackageManagerDetector {
  constructor(private _packageManagers = ['npm', 'pnpm', 'yarn']) {}

  detect(
    app: AngularCliProject,
    globalConfiguration: GlobalCliConfiguration
  ): string {
    const found = this._packageManagers.find(m => m === app.packageManager);

    return !!found ? found : globalConfiguration.readPackageManager();
  }
}
