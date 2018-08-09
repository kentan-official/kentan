import { AngularCliProject } from '../contracts/angular-cli-project';
import { GlobalCliConfiguration } from '../angular-project/global-cli-configuration.spec';
export class CliPackageManagerDetector {
  constructor(private _packageManagers = ['npm', 'pnpm', 'yarn']) { }
  detect(app: AngularCliProject, globalConfiguration: GlobalCliConfiguration): string {
    const found = this._packageManagers.find(m => m === app.packageManager);
    return !!found ? found : globalConfiguration.readPackageManager();
  }
}