import { OptionType } from '@lib/option-type/option-type';
import { Reason } from '@lib/option-type/reason';

export class None<T> implements OptionType<T> {
  constructor(private readonly reason: Reason) {}

  match<S>(_some: (value: T) => S, none: (reason: Reason) => S): S {
    return none(this.reason);
  }
}
