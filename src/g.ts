import { OverwritablePlan } from './overwritable-plan'

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
  static plan<Model, Plan extends OverwritablePlan<Model>>(plan: new () => Plan): Plan {
    return new plan()
  }
}
