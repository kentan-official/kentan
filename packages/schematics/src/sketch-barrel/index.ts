import { Rule, Tree } from '@angular-devkit/schematics';

import { AngularProject } from '../lib';

export interface BarrelParameters {
  app: string | number;
  dir: string;
}

export function create(parameters: BarrelParameters): Rule {
  return (tree: Tree) => createBarrel(parameters, tree);
}

function createBarrel(parameters: BarrelParameters, tree: Tree) {
  const project = new AngularProject(tree);

  tree.create(
    `${project.getAppDirectoryPath(parameters.app)}/${parameters.dir}/index.ts`,
    ''
  );
  
  return tree;
}
