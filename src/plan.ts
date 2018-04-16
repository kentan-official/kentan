import { OverwritablePlan } from './overwritable-plan';

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
  constructor(private defaultModel?: T) {}

  /**
   * Creates a new instance of the model containing test data.
   *
   * @param {{ [key in keyof T]?: T[key] }} [overrides] contains properties of the model that override the default values of the plan.
   * @returns {T}
   * @memberof Plan
   */
  model(overrides?: { [key in keyof T]?: T[key] }): T {
    return Object.assign({}, this.defaultModel, overrides);
  }
}
