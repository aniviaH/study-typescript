const message = "hello!";

// message();
/**
 * This expression is not callable.
Type 'String' has no call signatures.
 */

export const user = {
  name: "Daniel",
  age: 26,
};
 
// user.location; // Property 'location' does not exist on type '{ name: string; age: number; }'.

const announcement = "Hello World!";
 
// How quickly can you spot the typos?
// announcement.toLocaleLowercase(); // Property 'toLocaleLowercase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?
// announcement.toLocalLowerCase(); // Property 'toLocalLowerCase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?
 
// We probably meant to write this...
announcement.toLocaleLowerCase();

function flipCoin() {
  // Meant to be Math.random()
  // return Math.random < 0.5; // Operator '<' cannot be applied to types '() => number' and 'number'.
}

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
}
// else if (value === "b") { // This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.
//   // Oops, unreachable
// }

// This is an industrial-grade general-purpose greeter function:
// function greet(person, date) {
//   console.log(`Hello ${person}, today is ${date}!`);
// }
 
// greet("Brendan");

function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// greet("Maddison", Date()); // Argument of type 'string' is not assignable to parameter of type 'Date'.

greet('zhangsan', new Date())

let msg = "hello there!";

