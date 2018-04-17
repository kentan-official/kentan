/**
 * A plan simplifies the way creating test data.
 * Plans can be used by @see G which is a factory creating plans.
 */
export interface OverwritablePlan<T> {
  /**
   * Allow to override the default values of the model
   */
  model(overrides?: { [key in keyof T]?: T[key] }): T
}
