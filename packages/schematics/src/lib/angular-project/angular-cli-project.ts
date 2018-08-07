export interface AngularCliProject {
  version: string;
  getAppDirectoryPath(index?: number | string): string;
}
