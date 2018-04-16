# Grab

This small framework has the goal to generate test data more efficient.
It reduces the boilerplate creating test data and provides reusable `Plans` which allow you to arrange tests depending on complex data structures with ease.

## Setup

```bash
$ npm install grab
# or
$ yarn add grab
```

## Usage

1. Provide a _Plan_ describing your test data.
2. Use the _Plan_ inside your test 
3. Combine multiple _Plans_ creating complex data structures easily.

### 1. Provide a Plan

```typescript
// your-model.ts

export class YourModel {
  yourProperty: string;
}
```

```typescript
// ./plan/for-your-model.ts

import { Plan } from 'grab';
import { YourModel} from '../<path-to-YourModel>';


export class ForYourModel extends Plan<YourModel> {
  constructor() {
    super({
      yourProperty: 'your value'
    });
  }
}
```

### 2. Use the Plan

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


## File structure



```bash
|- test
   |- plans
      |- for-your-model.ts
```

## Have a look inside

### Plan
> It is recommended to put all plans you create in a own directory.
> This makes your test data easy to discover.

To define a plan make use of the base class `Plan`.
Then you need to implement a constructor.
You will see that a super call is needed. This ensures that you pass some default data baseed on your model.

> **No worries** the constructor is typed meaning that you get informed if you pass an invalid object.

```typescript
import { Plan } from 'grab';
import { Customer } from './models';

export class CustomerPlan extends Plan<Customer> {
  constructor() {
    super({
      firstName: 'Steven',
      lastName: 'Hawking'
    });
  }
}
```

After creating a plan you are able to access the generated test data by using the mehtod `model()`;

```typescript
import { CustomerPlan } from './plans';

const customerPlan = new CustomerPlan();
const customer = customerPlan.model();
```

A plan also allows you to override the default values. The mehtod `model(overrides?: T): T` takes an optional parameter
allowing you to specify concrete test data.

```typescript
import { CustomerPlan } from './plans';

const customerPlan = new CustomerPlan();
const customer = customerPlan.model({ firstName: 'Elon' });
```

> **Notice** that the method `model()` is typed which saves you from passing invalid properties.

```typescript
import { CustomerPlan } from './plans';

const customerPlan = new CustomerPlan();
const customer = customerPlan.model({ astName: 'Musk' });
//                                    ^-- error
```

## Generator

In order to reduce the boilerplate of your test data even more the factory `Grab`
can generate your Plans on the fly.

```typescript
import { Grab } from './grab';
import { CustomerPlan } from './plans';

const customer = Grab.plan(CustomerPlan).model();
```

You still have the possibility to override custom values.

```typescript
import { G } from 'grab';
import { CustomerPlan } from './plans';

const customer = Grab.plan(CustomerPlan)
  .model({
    firstName: 'Laura',
    lastName: 'Seiler'
  });
```

## Thanks

This project uses the setup provided by [TypeScript Library Starter](https://github.com/alexjoverm/typescript-library-starter.git).
It is really easy to get start with.
You will get a complete infrastructure allowing you to write tests, bundle your library for production and publish your package to the npm registry.

That project is a big time saver! So thanks!
