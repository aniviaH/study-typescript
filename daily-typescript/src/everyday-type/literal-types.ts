// In addition to the general types string and number, we can refer to specific strings and numbers in type positions.

let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
      // let changingString: string

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
      // const constantString: "Hello World"