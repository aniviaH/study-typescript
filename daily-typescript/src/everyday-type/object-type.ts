// The parameter's type annotation is an object type
function printCoord(pt: { x: number }) {
  console.log("The coordinate's x value is " + pt.x);
  // console.log("The coordinate's y value is " + pt.y);
}
const p0 = { x: 3, y: 7 }
// printCoord({ x: 3, y: 7 });
// Argument of type '{ x: number; y: number; }' is not assignable to parameter of type '{ x: number; }'.
  // Object literal may only specify known properties, and 'y' does not exist in type '{ x: number; }'.

printCoord(p0); // 不报错


type Point = {
  x: number
}

let p1: Point  = { x: 3}
const p2 = {x: 3, y: 7}

// const p3: Point = {x: 3, y: 7}
// Type '{ x: number; y: number; }' is not assignable to type 'Point'.
  // Object literal may only specify known properties, and 'y' does not exist in type 'Point'.
  
const p4 = {}

p1 = p2

// p1 = p4 // Property 'x' is missing in type '{}' but required in type 'Point'.

printCoord(p2);
