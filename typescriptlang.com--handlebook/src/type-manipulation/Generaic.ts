type ObjT<Type> = {
  s: Type
}
const objT: ObjT<string> = {
  s: '1'
}

// A major part of software engineering is building components that not only have well-defined and consistent APIs, but are also reusable. 
// Components that are capable of working on the data of today as well as the data of tomorrow will give you the most flexible capabilities for building up large software systems.

// In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. 
// This allows users to consume these components and use their own types.


/** 1. Hello World of Generics */

// To start off, let’s do the “hello world” of generics: the identity function. 
// The identity function is a function that will return back whatever is passed in. 
// You can think of this in a similar way to the echo command.

// Without generics, we would either have to give the identity function a specific type:

function identity(arg: number): number {
  return arg;
}

// Or, we could describe the identity function using the any type:

function identity2(arg: any): any {
  return arg;
}

// While using any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are losing the information about what that type was when the function returns. 
// If we passed in a number, the only information we have is that any type could be returned.

function identity3<Type>(arg: Type): Type {
  return arg;
}

// type variable
// Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned. 
// Here, we will use a type variable, a special kind of variable that works on types rather than values.

// We’ve now added a type variable Type to the identity function. 
// This Type allows us to capture the type the user provides (e.g. number), so that we can use that information later. 
// Here, we use Type again as the return type. On inspection, we can now see the same type is used for the argument and the return type. 
// This allows us to traffic that type information in one side of the function and out the other.

// We say that this version of the identity function is generic, as it works over a range of types. 
// Unlike using any, it’s also just as precise (i.e., it doesn’t lose any information) as the first identity function that used numbers for the argument and return type.

// Once we’ve written the generic identity function, 
// we can call it in one of two ways. The first way is to pass all of the arguments, including the type argument, to the function:

let output = identity3<string>("myString");

// Here we explicitly set Type to be string as one of the arguments to the function call, denoted using the <> around the arguments rather than ().

// type argument inference

// The second way is also perhaps the most common. Here we use type argument inference — that is, we want the compiler to set the value of Type for us automatically based on the type of the argument we pass in:

let output2 = identity3("myString");

// Notice that we didn’t have to explicitly pass the type in the angle brackets (<>); the compiler just looked at the value "myString", and set Type to its type. 
// While type argument inference can be a helpful tool to keep code shorter and more readable, you may need to explicitly pass in the type arguments as we did in the previous example when the compiler fails to infer the type, as may happen in more complex examples.


/** 2. Working with Generic Type Variables */

// When you begin to use generics, you’ll notice that when you create generic functions like identity, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. 
// That is, that you actually treat these parameters as if they could be any and all types.

// Let’s take our identity function from earlier:

function identity4<Type>(arg: Type): Type {
  return arg;
}

// What if we want to also log the length of the argument arg to the console with each call? We might be tempted to write this:

function loggingIdentity<Type>(arg: Type): Type {
  // console.log(arg.length);
              // Property 'length' does not exist on type 'Type'.
  return arg;
}

// When we do, the compiler will give us an error that we’re using the .length member of arg, but nowhere have we said that arg has this member. 
// Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.

// Let’s say that we’ve actually intended this function to work on arrays of Type rather than Type directly. 
// Since we’re working with arrays, the .length member should be available. We can describe this just like we would create arrays of other types:

function loggingIdentity2<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

// You can read the type of loggingIdentity as “the generic function loggingIdentity takes a type parameter Type, and an argument arg which is an array of Types, and returns an array of Types.” 
// If we passed in an array of numbers, we’d get an array of numbers back out, as Type would bind to number. 
// This allows us to use our generic type variable Type as part of the types we’re working with, rather than the whole type, giving us greater flexibility.

// We can alternatively write the sample example this way:
function loggingIdentity3<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// You may already be familiar with this style of type from other languages. 
// In the next section, we’ll cover how you can create your own generic types like Array<Type>.


/** 3. Generic Types */

// In previous sections, we created generic identity functions that worked over a range of types. 
// In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.

// The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:

function identity5<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity1: <Type>(arg: Type) => Type = identity5;

// We could also have used a different name for the generic type parameter in the type, so long as the number of type variables and how the type variables are used line up.

function identity6<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity2: <Input>(arg: Input) => Input = identity6;

// We can also write the generic type as a call signature of an object literal type:

function identity7<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity3: { <Type>(arg: Type): Type } = identity7;

