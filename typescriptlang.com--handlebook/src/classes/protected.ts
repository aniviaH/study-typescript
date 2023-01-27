// class Dog declares private fields using JavaScript's # prefix
// JavaScript's private is hard private. It's strictly enforced.
// TypeScript does not strip # during compilation.
class Dog3 {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}

// class Cat declares private fields using TypeScript's "private" keyword.
// TypeScript's private is soft private. It's not strictly enforced and has escape hatches.
// TypeScript strips "private" during compilation, meaning the fields are no longer private during runtime.
class Cat {
    private meowAmount = 0;
    personality = "angry";

    constructor() {}
}

const fido = new Dog3();
const garfield = new Cat();

// fido.#barkAmount;
// fido['#barkAmount'];
// garfield.meowAmount;
// garfield['meowAmount']; // "private" allows access with bracket notation as an escape hatch.


class Base2 {
  private x = 0;
}
// class Derived2 extends Base2 {
//     // Class 'Derived' incorrectly extends base class 'Base'.
//       // Property 'x' is private in type 'Base' but not in type 'Derived'.
//   x = 1;
// }

class A2 {
  private x = 10;
 
  public sameAs(other: A2) {
    // No error
    return other.x === this.x;
  }
}

class A3 extends A2 {
  public same (other: A2) {
    // console.log(other.x);
                        // Property 'x' is private and only accessible within class 'A2'.
  }
}

class MySafe {
  private secretKey = 12345;
}
 
const s3 = new MySafe();
 
// Not allowed during type checking
// console.log(s3.secretKey);
// Property 'secretKey' is private and only accessible within class 'MySafe'.
 
// OK
console.log(s3["secretKey"]);

type IndexData = boolean | ((s: string) => boolean);
class MyClass {
  [s: string]: IndexData
 
  check(s: string) {
    return this[s] as boolean;
  }
}

interface Pingable {
  ping(): void;
}
interface Pongable {
  pong(): void;
}

class Sonar implements Pingable, Pongable {
  ping() {
    console.log("ping!");
  }
  pong () {
    console.log('pong!');
  }
}

class Ball implements Pingable {
  // Class 'Ball' incorrectly implements interface 'Pingable'.
    // Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  pong() {
    console.log("pong!");
  }

  ping () {
    
  }
}

interface Checkable {
  check(name: string): boolean;
}
 
// class NameChecker implements Checkable {
//   check(s) {
//     // Parameter 's' implicitly has an 'any' type.
//         // Notice no error here
//     return s.toLowercse() === "ok";
//   }
// }

interface A4 {
  x: number;
  y?: number;
}
class C3 implements A4 {
  x = 0;
}
const c3 = new C3();
c3.x = 10;
// c3.y = 10;
// Property 'y' does not exist on type 'C3'.

class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog2 extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog2();
// Base class method
d.move();
// Derived class method
d.woof(3);

class Base5 {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived5 extends Base5 {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d5 = new Derived5();
d5.greet();
d5.greet("reader");

const d6: Base5 = d5
d6.greet()
// d6.greet('reader') // Expected 0 arguments, but got 1.

class Base7 {
  greet() {
    console.log("Hello, world!");
  }
}
 
// class Derived7 extends Base7 {
//   // Make this parameter required
//   greet(name: string) {
//   // Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
//     // Type '(name: string) => void' is not assignable to type '() => void'.
//     console.log(`Hello, ${name.toUpperCase()}`);
//   }
// }

// const d7: Base7 = new Derived7();
// // Crashes because "name" will be undefined
// d7.greet();
