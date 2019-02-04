footer: Functional Domain Modeling
slidenumbers: true
slidecount: true

# Functional Domain Modeling

^ Informalmente...

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
function fillShippingInfo(info: : CheckoutInfo): CheckoutInfo { .. }
function fillPaymentMethod(info: : CheckoutInfo): CheckoutInfo { .. }
function fillShippingEstimate(info: : CheckoutInfo): CheckoutInfo { .. }

function checkout(initialInfo: CheckoutInfo): CheckoutInfo {
  return fillShippingInfo()
    .then(fillPaymentMethod)
    .then(fillShippingEstimate)
}
```

---

# Domain Model [^1]

1. Entities
2. Behaviours => Services
3. Ubiquitous language
4. Bounded context


[^1]: [Domain Driven Design](https://www.amazon.it/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

^ DDD: Understanding the domain and abstracting the characteristics in the form of a model

^ Ubiquitous language: use the domain vocabulary in your model and it resembles the language that the domain speaks

^ Context: delivery in ecommerce, delivery in order info

---

1. Model entities with **immutable** Algebric Data Types (ADT)
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

export type ShippingEstimate = Readonly<{
  shippingMethod: string;
  estimate: number;
}>;

export type CheckoutInfo = ShippingAddress & PaymentMethod & ShippingEstimate;
```

---

```ts
import { ShippingAddress, PaymentMethod, ShippingEstimate } from "./domain.ts";

export function setShippingAddress(address: ShippingAddress): void {}

export function verifyPaymentMethod(payment: PaymentMethod): PaymentMethod {
  if (!payment.cardCode) throw new Error('Invalid card');

  return payment;
}

export function setPaymentMethod(payment: PaymentMethod): void {}

export function setShippingEstimate(payment: ShippingEstimate): void {}

```

^ Pure functions compose and we can build larger abstractions out of smaller ones

---

# Why TypeScript (similar to Scala)

1. Algebric data types
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

# Algebric Data Types

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
      type: 'Some'
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
export type ShippingEstimate = Readonly<{
  shippingMethod: ShippingMethod;
  estimate: number;
}>;
```

---

# Pattern matching

```ts
function getEstimate(shippingMethod: ShippingMethod) {
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
type EstimateTuple = [ShippingMethod, number]

//: ShippingMethod * number
```

^ |A| = |B| + |C|

---

# Product type

```ts
type EstimateRecord = {
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
function toRecord(tuple: EstimateTuple): EstimateRecord {
  return { shippingMethod: tuple[0], estimate: tuple[1] }
}

function fromRecord(record: EstimateRecord): EstimateTuple {
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
type CompanyPickup = { type: 'CompanyPickup', pickupCompany: Option<string> }
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

# Sum types again - More contraints

```ts
import { some, none } from 'fp-ts/lib/Option';

type String20 = Option<string>
type CAPString5 = Option<string>

function createString20(s: string): String20 {
  return s.length < 20 ? some(s) : none;
}

function createCAPString5(s: string): CAPString5 {...}
```

---


# Sum types again - More contraints

```ts
export type ShippingAddress = Readonly<{
  name: String20;
  street: String20;
  city: String20;
  cap: CAPString5;
}>;
```
---

# Sum types again - Either

```ts
type Either<L, R> =
  | {
      type: 'Left'
      left: L
    }
  | {
      type: 'Right'
      right: R
    }
```

---

# Ubiquitous language

```ts
export type ShippingAddress = Readonly<{
  name: String20;
  street: String20;
  city: String20;
  cap: CAPString5;

  pickup: PickupType;
}>;

export type PaymentMethod = Readonly<{
  paymentMethod: PaymentMethod;
  cardNumber: CardString10;
  cardExpiration: ExpirationString4;
  cardCode: NumericString3;
}>;

type ShippingMethod = 'Prime' | 'Standard';
export type ShippingEstimate = Readonly<{
  shippingMethod: ShippingMethod;
  estimate: number;
}>;
```

---

# References

- [Functional and Algebraic Domain Modeling - Debasish Ghosh - DDD Europe 2018](https://www.youtube.com/watch?v=BskNvfNjU_8&t=2640s)
- [Domain Modeling Made Functional - Scott Wlaschin](https://www.youtube.com/watch?v=Up7LcbGZFuo)
- [Functional and Reactive Domain Modeling](https://www.manning.com/books/functional-and-reactive-domain-modeling)
