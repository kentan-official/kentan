import { NodePackageInstallerBase } from './node-package-installer-base';

/**
 * HELP WANTED
 * ===========
 *
 * These tests are needed to check if the right
 * result messages are printed whether installing
 * a package was successful or not.
 *
 * I need to do it in this way since I have no idea
 * how to mock child_process.spawn().on('close', ...)
 * in combination with an Observable API.
 * If you have any idea how to transform this into an
 * unit test, please file an issue:
 * https://github.com/kentan-official/kentan/issues
 *
 * For now a tiny npm package is loaded called 'is-positive'
 * to test the happy path.
 *
 * An invalid package name is passed to check the error case.
 */

describe('[Integration Test] Handle package install result', () => {
  beforeAll(() => jest.setTimeout(20000));
  afterAll(() => jest.setTimeout(5000));

  describe('When installation was successful', () => {
    it('should yield a success message', done => {
      const npm = new NodePackageInstallerBase('npm', 'install');
      npm
        .installDev(['--quiet', '--dry-run', 'is-positive'])
        .subscribe(message => {
          expect(message).toBe('Installation completed!');
          done();
        });
    });
  });

  describe('When an error occurs due installation', () => {
    it('should yield an error message', done => {
      const npm = new NodePackageInstallerBase('npm', 'install');
      npm.installDev(['--quiet', '--dry-run', '!mlsdkf3sfjosd']).subscribe(
        _ => {},
        message => {
          expect(message).toBe('Error installing @kentan-official. See above.');
          done();
        }
      );
    });
  });
});
