<p align="center">
  <img src="./assets/logo.png" alt="water lily">
</p>

# Kentan

[![Build Status](https://travis-ci.org/GregOnNet/kentan.svg?branch=master)](https://travis-ci.org/GregOnNet/kentan)
[![Coverage Status](https://coveralls.io/repos/github/GregOnNet/kentan/badge.svg?branch=master)](https://coveralls.io/github/GregOnNet/kentan?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This library provides a more efficient way to generate test data based on [TypeScript](https://www.typescriptlang.org/) classes or interfaces.
It reduces the boilerplate and provides reusable _Sketches_ which allow you to arrange tests with ease even if you need to setup complex and deeply nested data structures.

## Setup

To get started with _Kentan_ just install it with you preferred package manager.

```bash
$ npm install -D kentan
# or
$ yarn add -D kentan
```

## How to use

Please refer to the repository's wiki to see how your tests can benefit from _Kentan_.

## Usage

Assuming you want to write a test depending of a class representing a data model on the client side you need to provide a `Sketch`.
With this structure you can provide some default values being used and reused in different tests.

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

> **Please Note** The shown sample works for model classes having a parameterless constructor.
> If you need to instantiate a model with a more complex constructor please refer to the section [Use existing model instances](#use-existing-model-instances).

### 2. Use the Sketch

After you set up the sketch you can use the factory called `Kentan`.
This makes it easy to create sketches on the fly.

Just call `sketch()` of _Kentan_ and pass the type of the sketch you want to create.
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

Now we come to the main idea of _Kentan_. It enables you to specify lots of tiny sketches which can be put together to construct complex data structures.

The following snippets show you a `Customer` that depends on `Address`.

```typescript
// model-a.ts

class Customer {
  address: Address;
}
```

```typescript
// model-b.ts

class Address {
  street: string;
}
```

For each of these models a _Sketch_ can be created.
The cool thing is that you can use a _Sketch_ as building block for other Sketches.
After creating a _Sketch_ for `Address` it can be used in the _Sketch_ for `Customer`.

```typescript
// model-b.sketch.ts

class ForAddress extends Sketch<Address> {
  constructor() {
    super({
      street: '22B Bakerstreet'
    });
  }
}
```

To reuse a sketch you simply need to import `Kentan` and the _Sketch_ for `Address`.

```typescript
// model-a.sketch.ts
import { Kentan } from 'kentan';
import { ForAddress } from './for-model-b.sketch';


class ForCustomer extends Sketch<Customer> {
  constructor() {
    super({
      address: Kentan.sketch(ForAddress).model();
    });
  }
}
```

Having everything ready you get a lightweight test setup.
Now you have the possibility to use the provided test data.

```typescript
// model-a.spec.ts
describe('using default values', () => {
  it('should use a sketch for "Address" to create sketch for "modelA"', () => {
    const expected = new ForAddress().model().street;
    const sketch = Kentan.sketch(ForCustomer);

    expect(sketch.model().address.street).toBe(expected);
  });
});
```

But you are also allowed to overwrite the specific values.

```typescript
describe('use overrides', () => {
  it('should be possible to provide own test data', () => {
    const modelA = Kentan.sketch(ForCustomer).model({
      address: Kentan.sketch(ForAddress).model({ street: 'override' })
    });
  });
});
```

## Set certain properties in the data structure

Sometimes you do not want to overwrite whole parts of the data structure but one single property.
_Kentan_ allows you to do this as well! You can use the method _set_ expecting a _map_-Function which allows you to overwrite a certain value.

```typescript
const sketch = Kentan.sketch(ForCustomer);
const customerSketch = sketch.set(m => (m.some.thing.nested.inside = expected));
const customer: Customer = customerSketch.model();
```

## Use existing model instances

If you deal with a model which defines a `constructor` having multiple dependency you can use a tiny helper of _Kentan_ called `useInstance<T>(model:T):T`. This allows you to provide your very own setup of a model instance and pass it to _Kentan_;

```typescript
// your-model.ts

export class YourModel {
  constructor(public parameter: string) {}
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

## Organize sketches in your project

> It is recommended to put all sketches you create in a own directory.
> This makes your test data easy to discover.

Now you have a way to organize your test data by adding Sketches.
You can put them together into one directory if you like.

```bash
.
└── test
    └── sketches
        └── for-your-model.ts
```

## Sketches are strictly typed

To define a sketch make use of the base class _Sketch_.
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

After creating a sketch you are able to access the generated test data by using the method `model()`;

```typescript
import { ForCustomer } from './sketches';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model();
```

A sketch also allows you to override the default values. The method `model(overrides?: T): T` takes an optional parameter
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

## Credits

This project uses the setup provided by [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter.git).
It is really easy to get start with.
You will get a complete infrastructure allowing you to write tests, bundle your library for production and publish your package to the npm registry.

That project is a big time saver. Thank you so much!
