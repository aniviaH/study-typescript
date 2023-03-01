/** Conditional Types */

// At the heart of most useful programs, we have to make decisions based on input. 
// JavaScript programs are no different, but given the fact that values can be easily introspected, those decisions are also based on the types of the inputs. 
// Conditional types help describe the relation between the types of inputs and outputs.

interface Animal5 {
  live(): void;
}
interface Dog5 extends Animal5 {
  woof(): void;
}
 
type Example1 = Dog5 extends Animal5 ? number : string;
    // type Example1 = number
 
type Example2 = RegExp extends Animal5 ? number : string;
    // type Example2 = string


// Conditional types take a form that looks a little like conditional expressions (condition ? trueExpression : falseExpression) in JavaScript:

// SomeType extends OtherType ? TrueType : FalseType;

// When the type on the left of the extends is assignable to the one on the right, then you’ll get the type in the first branch (the “true” branch); otherwise you’ll get the type in the latter branch (the “false” branch).

// From the examples above, conditional types might not immediately seem useful - we can tell ourselves whether or not Dog extends Animal and pick number or string! But the power of conditional types comes from using them with generics.

// For example, let’s take the following createLabel function:

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}


// These overloads for createLabel describe a single JavaScript function that makes a choice based on the types of its inputs. Note a few things:
// 1.If a library has to make the same sort of choice over and over throughout its API, this becomes cumbersome.
// 2. We have to create three overloads: one for each case when we’re sure of the type (one for string and one for number), and one for the most general case (taking a string | number). For every new type createLabel can handle, the number of overloads grows exponentially.
// Instead, we can encode that logic in a conditional type:

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

// We can then use that conditional type to simplify our overloads down to a single function with no overloads.
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}
function createLabel3<T extends number | string> (nameOrId: T): NameOrId<T> {
  // if (typeof nameOrId === 'string') {
  //   const res = {
  //     name: 'name',
  //   } as NameOrId<T>
  //   return res // Type '{ name: string; }' is not assignable to type 'NameOrId<T>'.
  // } else if (typeof nameOrId === 'number') {
  //   const res = {
  //     id: 2,
  //   }
  //   return res as NameOrId<T> // Type '{ id: number; }' is not assignable to type 'NameOrId<T>'.
  // } else {
  //   const res = {
  //     name: 'name',
  //     id: 1
  //   }
  //   return res
  // }

  return {
    name: nameOrId,
    id: nameOrId
  } as NameOrId<T>
}

let label1 = createLabel2("typescript");
    // let label1: NameLabel
let label2 = createLabel2(2.8);
    // let label2: IdLabel
let label3 = createLabel2(Math.random() ? "hello" : 42);
    // let label3: NameLabel | IdLabel


/** 1. Conditional Type Constraints */

// Often, the checks in a conditional type will provide us with some new information. Just like with narrowing with type guards can give us a more specific type, the true branch of a conditional type will further constrain generics by the type we check against.

// For example, let’s take the following:

// type MessageOf<T> = T["message"]; // Type '"message"' cannot be used to index type 'T'.

// In this example, TypeScript errors because T isn’t known to have a property called message. 
// We could constrain T, and TypeScript would no longer complain:

type MessageOf<T extends {message: unknown}> = T["message"];

interface Email {
  message: string;
}
interface Phone {
  message: number;
}
 
type EmailMessageContents = MessageOf<Email>;
    // type EmailMessageContents = string
type PhoneMessageContents = MessageOf<Phone>;
    // type PhoneMessageContents = number

type Message1 = MessageOf<{message: number, value: string}>
    // type message1 = number
type Message2 = MessageOf<{message: 1, value: '1'}>
    // type message2 = 1
type Message3 = MessageOf<{message: 'a', value: '1'}>
    // type message3 = "a"

// However, what if we wanted MessageOf to take any type, and default to something like never if a message property isn’t available? 
// We can do this by moving the constraint out and introducing a conditional type:

// type MessageOf2<T> = T extends {message: unknown} ? T['message'] : T
type MessageOf2<T> = T extends {message: unknown} ? T['message'] : never

type Message4 = MessageOf2<{}>

interface Email2 {
  message: string;
}
 
interface Dog2 {
  bark(): void;
}

type EmailMessageContents2 = MessageOf2<Email2>;
    // type EmailMessageContents2 = string

