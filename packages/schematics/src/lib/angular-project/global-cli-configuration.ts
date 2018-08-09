import * as fs from 'fs';
import { homedir } from 'os';

export class GlobalCliConfiguration {
  constructor(private _fs = fs, private _defaultPackageManager = 'npm') {}
  /**
   * Reads the global configuration file of Angular CLI
   *
   * @param path The file path where the cli configuration file is located
   * @param name The name of the cli configuration file
   * @returns The configured package manager
   */
  readPackageManager(path = homedir(), name = '.angular-config.json') {
    const configuration = this._readConfigurationFile(`${path}/${name}`);
    const cli = configuration.cli || {};
    return cli.packageManager || this._defaultPackageManager;
  }
  private _readConfigurationFile(
    path: string
  ): {
    cli?: {
      packageManager?: string;
    };
  } {
    const configuration = this._fs.readFileSync(path, { encoding: 'UTF-8' });
    return JSON.parse(configuration || '{}');
  }
}
