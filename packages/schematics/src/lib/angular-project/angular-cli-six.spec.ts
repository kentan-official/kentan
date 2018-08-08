import { AngularCliSix } from './angular-cli-six';

describe('Angular CLI Version 6.x', () => {
  describe('When a single project is defined', () => {
    it("should yield the path to the project's app directory", () => {
      const config = { projects: { projectA: { root: '' } } };
      const project = new AngularCliSix(config);

      expect(project.getAppDirectoryPath()).toBe('src/app');
    });
  });

  describe('When a no project root is defined', () => {
    it('should prepend src in front of the app directory', () => {
      const config = { projects: { projectA: { root: '' } } };
      const project = new AngularCliSix(config);

      expect(project.getAppDirectoryPath()).toBe('src/app');
    });
  });

  describe('When the project root is defined', () => {
    it('should combine project root and app directory', () => {
      const config = { projects: { projectA: { root: 'my-root' } } };
      const project = new AngularCliSix(config);

      expect(project.getAppDirectoryPath()).toBe('my-root/app');
    });
  });

  describe('Get path by project name', () => {
    describe('project name "my-app" given', () => {
      it('should yield the path of the desired project root', () => {
        const config = { projects: { projectA: { root: '' } } };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath('projectA')).toBe('src/app');
      });
    });

    describe('project name "not-existing-app" given', () => {
      it('should raise an error that the app could not be found', () => {
        const config = { projects: { projectA: { root: '' } } };
        const project = new AngularCliSix(config);

        expect(() => project.getAppDirectoryPath('not-existing-app')).toThrow(
          'kentan-schematics: Project with Index "not-existing-app" could not be found.'
        );
      });
    });

    describe('When a no project root is defined', () => {
      it('should prepend src in front of the app directory', () => {
        const config = { projects: { projectA: { root: '' } } };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath('projectA')).toBe('src/app');
      });
    });

    describe('When the project root is defined', () => {
      it('should combine project root and app directory', () => {
        const config = { projects: { projectA: { root: 'my-root' } } };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath('projectA')).toBe('my-root/app');
      });
    });
  });

  describe('When multiple projects are defined', () => {
    describe('index 0 given', () => {
      it('should yield the path of the first project root', () => {
        const config = { projects: { projectA: { root: '' } } };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath(0)).toBe('src/app');
      });
    });

    describe('index "0" given as string', () => {
      it('should yield the path of the first project root', () => {
        const config = { projects: { projectA: { root: '' } } };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath("0")).toBe('src/app');
      });
    });

    describe('index 1 given', () => {
      it('should yield the path of the second project root', () => {
        const config = {
          projects: { projectA: { root: '' }, projectB: { root: '' } }
        };
        const project = new AngularCliSix(config);

        expect(project.getAppDirectoryPath(1)).toBe('src/app');
      });
    });
  });

  describe('When a packageManager is configured', () => {
    it('should yield the present packageManager', () => {
      const packageManager = 'yarn';
      const config = { cli: { packageManager }, projects: {} };
      const project = new AngularCliSix(config);

      expect(project.packageManager).toBe(packageManager);
    });
  });

  describe('When a packageManager is not configured', () => {
    it('should yield the present packageManager', () => {
      const config = { projects: {} };
      const project = new AngularCliSix(config);

      expect(project.packageManager).toBeUndefined();
    });
  });
});
