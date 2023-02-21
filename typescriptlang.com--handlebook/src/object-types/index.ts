export {}

/** Object Types */

// In JavaScript, the fundamental way that we group and pass around data is through objects. 
// In TypeScript, we represent those through object types.

// As we’ve seen, they can be anonymous:

function greet3(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

// or they can be named by using either an interface

interface Person {
  name: string;
  age: number;
}
 
function greet4(person: Person) {
  return "Hello " + person.name;
}

// or a type alias.

type Person2 = {
  name: string;
  age: number;
};
 
function greet5(person: Person2) {
  return "Hello " + person.name;
}

// In all three examples above, we’ve written functions that take objects that contain the property name (which must be a string) and age (which must be a number).

/** 1. Property Modifiers */

// !!! Each property in an object type can specify a couple of things: 
// the type, 
// whether the property is optional, 
// and whether the property can be written to.

/** 1.1 Optional Properties */

// Much of the time, we’ll find ourselves dealing with objects that might have a property set. 
// In those cases, we can mark those properties as optional by adding a question mark (?) to the end of their names.

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}
function getShape () {
  return {
    kind: "circle" as const,
    radius: 10
  }
}
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// In this example, both xPos and yPos are considered optional. 
// We can choose to provide either of them, so every call above to paintShape is valid. 
// All optionality really says is that if the property is set, it better have a specific type.

// We can also read from those properties - but when we do under strictNullChecks, TypeScript will tell us they’re potentially undefined.

function paintShape1(opts: PaintOptions) {
  let xPos = opts.xPos;
      // (property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos;
      // (property) PaintOptions.yPos?: number | undefined
  // ...
}

// In JavaScript, even if the property has never been set, we can still access it - it’s just going to give us the value undefined. We can just handle undefined specially.

function paintShape2(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
      // let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
      // let yPos: number
  // ...
}

// Note that this pattern of setting defaults for unspecified values is so common that JavaScript has syntax to support it.

