// function padLeft(padding: number | string, input: string): string {
//   throw new Error("Not implemented yet!");
// }

// function padLeft(padding: number | string, input: string) {
//   return " ".repeat(padding) + input;
// // Argument of type 'string | number' is not assignable to parameter of type 'number'.
//   // Type 'string' is not assignable to type 'number'.
// }

// function padLeft(padding: number | string, input: string) {
//   if (typeof padding === "number") {
//     return " ".repeat(padding) + input;
//   }
//   return padding + input;
// }


// type guard
// Within our if check, TypeScript sees typeof padding === "number" and understands that as a special form of code called a type guard
// narrowing
// TypeScript follows possible paths of execution that our programs can take to analyze the most specific possible type of a value at a given position. 
// It looks at these special checks (called type guards) and assignments, 
// and the process of refining types to more specific types than declared is called narrowing

function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
      // (parameter) padding: number
  }
  return padding + input;
    // (parameter) padding: string
}

// There are a couple of different constructs TypeScript understands for narrowing.

/** 1. typeof type guards */

function printAll(strs: string | string[] | null) {
  if (!strs) {
    console.log(strs)
  } else {
    if (typeof strs === "object") {
      for (const s of strs) {
        // Object is possibly 'null'.
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    } else {
      // do nothing
      console.log(strs)
    }
  }
}

/** 2. Truthiness narrowing */

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

// both of these result in 'true'
var b = Boolean("hello"); // type: boolean, value: true
var b2 = !!"world"; // type: true, value: true

const t1 = typeof b
const t2 = typeof b2
function testBoolean (v: string) {
  const t1 = Boolean(v)
  const t2 = !!v
  if (t1) {
    console.log(t1);
  } else if (t2) {
    console.log(t2);
  }
}
testBoolean('hello')

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    console.log(strs);
  }
}

function printAll3(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
// We wrapped the entire body of the function in a truthy check, but this has a subtle downside: 
// we may no longer be handling the empty string case correctly.

// TypeScript doesn’t hurt us here at all, but this is behavior worth noting if you’re less familiar with JavaScript. 
// TypeScript can often help you catch bugs early on, 
// but if you choose to do nothing with a value, there’s only so much that it can do without being overly prescriptive. 
// If you want, you can make sure you handle situations like these with a linter.

// One last word on narrowing by truthiness is that Boolean negations with ! filter out from negated branches.
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}

/** 3. Equality narrowing */
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.

    x.toUpperCase();
      // (method) String.toUpperCase(): string

    y.toLowerCase();
      // (method) String.toLowerCase(): string
  } else {
    console.log(x);
                // (parameter) x: string | number

    console.log(y);
                // (parameter) y: string | boolean
  }
}

function printAll4(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
                      // (parameter) strs: string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
                  // (parameter) strs: string
    }
  } else {
    console.log(strs);
  }
}


interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
                          // (property) Container.value: number

    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

/** 4. The in operator narrowing */

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

{
  type Fish = { swim: () => void };
  type Bird = { fly: () => void };
  type Human = { swim?: () => void; fly?: () => void };
  
  function move2(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
      console.log(animal);
                // (parameter) animal: Fish | Human
    } else {
      console.log(animal);
                // (parameter) animal: Bird | Human
    }
  }
}

/** 5. instanceof narrowing */

// JavaScript has an operator for checking whether or not a value is an “instance” of another value. 
// More specifically, in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype. 
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
              // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
              // (parameter) x: string
  }
}

/** 6. Assignments */

let xxx = Math.random() < 0.5 ? 10 : "hello world!";
    // let xxx: string | number
xxx = 1;
console.log(xxx);
          // let xxx: number
xxx = "goodbye!";
console.log(xxx);
          // let xxx: string

let x2 = Math.random() < 0.5 ? 10 : "hello world!";
    // let x: string | number
x2 = 1;
console.log(x2);
          // let x2: number
