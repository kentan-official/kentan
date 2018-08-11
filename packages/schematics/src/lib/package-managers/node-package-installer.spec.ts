import { NodePackageInstaller } from '@lib/package-managers/node-package-installer';
import { Npm } from '@lib/package-managers/npm';
import { Pnpm } from '@lib/package-managers/pnpm';
import { Yarn } from '@lib/package-managers/yarn';

describe('When npm is configured', () => {
  it('should yield npm', () => {
    const configuredPackageManager = 'npm';
    const nodePackageManager = new NodePackageInstaller();
    const packageManager = nodePackageManager.resolve(configuredPackageManager);

    expect(packageManager).toBeInstanceOf(Npm);
  });
});

describe('When npm is configured', () => {
  it('should yield yarn', () => {
    const configuredPackageManager = 'yarn';
    const nodePackageManager = new NodePackageInstaller();
    const packageManager = nodePackageManager.resolve(configuredPackageManager);

    expect(packageManager).toBeInstanceOf(Yarn);
  });
});

describe('When pnpm is configured', () => {
  it('should yield pnpm', () => {
    const configuredPackageManager = 'pnpm';
    const nodePackageManager = new NodePackageInstaller();
    const packageManager = nodePackageManager.resolve(configuredPackageManager);

    expect(packageManager).toBeInstanceOf(Pnpm);
  });
});

describe('When an unknown package manager is configured', () => {
  it('should throw an error', () => {
    const configuredPackageManager = 'unknownPackageManager';
    const nodePackageManager = new NodePackageInstaller();

    expect(() =>
      nodePackageManager.resolve(configuredPackageManager)
    ).toThrowError(
      `kentan-schematics: Sorry '${configuredPackageManager}' is not supported.`
    );
  });
});
