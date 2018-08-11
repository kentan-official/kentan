import { OptionType } from '@lib/option-type/option-type';
import { Reason } from '@lib/option-type/reason';

export class Some<T> implements OptionType<T> {
  constructor(private readonly value: T) {}

  match<S>(some: (value: T) => S, _none: (reason: Reason) => S): S {
    return some(this.value);
  }
}
