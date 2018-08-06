import { OverwritableSketch } from './overwritable-sketch';

export declare type PartialFactory<T> = {
  [key in keyof T]?: (index: number) => T[key]
};

export class Sketches<T> {
  constructor(private _sketches: Array<OverwritableSketch<T>>) {}

  all(): OverwritableSketch<T>[] {
    return this._sketches;
  }

  models(generators: PartialFactory<T> = {}): T[] {
    const overrides = this._resolve(generators);
    return this._sketches.map(sketch => sketch.model(overrides));
  }

  private _resolve(generators: PartialFactory<T>): Partial<T> {
    return Object.keys(generators)
      .map((key, index) => ({
        [key]: (generators as any)[key](index)
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
