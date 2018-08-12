import { KentanError } from '../errors/kentan.error';
import { ILoadNodePackages } from '../contracts/i-load-node-packages';
import { Npm } from './npm';
import { Pnpm } from './pnpm';
import { Yarn } from './yarn';

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
