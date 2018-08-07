import { AngularCliProject } from './angular-cli-project';
import { KentanError } from '../errors/kentan.error';

export interface AngularCliMinorOneConfiguration {
  apps: { root: string }[];
}

export class AngularCliOneMinor implements AngularCliProject {
  readonly version = '^1.3.x';

  constructor(private readonly _config: AngularCliMinorOneConfiguration) {
    this._throwIfNoAppsDefined(this._config);
  }

  getAppDirectoryPath(index = 0): string {
    this._throwIfProjectNameIsPassed(index);
    this._throwIfIndexDoesNotMatchProject(index);

    return `${this._config.apps[index].root}/app`;
  }

  private _throwIfNoAppsDefined(config: AngularCliMinorOneConfiguration) {
    if (!config.apps) {
      throw new KentanError(
        'Sorry, it seems that no apps are defined in .angular-cli.json.'
      );
    }
  }

  private _throwIfProjectNameIsPassed(index: number) {
    if (isNaN(parseInt(index.toString()))) {
      throw new KentanError(
        `Project "${index}" could not be found. Angular CLI ^1.3.x does not support project names`
      );
    }
  }

  private _throwIfIndexDoesNotMatchProject(index: number) {
    if (!this._config.apps[index]) {
      throw new KentanError(
        `Project with Index "${index}" could not be found.`
      );
    }
  }
}