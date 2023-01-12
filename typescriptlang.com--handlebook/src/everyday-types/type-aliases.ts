type Point2 = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord2(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord2({ x: 100, y: 100 });

// printCoord2({ x: 100});
// Argument of type '{ x: number; }' is not assignable to parameter of type 'Point2'.
  // Property 'y' is missing in type '{ x: number; }' but required in type 'Point2'.

// printCoord2({ x: 100, y: 100, z: 100 });
// Argument of type '{ x: number; y: number; z: number; }' is not assignable to parameter of type 'Point2'.
  // Object literal may only specify known properties, and 'z' does not exist in type 'Point2'.

const pp1 = {x: 100, y: 100, z: 100} // OK
printCoord2(pp1)

// const pp2: Point2 = {x: 100, y: 100, z: 100} // Not Ok
// Type '{ x: number; y: number; z: number; }' is not assignable to type 'Point2'.
  // Object literal may only specify known properties, and 'z' does not exist in type 'Point2'.

let pp3: Point2 = {x: 100, y: 100}
pp3 = pp1 // OK 可以赋值过去（被声明的变量值，可以赋值到类型范围更小的类型的变量里）

// pp3 = {x: 100, y: 100, z: 100} // Not Ok
// Type '{ x: number; y: number; z: number; }' is not assignable to type 'Point2'.
  // Object literal may only specify known properties, and 'z' does not exist in type 'Point2'.

type ID = number | string;

// Note that aliases are only aliases - you cannot use type aliases to create different/distinct “versions” of the same type. 
// When you use the alias, it’s exactly as if you had written the aliased type. 
// In other words, this code might look illegal, but is OK according to TypeScript because both types are aliases for the same type:

type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
function sanitize (str: string): string {
  return str
}
// Create a sanitized input
let userInput = sanitizeInput(getInput());
function getInput (): string {
  return 'aaa'
}
// Can still be re-assigned with a string though
userInput = "new input";