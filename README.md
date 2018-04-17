# Kentan [![Coverage Status](https://coveralls.io/repos/github/GregOnNet/kentan/badge.svg?branch=master)](https://coveralls.io/github/GregOnNet/kentan?branch=master)

This small framework has the goal to provide a more efficient way to generate test data.
It reduces the boilerplate and provides reusable `Sketches` which allow you to arrange tests with ease even if you need to setup complex and deeply nested data structures.

## Setup

To get started with _Kentan_ just install it with you preferred package manager.

```bash
$ npm install kentan
# or
$ yarn add kentan
```

## Usage

Assuming you want to write a test depending of a class representing a data model on the client side you need to provide a `Sketch`.
With this structure you can provide some default values beeing used and reused in different tests.

### 1. Declare the Sketch

First you need to provide such a sketch for on of you data models.

```typescript
// your-model.ts

export class YourModel {
  yourProperty: string;
}
```

Every concrete _Sketch_ extends a base class `Sketch<T>`.
Inside the constructor a _super_ call is made which takes two parameters:

1.  The type token of the model you want to create
2.  An objects containing the default values of the model.

The token is needed to be able to create an instance of the model.

```typescript
// ./sketch/for-your-model.ts

import { Sketch } from 'kentan';
import { YourModel } from '../<path-to-YourModel>';

export class ForYourModel extends Sketch<YourModel> {
  constructor() {
    super(
      // Token
      YourModel,
      // Set of default values
      { yourProperty: 'your value' }
    );
  }
}
```

> **Please Note** The shown sample works for model classes habving a parameterless constructor.
> If you need to instanciate a model with a more complex constructor please refer to the section [Use existing model instances](#use-existing-model-instances).

### 2. Use the Sketch

After you set up the sketch you can use the factory called `Kentan`.
This makes it easy to create sketches on the fly.

Just call `sketch()` of `Kentan` and pass the type of the sketch you want to create.
By calling `model()` you can access the generated model.
You are also allowed to pass a set of properties which overwrite the default values.

```typescript
// your-model.spec.ts

import { Kentan } from 'kentan';

describe('When using a sketch', () => {
  it('should be possible to create my very own test data', () => {
    const sketch = Kentan.sketch(ForYourModel);
    const model = sketch.model({ yourProperty: 'overwrite the default value' });

    expect(model.yourProperty).toBe('overwrite the default value');
  });
});
```

### 3. Combine multiple Sketches

Now we come to the main idea of `Kentan`. It enables you to specify lots of tiny sketches which can be put together to construct complex data structures.

The following snippets show you a `ModelA` that depends on another `ModelB`.

```typescript
// modal-a.ts

class ModelA {
  modelB: ModelB;
}
```

```typescript
// modal-b.ts

class ModelB {
  someProperty: string;
}
```

For each of these models a _Sketch_ can be created.
The cool thing is that you can use a _Sketch_ as building block for other Sketches.
After creating a _Sketch_ for `ModelB` it can be used in the _Sketch_ for `ModelA`.

```typescript
// modal-b.sketch.ts

class ForModelB extends Sketch<ModelB> {
  constructor() {
    super({
      someProperty: 'default value'
    });
  }
}
```

To reuse a sketch you simply need to import `Kentan` and the _Sketch_ for `ModelB`.

```typescript
// modal-a.sketch.ts
import { Kentan } from 'kentan';
import { ForModelB } from './for-model-b.sketch';


class ForModelA extends Sketch<ModelA> {
  constructor() {
    super({
      modelB: Kentan.sketch(ForModelB).model();
    });
  }
}
```

Having everything ready you get a lightweight test setup.
Now you have the possibility to use the provided test data.

```typescript
// model-a.spec.ts
describe('using default values', () => {
  it('should use a sketch for "ModelB" to create sketch for "ModalA"', () => {
    const expected = new ForModelB().model().someProperty;
    const sketch = Kentan.sketch(ForModelA);

    expect(sketch.model().modelB.someProperty).toBe(expected);
  });
});
```

But you are also allowed to overwrite the specific values.

```typescript
describe('use overrides', () => {
  it('should be possible to provide own test data', () => {
    const modelA = Kentan.sketch(ForModelA).model({
      modelB: Kentan.sketch(ForModelB).model({ someProperty: 'override' })
    });
  });
});
```

## Use existing model instances

If you deal with a model which defines a `constructor` having multiple dependency you can use a tiny helper of `Kentan` called `useInstance<T>(model:T):T`. This allows you to provide your very own setup of a model instance and pass it to `Kentan`;

```typescript
// your-model.ts

export class YourModel {
  constructor(public paramter: string) {}
}
```

```typescript
// for-your-model.sketch.ts
import { Sketch, useInstance } from 'kentan';

export class ForYourModel extends Sketch<YourModel> {
  private static _model = new YourModel('default');

  constructor() {
    super(useInstance(ForYourModel._model));
  }
}
```


## File structure

> It is recommended to put all sketches you create in a own directory.
> This makes your test data easy to discover.

Now you have a way to organize your test data by adding _Sketches_.
You can put them together into one directory if you like.

```bash
.
└── test
    └── sketches
        └── for-your-model.ts
```

## Sketches are strictly typed

To define a sketch make use of the base class `Sketch`.
Then you need to implement a constructor.
As mentioned before you have to make a super call to pass some default values based on your model.

> **No worries** the constructor is typed meaning that you get informed if you pass an invalid object.

```typescript
import { Sketch } from 'kentan';
import { Customer } from './models';

export class ForCustomer extends Sketch<Customer> {
  constructor() {
    super(Customer, {
      firstName: 'Steven',
      lastName: 'Hawking'
    });
  }
}
```

After creating a sketch you are able to access the generated test data by using the mehtod `model()`;

```typescript
import { ForCustomer } from './sketches';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model();
```

A sketch also allows you to override the default values. The mehtod `model(overrides?: T): T` takes an optional parameter
allowing you to specify concrete test data.

```typescript
import { ForCustomer } from './sketches';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model({ firstName: 'Elon' });
```

> **Notice** that the method `model()` is typed which saves you from passing invalid property names.

```typescript
import { ForCustomer } from './sketches/for-customer';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model({ astName: 'Musk' });
//                                   ^-- error
```

## Thanks

This project uses the setup provided by [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter.git).
It is really easy to get start with.
You will get a complete infrastructure allowing you to write tests, bundle your library for production and publish your package to the npm registry.

That project is a big time saver! So thanks!
