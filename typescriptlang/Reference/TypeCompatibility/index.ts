export {}

// Type compatibility in TypeScript is based on structural subtyping. Structural typing is a way of relating types based solely on their members. 
// This is in contrast with nominal typing. Consider the following code:

interface Pet {
  name: string
}

class Dog {
  name: string = 'dog'
}

// class Dog implements Pet {
//   name: string = 'dog'
// }

let pet: Pet
// OK, because of structural typing
pet = new Dog()

// In nominally-typed languages like C# or Java, the equivalent code would be an error because the Dog class does not explicitly describe itself as being an implementer of the Pet interface.

// TypeScript’s structural type system was designed based on how JavaScript code is typically written. 
// Because JavaScript widely uses anonymous objects like function expressions and object literals, it’s much more natural to represent the kinds of relationships found in JavaScript libraries with a structural type system instead of a nominal one.


/** A Note on Soundness */

// TypeScript’s type system allows certain operations that can’t be known at compile-time to be safe.
// When a type system has this property, it is said to not be “sound”.
// The places where TypeScript allows unsound(不健全的；不可靠的；) behavior were carefully considered, and throughout this document we’ll explain where these happen and the motivating scenarios behind them.


/** Starting out */

// The basic rule for TypeScript’s structural type system is that x is compatible with y if y has at least the same members as x.
// For example consider the following code involving an interface named Pet which has a name property:

interface Pet2 {
  name: string;
}
let pet2: Pet2;
// dog's inferred type is { name: string; owner: string; }
let dog2 = { name: "Lassie", owner: "Rudd Weatherwax" };
pet2 = dog2;

// To check whether dog can be assigned to pet, the compiler checks each property of pet to find a corresponding compatible property in dog. 
// In this case, dog must have a member called name that is a string. It does, so the assignment is allowed.

// The same rule for assignment is used when checking function call arguments:

interface Pet3 {
  name: string;
}
let dog3 = { name: "Lassie", owner: "Rudd Weatherwax" };
function greet3(pet: Pet) {
  console.log("Hello, " + pet.name);
}
greet3(dog3)

// Note that dog has an extra owner property, but this does not create an error. 
// Only members of the target type (Pet in this case) are considered when checking for compatibility.

// This comparison process proceeds recursively, exploring the type of each member and sub-member.


/** Comparing two functions */

// While comparing primitive types and object types is relatively straightforward, the question of what kinds of functions should be considered compatible is a bit more involved.
// Let’s start with a basic example of two functions that differ only in their parameter lists:

let x4 = (a: number) => 0;
let y4 = (b: number, s: string) => 0;
y4 = x4 // OK
// x4 = y4 // Error

// To check if x is assignable to y, we first look at the parameter list. Each parameter in x must have a corresponding parameter in y with a compatible type. Note that the names of the parameters are not considered, only their types.
// In this case, every parameter of x has a corresponding compatible parameter in y, so the assignment is allowed.

// The second assignment is an error, because y has a required second parameter that x does not have, so the assignment is disallowed.

y4(1, '2')
x4(1)

// You may be wondering why we allow ‘discarding’ parameters like in the example y = x. 
// The reason for this assignment to be allowed is that ignoring extra function parameters is actually quite common in JavaScript. 
// For example, Array#forEach provides three parameters to the callback function: the array element, its index, and the containing array.
// Nevertheless, it’s very useful to provide a callback that only uses the first parameter:

let items = [1, 2, 3];
// Don't force these extra parameters
items.forEach((item, index, array) => console.log(item));
// Should be OK!
items.forEach((item) => console.log(item));


// Now let’s look at how return types are treated, using two functions that differ only by their return type:

let x5 = () => ({ name: "Alice" });
let y5 = () => ({ name: "Alice", location: "Seattle" });
x5 = y5 // OK
// y5 = x5 // Error because x5() lacks a location property

let resX5 = x5()
let resY5 = y5()
resX5 = resY5
// resY5 = resX5

