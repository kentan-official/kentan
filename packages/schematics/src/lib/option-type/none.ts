import { OptionType } from './option-type';
import { Reason } from './reason';

export class None<T> implements OptionType<T> {
  constructor(private readonly reason: Reason) {}

  match<S>(_some: (value: T) => S, none: (reason: Reason) => S): S {
    return none(this.reason);
  }
}
