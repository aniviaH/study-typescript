export {};

// TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.

/** Awaited<Type> */

// This type is meant to model operations like await in async functions, or the .then() method on Promises - specifically, the way that they recursively unwrap Promises.

type A = Awaited<Promise<string>>;
// type A = string

type B = Awaited<Promise<Promise<number>>>;
// type B = number

type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean

/** Partial<Type> */

// Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.

interface Todo {
	title: string;
	description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
	return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
	title: "organize desk",
	description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

/** Required<Type> */

// Constructs a type consisting of all properties of Type set to required. The opposite of Partial.

interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };

// const obj2: Required<Props> = { a: 5 }; // Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.

/** Readonly<Type> */

// Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.

interface Todo3 {
  title: string;
}

const testReadOnly: Readonly<Todo3> = {
  title: "Delete inactive users",
};

// testReadOnly.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.

// This utility is useful for representing assignment expressions that will fail at runtime (i.e. when attempting to reassign properties of a frozen object).

function freeze1<Type>(obj: Type): Readonly<Type> {
	return obj
};

/** Record<Keys, Type> */

// Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;
		// (property) boris: CatInfo

/** Pick<Type, Keys> */

// Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.

interface Todo4 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo4, "title" | "completed">;

const todo4: TodoPreview = {
  title: "Clean room",
  completed: false,
};

/** Omit<Type, Keys> */

// Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).

interface Todo5 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview2 = Omit<Todo5, "description">;

const todo5: TodoPreview2 = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

type TodoInfo = Omit<Todo5, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

/** Exclude<UnionType, ExcludedMembers> */

// Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.

type T0 = Exclude<"a" | "b" | "c", "a">;
		// type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
		// type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
		// type T2 = Exclude<string | number | (() => void), Function>;

/** Extract<Type, Union> */

// Constructs a type by extracting from Type all union members that are assignable to Union.

type T4 = Extract<"a" | "b" | "c", "a" | "f">;
		// type T4 = "a"

type T5 = Extract<string | number | (() => void), Function>;
		// type T5 = () => void

/** NonNullable<Type> */

// Constructs a type by excluding null and undefined from Type.

type T6 = NonNullable<string | number | undefined>;


/** Parameters<Type> */

// Constructs a tuple type from the types used in the parameters of a function type Type.

declare function f1(arg: { a: number; b: string }): void;

type P0 = Parameters<() => string>;
		// type P0 = []

type P1 = Parameters<(s: string) => void>;
		// type P1 = [s: string]

type P2 = Parameters<<T>(arg: T) => T>;
    // type P2 = [arg: unknown]

type P3 = Parameters<typeof f1>;
    // [arg: {
    //   a: number;
    //   b: string;
    // }]

type P4 = Parameters<any>;
    // type P4 = unknown[]

type P5 = Parameters<never>;
    // type P5 = never

// type P6 = Parameters<string>;
                    // Type 'string' does not satisfy the constraint '(...args: any) => any'.

// type P7 = Parameters<Function>;
                    // Type 'Function' does not satisfy the constraint '(...args: any) => any'.
                    //   Type 'Function' provides no match for the signature '(...args: any): any'.


/** ConstructorParameters<Type> */

// Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).

type CP0 = ConstructorParameters<ErrorConstructor>;
                                // new (message?: string, options?: ErrorOptions): Error;
    // type CP0 = [message?: string | undefined, options?: ErrorOptions | undefined]

type CP1 = ConstructorParameters<FunctionConstructor>;
                                // new(...args: string[]): Function;
    // type CP1 = string[]

type CP2 = ConstructorParameters<RegExpConstructor>;
                                // new (pattern: RegExp | string, flags?: string): RegExp;
    // type CP2 = [pattern: string | RegExp, flags?: string | undefined]

type CP3 = ConstructorParameters<any>;
    // type CP3 = unknown[]

// type CP4 = ConstructorParameters<Function>;
                              // Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
                              //   Type 'Function' provides no match for the signature 'new (...args: any): any'.


/** ReturnType<Type> */

// Constructs a type consisting of the return type of function Type.

declare function f2(): { a: number; b: string };

type RT0 = ReturnType<() => string>;
    // type RT0 = string

type RT1 = ReturnType<(s: string) => void>;
    // type RT1 = void

type RT2 = ReturnType<<T>() => T>;
    // type RT2 = unknown

type RT3 = ReturnType<<T extends U, U extends number[]>() => T>;
    // type RT3 = number[]

type RT4 = ReturnType<typeof f2>;
    // type RT4 = {
    //   a: number;
    //   b: string;
    // }

type RT5 = ReturnType<any>;
    // type RT5 = any

type RT6 = ReturnType<never>;
    // type RT6 = never

// type RT7 = ReturnType<string>;
                    // Type 'string' does not satisfy the constraint '(...args: any) => any'.

// type RT8 = ReturnType<Function>;
                    // Type 'Function' does not satisfy the constraint '(...args: any) => any'.
                    //   Type 'Function' provides no match for the signature '(...args: any): any'.

/** InstanceType<Type> */

// Constructs a type consisting of the instance type of a constructor function in Type.

class CC {
  x = 0;
  y = 0;
}
type IT0 = InstanceType<typeof C>;
    // type IT0 = globalThis.C

type IT1 = InstanceType<any>;
    // type IT1 = any

type IT2 = InstanceType<never>;
    // type T2 = InstanceType<never>;

// type IT3 = InstanceType<string>;
                      // Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.

// type IT4 = InstanceType<Function>;
                      // Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
                      //   Type 'Function' provides no match for the signature 'new (...args: any): any'.

/** ThisParameterType<Type> */

// Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter.

function toHex(this: Number) {
  return this.toString(16);
}

type TypeofTohex = typeof toHex
    // type TypeofTohex = (this: Number) => string

type ThisT0 = ThisParameterType<typeof toHex>
    // type TypeofTohex = (this: Number) => string

function numberToString(n: ThisT0) {
  return toHex.apply(n);
}


/** OmitThisParameter<Type> */

// Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type.

function toHex2(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex2> = toHex2.bind(5);

console.log(fiveToHex());


/** ThisType<Type> */

// This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj2 = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj2.x = 10;
obj2.y = 20;
obj2.moveBy(5, 5);

// In the example above, the methods object in the argument to makeObject has a contextual type that includes ThisType<D & M> and therefore the type of this in methods within the methods object is { x: number, y: number } & { moveBy(dx: number, dy: number): number }. 
// Notice how the type of the methods property simultaneously is an inference target and a source for the this type in methods.

// The ThisType<T> marker interface is simply an empty interface declared in lib.d.ts. 
// Beyond being recognized in the contextual type of an object literal, the interface acts like any empty interface.

/** Intrinsic String Manipulation Types */

// Uppercase<StringType>

// Lowercase<StringType>

// Capitalize<StringType>

// Uncapitalize<StringType>

// To help with string manipulation around template string literals, TypeScript includes a set of types which can be used in string manipulation within the type system. 
// You can find those in the Template Literal Types documentation.