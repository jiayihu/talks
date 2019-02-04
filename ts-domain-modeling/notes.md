- [Domain Modeling](https://en.wikipedia.org/wiki/Domain_model)
- Contact
  ```ts
  type Contact = {
    firstName: string,
    lastName: string,
    email: string,
    isEmailValid: boolean
    }
  ```
	- Which values are optional?
	- What are the contraints? Length of firstName
	- Which fields are linked? "email, isEmailValid"
	- Domain logic: if you change the email then you must reset "isEmailValid"
- Domain Driven Modeling
	- Ideal: Write a code that a domain business expert can read
	- Actual idea: make illegal states unrepresentable.
	- Example: CardGame
	- Persistence ignorance: nothing about database, classes, interfaces etc., just domain
	- First file of project and already code => no need of UML
	- Algebrid domain
		- Product type, like a pair (number, number): number * number, seen as combination of two sets
			- TS: `type Birthday = Person * Date = { person: Person, date: Date }`
			- TS: `type NonEmptyArray<A> = { head: A, tail: Array<A> }` (similar to Haskell `List a = Cons a (List a) | Nil` and Type Variant `List = <nil: Unit, cons: (int * List)` but using a product type instead of sum type>
		- Sum type: type Temperature = Temperature in F o Temperature in Celsius = F int | C int
			- Haskell data types: http://learnyouahaskell.com/making-our-own-types-and-typeclasses
			- Typescript (?): Sum type is better if the domain itself is made of variants, whereas interface is better if in the domain there is only one type but code can have different variations and you want to extend
          ```ts
          type Temperature =
            | { type: 'Fahrenheit', value: number }
            | { type: 'Celsius', value: number }

          interface Temperature { value: number } 
          interface Fahrenheit extends Temperature { value: number } 
          interface Celsius extends Temperature { value: number } 
          ```
			- Pattern matching and exaustivity checking: in OOP you have polymorphism and substitution principle, in FP exaustivity checking saves from forgetting a case
			- `type Option<A> = { type: 'None' } | {type: 'Some', value: A}` vs `NullObject`: what if we want different behaviour when is null, not possible with NullObject. We actually want to be sure to handle gracefully 'None' case
      - Expressiveness of the domain logic (difficult to do the same with OOP):
        ```ts
        type PaymentMethod =
          | { type: 'Cash' }
          | { type: 'Check', checkNumber: number }
          | { type: 'Card', cardType: 'Visa' | 'Mastercard', cardNumber: number }
        ```
      - Sum type vs Inheritance
        - With sum types all choices are together, next to each other. If you add a new type of payment it breaks and it's fine because it reminds you have to add logic for it. In OOP you have to implement methods, otherwise it breaks.
      - Usually we use types for safe runtime evalutation, as an annotation to a value. But we can use it to model domain and logic, like a compile-time unit tests
      - One choice (keeps domain distinct to value type, it might not be a string in future):
        ```ts
        type EmailAddress =
          | string
        type EmailAddress = string // type alias

        function createEmail(input: string): EmailAddress {}
        function createEmail(input: string): Option<EmailAddress> {} // If passes validation
        function createEmail(input: string): string {}

        type VerifiedEmail = { type: 'VerifiedEmail', address: EmailAddress }
        type EmailContactInfo =
          | { type: 'UnverifiedEmail', address: EmailAddress }
          | { type: 'VerifiedEmail', address: VerifiedEmail }
        ```
      - Final result, instead of primitive types `string, number` we have more types which model are domain and logic: 
        ```ts
        type String50 = string
        type PersonalName = { firstName: String50, lastName: String50 }
        type Contact = { name: PersonalName, email: EmailContactInfo }
        ``` 
      - Make illegal states unrepresentable. New requirement: "A contact must have an email or a postal code". No way in OOP.
        ```ts
        type Contact = {
          name: PersonalName,
          email: Option<EmailContactInfo>, // both can be missing
          address: Option<PostalContactInfo> // both can be missing
        }
        ```
        Saying "I'll put a check later if both are missing" is asking for trouble and will also require unit test.
        ```
        type ContactInfo = EmailContactInfo | PostalContactInfo
        ```
      - Validation logic is easily missed if buried in code instead of domain file. Self-documenting.
      - Product vs sum type?
      - States sum types
      - Accumulating validation errors
