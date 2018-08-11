import { KentanError } from '@lib/errors/kentan.error';
import { ILoadNodePackages } from '@lib/contracts/i-load-node-packages';
import { Npm } from '@lib/package-managers/npm';
import { Pnpm } from '@lib/package-managers/pnpm';
import { Yarn } from '@lib/package-managers/yarn';

export class NodePackageInstaller {
  resolve(packageManagerName: string): ILoadNodePackages {
    switch (packageManagerName) {
      case 'npm':
        return new Npm();
      case 'pnpm':
        return new Pnpm();
      case 'yarn':
        return new Yarn();
      default:
        throw new KentanError(
          `Sorry '${packageManagerName}' is not supported.`
        );
    }
  }
}
