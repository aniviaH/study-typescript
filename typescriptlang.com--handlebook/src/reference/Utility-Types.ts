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

type T7 = Parameters<() => string>;
		// type T7 = []

type T8 = Parameters<(s: string) => void>;
		// type T8 = [s: string]