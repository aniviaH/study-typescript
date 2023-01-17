/** indexed access */

// We can use an indexed access type to look up a specific property on another type:

type Person4 = { age: number; name: string; alive: boolean };
type Age = Person4["age"];
// type Age2 = Person4.age; // Cannot access 'Person4.age' because 'Person4' is a type, but not a namespace. Did you mean to retrieve the type of the property 'age' in 'Person4' with 'Person4["age"]'?

// The indexing type is itself a type, so we can use unions, keyof, or other types entirely:

type I1 = Person4["age" | "name"];
    // type I1 = string | number

type I2 = Person4[keyof Person4];
    // type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person4[AliveOrName];
    // type I3 = string | boolean

// You’ll even see an error if you try to index a property that doesn’t exist:

// type I4 = Person4['alve']; // Property 'alve' does not exist on type 'Person4'.

// Another example of indexing with an arbitrary type is using number to get the type of an array’s elements. 
// e can combine this with typeof to conveniently capture the element type of an array literal:

const arr3 = [1, 2, 3, '4']
const t3: typeof arr3[3] = '5'

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person5 = typeof MyArray[number];
    // type Person5 = {
    //   name: string;
    //   age: number;
    // }

type Age2 = typeof MyArray[number]["age"];
    // type Age2 = number

// Or
type Age3 = Person5["age"];
    // type Age3 = number


// You can only use types when indexing, meaning you can’t use a const to make a variable reference:

const key = "name";
// type Age4 = Person5[key];
// Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?

// However, you can use a type alias for a similar style of refactor:

type Age5 = Person5[typeof key];

// Or

type KeyName = 'name'
type KeyAge = 'age'
type Age6 = Person5[KeyName];
    // type Age6 = string
type Age7 = Person5[KeyAge];
    // type Age7 = number

