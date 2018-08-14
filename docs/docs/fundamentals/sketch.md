# Sketch

?> This article is a reference for the `Sketch`.
If you want to get started with Kentan please have a look at the [Quick Start](../getting-started/quick-start.md)

## Create a Sketch

There a three different ways to create a Sketch in Kentan:

- from an Interface
- from a Class having now constructor parameters
- from an existing class instance

### Interface

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
Next we need to provide the default data for the Sketch.
Therefore we add a constructor to the Sketch class.

```ts
export class ForProduct extends Sketch<Product> {
  constructor() {
    super({ id: 1 })
  }
}
```

The `super`-call is used to provide the default data.
Now we can use Kentan's factory to create the Sketch.

```ts
Kentan.sketch(ForProduct).model().id // id = 1
```

### Class

Kentan also can setup class instances for you.
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

Maybe you already use model classes that needs one or more parameters to get
instantiated.
Kentan is **not** able to resolve these dependencies automatically.
In order to create a Sketch you are kindly invited to do the instantiation on you own. :angel:

```ts
export class Order {
  constructor(public products: Product[]) {}
}

export class ForOrder extends Sketch<Order> {
  private static readonly model = new Order([]);
  
  constructor() {
    super(ForOrder.model);
  }
}
```

> If the model class is more complex, please remember that you can use already
> existing Sketches to set everything up.

## Configure Test Data

### `model({}: optionalOverrides<T>)`

### `set(mapFn)`

### `get(projectorFn)`



