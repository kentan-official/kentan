# Grab

This small framework has the goal to generate test data more efficient.
It reduces the boilerplate creating test data and provides reusable `Plans` which allow you to arrange tests depending on complex data structures with ease.

## Setup

To get started with _Grab_ just install it with you preferred package manager.

```bash
$ npm install grab
# or
$ yarn add grab
```

## Usage

Assuming you want to write a test depending of a class representing a data model on the client side you need to provide a `Plan`.
With this structure you can provide some default values beeing used and reused in different tests.

### 1. Declare the Plan

First you need to provide such a plan for on of you data models.

```typescript
// your-model.ts

export class YourModel {
  yourProperty: string;
}
```

Every concrete _Plan_ extends a base class `Plan<T>`.
Inside the constructor a _super_ call is made which takes two parameters:

1.  The type token of the model you want to create
2.  An objects containing the default values of the model.

The token is needed to be able to create an instance of the model.

```typescript
// ./plan/for-your-model.ts

import { Plan } from 'grab';
import { YourModel } from '../<path-to-YourModel>';

export class ForYourModel extends Plan<YourModel> {
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

### 2. Use the Plan

After you set up the plan you can use the factory called `?????`.
This makes it easy to create plans on the fly.

Just call `?????()` of `?????` and pass the type of the plan you want to create.
By calling `model()` you can access the generated model.
You are also allowed to pass a set of properties which overwrite the default values.

```typescript
// your-model.spec.ts

import { Grab } from 'grab';

describe('When using a plan', () => {
  it('should be possible to create my very own test data', () => {
    const plan = Grab.plan(ForYourModel);
    const model = plan.model({ yourProperty: 'overwrite the default value' });

    expect(model.yourProperty).toBe('overwrite the default value');
  });
});
```

### 3. Combine multiple Plans

Now we come to the main idea of `?????`. It enables you to specify lots of tiny plans which can be put together to construct complex data structures.

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

For each of these models a _Plan_ can be created.
The cool thing is that you can use a _Plan_ as building block for other Plans.
After creating a _Plan_ for `ModelB` it can be used in the _Plan_ for `ModelA`.

```typescript
// modal-b.plan.ts

class ForModelB extends Plan<ModelB> {
  constructor() {
    super({
      someProperty: 'default value'
    });
  }
}
```

To reuse a plan you simply need to import `????` and the _Plan_ for `ModelB`.

```typescript
// modal-a.plan.ts
import { Grab } from 'grab';
import { ForModelB } from './for-model-b.plan';


class ForModelA extends Plan<ModelA> {
  constructor() {
    super({
      modelB: Grab.plan(ForModelB).model();
    });
  }
}
```

Having everything ready you get a lightweight test setup.
Now you have the possibility to use the provided test data.

```typescript
// model-a.spec.ts
describe('using default values', () => {
  it('should use a plan for "ModelB" to create plan for "ModalA"', () => {
    const expected = new ForModelB().model().someProperty;
    const plan = Grab.plan(ForModelA);

    expect(plan.model().modelB.someProperty).toBe(expected);
  });
});
```

But you are also allowed to overwrite the specific values.

```typescript
describe('use overrides', () => {
  it('should be possible to provide own test data', () => {
    const modelA = Grab.plan(ForModelA).model({
      modelB: Grab.plan(ForModelB).model({ someProperty: 'override' })
    });
  });
});
```

## Use existing model instances

If you deal with a model which defines a `constructor` having multiple dependency you can use a tiny helper of `?????` called `useInstance<T>(model:T):T`. This allows you to provide your very own setup of a model instance and pass it to `?????`;

```typescript
// your-model.ts

export class YourModel {
  constructor(public paramter: string) {}
}
```

```typescript
// for-your-model.plan.ts
import { Plan, useInstance } from 'grab';

export class ForYourModel extends Plan<YourModel> {
  private static _model = new YourModel('default');

  constructor() {
    super(useInstance(ForYourModel._model));
  }
}
```


## File structure

> It is recommended to put all plans you create in a own directory.
> This makes your test data easy to discover.

Now you have a way to organize your test data by adding _Plans_.
You can put them together into one directory if you like.

```bash
|- test
   |- plans
      |- for-your-model.ts
```

## Plans are strictly typed

To define a plan make use of the base class `Plan`.
Then you need to implement a constructor.
As mentioned before you have to make a super call to pass some default values based on your model.

> **No worries** the constructor is typed meaning that you get informed if you pass an invalid object.

```typescript
import { Plan } from 'grab';
import { Customer } from './models';

export class ForCustomer extends Plan<Customer> {
  constructor() {
    super(Customer, {
      firstName: 'Steven',
      lastName: 'Hawking'
    });
  }
}
```

After creating a plan you are able to access the generated test data by using the mehtod `model()`;

```typescript
import { ForCustomer } from './plans';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model();
```

A plan also allows you to override the default values. The mehtod `model(overrides?: T): T` takes an optional parameter
allowing you to specify concrete test data.

```typescript
import { ForCustomer } from './plans';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model({ firstName: 'Elon' });
```

> **Notice** that the method `model()` is typed which saves you from passing invalid properties.

```typescript
import { ForCustomer } from './plans';

const ForCustomer = new ForCustomer();
const customer = ForCustomer.model({ astName: 'Musk' });
//                                   ^-- error
```

## Thanks

This project uses the setup provided by [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter.git).
It is really easy to get start with.
You will get a complete infrastructure allowing you to write tests, bundle your library for production and publish your package to the npm registry.

That project is a big time saver! So thanks!
