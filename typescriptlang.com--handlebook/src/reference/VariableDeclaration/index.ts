export {}

function f(input: boolean) {
  let a = 100;

  if (input) {
    // Still okay to reference 'a'
    let b = a + 1;
    return b;
  }
  // Error: 'b' doesn't exist here
  return b;
}

// window.xxxyyy = 'xxxyyy'

// a++; // illegal to use 'a' before it's declared;
// let a;

function foo() {
  // okay to capture 'a'
  return a;
}
foo();
let a: number = 1;

function f2(x: number) {
  // let x = 100; // error: interferes with parameter declaration
}

function g() {
  let x = 100;
  // var x = 100; // error: can't have both declarations of 'x'
}

function f3(condition: boolean, x: string) {
  if (condition) {
    let x = 100;
    return x;
  }
  return x;
}

let tuple: [number, string, boolean] = [7, "hello", true];
let [a1, b, c, ...d] = tuple;


let { a: aa3, b: bb3, c: cc3 = '1' } = { a: "baz", b: 101 }

type C = { a: string; b?: number };
function f4({ a, b }: C): void {
  // ...
}
function f5({ a, b = 0 } = {a: ''}): void {
  // ...
}
// f5({a: 1});


class C2 {
  p = 12;
  m() {}
}
let c2 = new C2();
let clone = { ...c2 };
clone.p; // ok
clone.m(); // error!