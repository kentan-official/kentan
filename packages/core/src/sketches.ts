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
    return this._sketches.map((sketch, index) =>
      sketch.model(this._resolve(generators, index))
    );
  }

  private _resolve(generators: PartialFactory<T>, index: number): Partial<T> {
    return Object.keys(generators)
      .map(key => ({
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
