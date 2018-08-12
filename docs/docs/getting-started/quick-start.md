# Quick Start

Kentan comes in to play if you have complex nested data structures in your TypeScript Project. This library saves you a lot of code lines and even more important time.

## Get the Playground

For starting quickly please clone the quick-start repository, install the dependencies, and run the unit tests.

```bash
git clone https://github.com/kentan/quick-start.git
cd quick-start
npm install
npm test
```

You will find two directories named :file_folder: `models` and :file_folder: `test`.

- INSERT IMAGES HERE

You will see that :page_facing_up: `test/order.spec.ts` contains a test that manually sets up test data.

> This sample shall give you the idea which problems occur if you need to setup test data in large web projects.

Now we will use _Kentan_ to refactor the test setup.

## Install Kentan

You may have noticed that we deal with three models that relates to each other
A `ShoppingBasket` has multiple Positions. A `Position` has multiple `Product`s.

![Quick-Start-Models](./assets/quick-start-models.png)

To provide reusable test data builder for all future tests we now introduce _Kentan_.
Please install the library via `npm`.

```bash
npm install --save-dev kentan
```

After the installation has finished we create a folder named :file_folder: `sketches`. In there we will create a [Sketch]() for each model that we nee to test.

## Create your first Sketch

A `Sketch` gives us an instance of a certain model. Since we test different use cases we want to configure the model in the way we need it. `Sketches` provide an easy API to achieve this and more!

We start to refactor the already existing tests by creating a `Sketch` for the class `Product`.

```ts
// sketches/product.sketch.ts

import { Sketch } from '@kentan-official/core';
import { Product } from '../models';

export class ForProduct extends Sketch<Product> {
  super({
    id: '1-2-3',
    name: 'My Product'
  });
}
```

Congratulations :clap::clap:, now you can use the `Sketch` to tidy up the test in :file_folder: `test/product.spec.ts`.

```diff
// test/product.spec.ts

+ import { Kentan } from '@kentan-official/core';

/* ... */

+ const product = Kentan.sketch(ForProduct).model();
- const product = {
-   id: '1-2-3',
-   name: 'My Product'
- }
```

## Compose Sketches

Now we want to dive a little bit deeper into _Kentan_.
To be able to build more complex data structures we compose mutiple Sketches with each other.

## Create a Sketch-Collection

