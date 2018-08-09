import { AngularCliProject } from '../contracts/angular-cli-project';

export interface AngularCliSixConfiguration {
  cli?: { packageManager?: string };
  projects: { [key: string]: { root: string } };
}

export class AngularCliSix implements AngularCliProject {
  readonly version = '^6.x';

  get packageManager() {
    const cli = this._config.cli || {};
    return cli.packageManager;
  }

  constructor(private readonly _config: AngularCliSixConfiguration) {
    this._throwIfNoProjectsDefined(this._config);
  }

  getAppDirectoryPath(index: number | string = 0): string {
    const identifier = this._parse(index);

    return typeof identifier === 'number'
      ? this._getByIndex(identifier)
      : this._getByProjectName(identifier);
  }

  private _throwIfNoProjectsDefined(config: AngularCliSixConfiguration) {
    if (!config.projects || Object.keys(config.projects).length < 1) {
      throw new Error(
        'kentan-schematics: Sorry, it seems that no projects are defined in angular.json.'
      );
    }
  }

  private _parse(index: number | string): string | number {
    if (isNaN(parseInt(index.toString()))) {
      return index;
    }

    return parseInt(index.toString());
  }

  private _getByIndex(index: number): string {
    const projectNames = Object.keys(this._config.projects);
    const root = this._config.projects[projectNames[index]].root;

    return `${root ? root : 'src'}/app`;
  }

  private _getByProjectName(name: string): string {
    const found = Object.keys(this._config.projects).find(key => key === name);

    if (!found) {
      throw new Error(
        `kentan-schematics: Project with Index "${name}" could not be found.`
      );
    }

    const root = this._config.projects[found].root;

    return `${root ? root : 'src'}/app`;
  }
}
