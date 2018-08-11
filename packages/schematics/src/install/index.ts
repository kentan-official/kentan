import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AngularProject } from '@lib/index';
import { GlobalCliConfiguration } from '@lib/angular-project/global-cli-configuration';
import { CliPackageManagerDetector } from '@lib/package-managers/cli-package-manager-detector';
import { NodePackageInstaller } from '@lib/package-managers/node-package-installer';

export function ngAdd() {
  return (tree: Tree, context: SchematicContext) => {
    const project = new AngularProject(tree);
    const globalConfiguration = new GlobalCliConfiguration();
    const detector = new CliPackageManagerDetector();

    const packageManagerName = detector.detect(project, globalConfiguration);
    const packageManager = new NodePackageInstaller().resolve(
      packageManagerName
    );

    return packageManager
      .installDev(['@kentan-official/core', '@kentan-official/schematics'])
      .pipe(
        tap(message => context.logger.info(message)),
        catchError(message => {
          context.logger.fatal(message);
          return of(tree);
        })
      );
  };
}
