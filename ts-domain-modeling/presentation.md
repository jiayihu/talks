footer: Functional Domain Modeling
slidenumbers: true
slidecount: true

# Functional Domain Modeling

^ Informalmente...

---

![inline](./assets/amazon.png)

---

```typescript
type ShippingAddress = {
  name: string;
  street: string;
  city: string;
  cap: string;

  isCompanyPickup: boolean;
  pickupCompany?: string;
}
```

^ Record/object

---

```typescript
type Step = (info: CheckoutInfo) => CheckoutInfo

function checkout(info: CheckoutInfo): CheckoutInfo {
  return processShippingAddress(info)
      .then(processPaymentMethod)
      .then(processShippingCourier)
      .then(validate)
      .then(confirmCheckout)
}
```

---

# Assumptions

- FP concepts
  - purity
  - composition
  - immutability
- Functor, Applicative, Monad, Semigroup/Monoid

---

# Domain Model [^1]

1. **Entities**
  - With smart constructors as factories
2. **Behaviours**
  - Services
3. Ubiquitous language
4. Bounded context


[^1]: [Domain Driven Design](https://www.amazon.it/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

^ Factories encapsulates validation, constructors are private

^ DDD: Understanding the domain and abstracting the characteristics in the form of a model

^ Ubiquitous language: use the domain vocabulary in your model and it resembles the language that the domain speaks

^ Context: delivery in ecommerce, delivery in order info

---

1. Model entities with **immutable** Algebraic Data Types (ADT)
2. Model behaviours as pure functions in modules
3. Behaviours operate on the types of the entities

^ Separate state from behaviour. Behaviour composes better than states

^ No classes because they don't compose and they couple state with behaviour

---

```ts
export type ShippingAddress = Readonly<{
  name: string;
  street: string;
  city: string;
  cap: string;

  isCompanyPickup: boolean;
  pickupCompany?: string;
}>;

export type PaymentMethod = Readonly<{
  paymentMethod: string;
  cardNumber: string;
  cardExpiration: string;
  cardCode: string;
}>;

export type ShippingCourier = Readonly<{
  shippingMethod: string;
  estimate: number;
}>;

export type CheckoutInfo = ShippingAddress & PaymentMethod & ShippingCourier;
```

---

```ts
import { ShippingAddress, PaymentMethod, ShippingCourier } from "./domain.ts";

export function processShippingAddress(info: CheckoutInfo): CheckoutInfo {}

export function processPaymentMethod(info: CheckoutInfo): CheckoutInfo {}

export function processShippingCourier(info: CheckoutInfo): CheckoutInfo {}

export function validate(info: CheckoutInfo): CheckoutInfo {
  if (!info.cardCode) throw new Error('Invalid card');

  return info;
}

export function confirmCheckout(info: CheckoutInfo): CheckoutInfo {}

```

^ Pure functions compose and we can build larger abstractions out of smaller ones

---

# Why TypeScript (similar to Scala)

1. Algebraic data types
2. Immutability helpers
3. Function composition and higher-order functions
4. Advanced static type system with type inference and generics
5. Module system
7. Support of functional data structures: [fp-ts](https://github.com/gcanti/fp-ts)

---

# But

1. ~~traits/mixins~~
2. ~~for-comprehension/do-notation~~

---

# Algebraic Data Types

---

# Sum type

Union of sets.

```ts
type PaymentMethod = 'visa' | 'mastercard'

//: < l1: 'visa', l2: 'mastercard' >
```

^ |A| = |B| + |C|

^ One goal of typing is minimal acceptable set

---

# Option

```ts
type Option<A> =
  | { type: 'None' }
  | {
      type: 'Some',
      value: A
    }
```

---

# When to use sum types?

To model the variations within an entity

---

[.code-highlight: 8, 11, 13, 19, 21]

```ts
export type ShippingAddress = Readonly<{
  name: string;
  street: string;
  city: string;
  cap: string;

  isCompanyPickup: boolean;
  pickupCompany: Option<string>;
}>;

type PaymentMethod = 'Visa' | 'Mastercard'
export type PaymentMethod = Readonly<{
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExpiration: string;
  cardCode: string;
}>;

type ShippingMethod = 'Prime' | 'Standard';
export type ShippingCourier = Readonly<{
  shippingMethod: ShippingMethod;
  estimate: number;
}>;
```

---

# Pattern matching

```ts
function getCourier(shippingMethod: ShippingMethod) {
  switch (shippingMethod) {
    case 'Standard':
      return 3;
    case 'Prime':
      return 1;
    // No default case
  }
}
```

---

# Sum types vs Inheritance 

```ts
interface ShippingMethod {...}
class PrimeMethod implements ShippingMethod {...}
class StandardMethod implements ShippingMethod {...}
```

---

```ts
type CardType = 'Visa' | 'Mastercard'
type CardPayment = Readonly<{
  type: 'CardPayment';
  card: CardType;
  cardNumber: string;
  cardExpiration: string;
  cardCode: string;
}>;

type CashPayment = {
  type: 'CashPayment';
}

type ChequePayment = {
  type: 'ChequePayment';
}

export type PaymentMethod = CardPayment | CashPayment | ChequePayment
```

^ Ubiquitous language

---

# Inheritance cons

- What is the common behaviour?
- State and behaviour coupling
- Data and code is scattered around many locations

---

# Product type

Product of sets.

```ts
type ShippingMethod = 'Prime' | 'Standard'
type CourierTuple = [ShippingMethod, number]

//: ShippingMethod * number
```

^ |A| = |B| + |C|

---

# Product type

```ts
type CourierRecord = {
  shippingMethod: 'Prime' | 'Standard';
  estimate: number;
};
```

---

# Tuple <=> Record

There is an isomorphism between the types **tuples** and **record**

```
from . to = to . from = identity
```

```ts
function toRecord(tuple: CourierTuple): CourierRecord {
  return { shippingMethod: tuple[0], estimate: tuple[1] }
}

function fromRecord(record: CourierRecord): CourierTuple {
  return [record.shippingMethod, record.estimate]
}
``` 

---

# When to use product types?

To model the related data which form larger abstractions.

---

# NonEmptyArray

```ts
type NonEmptyArray<A> = {
  head: A;
  tail: Array<A>
}
```

---

[.code-highlight: 7-8]

# Sum types again - Atomic updates

```ts
export type ShippingAddress = Readonly<{
  name: string;
  street: string;
  city: string;
  cap: string;

  isCompanyPickup: boolean;
  pickupCompany: Option<string>;
}>;
```

---

# Sum types again - Atomic updates

```ts
type HomePickup = { type: 'HomePickup' }
type CompanyPickup = { type: 'CompanyPickup', pickupCompany: string }
type PickupType = HomePickup | CompanyPickup

export type ShippingAddress = Readonly<{
  name: string;
  street: string;
  city: string;
  cap: string;

  pickup: PickupType;
}>;
```

---

# Sum types again - Either

```ts
type Either<L, R> =
  | {
      type: 'Left',
      left: L
    }
  | {
      type: 'Right',
      right: R
    }
```

---

# Either

```ts
import { left, right } from 'fp-ts/lib/Either';

export function verifyPaymentMethod(payment: PaymentMethod)
  : Either<string, PaymentMethod> {
  if (!payment.cardCode) return left('Invalid card');

  return right(payment);
}
```

---

# Either Monad - Fail fast

```ts
export function verifyShippingAddress(address: ShippingAddress)
  : Either<string, ShippingAddress> {}

export function verifyPaymentMethod(payment: PaymentMethod)
  : Either<string, PaymentMethod> {}

export function verifyCheckoutInfo(checkoutInfo: CheckoutInfo)
  : Either<string, CheckoutInfo> {
  // Structural subtyping
  return verifyShippingAddress(checkoutInfo)
    .chain(verifyPaymentMethod)
}
```

^ Instead of if annidati, try-catch etc.

^ But our focus is typing business logic, not advantages of FP abstractions

^ Ubiquitous language

---

# Validation Applicative - Accumulate failures

```ts
import { validation, failure, success } from 'fp-ts/lib/Validation'
import { traverse } from 'fp-ts/lib/Array'

export function verifyShippingAddress(address: ShippingAddress)
  : Validation<NonEmptyArray<string>, ShippingAddress> {}

export function verifyPaymentMethod(payment: PaymentMethod)
  : Validation<NonEmptyArray<string>, PaymentMethod> {}

export function verifyCheckoutInfo(checkoutInfo: CheckoutInfo)
  : Validation<NonEmptyArray<string>, CheckoutInfo> {
  const validators = [verifyShippingAddress, verifyPaymentMethod];
  return traverse(validation)(validators, f => f(checkoutInfo))
}

// failure(new NonEmptyArray("Invalid address", ["Invalid card"]))
verifyCheckoutInfo({ ... }) 
```

---

# UI State

Make illegal states unrepresentable

---

```js
type State = {
  isFillingAddress: boolean;
  isFillingPayment: boolean;
  isFillingCourier: boolean;
} & CheckoutInfo

class CheckoutForm extends React.Component<{}, State> {
  state: State = {
    isFillingAddress: true,
    isFillingPayment: false,
    isFillingCourier: false,

    name: '';
    street: '';
    city: '';
    ...
    paymentMethod: '';
    cardNumber: '';
    cardExpiration: '';
    cardCode: '';
  }

  render() {
    return (
      <form> ... </form>
    );
  }
}
```

---

```ts
type FillingAddressState = { type: 'FillingAddressState' }
  & ShippingAddress

type FillingPaymentState = { type: 'FillingPaymentState' }
  & ShippingAddress & PaymentMethod

type FillingCourierState = { type: 'FillingCourierState' }
  & ShippingAddress & PaymentMethod & ShippingCourier


type State = 
  | FillingAddressState
  | FillingPaymentState
  | FillingCourierState
```

---

```js
class CheckoutForm extends React.Component<{}, State> {
  state: State = {
    type: 'FillingAddressState',

    name: '';
    street: '';
    city: '';
    cap: '';
    pickup: { type: 'HomePickup' }
  }

  render() {
    switch (this.state.type) {
      case 'FillingAddressState':
        return this.renderAddressFields();
      case 'FillingPaymentState':
        return this.renderPaymentFields();
      case 'FillingCourierState':
        return this.renderCourieFields();
    }
  }
}
```

---

# Finite state machine

![inline](./assets/states.png)

---

# Finite state machine

- Each state has different possible data
- Forces to think about possible states
- States and transitions are types

---

# Phantom Types

---

```ts
type FormData<A> = CheckoutInfo;

type Unvalidated = { type: 'Unvalidated' }
type Validated = { type: 'Validated' }

function createFormData(data: CheckoutInfo)
  : FormData<Unvalidated> {}
  
function setShippingAddress(data: FormData<Unvalidated>, address: ShippingAddress)
  : FormData<Unvalidated> {}

function validate(data: FormData<Unvalidated>)
  : FormData<Validated> {}

function confirmCheckout(data: FormData<Validated>)
  : FormData<Validated> {}
```

^ Types used only in typings

---

# References

- [Functional and Algebraic Domain Modeling - Debasish Ghosh - DDD Europe 2018](https://www.youtube.com/watch?v=BskNvfNjU_8&t=2640s)
- [Domain Modeling Made Functional - Scott Wlaschin](https://www.youtube.com/watch?v=Up7LcbGZFuo)
- [Functional and Reactive Domain Modeling](https://www.manning.com/books/functional-and-reactive-domain-modeling)
- [Algebraic Data Types - Giulio Canti](https://github.com/gcanti/talks/blob/master/adt/adt.md)