// x2 = true;
// Type 'boolean' is not assignable to type 'string | number'.
console.log(x);
          // let x: string | number


/** Control flow analysis */

function padLeft5(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

function example2() {
  let x: string | number | boolean;
 
  x = Math.random() < 0.5;
  console.log(x);
    // let x: boolean
 
  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
              // let x: string
  } else {
    x = 100;
    console.log(x);
            // let x: number
  }
  return x;
      // let x: string | number
}

/** Using type predicates */

function isFish(pet: Fish | Bird): pet is Fish{
  return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
type Fish2 = { swim: () => void, name?: string };
type Bird2 = { fly: () => void, name?: string };
function getSmallPet() {
  const t = {
    name: 'name',
    // swim: () => {},
    fly: () => {},
  }
  return t
}
let pet = getSmallPet();
 
// const f = isFish(pet)
if (isFish(pet)) {
  pet.swim();
  pet.fly()
} else {
  pet.fly();
}

function isFish2(pet: Fish | Bird) {
  return (pet as Fish).swim !== undefined;
}

const zoo: (Fish2 | Bird2)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish2[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish2[] = zoo.filter(isFish2) as Fish2[];
 
// The predicate may need repeating for more complex examples
const underWater3: Fish2[] = zoo.filter((pet): pet is Fish2 => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});

/** Discriminated unions */
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function handleShape(shape: Shape) {
  // oops!
  // if (shape.kind === "rect") { // This condition will always return 'false' since the types '"circle" | "square"' and '"rect"' have no overlap.
    
  // }
}

function getArea(shape: Shape) {
  // return Math.PI * shape.radius ** 2;
                      // Object is possibly 'undefined'.
}

function getArea2(shape: Shape) {
  if (shape.kind === "circle") {
    // return Math.PI * shape.radius ** 2;
                      // Object is possibly 'undefined'.
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape2 = Circle | Square;
function getArea3(shape: Shape2) {
  // return Math.PI * shape.radius ** 2;
  // error regardless of how strictNullChecks is configured
  // Property 'radius' does not exist on type 'Shape'.
    // Property 'radius' does not exist on type 'Square'.

  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.sideLength ** 2
  }
}

// discriminated union 可区分联合类型/可辨识联合类型
// When every type in a union contains a common property with literal types, 
// TypeScript considers that to be a discriminated union, and can narrow out the members of the union.

// In this case, kind was that common property (which is what’s considered a discriminant property of Shape). 
// Checking whether the kind property was "circle" got rid of every type in Shape that didn’t have a kind property with the type "circle". 
// That narrowed shape down to the type Circle.

// The same checking works with switch statements as well. Now we can try to write our complete getArea without any pesky ! non-null assertions.

function getArea4(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
                      // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;
            // (parameter) shape: Square
  }
}

// !!! The important thing here was the encoding of Shape. 
// !!! Communicating the right information to TypeScript - that Circle and Square were really two separate types with specific kind fields - was crucial（至关重要的）. 
// Doing that let us write type-safe TypeScript code that looks no different than the JavaScript we would’ve written otherwise. 
// From there, the type system was able to do the “right” thing and figure out the types in each branch of our switch statement.

// As an aside, try playing around with the above example and remove some of the return keywords. 
// You’ll see that type-checking can help avoid bugs when accidentally falling through different clauses in a switch statement.

// !!! Discriminated unions are useful for more than just talking about circles and squares. 
// They’re good for representing any sort of messaging scheme in JavaScript, 
// like when sending messages over the network (client/server communication), or encoding mutations in a state management framework.


 
function getArea5(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}
 
type Shape3 = Circle | Square | Triangle;
 
function getArea6(shape: Shape3) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    // default:
    //   const _exhaustiveCheck: never = shape;
    //   // Type 'Triangle' is not assignable to type 'never'.
    //   return _exhaustiveCheck;
  }
}