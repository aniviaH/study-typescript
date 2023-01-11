// In addition to the general types string and number, we can refer to specific strings and numbers in type positions.

let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
// let changingString: string

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
// const constantString: "Hello World"

let xx: "hello" = "hello";
// OK
xx = "hello";
// ...
// xx = "howdy"; // Type '"howdy"' is not assignable to type '"hello"'.

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
// configure("automatic"); // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.

let booleanByLiteral: true | false = true
booleanByLiteral = false

const obj2 = { counter: 0 };
if (true) {
  obj2.counter = 1;
  // obj2.counter = '1'; // Type 'string' is not assignable to type 'number'.
}

function handleRequest (url: string, method: 'GET' | 'POST') {}

const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method); Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
handleRequest(req.url, 'GET');

// Change 1:
const req2 = { url: "https://example.com", method: "GET" as "GET"};
handleRequest(req2.url, req2.method);
// req2.method = 'POST' // Type '"POST"' is not assignable to type '"GET"'.

// Change 2:
const req3 = { url: "https://example.com", method: "GET"};
handleRequest(req3.url, req3.method as "GET");

// Change 1 means “I intend for req.method to always have the literal type "GET"”, preventing the possible assignment of "GUESS" to that field after. 
// Change 2 means “I know for other reasons that req.method has the value "GET"“.

const req4 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req4.method);

// The as const suffix acts like const but for the type system, 
// ensuring that all properties are assigned the literal type instead of a more general version like string or number.
