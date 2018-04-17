import { OverwritablePlan } from './overwritable-sketch';

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
export class Sketch<T> implements OverwritablePlan<T> {
  private _createModel: () => T;

  constructor(private _token: T | Constructable<T>, defaults?: T) {
    if (typeof _token === 'object') {
      this._createModel = this._createFromInstance(_token, defaults);
    } else {
      this._createModel = this._constructInstance(_token, defaults);
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
}
