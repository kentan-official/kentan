import { AngularCliOneMinor } from './angular-cli-one-minor';

describe('Angular CLI Version 1.x', () => {
  describe('When no apps are defined', () => {
    it('should throw an error', () => {
      const config = { apps: [] };
      expect(() => new AngularCliOneMinor(config)).toThrowError(
        `kentan-schematics: Sorry, it seems that no apps are defined in .angular-cli.json.`
      );
    });
  });

  describe('When a single project is defined', () => {
    it('should yield the path of the project root', () => {
      const config = { apps: [{ root: 'src' }] };
      const project = new AngularCliOneMinor(config);

      expect(project.getAppDirectoryPath()).toBe('src/app');
    });
  });

  describe('When multiple projects are defined', () => {
    describe('no app parameter given', () => {
      it('should yiled the path of the first project root', () => {
        const config = { apps: [{ root: 'src' }, { root: 'src-2' }] };
        const project = new AngularCliOneMinor(config);

        expect(project.getAppDirectoryPath()).toBe('src/app');
      });
    });

    describe('app 0 given', () => {
      it('should yiled the path of the first project root', () => {
        const config = { apps: [{ root: 'src' }, { root: 'src-2' }] };
        const project = new AngularCliOneMinor(config);

        expect(project.getAppDirectoryPath()).toBe('src/app');
      });
    });

    describe('app 1 given', () => {
      it('should yield the path of the second project root', () => {
        const config = { apps: [{ root: 'src' }, { root: 'src-2' }] };
        const project = new AngularCliOneMinor(config);

        expect(project.getAppDirectoryPath(1)).toBe('src-2/app');
      });
    });

    describe('app "my-app" given', () => {
      it('should yield an error since project names are not supported in that CLI version', () => {
        const name = 'my-app';
        const config = { apps: [{ root: 'src' }] };
        const project = new AngularCliOneMinor(config);

        expect(() => project.getAppDirectoryPath(name as any)).toThrowError(
          `kentan-schematics: Project "${name}" could not be found. Angular CLI ^1.3.x does not support project names`
        );
      });
    });

    describe('index "0" is given as string', () => {
      it('should yield the first configured app', () => {
        const index = '0';
        const config = { apps: [{ root: 'src' }] };
        const project = new AngularCliOneMinor(config);

        expect(project.getAppDirectoryPath(index as any)).toBe('src/app');
      });
    });

    describe('app with unknown index', () => {
      it('should yield an error that the app could not be found', () => {
        const index = 1;
        const config = { apps: [{ root: 'src' }] };
        const project = new AngularCliOneMinor(config);

        expect(() => project.getAppDirectoryPath(index)).toThrowError(
          `kentan-schematics: Project with Index "${index}" could not be found.`
        );
      });
    });
  });

  describe('When a package manager is configured', () => {
    it('should yield the present package manager', () => {
      const packageManager = 'yarn';
      const config = { packageManager, apps: [{ root: 'src'}] };
      const project = new AngularCliOneMinor(config);

      expect(project.packageManager).toBe(packageManager);
    });
  });

  describe('When a package manager is not configured', () => {
    it('should yield the present package manager', () => {
      const config = { apps: [{ root: 'src'}] };
      const project = new AngularCliOneMinor(config);

      expect(project.packageManager).toBeUndefined();
    });
  });
});
