/** 1. The typeof type operator */

// JavaScript already has a typeof operator you can use in an expression context:

// Prints "string"
console.log(typeof "Hello world");

// TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property:

let s2 = "hello";
let n2: typeof s;

// This isn’t very useful for basic types, but combined with other type operators, you can use typeof to conveniently express many patterns. 
// For an example, let’s start by looking at the predefined type ReturnType<T>. It takes a function type and produces its return type:

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
    // type K = boolean

// If we try to use ReturnType on a function name, we see an instructive error:

function f() {
  return { x: 10, y: 3 };
}
// type P2 = ReturnType<f>; // 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?

// Remember that values and types aren’t the same thing. To refer to the type that the value f has, we use typeof:
type P2 = ReturnType<typeof f>;
    // type P2 = {
    //   x: number;
    //   y: number;
    // }

type P3 = typeof f
    // type P3 = () => {
    //   x: number;
    //   y: number;
    // }


/** 1.2 Limitations */

// TypeScript intentionally limits the sorts of expressions you can use typeof on.

// Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties. 
// This helps avoid the confusing trap of writing code you think is executing, but isn’t:

function msgbox () {
  return 'msgbox'
}
interface Test {
  a: number;
}
// Meant to use = ReturnType<typeof msgbox>
// let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // ',' expected.

type shouldContinue2 = ReturnType<typeof msgbox>
      // type shouldContinue2 = string
let shouldContinue: typeof msgbox
      // let shouldContinue: () => string