import * as child_process from 'child_process';

import { NodePackageInstallerBase } from '@lib/package-managers/node-package-installer-base';

export class Yarn extends NodePackageInstallerBase {
  constructor(process = child_process) {
    super('yarn', 'add', process);
  }
}