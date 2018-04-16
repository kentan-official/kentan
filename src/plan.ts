import { OverwritablePlan } from './overwritable-plan'

export class Plan<T> implements OverwritablePlan<T> {
  constructor(private defaultModel?: T) {}

  model(overrides?: { [key in keyof T]?: T[key] }): T {
    return Object.assign({}, this.defaultModel, overrides)
  }
}
