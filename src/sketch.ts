import { OverwritableSketch, OverwriteFn } from './overwritable-sketch';
import { Sketches } from './sketches';

export declare type Constructable<T> = new () => T;
export declare type ModelFactory<T> = T;

/**
 * A Plan provides test data for a certain type of model.
 * It allows to override the default test data.
 *
 * @export
 * @class Plan
 * @implements {OverwritablePlan<T>}
 * @template T
 */
export class Sketch<T> implements OverwritableSketch<T> {
  private _createModel: () => T;

  constructor(private _token: T | Constructable<T>, defaults?: T) {
    if (typeof _token === 'object') {
      this._createModel = this._createFromInstance(_token, defaults);
    } else {
      this._createModel = this._constructInstance(_token, defaults);
    }
  }

  take(length: number): Sketches<T> {
    const sketches = Array.from({ length }).map(
      () => new Sketch(this._token, this._createModel())
    );

    return new Sketches(sketches);
  }

  set(map: OverwriteFn<T>): OverwritableSketch<T> {
    const model = this._apply(map, this._createModel());
    return new Sketch(this._token, model);
  }

  get<U>(selector: (model: T) => U): U {
    try {
      return selector(this._createModel());
    } catch (err) {
      throw new Error(`Kentan: ${err.message}`);
    }
  }

  /**
   * Creates a new instance of the model containing test data.
   *
   * @param {{ [key in keyof T]?: T[key] }} [overrides] contains properties of the model that override the default values of the plan.
   * @returns {T}
   * @memberof Plan
   */
  model(overrides?: { [key in keyof T]?: T[key] }): T {
    return Object.assign(this._createModel(), overrides);
  }

  private _createFromInstance(model: T, _defaults?: T): () => T {
    return () => Object.assign(model, _defaults);
  }

  private _constructInstance(Model: Constructable<T>, _defaults?: T): () => T {
    return () => Object.assign(new Model(), _defaults);
  }

  private _apply(map: OverwriteFn<T>, model: T): T {
    try {
      map(model);
      return model;
    } catch (err) {
      throw new Error(`Kentan: ${err.message}`);
    }
  }
}