// The type system enforces that the source function’s return type be a subtype of the target type’s return type.


/** Function Parameter Bivariance */

// When comparing the types of function parameters, assignment succeeds if either the source parameter is assignable to the target parameter, or vice versa. 
// This is unsound because a caller might end up being given a function that takes a more specialized type, but invokes the function with a less specialized type. 
// In practice, this sort of error is rare, and allowing this enables many common JavaScript patterns. A brief example:

enum EventType {
  Mouse,
  Keyboard,
}
interface Event {
  timestamp: number;
}
interface MyMouseEvent extends Event {
  x: number;
  y: number;
}
interface MyKeyEvent extends Event {
  keyCode: number;
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}

// Unsound, but useful and common
// listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + "," + e.y));
// tsconfig --strictFunctionTypes true  -> 上面会报错。关闭时候不会
// Argument of type '(e: MyMouseEvent) => void' is not assignable to parameter of type '(n: Event) => void'.
//   Types of parameters 'e' and 'n' are incompatible.
//     Type 'Event' is missing the following properties from type 'MyMouseEvent': x, y

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) =>
  console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y)
);

listenEvent(EventType.Mouse, ((e: MyMouseEvent) =>
  console.log(e.x + "," + e.y)) as (e: Event) => void);

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e));
// Argument of type '(e: number) => void' is not assignable to parameter of type '(n: Event) => void'.
//   Types of parameters 'e' and 'n' are incompatible.
//     Type 'Event' is not assignable to type 'number'.

// You can have TypeScript raise errors when this happens via the compiler flag strictFunctionTypes.

/** Optional Parameters and Rest Parameters */

// When comparing functions for compatibility, optional and required parameters are interchangeable(可互换的). 
// Extra optional parameters of the source type are not an error, and optional parameters of the target type without corresponding parameters in the source type are not an error.

// When a function has a rest parameter, it is treated as if it were an infinite series of optional parameters.

// This is unsound from a type system perspective, but from a runtime point of view the idea of an optional parameter is generally not well-enforced since passing undefined in that position is equivalent for most functions.

// The motivating example is the common pattern of a function that takes a callback and invokes it with some predictable (to the programmer) but unknown (to the type system) number of arguments:

function invokeLater(args: any[], callback: (...args: any[]) => void) {
  /* ... Invoke callback with 'args' ... */
}
// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));


/** Functions with overloads */

// When a function has overloads, each overload in the source type must be matched by a compatible signature on the target type. 
// This ensures that the target function can be called in all the same situations as the source function.


/** Enums */

// Enums are compatible with numbers, and numbers are compatible with enums. Enum values from different enum types are considered incompatible. For example,

enum Status {
  Ready,
  Waiting,
}
enum Color {
  Red,
  Blue,
  Green,
}
let status = Status.Ready;
// let status: Status
// status = Color.Red // Error Type 'Color.Red' is not assignable to type 'Status'.
status = Status.Waiting // OK


/** Classes */

// Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type.
// When comparing two objects of a class type, only members of the instance are compared.
// Static members and constructors do not affect compatibility.

class Animal {
  feet: number = 0;
  constructor(name: string, numFeet: number) {}
}
class Size {
  feet: number = 1;
  // feet2: number = 1;
  constructor(numFeet: number) {}
}
let a: Animal = new Animal('wang', 0);
let s: Size = new Size(0);
a = s // OK
s = a // OK


/** Private and protected members in classes */

// Private and protected members in a class affect their compatibility.
// When an instance of a class is checked for compatibility, if the target type contains a private member, then the source type must also contain a private member that originated from the same class.
// Likewise, the same applies for an instance with a protected member. 
// This allows a class to be assignment compatible with its super class, but not with classes from a different inheritance hierarchy which otherwise have the same shape.

class Animal2 {
  private feet: number = 0;

  constructor(name: string, numFeet: number) {}
}
class Size2 extends Animal2 {
  // feet2: number = 1;
  constructor(numFeet: number) {
    super('li', numFeet)
  }
}
let a2: Animal2 = new Animal2('wang', 0);
let s2: Size2 = new Size2(0);
a2 = s2 // OK
s2 = a2 // OK


