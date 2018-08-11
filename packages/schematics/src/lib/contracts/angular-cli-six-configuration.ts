export interface AngularCliSixConfiguration {
  cli?: {
    packageManager?: string;
  };
  projects: {
    [key: string]: {
      root: string;
    };
  };
}