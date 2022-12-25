import { helloWorld } from "baseUrl/hello/world";
import { app } from "app/index";

import jsonSettings from "./../setting.json";

import { TitleComponent, type TitleComponentProps } from "./TitleComponent";

import {d} from './../d'

export {
  TitleComponentProps,
  TitleComponent
}

type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];
 
function f(a: A, b: B) {
  b = a; // Ok
  // a = b; // Error
}

type Point = { x: number; y: number };
// const p: Point = { x: 1, y: 3, m: 10 };

const obj = { x: 10 };
// console.log(obj["foo"]);

function LogMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}
 
var x: {
  propertyWithAnExceedinglyLongName1: string;
  propertyWithAnExceedinglyLongName2: string;
  propertyWithAnExceedinglyLongName3: string;
  propertyWithAnExceedinglyLongName4: string;
  propertyWithAnExceedinglyLongName5: string;
  propertyWithAnExceedinglyLongName6: string;
  propertyWithAnExceedinglyLongName7: string;
  propertyWithAnExceedinglyLongName8: string;
};

// var s: string = x

// class Demo {
//   @LogMethod
//   public foo(bar: number) {
//     // do nothing
//   }
// }
 
// const demo = new Demo();

// import a from './../a'

console.log(jsonSettings.debug === true);
jsonSettings.debug === true;

declare const enum Numbers {
  Zero = 0,
  One = 1,
}
console.log(Numbers.Zero + Numbers.One);

const str = "Hello!";
for (const s of str) {
  console.log(s);
}

/**
 * Days available in a week
 * @internal
 */
export const daysInAWeek = 7;

/** Calculate how much someone earns in a week */
export function weeklySalary(dayRate: number) {
  return daysInAWeek * dayRate;
}

enum Album1 {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album1.JimmyEatWorldFutures;
if (selectedAlbum === Album1.JimmyEatWorldFutures) {
  console.log("That is a great choice.");
}

app();

helloWorld();

// export const a: number = 1

function foo(param: any) {
  console.log("foo---", param);
}

function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  // return true;
}

function verifyAge(age: number) {
  // Forgot 'return' statement
  if (age > 18) {
    // verified: true;
  }
}

interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride: "dark" | "light" | undefined;
}
declare function getUserSettings(): UserDefaults;
// function getUserSettings () {
//   return {
//     colorThemeOverride: ''
//   }
// }
const settings = getUserSettings();
settings.colorThemeOverride = "dark";
settings.colorThemeOverride = "light";
settings.colorThemeOverride = undefined;

const a: number = 6;

switch (a) {
  case 0:
    console.log("even");
    break;
  case 1:
    console.log("odd");
    break;
}

class Album {
  setup() {
    // Default behavior
  }
}

class MLAlbum extends Album {
  override setup() {
    // Override to get info from algorithm
  }
}

class SharedAlbum extends Album {
  download() {
    // Override to get info from many sources
  }

  override setup() {}
}

class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getAreaFunction() {
    // return function () {
    //   return this.width * this.height;
    // };
    return this.width * this.height;
  }
}

interface GameSettings {
  // Known up-front properties
  speed: "fast" | "medium" | "slow";
  quality: "high" | "low";

  // Assume anything unknown to the interface
  // is a string.
  [key: string]: string;
}
declare function getSettings(): GameSettings;

const settings2 = getSettings();
settings2.speed;

settings2.quality;

// Unknown key accessors are allowed on
// this object, and are `string`
// settings2.username;
settings2["username"];

interface EnvironmentVars {
  NAME: string;
  OS: string;

  // Unknown properties are covered by this index signature.
  [propName: string]: string;
}

declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env["NODE_ENV"];

// With strictBindCallApply on
function fn2(x: string) {
  return parseInt(x);
}

const n1 = fn2.call(undefined, "10");

// const n2 = fn2.call(undefined, false);

function fn3(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment
// let func2: StringOrNumberFunc = fn3;
// Unsafe call - will crash
// func2(10);

// type Methodish = {
//   func(x: string | number): void;
// };

// function fn4(x: string) {
//   console.log("Hello, " + x.toLowerCase());
// }

// // Ultimately an unsafe assignment, but not detected
// const m: Methodish = {
//   func: fn,
// };
// m.func(10);

declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser ? loggedInUser.age : "");

class UserAccount {
  name: string;
  accountType = "user";

  // email: string;
  address: string | undefined;

  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}

try {
  // ...
} catch (err) {
  // We have to verify err is an
  // error before using it as one.
  if (err instanceof Error) {
    console.log(err.message);
  }
}
