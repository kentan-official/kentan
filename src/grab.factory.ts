import { OverwritablePlan } from './overwritable-plan';

/**
 * Takes a Plan (@see Plan) and creates a instance of it.
 * This class is used to provide a more comfortable way creating test data.
 *
 * @example
 * import * Plan from 'testing/plans'
 * const pruductPlan = G.rab(Plan.Product)
 * const product = productPlan.model;
 */
export class Grab {
  /**
   * Provides a plan based on the the given type token.
   * @param plan Type token which is needed to instanciate the plan
   */
  static plan<Model, Plan extends OverwritablePlan<Model>>(plan: new () => Plan): Plan {
    throwIfNullOrUndefined(
      plan,
      'Grab: Please provide a token for a class type extending "Plan<T>"'
    );

    return new plan();
  }
}

/**
 * Checks if the passed value is null or undefined.
 * If true it raises an error.
 *
 * @param {*} value The value which is going to be checked
 * @param {string} errorMessage The error message thrown if the value is null or undefined.
 */
function throwIfNullOrUndefined(value: any, errorMessage: string) {
  if (!value) {
    throw new Error(errorMessage);
  }
}
