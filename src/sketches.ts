import { OverwritableSketch } from './overwritable-sketch';

export class Sketches<T> {
  constructor(private _sketches: Array<OverwritableSketch<T>>) {}

  all(): OverwritableSketch<T>[] {
    return this._sketches;
  }

  models(generators?: { [key in keyof T]?: () => T[key] }): T[] {
    if (generators) {
      const overrides = this._resolve(generators);

      return this._sketches.map(sketch => sketch.model(overrides));
    }
    return this._sketches.map(sketch => sketch.model());
  }

  private _resolve(
    generators: { [key in keyof T]?: () => T[key] }
  ): { [key in keyof T]?: T[key] } {
    return Object.keys(generators)
      .map(key => ({
        [key]: (generators as any)[key]()
      }))
      .reduce(
        (combinedOverrides, override) => ({
          ...combinedOverrides,
          ...override
        }),
        {}
      ) as any;
  }
}
