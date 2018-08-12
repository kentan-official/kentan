import * as child_process from 'child_process';
import { Observable, Observer } from 'rxjs';

import { ILoadNodePackages } from '../contracts';

export class NodePackageInstallerBase implements ILoadNodePackages {
  private _processSpawnOptions = {
    stdio: 'inherit',
    shell: true
  };

  constructor(
    private _name: string,
    private _installCommand: string,
    private _process = child_process
  ) {}

  installDev(packageNames: string[]): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      this._process
        .spawn(
          this._name,
          [this._installCommand, '--save-dev', packageNames.join(' ')],
          this._processSpawnOptions
        )
        .on(
          'close',
          code =>
            code === 0
              ? observer.next('Installation completed!')
              : observer.error('Error installing @kentan-official. See above.')
        );
    });
  }
}

export default NodePackageInstallerBase;