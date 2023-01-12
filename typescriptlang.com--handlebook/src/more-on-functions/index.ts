/** 1. Function Type Expressions */

function greeter2(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter2(printToConsole);

// function type expression -- (a: string) => void
// The syntax (a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”.
// Just like with function declarations, if a parameter type isn’t specified, it’s implicitly any.

// Note that the parameter name is required. The function type (string) => void means “a function with a parameter named string of type any“!

// Of course, we can use a type alias to name a function type:
type GreetFunction = (a: string) => void;
function greeter3(fn: GreetFunction) {
  // ...
  fn("Hello World");
}

/** 2. Call Signatures */

// In JavaScript, functions can have properties in addition to being callable.
// However, the function type expression syntax doesn’t allow for declaring properties.
// If we want to describe something callable with properties, we can write a call signature in an object type:
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething2(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
// Note that the syntax is slightly different compared to a function type expression - use : between the parameter list and the return type rather than =>.

/** 3. Construct Signatures */

// JavaScript functions can also be invoked with the new operator. TypeScript refers to these as constructors because they usually create a new object.
// You can write a construct signature by adding the new keyword in front of a call signature:
type SomeObject = {
  color: string;
};
type SomeConstructor = {
  new (s: string): SomeObject;
};
type SomeConstructor2 = {};
function fn(ctor: SomeConstructor) {
  // return ctor("hello"); // Value of type 'SomeConstructor' is not callable. Did you mean to include 'new'?
}
function fn2(ctor: SomeConstructor2) {
  // return ctor("hello");
  // This expression is not callable.
  // Type 'SomeConstructor2' has no call signatures.
}
function fn3(ctor: SomeConstructor) {
  return new ctor("hello");
}

// Some objects, like JavaScript’s Date object, can be called with or without new. 
// You can combine call and construct signatures in the same type arbitrarily:
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
function fn4 (ctor: CallOrConstruct) {
  new ctor('2023-01-11 09:00:00')

  ctor(1)
}

/** 4. Generic Functions */

// It’s common to write a function where the types of the input relate to the type of the output, or where the types of two inputs are related in some way. 
// Let’s consider for a moment a function that returns the first element of an array:

// function generic1<T>(arr: Array<T>) {
function generic1<T>(arr: T[]) {
  return arr[0]
}

function firstElement(arr: any[]) {
  return arr[0];
}

// This function does its job, but unfortunately has the return type any. 
// It’d be better if the function returned the type of the array element.

// In TypeScript, generics are used when we want to describe a correspondence between two values.
// We do this by declaring a type parameter in the function signature:
function firstElement2<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// By adding a type parameter Type to this function and using it in two places, we’ve created a link between the input of the function (the array) and the output (the return value). 
// Now when we call it, a more specific type comes out:

// s is of type 'string'
const s = firstElement2(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement2([1, 2, 3]);
// u is of type undefined
const u = firstElement2([]);

/** 5. Inference */

// Note that we didn’t have to specify Type in this sample. The type was inferred - chosen automatically - by TypeScript.

// We can use multiple type parameters as well. For example, a standalone version of map would look like this:

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// Note that in this example, TypeScript could infer both the type of the Input type parameter (from the given string array), 
// as well as the Output type parameter based on the return value of the function expression (number).


/** 6. Constraints */

// We’ve written some generic functions that can work on any kind of value. Sometimes we want to relate two values, but can only operate on a certain subset of values. 
// In this case, we can use a constraint to limit the kinds of types that a type parameter can accept.

// Let’s write a function that returns the longer of two values. To do this, we need a length property that’s a number. 
// We constrain the type parameter to that type by writing an extends clause:

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100); // Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.

const longerObj = longest({val: 1, length: 1}, {val: 2, length: 2});

// There are a few interesting things to note in this example. We allowed TypeScript to infer the return type of longest. 
// Return type inference also works on generic functions.

// Because we constrained Type to { length: number }, we were allowed to access the .length property of the a and b parameters. 
// Without the type constraint, we wouldn’t be able to access those properties because the values might have been some other type without a length property.

// The types of longerArray and longerString were inferred based on the arguments. 
// !!! Remember, generics are all about relating two or more values with the same type!

// Finally, just as we’d like, the call to longest(10, 100) is rejected because the number type doesn’t have a .length property.


/** 7. Working with Constrained Values */

// Here’s a common error when working with generic constraints:

function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // return { length: minimum };
    // Type '{ length: number; }' is not assignable to type 'Type'.
    // '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.

    return obj
  }
}

