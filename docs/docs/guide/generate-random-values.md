# Generate Random Values

If you like to generate values of your test data randomly, you can achieve this
by using [Chance](https://chancejs.com/).
Chance is a minimalist generator for nearly everything
(e.g.: mail, phone, address, name, sentence, and many more).

## Installation

In order to use Chance you need to load the Chance package and the corresponding
typings from npm.

```bash
npm install --save-dev chance @types/chance
```

## Usage

You can create an instance of `Chance` inside your Sketch file.
After this you are free to use any function of Chance you like.

> Please refer to the documentation of Chance at https://chancejs.com/.
> Every generator and it's API is described there.

```diff
# product.sketch.ts

import { Sketch } from '@kentan-official/core';
import { Product } from '../../src/product';

+ import { Chance } from 'chance';
+ const chance = new Chance();

export class ForProduct extends Sketch<Product> {
  constructor() {
    super({
      id: 1,
+     title: chance.name(),
+     description: chance.sentence({ words: 9 }),
+     priceInDollars: chance.natural({ min: 400, max: 1500 })
    });
  }
}
```

It is quiet easy to combine Kentan and Chance together.

?> Using Chance shortens the time you need to think about and generate custom
test data.