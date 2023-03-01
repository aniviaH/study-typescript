export {}

class Base9 {
  name = "base";
  constructor() {
    console.log("Base9 My name is " + this.name);
  }
}
 
class Derived9 extends Base9 {
  name = "derived";

  constructor () {
    super()
    console.log("Derived9 My name is " + this.name);
  }
}
 
// Prints "base", not "derived"
const d9 = new Derived9();

class MyClass2 {
  static x = 0;
  static printX() {
    console.log(MyClass2.x);
  }
}
console.log(MyClass2.x);
MyClass2.printX();

class Base10 {
  static getGreeting() {
    return "Hello world222";
  }
}
class Derived10 extends Base10 {
  myGreeting = Derived10.getGreeting();
}
const d10 : Derived10 = new Derived10()
console.log(d10.myGreeting);

class S {
  // static name = "S!"; // Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
}

class Foo {
  static #count = 0;

  get count() {
      return Foo.#count;
  }

  static {
      try {
          const lastInstances = loadLastInstances();
          Foo.#count += lastInstances.length;
      }
      catch {}
  }
}
declare function loadLastInstances () : {length: number}

class Box2<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const boxx2 = new Box2("hello!");

class Box3<Type> {
  // static defaultValue: Type; // Static members cannot reference class type parameters.
  static defaultValue: boolean;
}
const b3 = Box3<string>
const b4 = Box3<number>
b3.defaultValue = true

class MyClass3 {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c4 = new MyClass3();
const g4 = c4.getName;
// Prints "MyClass" instead of crashing
console.log(g4());

class MyClassChild3 extends MyClass3 {
  constructor () {
    super()
    super.getName()
  }
}

declare type SomeType = {}
// TypeScript input with 'this' parameter
function fn1(this: SomeType, x: number) {
  /* ... */
}

class MyClass5 {
  name = "MyClass";
  getName(this: MyClass5) {
    return this.name;
  }
}
const c5 = new MyClass5();
// OK
c5.getName();
 
// Error, would crash
const g5 = c5.getName;
// console.log(g5()); // The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass5'.

class Box9 {
  contents: string = "";
  set(value: string) {
  // (method) Box9.set(value: string): this
    this.contents = value;
    return this;
  }
}

class ClearableBox extends Box9 {
  clear() {
    this.contents = "";
  }
}

const clearBox = new ClearableBox();
const clearBox2 = clearBox.set("hello");

class Box10 {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class Box11 {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box11 {
  otherContent: string = "?";
}

const base = new Box11();
const derived = new DerivedBox();
const derived2 = new DerivedBox();
// derived.sameAs(base);
// Argument of type 'Box11' is not assignable to parameter of type 'DerivedBox'.
  // Property 'otherContent' is missing in type 'Box11' but required in type 'DerivedBox'.
derived.sameAs(derived2);

class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}
 
class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}
 
class Directory extends FileSystemObject {
  children: FileSystemObject[] = [];
}
 
interface Networked {
  host: string;
}
 
const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
 
if (fso.isFile()) {
  fso.content;
  // const fso: FileRep
} else if (fso.isDirectory()) {
  fso.children;
  // const fso: Directory
} else if (fso.isNetworked()) {
  fso.host;
  // const fso: Networked & FileSystemObject
}

class Box12<T> {
  value?: T;
 
  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}
 
const box12 = new Box12();
box12.value = "Gameboy";
 
box12.value;
// (property) Box<unknown>.value?: unknown
 
if (box12.hasValue()) {
  box12.value;
  // (property) value: unknown
}

class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const params1 = new Params(1, 2, 3);
console.log(params1.x);
// (property) Params.x: number
// console.log(params1.z); // Property 'z' is private and only accessible within class 'Params'.

const someClass2 = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
 
const m = new someClass2("Hello, world");


abstract class Base3 {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}
 
// const base3 = new Base3(); // Cannot create an instance of an abstract class.

class Derived3 extends Base3 {
  getName() {
    return "world";
  }
}
 
const d3 = new Derived3();
d3.printName();

function greet(ctor: typeof Base3) {
  // const instance = new ctor();
                  // (parameter) ctor: abstract new () => Base3

                  // Error
                  // Cannot create an instance of an abstract class.
  // instance.printName();
}

function greet22(ctor: new () => Base3) {
  const instance = new ctor();
  instance.printName();
}
greet22(Derived3);
// greet22(Base3);
// Argument of type 'typeof Base3' is not assignable to parameter of type 'new () => Base3'.
  // Cannot assign an abstract constructor type to a non-abstract constructor type.


class Point11 {
  x = 0;
  y = 0;
  z = 1;
}
  
class Point22 {
  x = 0;
  y = 0;
  z = 1;
}
  
// OK
const p11: Point11 = new Point22();

class Person11 {
  name: string = '';
  age: number = 1;
}
 
class Employee11 {
  name: string = '';
  age: number = 1;
  salary: number = 1;
}
 
// OK
const p12: Person11 = new Employee11();

class Empty {}
 
function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}
 
// All OK!
fn(window);
fn({});
fn(fn);
fn(1)