// It might look like this function is OK - Type is constrained to { length: number }, and the function either returns Type or a value matching that constraint. 
// The problem is that the function promises to return the same kind of object as was passed in, not just some object matching the constraint. If this code were legal, you could write code that definitely wouldn’t work:

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));

/** Specifying Type Arguments */

// TypeScript can usually infer the intended type arguments in a generic call, but not always. 
// For example, let’s say you wrote a function to combine two arrays:

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// Normally it would be an error to call this function with mismatched arrays:

const combineList1 = combine([1, 2, 3], [4, 5, 6])
// const combineList2 = combine([1, 2, 3], ["hello"]); // Type 'string' is not assignable to type 'number'.

// If you intended to do this, however, you could manually specify Type:
const combineList3 = combine<string | number>([1, 2, 3], ["hello"]);
// const res: (string | number)[] = [1, '3']


/** 8. Guidelines for Writing Good Generic Functions */

// Writing generic functions is fun, and it can be easy to get carried away with type parameters.
// Having too many type parameters or using constraints where they aren’t needed can make inference less successful, frustrating callers of your function.

/** 8.1 Push Type Parameters Down */

function firstElement3<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement4<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a1 = firstElement3([1, 2, 3]);
// b: any (bad)
const b1 = firstElement4([1, 2, 3]);

// These might seem identical at first glance, but firstElement3 is a much better way to write this function. 
// Its inferred return type is Type, but firstElement4’s inferred return type is any because TypeScript has to resolve the arr[0] expression using the constraint type, rather than “waiting” to resolve the element during a call.

// !!! Rule: When possible, use the type parameter itself rather than constraining it

/** 8.2 Use Fewer Type Parameters */

// Here’s another pair of similar functions:

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

const filtered1 = filter1([1, 2, 3], function (arg) {
  return arg > 2
})

const filtered2 = filter2([1, 2, 3], function (arg) {
  return arg > 2
})

// !!! We’ve created a type parameter Func that doesn’t relate two values. That’s always a red flag, because it means callers wanting to specify type arguments have to manually specify an extra type argument for no reason. 
// Func doesn’t do anything but make the function harder to read and reason about!

const filtered3 = filter1(['1', '2', '3'], function (arg) {
  // return arg > 2 // Operator '>' cannot be applied to types 'string' and 'number'.
        // (parameter) arg: string
  return !arg
})

// const filtered4 = filter1<number>(['1', '2', '3'], function (arg) { // Type 'string' is not assignable to type 'number'.
//   return arg > 2
//         // (parameter) arg: number
// })

const filtered5 = filter2(['1', '2', '3'], function (arg) {
  // return arg > 2 // Operator '>' cannot be applied to types 'string' and 'number'.
        // (parameter) arg: string
  return !arg
})

// const filtered6 = filter2<number, (arg: number) => boolean>(['1', '2', '3'], function (arg) { // Type 'string' is not assignable to type 'number'.
//   return arg > 2 // Operator '>' cannot be applied to types 'string' and 'number'.
//         // (parameter) arg: number
// })

// !!! Rule: Always use as few type parameters as possible

/** 8.3 Type Parameters Should Appear Twice */

// Sometimes we forget that a function might not need to be generic:

function greet1<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

// We could just as easily have written a simpler version:

function greet2(s: string) {
  console.log("Hello, " + s);
}

// !!! Remember, type parameters are for relating the types of multiple values. 
// If a type parameter is only used once in the function signature, it’s not relating anything.

// !!! Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

/** 9. Optional Parameters */

function f1(n: number) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}

function f2(x?: number) {
  // ...
}
f2(); // OK
f2(10); // OK

function f3(x = 10) {
  // ...
}

declare function f4(x?: number): void;
// cut
// All OK
f4();
f4(10);
f4(undefined);

// Optional Parameters in Callbacks

// Once you’ve learned about optional parameters and function type expressions, it’s very easy to make the following mistakes when writing functions that invoke callbacks:

function myForEach1(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
    // callback(arr[i]);
  }
}

// What people usually intend when writing index? as an optional parameter is that they want both of these calls to be legal:
myForEach1([1, 2, 3], (a) => console.log(a));
myForEach1([1, 2, 3], (a, i) => console.log(a, i));

// What this actually means is that callback might get invoked with one argument. 
// In other words, the function definition says that the implementation might look like this:

