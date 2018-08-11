import { None } from '@lib/option-type/none';
import { OptionType } from '@lib/option-type/option-type';
import { Some } from '@lib/option-type/some';

class Developer {
  isHappy(isHappy: boolean): OptionType<string> {
    if (isHappy) {
      return new Some('You rock! Never quit!');
    }

    return new None({ explanation: 'Coffee machine is broken :(' });
  }
}

describe('Option Types', () => {
  let developer: Developer;

  beforeEach(() => {
    developer = new Developer();
  });

  describe('When a value is given', () => {
    it('should run some', () => {
      developer
        .isHappy(true)
        .match(
          isHappy => expect(isHappy).toBe('You rock! Never quit!'),
          _never => {}
        );
    });
  });

  describe('When a value is given', () => {
    it('should run none', () => {
      const expected = 'Coffee machine is broken :(';

      developer
        .isHappy(false)
        .match(
          _never => {},
          reason => expect(reason.explanation).toBe(expected)
        );
    });
  });
});





