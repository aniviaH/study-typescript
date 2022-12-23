import {helloWorld} from 'baseUrl/hello/world'

helloWorld()

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

  override setup(): void {}
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