function paintShape3({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
                                // (parameter) xPos: number
  console.log("y coordinate at", yPos);
                                // (parameter) yPos: number
  // ...
}

// Here we used a destructuring pattern for paintShape’s parameter, and provided default values for xPos and yPos. 
// Now xPos and yPos are both definitely present within the body of paintShape, but optional for any callers to paintShape.

// !!! Note: Note that there is currently no way to place type annotations within destructuring patterns. 
// This is because the following syntax already means something different in JavaScript.

// function draw({ shape: Shape, xPos: number = 100 /*...*/ }) { // Binding element 'Shape' implicitly has an 'any' type.
//   console.log('shape--', shape);
//                         // Cannot find name 'shape'. Did you mean 'Shape'?
//   console.log('xPos--', xPos);
//                         // Cannot find name 'xPos'.
// }

// In an object destructuring pattern, shape: Shape means “grab the property shape and redefine it locally as a variable named Shape. 
// Likewise xPos: number creates a variable named number whose value is based on the parameter’s xPos.

// Using mapping modifiers, you can remove optional attributes.

/** 1.2 readonly Properties */

// Properties can also be marked as readonly for TypeScript. While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.

interface SomeType {
  readonly prop: string;
}
 
function doSomething1(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // But we can't re-assign it.
  // obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}

// Using the readonly modifier doesn’t necessarily imply that a value is totally immutable - or in other words, that its internal contents can’t be changed. It just means the property itself can’t be re-written to.

interface Home {
  readonly resident: { name: string; age: number };
}
const home: Home = {
  resident: {
    name: 'a',
    age: 10
  }
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
 
function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  // home.resident = { // Cannot assign to 'resident' because it is a read-only property.
  //   name: "Victor the Evictor",
  //   age: 42,
  // };
}

// !!! It’s important to manage expectations of what readonly implies. It’s useful to signal intent during development time for TypeScript on how an object should be used. 
// !!! TypeScript doesn’t factor in whether properties on two types are readonly when checking whether those types are compatible, so readonly properties can also change via aliasing.

interface Person3 {
  name: string;
  age: number;
}
 
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
 
let writablePerson: Person3 = {
  name: "Person McPersonface",
  age: 42,
};
 
// works
let readonlyPerson: ReadonlyPerson = writablePerson;
 
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

// readonlyPerson.age++ // Cannot assign to 'age' because it is a read-only property.


/** 1.3 Index Signatures */

// Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.

// In those cases you can use an index signature to describe the types of possible values, for example:

interface StringArray {
  [index: number]: string;
}
function getStringArray() {
  // return ['a', 'b']
  return 'abc'

  // return [1, 2, 3]
  // Type 'number[]' is not assignable to type 'StringArray'.
  // 'number' index signatures are incompatible.
    // Type 'number' is not assignable to type 'string'.
}
const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

// Above, we have a StringArray interface which has an index signature. 
// This index signature states that when a StringArray is indexed with a number, it will return a string.

// Only some types are allowed for index signature properties: string, number, symbol, template string patterns, and union types consisting only of these.


// !!! It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. 
// !!! This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

interface Animal3 {
  name: string;
}
 
interface Dog extends Animal3 {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  // [x: number]: Animal3;
  // 'number' index type 'Animal3' is not assignable to 'string' index type 'Dog'.
  [x: string]: Dog;
}
// the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. 
interface Okay1 {
  [x: number]: Dog;
  [x: string]: Animal3;
}

interface Okay2 {
  [x: string]: Animal3;
  [x: number]: Dog;
}

let dog: Dog = {
  name: 'wang',
  breed: 'breed',
}
let animal: Animal3 = {
  name: 'animal'
}

// dog = animal
animal = dog


// While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type. 
// This is because a string index declares that obj.property is also available as obj["property"]. 
// In the following example, name’s type does not match the string index’s type, and the type checker gives an error:

interface NumberDictionary {
  [index: string]: number;
 
  length: number; // ok
  // name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

// However, properties of different types are acceptable if the index signature is a union of the property types:

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
function getReadOnlyStringArray() {
  return ['1']
}
let myArray2: ReadonlyStringArray = getReadOnlyStringArray();
// myArray2[2] = "Mallory";
// Index signature in type 'ReadonlyStringArray' only permits reading.

// You can’t set myArray[2] because the index signature is readonly.

/** 2. Extending Types */

// It’s pretty common to have types that might be more specific versions of other types. 
// For example, we might have a BasicAddress type that describes the fields necessary for sending letters and packages in the U.S.

// interface BasicAddress {
//   name?: string;
//   street: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// In some situations that’s enough, but addresses often have a unit number associated with them if the building at an address has multiple units. We can then describe an AddressWithUnit.

// interface AddressWithUnit {
//   name?: string;
//   unit: string;
//   street: string;
//   city: string;
//   country: string;
//   postalCode: string;
// }

// This does the job, but the downside here is that we had to repeat all the other fields from BasicAddress when our changes were purely additive. 
// Instead, we can extend the original BasicAddress type and just add the new fields that are unique to AddressWithUnit.

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want. 
// This can be useful for cutting down the amount of type declaration boilerplate we have to write, and for signaling intent that several different declarations of the same property might be related. 
// For example, AddressWithUnit didn’t need to repeat the street property, and because street originates from BasicAddress, a reader will know that those two types are related in some way.

// interfaces can also extend from multiple types.

interface Colorful1 {
  color: string;
}
 
interface Circle1 {
  radius: number;
}
 
interface ColorfulCircle extends Colorful1, Circle1 {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};


/** 3. Intersection Types （交叉类型） */

// interfaces allowed us to build up new types from other types by extending them. 
// !!! TypeScript provides another construct called intersection types that is mainly used to combine existing object types.

// !!! An intersection type is defined using the & operator.

interface Colorful2 {
  color: string;
}
interface Circle2 {
  radius: number;
}
 
type ColorfulCircle2 = Colorful2 & Circle2;

// Here, we’ve intersected Colorful and Circle to produce a new type that has all the members of Colorful and Circle.

function draw(circle: Colorful2 & Circle2) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}
 
// okay
draw({ color: "blue", radius: 42 });
 
// oops
// draw({ color: "red", raidus: 42 });
// Argument of type '{ color: string; raidus: number; }' is not assignable to parameter of type 'Colorful2 & Circle2'.
  // Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful2 & Circle2'. Did you mean to write 'radius'?

/** 4. Interfaces vs. Intersections */

// We just looked at two ways to combine types which are similar, but are actually subtly different. 
// With interfaces, we could use an extends clause to extend from other types, and we were able to do something similar with intersections and name the result with a type alias. 
// The principle difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you’d pick one over the other between an interface and a type alias of an intersection type.


/** 5. Generic Object Types */

// Let’s imagine a Box type that can contain any value - strings, numbers, Giraffes, whatever.

// interface Box {
//   contents: any;
// }

// Right now, the contents property is typed as any, which works, but can lead to accidents down the line.

// We could instead use unknown, but that would mean that in cases where we already know the type of contents, we’d need to do precautionary checks, or use error-prone type assertions.

interface Box {
  contents: unknown;
}
 
let box: Box = {
  contents: "hello world",
};
 
// we could check 'x.contents'
if (typeof box.contents === "string") {
  console.log(box.contents.toLowerCase());
}
 
// or we could use a type assertion
console.log((box.contents as string).toLowerCase());


// One type safe approach would be to instead scaffold out different Box types for every type of contents.

interface NumberBox {
  contents: number;
}
 
interface StringBox {
  contents: string;
}
 
interface BooleanBox {
  contents: boolean;
}

// But that means we’ll have to create different functions, or overloads of functions, to operate on these types.

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}

// That’s a lot of boilerplate. Moreover, we might later need to introduce new types and overloads. 
// This is frustrating, since our box types and overloads are all effectively the same.

// Instead, we can make a generic Box type which declares a type parameter.

interface Box2<Type> {
  contents: Type;
}

// You might read this as “A Box of Type is something whose contents have type Type”. 
// Later on, when we refer to Box, we have to give a type argument in place of Type.

let box2: Box2<string>;

let box3: Box2<number> = {
  contents: 1
}

// Think of Box as a template for a real type, where Type is a placeholder that will get replaced with some other type. 
// When TypeScript sees Box<string>, it will replace every instance of Type in Box<Type> with string, and end up working with something like { contents: string }. 
// In other words, Box<string> and our earlier StringBox work identically.

interface Box4<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}
 
