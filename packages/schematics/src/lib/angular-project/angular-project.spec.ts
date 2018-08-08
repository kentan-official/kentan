import { Tree, VirtualTree } from '@angular-devkit/schematics';

import { AngularProject } from './angular-project';

describe('Angular Project', () => {
  describe('Loading configuration file', () => {
    let tree: Tree;

    beforeEach(() => {
      tree = new VirtualTree();
    });

    describe('When .angular-cli.json is found', () => {
      it('should interpret CLI version ^1.3.x', () => {
        const config = { apps: [{ root: 'src' }] };
        tree.create('.angular-cli.json', JSON.stringify(config));

        const project = new AngularProject(tree);
        expect(project.version).toBe('^1.3.x');
      });

      it('should raise an error if no apps are configured', () => {
        tree.create('.angular-cli.json', JSON.stringify({}));
        expect(() => new AngularProject(tree)).toThrowError(
          'kentan-schematics: Sorry, it seems that no apps are defined in .angular-cli.json.'
        );
      });

      it('should provide the path to the app directory', () => {
        const config = { apps: [{ root: 'src' }] };
        tree.create('.angular-cli.json', JSON.stringify(config));

        const project = new AngularProject(tree);
        expect(project.getAppDirectoryPath()).toBe('src/app');
      });

      describe('When a packageManager is configured', () => {
        it.only('should yield the present packageManager', () => {
          const config = { packageManager: 'yarn', apps: [] };
          tree.create('.angular-cli.json', JSON.stringify(config));
  
          const project = new AngularProject(tree);
          expect(project.packageManager).toBe('yarn');
        });
      });
    
      describe('When a packageManager is not configured', () => {
        it('should yield the present packageManager', () => {
          const config = { apps: [] };
          tree.create('.angular-cli.json', JSON.stringify(config));
  
          const project = new AngularProject(tree);
          expect(project.packageManager).toBeUndefined();
        });
      });
    });

    describe('When angular.json is found', () => {
      it('should interpret CLI version ^6.x', () => {
        const config = { projects: { projectA: { root: '' } } };
        tree.create('angular.json', JSON.stringify(config));

        const project = new AngularProject(tree);
        expect(project.version).toBe('^6.x');
      });

      it('should raise an error if no apps are configured', () => {
        tree.create('angular.json', JSON.stringify({}));
        expect(() => new AngularProject(tree)).toThrowError(
          'kentan-schematics: Sorry, it seems that no projects are defined in angular.json.'
        );
      });

      it('should raise an error config yields null', () => {
        tree.create('angular.json', null as any);
        expect(() => new AngularProject(tree)).toThrowError(
          'kentan-schematics: Sorry, it seems that no projects are defined in angular.json.'
        );
      });
    });

    describe('When no configuration is found', () => {
      it('should interpret CLI version ^6.x', () => {
        expect(() => new AngularProject(tree)).toThrowError(
          'kentan-schematics: Could not find project configuration. Looked for: .angular-cli.json, /angular-cli.json, /.angular.json, /angular.json'
        );
      });
    });

    describe('When a packageManager is configured', () => {
      it.only('should yield the present packageManager', () => {
        const config = { cli: { packageManager: 'yarn' }, projects: {} };
        tree.create('angular.json', JSON.stringify(config));

        const project = new AngularProject(tree);
        expect(project.packageManager).toBe('yarn');
      });
    });
  
    describe('When a packageManager is not configured', () => {
      it('should yield the present packageManager', () => {
        const config = { projects: {} };
        tree.create('angular.json', JSON.stringify(config));

        const project = new AngularProject(tree);
        expect(project.packageManager).toBeUndefined();
      });
    });
  });

  describe('When no Tree is given', () => {
    it('should raise an error', () => {
      expect(() => new AngularProject(undefined as any)).toThrowError(
        'kentan-schematics: Tree is null or undefined.'
      );
    });
  });
});
