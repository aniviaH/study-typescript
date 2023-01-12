/** bigint */

// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;


let foo: bigint = BigInt(100); // the BigInt function
let bar: bigint = 100n; // a BigInt literal
// *Slaps roof of fibonacci function*
// This bad boy returns ints that can get *so* big!
function fibonacci(n: bigint) {
  let result = 1n;
  for (let last = 0n, i = 0n; i < n; i++) {
    const current = result;
    result += last;
    last = current;
  }
  return result;
}
fibonacci(10000n);

declare let foo2: number;
declare let bar2: bigint;
// foo2 = bar; // error: Type 'bigint' is not assignable to type 'number'.
// bar2 = foo2; // error: Type 'number' is not assignable to type 'bigint'.

// console.log(3.141592 * 10000n); // error Operator '*' cannot be applied to types 'number' and 'bigint'.
// console.log(3145 * 10n); // error // Operator '*' cannot be applied to types 'number' and 'bigint'.
console.log(BigInt(3145) * 10n); // okay!

function whatKindOfNumberIsIt(x: number | bigint) {
  if (typeof x === "bigint") {
    console.log("'x' is a bigint!");
  } else {
    console.log("'x' is a floating-point number");
  }
}


/** symbol */
const firstName = Symbol("name");
const secondName = Symbol("name");
 
// if (firstName === secondName) { // error This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
// }