let boxA: Box4<string> = { contents: "hello" };
boxA.contents;
    // (property) Box4<string>.contents: string
let boxB: StringBox = { contents: "world" };
boxB.contents;
    // (property) StringBox.contents: string


// Box is reusable in that Type can be substituted with anything. 
// That means that when we need a box for a new type, we don’t need to declare a new Box type at all (though we certainly could if we wanted to).

interface Box6<Type> {
  contents: Type;
}
 
interface Apple {
  // ....
  color: string
}
 
// Same as '{ contents: Apple }'.
type AppleBox = Box6<Apple>;
const apple: Box6<Apple> = {
  contents: {
    color: 'green'
  }
}

// This also means that we can avoid overloads entirely by instead using generic functions.

function setContents2<Type>(box: Box6<Type>, newContents: Type) {
  box.contents = newContents;
}

// It is worth noting that type aliases can also be generic. We could have defined our new Box<Type> interface, which was:

interface Box7<Type> {
  contents: Type;
}

// by using a type alias instead:

type Box8<Type> = {
  contents: Type
}

// Since type aliases, unlike interfaces, can describe more than just object types, we can also use them to write other kinds of generic helper types.

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
    // type OneOrManyOrNull<Type> = OneOrMany<Type> | null

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
    // type OneOrManyOrNullStrings = OneOrMany<string> | null

/** 5.1 The Array Type */

// Generic object types are often some sort of container type that work independently of the type of elements they contain. 
// It’s ideal for data structures to work this way so that they’re re-usable across different data types.

// It turns out we’ve been working with a type just like that throughout this handbook: the Array type. 
// Whenever we write out types like number[] or string[], that’s really just a shorthand for Array<number> and Array<string>.

function doSomething(value: Array<string>) {
  // ...
}
 
let myArray3: string[] = ["hello", "world"];
 
// either of these work!
doSomething(myArray3);
doSomething(new Array("hello", "world"));

// Much like the Box type above, Array itself is a generic type.

interface MyArray<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;
 
  // ...
}

// Modern JavaScript also provides other data structures which are generic, like Map<K, V>, Set<T>, and Promise<T>. 
// All this really means is that because of how Map, Set, and Promise behave, they can work with any sets of types.

/** 5.2 The ReadonlyArray Type */

// The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.

function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  // values.push("hello!");
        // Property 'push' does not exist on type 'readonly string[]'.

  // values.pop()
        // Property 'pop' does not exist on type 'readonly string[]'.
}

// Much like the readonly modifier for properties, it’s mainly a tool we can use for intent. 
// When we see a function that returns ReadonlyArrays, it tells us we’re not meant to change the contents at all, 
// and when we see a function that consumes ReadonlyArrays, it tells us that we can pass any array into that function without worrying that it will change its contents.

// Unlike Array, there isn’t a ReadonlyArray constructor that we can use.

// new ReadonlyArray()
    // 'ReadonlyArray' only refers to a type, but is being used as a value here.

// Instead, we can assign regular Arrays to ReadonlyArrays.

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
// roArray.push('yellow') // Property 'push' does not exist on type 'readonly string[]'.

// Just as TypeScript provides a shorthand syntax for Array<Type> with Type[], it also provides a shorthand syntax for ReadonlyArray<Type> with readonly Type[].

const roArray2: readonly string[] = ['a', 'b', 'c']
// roArray2.push('d') // Property 'push' does not exist on type 'readonly string[]'.

