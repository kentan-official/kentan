export declare type OverwriteFn<T> = (model: T) => void;

/**
 * A plan simplifies the way creating test data.
 * Plans can be used by @see G which is a factory creating plans.
 */
export interface OverwritableSketch<T> {
  /**
   * Allow to override the default values of the model
   */
  model(overrides?: { [key in keyof T]?: T[key] }): T;

  set(map: OverwriteFn<T>): OverwritableSketch<T>;

  get<U>(selector: (model: T) => U): U;
}
