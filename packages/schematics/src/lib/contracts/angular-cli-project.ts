export interface AngularCliProject {
  version: string;
  getPackageManager(): string|undefined;
  getAppDirectoryPath(index?: number | string): string;
}
