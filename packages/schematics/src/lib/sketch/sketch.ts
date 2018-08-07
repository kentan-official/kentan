import { parse, relative } from 'path';
import { SketchMetaData } from '../contracts';
import { ModelFinder } from '../model-finder/model-finder';
import { ModelInterpreter } from '../model-interpreter/model-interpreter';

export class SketchCreator {
  private _sketch: SketchMetaData = {
    name: '',
    dir: '',
    modelImportPath: '',
    model: {
      name: '',
      isClass: false
    }
  };
  constructor(
    private readonly _root: string,
    private readonly _finder: ModelFinder,
    private readonly _interpreter: ModelInterpreter
  ) {}

  create(name: string, dir: string): SketchMetaData {
    this._sketch.name = name;
    this._sketch.dir = `${this._root}/${dir}`;

    this._finder.find(this._root, name).match(
      model => {
        this._sketch.modelImportPath = this._resolveImportPath(
          this._sketch.dir,
          model.path
        );
        this._sketch.model = this._interpreter.process(model.content);
      },
      _reason => {}
    );

    return this._sketch;
  }

  private _resolveImportPath(from: string, to: string): string {
    return this._toPosix(this._withoutExt(relative(from, to)));
  }

  private _toPosix(path: string) {
    return path.replace(/\\/g, '/');
  }

  private _withoutExt(path: string) {
    const extRemovalPattern = new RegExp(`${parse(path).ext}$`);
    return path.replace(extRemovalPattern, '');
  }
}
