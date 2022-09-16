// 1. Partial
interface IUser1 {
  name: string;
  age: number;
  gender: number;
}

type IUser2 = Partial<IUser1>

/**
 * Make all properties in T optional
 */
/* 
type Partial<T> = {
  [P in keyof T]?: T[P];
};
 */

// 2. Required
interface IUser3 {
  name: string;
  age?: number;
  gender?: number
}

type IUser4 = Required<IUser3>
type IUser5 = MyRequired<IUser3>

/**
 * Make all properties in T required
 */
/* 
 type Required<T> = {
  [P in keyof T]-?: T[P];
};
 */
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

// 3. Pick
type IUser6 = Pick<IUser1, 'name' | 'gender'>
type IUser7 = MyPick<IUser1, 'name' | 'gender'>

/**
 * From T, pick a set of properties whose keys are in the union K
 */
/* 
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
 */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// 4. Omit
type IUser8 = Omit<IUser1, 'gender'>
type IUser9 = MyOmit<IUser1, 'gender'>
/**
 * Construct a type with the properties of T except for those in type K.
 */
/* 
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
 */
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// 5. NonNullable
type T0 = NonNullable<string[] | undefined | null>
type T1 = MyNonNullable<string[] | undefined | null>

/**
 * Exclude null and undefined from T
 */
/* 
type NonNullable<T> = T extends null | undefined ? never : T;
 */

type MyNonNullable<T> = T extends null | undefined ? never : T

// 6. ReturnType
/*
作用
用来得到一个函数的返回值类型

例子
假如我想定义一个变量来接受一个函数的返回值，但是不知道怎么定义这个变量的类型，这个时候可以用ReturnType
 */
type Func = (value: number) => string

let str2: ReturnType<Func>
let str: MyReturnType<Func>

const fun: Func = (value: number) => String(value)

str = fun(1)

/**
 * Obtain the return type of a function type
 */
/* 
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 */

type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any

// 7. Exclude
type T3 = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' || 'c'
type T4 = MyExclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'

/**
 * Exclude from T those types that are assignable to U
 */
/* 
 type Exclude<T, U> = T extends U ? never : T;
 */

type MyExclude<T, U> = T extends U ? never : T

// 8. Record
interface PageInfo {
  title: string;
}

type Page = 'home' | 'about' | 'contact'

type PageRecord = Record<Page, PageInfo>
type PageRecord2 = MyRecord<Page, PageInfo>
const x: PageRecord2 = {
  home: {title: 'home'},
  about: {title: 'about'},
  contact: {title: 'contact'}
}

/**
 * Construct a type with a set of properties K of type T
 */
/*  
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
 */
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

// 9. Readonly
interface Todo {
  title: string;
}

type ReadonlyTodo = Readonly<Todo>
type ReadonlyTodo2 = MyReadonly<Todo>
const todo: ReadonlyTodo2 = {
  title: 'title'
}
/* 
todo.title = 'another title'
 */
/**
 * Make all properties in T readonly
 */
/*  
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
 */
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}