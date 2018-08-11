import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { AngularProject, GlobalCliConfiguration } from '@lib/angular-project';
import {
  CliPackageManagerDetector,
  NodePackageInstaller
} from '@lib/package-managers';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
