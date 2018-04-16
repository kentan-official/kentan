import { OverwritablePlan } from './overwritable-plan';

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
export class Plan<T> implements OverwritablePlan<T> {
  private _create: () => T;

  constructor(private _token: Constructable<T> | T, private _defaults?: T) {
    if (typeof _token === 'object') {
      this._create = this.createFromInstance(_token as T, _defaults);
    } else {
      this._create = this.constructInstance(_token as Constructable<T>, _defaults);
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
    return Object.assign(this._create(), this._defaults, overrides);
  }

  private createFromInstance(model: T, _defaults?: T): () => T {
    return () => Object.assign(model, _defaults);
  }

  private constructInstance(Model: Constructable<T>, _defaults?: T): () => T {
    return () => Object.assign(new Model(), _defaults);
  }
}