/** Generics */

// Because TypeScript is a structural type system, type parameters only affect the resulting type when consumed as part of the type of a member. For example,

interface Empty6<T> {
  // a: T
}
let x6: Empty6<number> = {
  // a: 1
};
let y6: Empty6<string> = {
  // a: '1'
};
x6 = y6 // OK, because y matches structure of x
y6 = x6

// In the above, x and y are compatible because their structures do not use the type argument in a differentiating way.
// Changing this example by adding a member to Empty<T> shows how this works:

interface Empty7<T> {
  data: T
}
let x7: Empty7<number> = {
  data: 1
};
let y7: Empty7<string> = {
  data: '1'
};
// x7 = y7 // Error, because x and y are not compatible
// Type 'Empty7<string>' is not assignable to type 'Empty7<number>'.
  // Type 'string' is not assignable to type 'number'.
// y7 = x7 // Error, because x and y are not compatible
// Type 'Empty7<number>' is not assignable to type 'Empty7<string>'.
  // Type 'number' is not assignable to type 'string'.

// In this way, a generic type that has its type arguments specified acts just like a non-generic type.

// For generic types that do not have their type arguments specified, compatibility is checked by specifying any in place of all unspecified type arguments. 
// The resulting types are then checked for compatibility, just as in the non-generic case.
// For example,

let identity = function <T>(x: T): T {
  // ...
  return x
};

let reverse = function <U>(y: U): U {
  // ...
  return y
};

identity = reverse // OK, because (x: any) => any matches (y: any) => any
reverse = identity // OK, because (x: any) => any matches (y: any) => any


/** Advanced Topics */

/** Subtype vs Assignment */

// So far, we’ve used “compatible”, which is not a term defined in the language spec. 
// In TypeScript, there are two kinds of compatibility: subtype and assignment. 
// These differ only in that assignment extends subtype compatibility with rules to allow assignment to and from any, and to and from enum with corresponding numeric values.

// Different places in the language use one of the two compatibility mechanisms, depending on the situation. 
// For practical purposes, type compatibility is dictated by assignment compatibility, even in the cases of the implements and extends clauses.

/** Any, unknown, object, void, undefined, null, and never assignability */

// The following table summarizes assignability between some abstract types.
// Rows indicate what each is assignable to, columns indicate what is assignable to them.
// A ”✓!” indicates a combination that is compatible only when strictNullChecks is off.

/*
            any	        unknown	    object	    void	      undefined	    null	    never
any→		    \           ✓	          ✓	          ✓	          ✓	           ✓	      ✕
unknown →	  ✓		        \           ✕	          ✕	          ✕	           ✕	      ✕
object →	  ✓	          ✓		        \           ✕	          ✕	           ✕	      ✕
void →	    ✓	          ✓	          ✕		        \           ✕	           ✕	      ✕
undefined →	✓	          ✓	          ✓!	        ✓		        \            ✓!	       ✕
null →	    ✓	          ✓	          ✓!	        ✓!	        ✓!		       \         ✕
never →	    ✓	          ✓	          ✓	          ✓	          ✓	           ✓         \

*/

// Reiterating The Basics:

// Everything is assignable to itself.

// any and unknown are the same in terms of what is assignable to them, different in that unknown is not assignable to anything except any.

// unknown and never are like inverses of each other. 
// Everything is assignable to unknown, never is assignable to everything. 
// Nothing is assignable to never, unknown is not assignable to anything (except any).

// void is not assignable to or from anything, with the following exceptions: any, unknown, never, undefined, and null (if strictNullChecks is off, see table for details).

// When strictNullChecks is off, null and undefined are similar to never: assignable to most types, most types are not assignable to them. They are assignable to each other.

// When strictNullChecks is on, null and undefined behave more like void: not assignable to or from anything, except for any, unknown, never, and void (undefined is always assignable to void).