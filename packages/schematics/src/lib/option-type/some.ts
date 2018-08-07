import { OptionType } from './option-type';
import { Reason } from './reason';

export class Some<T> implements OptionType<T> {
  constructor(private readonly value: T) {}

  match<S>(some: (value: T) => S, _none: (reason: Reason) => S): S {
    return some(this.value);
  }
}
