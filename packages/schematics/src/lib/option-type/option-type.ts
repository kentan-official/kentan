import { Reason } from './reason';

export interface OptionType<T> {
  match<S>(some: (value: T) => S, none: (reason: Reason) => S): S;
}