type DogMessageContents = MessageOf2<Dog2>;
    // type DogMessageContents = never

// Within the true branch, TypeScript knows that T will have a message property.

// As another example, we could also write a type called Flatten that flattens array types to their element types, but leaves them alone otherwise:

type Flatten<T> = T extends any[] ? T[number] : T;

// When Flatten is given an array type, it uses an indexed access with number to fetch out string[]’s element type. 
// Otherwise, it just returns the type it was given.

// Extracts out the element type.
type Str = Flatten<string[]>;
    // type Str = string

// Leaves the type alone.
type Num = Flatten<number>;
    // type Num = number


/** 2. Inferring Within Conditional Types -- infer keyword */

// We just found ourselves using conditional types to apply constraints and then extract out types. 
// This ends up being such a common operation that conditional types make it easier.

// infer keyword
// !!! Conditional types provide us with a way to infer from types we compare against in the true branch using the infer keyword. 
// For example, we could have inferred the element type in Flatten instead of fetching it out “manually” with an indexed access type:

type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;

// Here, we used the infer keyword to declaratively introduce a new generic type variable named Item instead of specifying how to retrieve the element type of T within the true branch.

type Str2 = Flatten2<string[]>
    // type Str2 = string
type Num2 = Flatten2<number[]>
    // type Num2 = number
type Num3 = Flatten2<number>
    // type Num3 = number

// !!! This frees us from having to think about how to dig through and probing apart the structure of the types we’re interested in.

// !!! We can write some useful helper type aliases using the infer keyword. 
// For example, for simple cases, we can extract the return type out from function types:

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type GetReturnType1 = GetReturnType<(args: string[]) => boolean>
    // type GetReturnType1 = number
type GetReturnType2 = GetReturnType<Str>
    // type GetReturnType2 = never
type Num4 = GetReturnType<() => number>;
    // type Num4 = number
type Str3 = GetReturnType<(x: string) => string>;
    // type Str3 = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
    // type Bools = boolean[]

type Num5 = ReturnType<() => number>

// When inferring from a type with multiple call signatures (such as the type of an overloaded function), inferences are made from the last signature (which, presumably, is the most permissive catch-all case). It is not possible to perform overload resolution based on a list of argument types.

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: boolean): boolean;
declare function stringOrNum(x: string | number | boolean): string | number | boolean;
 
type T1 = ReturnType<typeof stringOrNum>;
    // type T1 = string | number | boolean

/** 3. Distributive Conditional Types */

// !!! When conditional types act on a generic type, they become distributive when given a union type. 
// For example, take the following:

type ToArray<Type> = Type extends any ? Type[] : never;

type ToArrayOf1 = ToArray<string>
    // type ToArrayOf1 = string[]
type ToArrayOf2 = ToArray<void>
    // type ToArrayOf2 = void[]
type ToArrayOf3 = ToArray<never>
    // type ToArrayOf3 = never
type ToArrayOf4 = ToArray<boolean>
    // type ToArrayOf4 = false[] | true[]

// !!! If we plug a union type into ToArray, then the conditional type will be applied to each member of that union.

type StrArrOrNumArr = ToArray<string | number>;
    // type StrArrOrNumArr = string[] | number[]
type ToArrayOfUnion1 = ToArray<string | number>
    // type ToArrayOfUnion1 = string[] | number[]
type ToArrayOfUnion2 = ToArray<string[]>
    // type ToArrayOfUnion2 = string[][]
type ToArrayOfUnion3 = ToArray<boolean | void | never>
    // type ToArrayOfUnion3 = void[] | false[] | true[]
type ToArrayOfUnion4 = ToArray<boolean | void>
    // type ToArrayOfUnion4 = void[] | false[] | true[]

/**
  What happens here is that StrArrOrNumArr distributes on:
  
  string | number;

  and maps over each member type of the union, to what is effectively:

  ToArray<string> | ToArray<number>;

  which leaves us with:

  string[] | number[];
 */

// Typically, distributivity is the desired behavior. 
// To avoid that behavior, you can surround each side of the extends keyword with square brackets.

type ToArrayWithoutDistributivity<Type> = [Type] extends [any] ? Type[] : never;

// 'StrOrNumArr' is no longer a union.
type StrOrNumArr  = ToArrayWithoutDistributivity<string | number>
    // type ToArrayOfUnion5 = (string | number)[]