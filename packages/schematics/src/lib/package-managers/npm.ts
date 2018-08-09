import * as child_process from 'child_process';

import { NodePackageInstallerBase } from './node-package-installer-base';

export class Npm extends NodePackageInstallerBase {
  constructor(process = child_process) {
    super('npm', 'install', process);
  }
}
