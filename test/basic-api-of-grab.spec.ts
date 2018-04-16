import { Grab, Plan } from '../src/g-rab'

class Empty {}

class ForEmpty extends Plan<Empty> {}

describe('When a plan is requested', () => {
  let plan: Plan<Empty>

  beforeEach(() => {
    plan = Grab.plan(ForEmpty)
  })

  it('should yield the desired plan', () => {
    expect(plan).toBeDefined()
  })

  it('should provide an empty model', () => {
    expect(plan.model()).toBeDefined()
  })
})

class WithProperty {
  myProperty: string
}

class ForWithProperty extends Plan<WithProperty> {
  constructor() {
    super({ myProperty: 'my default value' })
  }
}

describe('When a plan provides initial data', () => {
  describe('using the initial data', () => {
    it('should provide the initial test data', () => {
      const plan = new ForWithProperty()
      const model = Grab.plan(ForWithProperty).model()

      expect(model.myProperty).toBe(plan.model().myProperty)
    })
  })

  describe('overwrite the initial data', () => {
    it('should provide the overwrited test data', () => {
      const overrides: WithProperty = { myProperty: 'my new value' }
      const model = Grab.plan(ForWithProperty).model(overrides)

      expect(model.myProperty).toBe(overrides.myProperty)
    })
  })
})
