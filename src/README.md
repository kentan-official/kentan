## G.rab
> Inspired by [FakeItEasy](https://fakeiteasy.github.io/)

This small framework has the goal to generate test data more efficient.
It should reduce the boilerplate for tests arranging the test.
There are `Plans` providing default values for a certain model.

### Plan
> It is recommended to put all plans you create in a own directory.
> This makes your test data easy to discover.

To define a plan make use of the base class `Plan`.
Then you need to implement a constructor.
You will see that a super call is needed. This ensures that you pass some default data baseed on your model.

> **No worries** the constructor is typed meaning that you get informed if you pass an invalid object.

```typescript
import { Plan } from './grab';
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

In order to reduce the boilerplate of your test data even more the factory `G`
can generate your Plans on the fly.

```typescript
import { G } from './grab';
import { CustomerPlan } from './plans';

const customer = G.rab(CustomerPlan).model();
```

You still have the possibility to override custom values.

```typescript
import { G } from './grab';
import { CustomerPlan } from './plans';

const customer = G.rab(CustomerPlan)
  .model({
    firstName: 'Laura',
    lastName: 'Seiler'
  });
```