function doStuff2(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
 
  // ...but we can't mutate 'values'.
  // values.push("hello!");
        // Property 'push' does not exist on type 'readonly string[]'.
  // values.pop()
        // Property 'push' does not exist on type 'readonly string[]'.
}

// One last thing to note is that unlike the readonly property modifier, assignability isn’t bidirectional（双向） between regular Arrays and ReadonlyArrays.

let xxxx: readonly string[] = [];
let yyyy: string[] = [];
 
xxxx = yyyy;
// yyyy = xxxx; // The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.

// roArray2 = ['c'] // Cannot assign to 'roArray2' because it is a constant.

let obj4:  {
  readonly a: number
} = {
  a: 1
}
let obj5: {
  a: number
} = {
  a: 1
}

obj4 = obj5
obj5 = obj4

obj4 = {a: 2}
obj5 = {a: 3}

// let obj6: readonly string[] = ['a']


/** 6. Tuple Types */

// A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

// type StringNumberPair = [string, number];

// Here, StringNumberPair is a tuple type of string and number. Like ReadonlyArray, it has no representation at runtime, but is significant to TypeScript. 
// To the type system, StringNumberPair describes arrays whose 0 index contains a string and whose 1 index contains a number.

function doSomething6(pair: [string, number]) {
  const a = pair[0];
        // const a: string
  const b = pair[1];
        // const b: number
  // const c = pair[2];
                // Tuple type '[string, number]' of length '2' has no element at index '2'.
  // ...
}
 
doSomething6(["hello", 1]);

// We can also destructure tuples using JavaScript’s array destructuring.

function doSomething7(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString);
            // const inputString: string

  console.log(hash);
            // const hash: number
}

// Note: Tuple types are useful in heavily convention-based APIs, where each element’s meaning is “obvious”. 
// This gives us flexibility in whatever we want to name our variables when we destructure them. 
// In the above example, we were able to name elements 0 and 1 to whatever we wanted.
// However, since not every user holds the same view of what’s obvious, it may be worth reconsidering whether using objects with descriptive property names may be better for your API.


// Other than those length checks, simple tuple types like these are equivalent to types which are versions of Arrays that declare properties for specific indexes, and that declare length with a numeric literal type.

interface StringNumberPair2 {
  // specialized properties
  length: 2;
  0: string;
  1: number;
 
  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}

function doSomething8(pair: StringNumberPair2) {
  const a = pair[0];
        // const a: string

  const b = pair[1];
        // const b: number
}

// Another thing you may be interested in is that tuples can have optional properties by writing out a question mark (? after an element’s type). 
// Optional tuple elements can only come at the end, and also affect the type of length.

type Either2dOr3d = [number, number, number?];
 
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
              // const z: number | undefined
  console.log(`Provided coordinates had ${coord.length} dimensions`);
                                                // (property) length: 2 | 3
}

// Tuples can also have rest elements, which have to be an array/tuple type.

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

// StringNumberBooleans describes a tuple whose first two elements are string and number respectively, but which may have any number of booleans following.
// StringBooleansNumber describes a tuple whose first element is string and then any number of booleans and ending with a number.
// BooleansStringNumber describes a tuple whose starting elements are any number of booleans and ending with a string then a number.

// A tuple with a rest element has no set “length” - it only has a set of well-known elements in different positions.

const arr4: StringNumberBooleans = ["hello", 1];
const arr5: StringNumberBooleans = ["beautiful", 2, true];
const arr6: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// Why might optional and rest elements be useful? Well, it allows TypeScript to correspond tuples with parameter lists. 
// Tuples types can be used in rest parameters and arguments, so that the following:

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

// is basically equivalent to:

function readButtonInput2(name: string, version: number, ...input: boolean[]) {
  // ...
}

// This is handy when you want to take a variable number of arguments with a rest parameter, and you need a minimum number of elements, but you don’t want to introduce intermediate variables.

/** 6.1 readonly Tuple Types */

// One final note about tuple types - tuples types have readonly variants, and can be specified by sticking a readonly modifier in front of them - just like with array shorthand syntax.

function doSomething0(pair: readonly [string, number]) {
  // ...
  // pair[0] = 'b' // Cannot assign to '0' because it is a read-only property.
}

// As you might expect, writing to any property of a readonly tuple isn’t allowed in TypeScript.

// Tuples tend to be created and left un-modified in most code, so annotating types as readonly tuples when possible is a good default. 
// This is also important given that array literals with const assertions will be inferred with readonly tuple types.

let point = [3, 4] as const;
 
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
 
// distanceFromOrigin(point);
// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
  // The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.

// Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple. Since point’s type was inferred as readonly [3, 4], it won’t be compatible with [number, number] since that type can’t guarantee point’s elements won’t be mutated.