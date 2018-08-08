export interface AngularCliProject {
  version: string;
  packageManager: string|undefined;
  getAppDirectoryPath(index?: number | string): string;
}