// Which leads us to writing our first generic interface. Let’s take the object literal from the previous example and move it to an interface:

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity8<Type>(arg: Type): Type {
  return arg;
}

let myIdentity4: GenericIdentityFn = identity8;

// In a similar example, we may want to move the generic parameter to be a parameter of the whole interface. 
// This lets us see what type(s) we’re generic over (e.g. Dictionary<string> rather than just Dictionary). 
// This makes the type parameter visible to all the other members of the interface.

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
 
function identity9<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity5: GenericIdentityFn2<number> = identity9;

// Notice that our example has changed to be something slightly different. 
// Instead of describing a generic function, we now have a non-generic function signature that is a part of a generic type. 
// When we use GenericIdentityFn, we now will also need to specify the corresponding type argument (here: number), effectively locking in what the underlying call signature will use. Understanding when to put the type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic.

// In addition to generic interfaces, we can also create generic classes. Note that it is not possible to create generic enums and namespaces.


/** 4. Generic Classes */

// A generic class has a similar shape to a generic interface. 
// Generic classes have a generic type parameter list in angle brackets (<>) following the name of the class.

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;

  // static getValue: (x: NumType) => {} // Static members cannot reference class type parameters.
  static getValue: (x: unknown) => {}

  constructor (zeroValue: NumType) {
    this.zeroValue = zeroValue
  }
}
 
let myGenericNumber = new GenericNumber<number>(1);
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// This is a pretty literal use of the GenericNumber class, but you may have noticed that nothing is restricting it to only use the number type. 
// We could have instead used string or even more complex objects.


let stringNumeric = new GenericNumber<string>('a');
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
 
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Just as with interface, putting the type parameter on the class itself lets us make sure all of the properties of the class are working with the same type.

// As we cover in our section on classes, a class has two sides to its type: the static side and the instance side. 
// Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.

/** 5. Generics Constraints */

// If you remember from an earlier example, you may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have. 
// In our loggingIdentity example, we wanted to be able to access the .length property of arg, but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.

function loggingIdentity4<Type>(arg: Type): Type {
  // console.log(arg.length);
                  // Property 'length' does not exist on type 'Type'.
  return arg;
}

// Instead of working with any and all types, we’d like to constrain this function to work with any and all types that also  have the .length property. 
// As long as the type has this member, we’ll allow it, but it’s required to have at least this member. 
// To do so, we must list our requirement as a constraint on what Type can be.

// To do so, we’ll create an interface that describes our constraint. 
// Here, we’ll create an interface that has a single .length property and then we’ll use this interface and the extends keyword to denote our constraint:

interface Lengthwwise {
  length: number;
}

function loggingIdentity5<Type extends Lengthwwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// Because the generic function is now constrained, it will no longer work over any and all types:

// loggingIdentity5(5) // Argument of type 'number' is not assignable to parameter of type 'Lengthwwise'.
// loggingIdentity5<number>(5) // Type 'number' does not satisfy the constraint 'Lengthwwise'.

// Instead, we need to pass in values whose type has all the required properties:

loggingIdentity({ length: 10, value: 3 });


/** 6. Using Type Parameters in Generic Contraints */

// You can declare a type parameter that is constrained by another type parameter. 
// For example, here we’d like to get a property from an object given its name. We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the obj, so we’ll place a constraint between the two types:

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x1 = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x1, 'a')
// getProperty(x1, 'e') // Argument of type '"e"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
/**
   function getProperty<{
    a: number;
    b: number;
    c: number;
    d: number;
  }, "a" | "b" | "c" | "d">(obj: {
    a: number;
    b: number;
    c: number;
    d: number;
  }, key: "a" | "b" | "c" | "d"): number
 */


/** 7. Using Class Types in Generics */

// When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. 
// For example,

class ClassTest1 {
  a: number;
  // numLegs: number;
}

function create<Type>(c: { new (): Type }): Type {
  return new c();
}

create(ClassTest1)

// A more advanced example uses the prototype property to infer and constrain relationships between the constructor function and the instance side of class types.

class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal4 {
  numLegs: number = 4;
}
 
class Bee extends Animal4 {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal4 {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal4>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// createInstance(ClassTest1)
// Argument of type 'typeof ClassTest1' is not assignable to parameter of type 'new () => Animal4'.
  // Property 'numLegs' is missing in type 'ClassTest1' but required in type 'Animal4'.

class ClassTest2 {
  numLegs: number;
}
createInstance(ClassTest2)
