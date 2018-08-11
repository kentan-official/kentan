import { Tree } from '@angular-devkit/schematics';
import { CliFactory, ProjectType } from '../contracts';
import { KentanError } from '../errors/kentan.error';
import { AngularCliOneMinor } from './angular-cli-one-minor';
import { AngularCliProject } from '../contracts/angular-cli-project';
import { AngularCliSix } from './angular-cli-six';
import { CliCreator, jsonOf } from './helpers';

export class AngularProject implements AngularCliProject {
  private readonly _cli: AngularCliProject;

  private readonly _projectTypes: ProjectType[] = [
    {
      cli: AngularCliOneMinor,
      supportedProjectsFiles: ['.angular-cli.json', 'angular-cli.json']
    },
    {
      cli: AngularCliSix,
      supportedProjectsFiles: ['.angular.json', 'angular.json']
    }
  ];

  get version() {
    return this._cli.version;
  }

  get packageManager() {
    return this._cli.packageManager;
  }
  
  constructor(tree: Tree) {
    this._throwIfNoTreeGiven(tree);
    this._cli = this._chooseCli(tree);
    this._throwIfNoCliFound();
  }

  getAppDirectoryPath(index?: string | number): string {
    return this._cli.getAppDirectoryPath(index);
  }

  private _chooseCli(tree: Tree): AngularCliProject {
    return this._projectTypes
      .reduce(this._flattenAvailableProjectTypes, [])
      .filter(factory => tree.exists(factory.projectFilePath))
      .map(_ => new _.cli(jsonOf(tree.read(_.projectFilePath))))
      .find(cliProject => cliProject);
  }

  private _flattenAvailableProjectTypes(
    cliFactories: CliFactory[],
    type: ProjectType
  ): CliFactory[] {
    return [
      ...cliFactories,
      ...type.supportedProjectsFiles.map(file => new CliCreator(type.cli, file))
    ];
  }

  private _throwIfNoTreeGiven(tree: Tree) {
    if (!tree) {
      throw new KentanError('Tree is null or undefined.');
    }
  }

  private _throwIfNoCliFound() {
    if (!this._cli) {
      const files = this._projectTypes.reduce(
        (files: string[], projectType) => [
          ...files,
          ...projectType.supportedProjectsFiles
        ],
        []
      );
      throw new KentanError(
        `Could not find project configuration. Looked for: ${files.join(', /')}`
      );
    }
  }
}
