class Point1 {
  x: number = 0;
  y: number = 0;
  constructor (x: number, y:  number) {
    this.x = x
    this.y = y
  }
}
 
const pt = new Point1(1, 0);
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);

// pt.x = "0"; // Type 'string' is not assignable to type 'number'.


// class BadGreeter {
//   name: string = 'a';
//   // Property 'name' has no initializer and is not definitely assigned in the constructor.
// }

class GoodGreeter {
  name: string;
 
  constructor(name: number) {
    // this.name = name; // Type 'number' is not assignable to type 'string'.

    this.name = 'a'
  }
}

class OKGreeter {
  // Not initialized, but no error
  name!: string;
}


class Greeter {
  readonly name: string = "world";
 
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
 
  err() {
    // this.name = "not ok";
    // Cannot assign to 'name' because it is a read-only property.
  }
}
const g = new Greeter();
// g.name = "also not ok";

class Point3 {
  x: number;
  y: number;
 
  // Normal signature with defaults
  // constructor(x = 0, y = 0) {
  //   this.x = x;
  //   this.y = y;
  // }

  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
    this.x = xs
    this.y = y
  }
}

class Base {
  k = 4;
}
 
class Derived extends Base {
  constructor() {
    super()
    // Prints a wrong value in ES5; throws exception in ES6
    console.log(this.k);
    // 'super' must be called before accessing 'this' in the constructor of a derived class.
    super();
  }
}

class Point5 {
  x = 10;
  y = 10;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

class C {
  _length = 0;
  get length() {
    return this._length;
  }
  // set length(value) {
  //   this._length = value;
  // }
}

const c = new C()
C.length

class Thing {
  _size = 0;
 
  get size(): number {
    return this._size;
  }
 
  set size(value: string | number | boolean) {
    let num = Number(value);
 
    // Don't allow NaN, Infinity, etc
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
 
    this._size = num;
  }
}

interface Animal8 {
  dateOfBirth: any;
}

interface Dog8 extends Animal8 {
  breed: any;
}

const dog8 : Dog8 = {
  dateOfBirth: 1,
  breed: 2
}
 
class AnimalHouse {
  resident: Animal8;
  constructor(animal: Animal8) {
    this.resident = animal;
  }
}
 
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog8;
  constructor(dog: Dog8) {
    super(dog);
  }
}

// class Base9 {
//   name = "base";
//   constructor() {
//     console.log("My name is " + this.name);
//   }
// }
 
// class Derived9 extends Base9 {
//   name = "derived";
// }
 
// // Prints "base", not "derived"
// const d9 = new Derived9();

// class MsgError extends Error {
//   constructor(m: string) {
//     super(m);
//   }
//   sayHello() {
//     return "hello " + this.message;
//   }
// }

class MsgError extends Error {
  constructor(m: string) {
    super(m);
 
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }
 
  sayHello() {
    return "hello " + this.message;
  }
}