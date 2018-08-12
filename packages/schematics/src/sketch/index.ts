import { strings } from '@angular-devkit/core';
import { createConsoleLogger } from '@angular-devkit/core/node';
import {
  apply,
  branchAndMerge,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { EOL } from 'os';

import {
  AngularProject,
  Match,
  ModelFinder,
  ModelInterpreter,
  SketchCreator,
  Warning
} from '../lib';
import { SketchMetaData } from '../lib/contracts';
import { dir, isClass, modelImportPath, name } from './pipes';
import { SketchParameters } from './schema';

const log = createConsoleLogger();

const pipes = {
  ...strings,
  dir,
  name,
  isClass,
  modelImportPath
};

export function create(parameters: SketchParameters): Rule {
  return (tree: Tree, context: SchematicContext) =>
    createSketch(parameters, tree, context);
}

function createSketch(
  param: SketchParameters,
  tree: Tree,
  context: SchematicContext
) {
  const root = new AngularProject(tree).getAppDirectoryPath(param.app);
  const factory = new SketchCreator(
    root,
    new ModelFinder(),
    new ModelInterpreter()
  );

  const sketch = factory.create(param.name, param.dir);

  logIfImportIsGeneratedAutomatically(sketch.modelImportPath, sketch.name);

  const templates = apply(url('./templates'), [
    template({
      ...pipes,
      ...{ sketch: JSON.stringify(sketch) }
    })
  ]);

  updateBarrelIfItExists(tree, sketch);

  return branchAndMerge(mergeWith(templates))(tree, context);
}

function logIfImportIsGeneratedAutomatically(
  modelImportPath: string | null,
  model: string
) {
  if (modelImportPath) {
    log.info(Match(`Auto generate import for found model "${model}"`));
  } else {
    log.info(
      Warning(`Model not found. Could not generate import for "${model}"`)
    );
  }
}

function updateBarrelIfItExists(tree: Tree, sketch: SketchMetaData) {
  const sketchBarrelPath = `${sketch.dir}/index.ts`;
  if (tree.exists(sketchBarrelPath)) {
    const existingExports = tree.read(sketchBarrelPath)!.toString();
    const newExport = `export * from './${sketch.name}.sketch';${EOL}`;
    const updatedBarrel = existingExports + newExport;
    tree.overwrite(sketchBarrelPath, updatedBarrel);
  }
}
