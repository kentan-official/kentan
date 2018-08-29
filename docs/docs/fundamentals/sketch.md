# Sketch

?> This article is a reference for the `Sketch`.
If you want to get started with Kentan please have a look at the [Quick Start](getting-started/quick-start.md)

## Create a Sketch

There three different ways to create a Sketch in Kentan:

- from an Interface
- from a Class having now constructor parameters
- from an existing class instance

### Interface

#### Creation

If you want to create a Sketch based on an interface you create a new class
that extends Kentan's class called Sketch.

> For a better reading experience both the Interface and the Sketch are shown
in one code snippet.

```ts
import { Sketch } from '@kentan-official/core';

export interface Product {
  id: number
}

export class ForProduct extends Sketch<Product> {}
```

You now have the basic setup.
Next, we need to provide the default data for the Sketch.
Therefore we add a constructor to the Sketch class.

```ts
export class ForProduct extends Sketch<Product> {
  constructor() {
    super({ id: 1 })
  }
}
```

The `super`-call is used to provide the default data.

#### Usage

Now we can use Kentan's factory to create the Sketch.

```ts
Kentan.sketch(ForProduct).model().id // id = 1
```

### Class

Kentan also can set up class instances for you.
In comparison to the [Interface] the `super`-call takes 2 arguments.

```ts
import { Sketch } from '@kentan-official/core';

export class ShoppingBasket {
  products: Product[]
}

export class ForShoppingBasket extends Sketch<ShoppingBasket> {
  constructor(Product, { products: [] })
}
```

The _first_ argument is the class token.
Kentan makes use of it to call the constructor.
Optionally you can provide some default values using the _second_ argument.

> Since Kentan creates a real class instance you are able to make methods calls
in your tests.

!> This approach only works if the given model has a constructor **without any
parameters**.
If you need to work with parameterized constructors please refer to the next
section.

### Existing Class Instance

Maybe you already use model classes that need one or more parameters to get
instantiated.
Kentan is **not** able to resolve these dependencies automatically.
In order to create a Sketch, you are kindly invited to do the instantiation on your own. :angel:

```ts
export class Order {
  constructor(public products: Product[]) {}
}

export class ForOrder extends Sketch<Order> {
  private static readonly instance = new Order([]);
  
  constructor() {
    super(ForOrder.instance);
  }
}
```

> If the model class is more complex, please remember that you can use already
> existing Sketches to set everything up.

## Handle Sketch Data

The Sketch provides some helpers allowing you to control your generated test data.

- [`model`](fundamentals/sketch?id=model-optionaloverrideslttgt) to read and configure all model properties.
- [`set`](fundamentals/sketch?id=setmapfn) to override a certain value of a model no matter how deeply it is nested
in the object structure
- [`get`](fundamentals/sketch?id=getprojectorfn) to query a certain value from the model.

### `model({}: optionalOverrides<T>)`

Calling `model()` will yield the generated data or instance of your data model.

```ts
const product = Kentan.sketch(ForProduct).model(); // instance of class Product
```

If you need to adjust the test data for a certain test you also can pass
overrides.
It is up to you if you want to override all properties or just a subset.

```ts
const product = Kentan.sketch(ForProduct).model({ priceInDollars: 999 });
```

### `set(mapFn)`

The function `set` becomes pretty handy if you deal with large and deep nested
object trees.
For certain tests, you only need to adjust a certain piece of an object tree.
Instead of calling `model` over and over again you can pass a mapping function
to set the desired values.
The following example shows you how `set` works.

```ts
/*
 * The following class is the base of the Sketch used in this example
 * 
 * class Structure {
 *   some: { thing: { nested: { inside: string } } };
 * }
 */

const sketch = Kentan.sketch(ForStructure);

const structure = sketch
  .set(m => (m.some.thing.nested.inside = 'some value'))
  .model();
```

### `get(projectorFn)`

The counterpart to [`set`](fundamentals/sketch?id=setmapfn) is the `get`
function.
Sometimes you want to read a property of the generated data for doing
assertions in your tests.
You achieve this by passing a projection function.
The next example shows you how this works.

```ts
/*
 * The following class is the base of the Sketch used in this example
 * 
 * class Structure {
 *   some: { thing: { nested: { inside: string } } };
 * }
 */

const sketch = Kentan.sketch(ForStructure);

const prop = sketch.get(m => m.some.thing.nested.inside));
```