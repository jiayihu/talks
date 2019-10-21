footer: Type-safer React & Redux applications
slidenumbers: true
slidecount: true

# Type-safer React & Redux applications

---

# Schedule of this talk

1. Why type systems are important
2. Modeling domain business logic
3. Modeling UI constraints
4. Better Redux typings

---

# Assumptions

1. Knowing at least one typed programming language
2. Knowing JavaScript
3. Patience to listening to me

---

> A type defines the set of values a variable can take.

---

# Origins

Types are important for compiled language: different types does not use the same amount of memory.

^ the computer needs to be made aware of that to make sure it does not enter an invalid state during runtime.
What about not compiled languages like JavaScript?

---

# Two perspectives on type errors

1. A discrepancy between differing data types e.g. treating an `string` as `number`.
2. A logic error: an erroneous or undesirable program behaviour, a contravention of the programmer's **explicit** intent

---

# Logic errors

A logic error produces unintended or undesired output or other behaviour, but the system does not terminate abnormally.

^ A program with a logic error is a valid program in the language, though it does not behave as intended.
^ The only clue to the existence of logic errors is the production of wrong solutions

---

[When NASA Lost a Spacecraft Due to a Metric Math Mistake](https://www.simscale.com/blog/2017/12/nasa-mars-climate-orbiter-metric/)

![inline](./assets/nasa.jpg)

^ $125 million, 10 months of travel towards Mars

---

> `pounds` !== `kilograms`

^ Both are `number` for a compiler or interpreter

---

```typescript
function getAcceleration(mass: number, force: number): number {
	
}

getAcceleration(1000) // lbs
getAcceleration(453.592) // Kg
```

---

# Functional Domain modeling

---

No talking about Monads.

---

# Opaque types

Types are **transparent** by default - if two types are **structurally** identical they are seen as compatible.

```typescript
type Pounds = number
type Kg = number

function getAcceleration(mass: Kg, force: number): number {}

const massInKg: Kg = 453.592
const massInLbs: Pounds = 1000

getAcceleration(massInKg) // Okay
getAcceleration(massInLbs) // Still okay for TS
```


^ Transparency is fine for structural polimorphism

---

# newtype-ts

```typescript
import { Newtype, iso } from 'newtype-ts'

interface Kg extends Newtype<{ readonly Kg: unique symbol }, number> {}
const isoKg = iso<Kg>()

const massInKg: Kg = isoKg.wrap(453.592)

function getAcceleration(mass: Kg, force: number): number {}

getAcceleration(453.592) // TS error
saveAmount(massInKg) // ok
saveAmount(massInLbs) // TS error
```

---

# newtype-ts

```typescript
function isPositive(value: number): boolean {
	return value > 0
}

isPositive(massInKg) // TS error

const value: number = iso.unwrap(massInKg)
isPositive(value) // Okay
```

---

# Design-by-contract programming

Extend the ordinary definition of abstract data types with **preconditions, postconditions and invariants**

---

What does the contract expect?
What does the contract guarantee?
What does the contract maintain?

---

Many programming languages have facilities to make assertions like these.

- [Ada pragma Assertion_Policy](https://learn.adacore.com/courses/intro-to-ada/chapters/contracts.html)
- [Rust Hoare](https://crates.io/crates/hoare)

# assert

^ Checked only in development, removed at runtime

---

# Relation to testing

- Type safety does not replace unit testing or integration testing
- Tests run against one specific value, type invariants talk about sets of values

^ Rather, it complements external testing.

---

> Testing talks about the **presence** of defects and don’t talk about the **absence** of defects.

---

> Type systems can formally guarantee the compliance of invariants.

---
