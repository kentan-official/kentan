import { VirtualTree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';

import { fsCliConfigurationMock } from '@lib/test';
import { AngularProject } from '@lib/angular-project/angular-project';
import { GlobalCliConfiguration } from '@lib/angular-project/global-cli-configuration';
import { AngularCliProject } from '@lib/contracts/angular-cli-project';
import { CliPackageManagerDetector } from '@lib/package-managers/cli-package-manager-detector';

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

  describe('When no package manager is configured neither globally nor locally', () => {
    it('should default to npm', () => {
      const configuration = {
        projects: { app: { root: ' ' } }
      };
      const tree = new UnitTestTree(new VirtualTree());
      tree.create('angular.json', JSON.stringify(configuration));

      const app = new AngularProject(tree);
      const globalConfig = new GlobalCliConfiguration(
        fsCliConfigurationMock() as any
      );

      const detector = new CliPackageManagerDetector();
      const command = detector.detect(app, globalConfig);

      expect(command).toBe('npm');
    });
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
