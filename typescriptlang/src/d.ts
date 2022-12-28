// interface Point {
//   x: number;
//   y: number;
// }

// interface SetPoint {
//   (x: number, y: number): void;
// }

// type Point = {
//   x: number;
//   y: number;
// }

// type SetPoint = (x: number, y: number) => void;

// type Name = string
// type PartialPointX = {x: number}
// type PartialPointY = {y: number}

// type PartialPoint = PartialPointX | PartialPointY

// type Data = [number, string]

// const p: PartialPoint = {
//   x: 1,
//   y: 2,
// }

// interface PartialPointX {x: number}
// interface Point extends PartialPointX {
//   y: number
// }

// type PartialPointX = {x: number}
// type Point = PartialPointX & {
//   y: number
// }

// type PartialPointX = {x: number}
// interface Point extends PartialPointX {y: number}

// interface PartialPointX {x: number}
// type Point = PartialPointX & {
//   y: number
// }

interface Point {
  x: number;
  y: number;
}
class SomePoint implements Point {
  x = 1;
  y = 2;
}
type Point2 = {
  x: number;
  y: number;
};
class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}
type PartialPoint = { x: number } | { y: number };
// FIXME: can not implement a union type
// class SomePartialPoint implements PartialPoint {
//   x = 1;
//   y = 2;
// }

// type Fruit = 'apple' | 'orange' | 'banana';

// type FruitCount = {
//   [key in Fruit]: number;
// }

// const fruits: FruitCount = {
//   apple: 2,
//   orange: 3,
//   banana: 4
// };

type Fruit = "apple" | "orange" | "banana";

// ERROR:
// interface FruitCount {
//   [key in Fruit]: number;
// }

type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
type Nullable = undefined | null;

function getLength(obj: string | string[]) {
  return obj.length;
}

function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
// declare const backpack: Backpack<string>;

// object is a string, because we declared it above as the variable part of Backpack.
// const object = backpack.get();

// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.add(23);

interface Point {
  x: number;
  y: number;
}

interface Point3 {
  x: number;
  y: number;
}

/* function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26, z: 2 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: "#187ABF" };
// logPoint(color);

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
 */

interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

function logPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}

function logName(x: Named) {
  console.log("Hello, " + x.name);
}

const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};

logPoint(obj);
logName(obj);

class Empty {}

function fn(arg: Empty) {
  // do something?
  console.log("args---", arg);
}

// No error, but this isn't an 'Empty' ?
fn({ k: 10 });

class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}
// No error?
let w: Car = new Golfer();

console.log(typeof new Car());

let fst: (a: any, b: any) => any = (a, b) => a;

let fst2: <T, U>(a: T, b: U) => T = (a, b) => a;

// Object literal type syntax closely mirrors object literal value syntax:
// let o = { n: 1, xs: [], x: false }
// let o2: { n: number; xs: object[] } = oo;

// with "noImplicitAny": false in tsconfig.json, anys: any[]
const anys = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });

// anys.map(anys[1]); // oh no, "oh no" is not a function

// let sepsis = anys[0] + anys[1]; // this could mean anything

// Structural typing is a familiar concept to most functional programmers, although Haskell and most MLs are not structurally typed. Its basic form is pretty simple:

// @strict: false
let o = { x: "hi", extra: 1 }; // ok
// let o3: { x: string } = { x: "hi", extra: 1 }; // not ok
let o3: { x: string } = o; // ok

type One = { p: string; x: number };
interface Two {
  p: string;
}
class Three {
  p = "Hello";
}

let x: One = { p: "hi", x: 2 };
let two: Two = x;
two = new Three();

let lit = { a: 1 };
let lit2 = { a: 2, b: 3 };

// lit = {a: 3, b: 1}

// lit = lit2
// lit2 = {a: 3, b: 4}

interface Student {
  name: string;
  age: number;
}
interface Student2 {
  name: string;
  age: number;
  sex: string;
}
const s1: Student = {
  name: "张三",
  age: 29,
};

const s2 = {
  name: "张三",
  age: 29,
  sex: "男",
  f: 3,
};

const s3: Student = s2;

// const s4: Student2 = {
//   name: '张三',
//   age: 29,
// }

function start(
  arg: string | string[] | (() => string) | { s: string }
): string {
  // this is super common in JavaScript
  if (typeof arg === "string") {
    return commonCase(arg);
  } else if (Array.isArray(arg)) {
    return arg.map(commonCase).join(",");
  } else if (typeof arg === "function") {
    return commonCase(arg());
  } else {
    return commonCase(arg.s);
  }

  function commonCase(s: string): string {
    // finally, just convert a string to another string
    return s;
  }
}

type Combined = { a: string } & { a: unknown };
type Conflicting = { a: number } & { a: string };

const c1: Combined = {
  a: "a",
};
// type c2 = Conflicting.a
type c3 = Combined["a"];

type c4 = string & number;

declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("hi", 10, "left");

let s: "left" | "right" = "right";
pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'

// s = '1'

let ss = "I'm a string!";

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);

declare function map<T, U>(ts: T[], f: (t: T) => U): U[];
let sns2 = map([1, 2, 3], (n) => n.toString());

declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
  o.inference = "INSERT STATE HERE";
});

let ii: { sss: string } = run((t) => {});

type f = () => void;

const f2: () => void = () => {
  console.log("f2---");
  return 1;
};
f2();

type Size = [number, number];
let x2: Size = [101.1, 999.9];

type FString = string & { __compileTimeOnly: any };
let sss: string = "s";
// const fs: FString = sss

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

const shape: Shape = {
  kind: "circle",
  radius: 1,
  // x: 1,
  // y: 2
};

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}

function height(s: Shape) {
  if (s.kind === "circle") {
    return 2 * s.radius;
  } else {
    // s.kind: "square" | "triangle"
    return s.x;
  }
}

function liftArray<T>(t: T): Array<T> {
  return [t];
}
liftArray(1);

function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}

firstish({length: 1}, {length: 2})
// firstish(1, 2)

// function length<T extends ArrayLike<unknown>>(t: T): number {}
// function length1(t: ArrayLike<unknown>): number {}

// function length2<T extends ArrayLike<unknown>, U>(m: T<U>) {}

const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:

interface Rx {
  readonly x: number;
}
// let rx: Rx = { x: 1 };
// rx.x = 12; // error

interface X {
  x: number;
}
let rx: Readonly<X> = { x: 1 };
// rx.x = 12; // error

let a1: ReadonlyArray<number> = [1, 2, 3];
let b: readonly number[] = [1, 2, 3];
// a1.push(102); // error
// b[0] = 101; // error
// a1[0] = 101
let a2: readonly [string, number] = ['1', 2]

type MyReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}

let a3 = [1, 2, 3] as const;
// a3.push(102); // error
// a3[0] = 101; // error

let a4 = {a: 'a', b: 'b'} as const
// a4.a = 'aa'
console.log('a4--', a4);