function myForEach2(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i]);
  }
}

// In turn, TypeScript will enforce this meaning and issue errors that aren’t really possible:
myForEach2([1, 2, 3], (a, i) => {
  // console.log(i.toFixed());
                // Object is possibly 'undefined'.
});

// In JavaScript, if you call a function with more arguments than there are parameters, the extra arguments are simply ignored. 
// TypeScript behaves the same way. Functions with fewer parameters (of the same types) can always take the place of functions with more parameters.

// Note: 
// When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument


/** 10. Function Overloads */

// !!! Some JavaScript functions can be called in a variety of argument counts and types. 
// For example, you might write a function to produce a Date that takes either a timestamp (one argument) or a month/day/year specification (three arguments).

// !!! In TypeScript, we can specify a function that can be called in different ways by writing overload signatures. 
// !!! To do this, write some number of function signatures (usually two or more), followed by the body of the function:

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.

// overload signatures
// In this example, we wrote two overloads: one accepting one argument, and another accepting three arguments. 
// These first two signatures are called the overload signatures.

// implementation signature
// Then, we wrote a function implementation with a compatible signature. 
// !!! Functions have an implementation signature, but this signature can’t be called directly. !!!
// !!! Even though we wrote a function with two optional parameters after the required one, it can’t be called with two parameters!

// 10.1 Overload Signatures and the Implementation Signature

// !!! This is a common source of confusion. Often people will write code like this and not understand why there is an error:

function fn5(x: string): void;
function fn5() {
  // ...
}
// Expected to be able to call with zero arguments
// fn5(); // Expected 1 arguments, but got 0.

// !!! Again, the signature used to write the function body can’t be “seen” from the outside.

// !!! Note: The signature of the implementation is not visible from the outside. When writing an overloaded function, you should always have two or more signatures above the implementation of the function.

// !!! The implementation signature must also be compatible with the overload signatures. 
// For example, these functions have errors because the implementation signature doesn’t match the overloads in a correct way:

// function fn6(x: boolean): void;
// // Argument type isn't right
// function fn6(x: string): void;
//         // This overload signature is not compatible with its implementation signature.
// function fn6(x: boolean): void {}

// function fn7(x: string): string;
// // Return type isn't right
// function fn7(x: number): number;
//         // This overload signature is not compatible with its implementation signature.
// function fn7(x: string | number) {
//   return "oops";
// }

/** 11. Writing Good Overloads */

// !!! Like generics, there are a few guidelines you should follow when using function overloads. Following these principles will make your function easier to call, easier to understand, and easier to implement.

// Let’s consider a function that returns the length of a string or an array:

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

// This function is fine; we can invoke it with strings or arrays. However, we can’t invoke it with a value that might be a string or an array, because TypeScript can only resolve a function call to a single overload:

len(""); // OK
len([0]); // OK
const random = Math.random() > 0.5 ? "hello" : [0]
// len(random);
// No overload matches this call.
  // Overload 1 of 2, '(s: string): number', gave the following error.
    // Argument of type '"hello" | number[]' is not assignable to parameter of type 'string'.
      // Type 'number[]' is not assignable to type 'string'.
  // Overload 2 of 2, '(arr: any[]): number', gave the following error.
    // Argument of type '"hello" | number[]' is not assignable to parameter of type 'any[]'.
      // Type 'string' is not assignable to type 'any[]'.

// Because both overloads have the same argument count and same return type, we can instead write a non-overloaded version of the function:

// This is much better! Callers can invoke this with either sort of value, and as an added bonus, we don’t have to figure out a correct implementation signature.

function len2(x: any[] | string) {
  return x.length;
}

len2(random);

// !!! Note: Always prefer parameters with union types instead of overloads when possible


/** 12. Declaring this in a Function */

// TypeScript will infer what the this should be in a function via code flow analysis, for example in the following:

const user2 = {
  id: 123,
 
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

// interface User {
//   name: string
//   admin: boolean
// }
// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[];
// }
// function getDB () {
//   const db = {
//     users: [
//       {name1: 'zhangsan'},
//       {name1: 'lisi'},
//     ],
//     filterUsers(filter: (this: User) => boolean) {
//       return this.users.filter(filter)
//     }
//   }
//   return db
// }
// const db: DB = getDB();
// const admins = db.filterUsers(function (this: User) {
//   return this.admin;
// });

// 不能使用箭头函数
// const admins = db.filterUsers(() => this.admin);
// The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.

