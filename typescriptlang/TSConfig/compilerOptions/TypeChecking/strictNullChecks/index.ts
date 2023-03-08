declare const loggedInUsername: string
const users = [
  { name: 'Oby', age: 12 },
  { name: 'Heera', age: 12 },
]

const loggedInUser = users.find((u) => u.name === loggedInUsername)
console.log(loggedInUser.name);
          // 'loggedInUser' is possibly 'undefined'.

/*
 */

// When strictNullChecks: true

// type Array = {
//   find(predicate: (value: any, index: number) => boolean): S | undefined;
// };

// When strictNullChecks: false the undefined is removed from the type system,

// allowing you to write code which assumes it always found a result
// type Array = {
//   find(predicate: (value: any, index: number) => boolean): S;
// };