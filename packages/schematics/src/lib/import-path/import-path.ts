import { fileSync } from 'find';
import { parse, posix } from 'path';

export class ImportPath {
  constructor(private _root: string) {}

  resolve(from: string | null | undefined, target: string | null | undefined) {
    if (!from || !target) {
      return null;
    }

    const found = this._find(target);

    if (!found) {
      return null;
    }

    return this._withoutExt(posix.relative(from, found));
  }

  private _find(target: string) {
    const findPattern = new RegExp(`${target}.ts$`);
    const found = fileSync(findPattern, this._root).find(
      (file: string) => !!file
    );

    return this._toPosix(found);
  }

  private _withoutExt(path: string) {
    const extRemovalPattern = new RegExp(`${parse(path).ext}$`);
    return path.replace(extRemovalPattern, '');
  }

  private _toPosix(path: string | null | undefined) {
    if (!path) {
      return null;
    }

    return path.replace(/\\/g, '/');
  }
}
