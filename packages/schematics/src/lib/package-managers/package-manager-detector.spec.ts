import { VirtualTree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';

import { AngularProject } from '../angular-project/angular-project';
import { AngularCliProject } from '../contracts/angular-cli-project';

import { homedir } from 'os';

describe('Angular Project does not configure a package manager', () => {
  describe('When no package manager is configured', () => {
    it('should default to npm', () => {
      const detector = new CliPackageManagerDetector();
      const command = detector.detect(
        {} as AngularCliProject,
        {} as GlobalCliConfig
      );

      expect(command).toBe('npm');
    });
  });

  describe('When the global angular configuration configures a package manager', () => {
    it('should yield the configured package manager');
  });

  describe('When no package manager is configured globally', () => {
    it('should default to npm');
  });
});

describe('When an Angular Project has a package manager configured', () => {
  it('should take the configured package manager', () => {
    const configuration = { cli: { packageManager: 'pnpm' }, projects: {} };
    const tree = new UnitTestTree(new VirtualTree());
    tree.create('angular.json', JSON.stringify(configuration));

    const projectConfiguration = new AngularProject(tree);
    const detector = new CliPackageManagerDetector();
    const command = detector.detect(
      projectConfiguration,
      {} as GlobalCliConfig
    );

    expect(command).toBe('pnpm');
  });
});

export interface GlobalCliConfig {
  packageManger: string | undefined;
}

export class CliPackageManagerDetector {
  constructor(
    private _defaultPackageManager = 'npm',
    private _knownPackageManagers = ['npm', 'pnpm', 'yarn']
  ) {}

  detect(
    cliProjectConfiguration: AngularCliProject,
    globalConfiguration: GlobalCliConfig
  ): string {
    const found = this._knownPackageManagers.find(
      manager => manager === cliProjectConfiguration.packageManager
    );

    return !!found ? found : this._defaultPackageManager;
  }
}
