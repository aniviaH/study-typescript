function printId(id: number | string) {
  console.log("Your ID is: " + id);

  // console.log(id.toUpperCase()); // Property 'toUpperCase' does not exist on type 'string | number'.
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 }); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

// Narrowing
// The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. 
// Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
function printId2(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a slice method. 
// If every member in a union has a property in common, you can use that property without narrowing:
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

/**
 * Notice:
 * It might be confusing that a union of types appears to have the intersection of those types’ properties. 
 * This is not an accident - the name union comes from type theory. 
 * The union number | string is composed by taking the union of the values from each type. 
 * Notice that given two sets with corresponding facts about each set, only the intersection of those facts applies to the union of the sets themselves. 
 * For example, if we had a room of tall people wearing hats, and another room of Spanish speakers wearing hats, after combining those rooms, 
 * the only thing we know about every person is that they must be wearing a hat.
 */