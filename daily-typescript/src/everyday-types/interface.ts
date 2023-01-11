interface Point3 {
  x: number;
  y: number;
}

function printCoord3(pt: Point3) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

const ppp1 = { x: 100, y: 100, z: 100 }
printCoord3(ppp1)

// printCoord3({ x: 100, y: 100, z: 100 }) // Error
// Argument of type '{ x: number; y: number; z: number; }' is not assignable to parameter of type 'Point3'.
  // Object literal may only specify known properties, and 'z' does not exist in type 'Point3'.

// const ppp3: Point3 = { x: 100, y: 100, z: 100 } // Error
// Type '{ x: number; y: number; z: number; }' is not assignable to type 'Point3'.
  // Object literal may only specify known properties, and 'z' does not exist in type 'Point3'.


let ppp4 = { x: 100, y: 100 }
ppp4 = ppp1

// structurally typed type system
// Just like when we used a type alias above, the example works just as if we had used an anonymous object type. 
// TypeScript is only concerned with the structure of the value we passed to printCoord - it only cares that it has the expected properties. 
// Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system.