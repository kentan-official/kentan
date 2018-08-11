import { Observable } from 'rxjs';

export interface ILoadNodePackages {
  installDev(packageNames: string[]): Observable<string>;
}
