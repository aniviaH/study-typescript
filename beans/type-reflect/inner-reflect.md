TypeScript自带的方法
很多人在平时的开发中使用到了TypeScript，但是可能只是单纯使用了一些基本的类型

但很多人不知道其实TypeScript自带了很多非常方便的方法

接下来我就结合例子，给大家介绍一下这些很方便的方法

Partial
作用
Partial 将类型的属性变成可选

例子
假如我现在有个interface

interface IUser1 {
  name: string;
  age: number;
  gender: number;
}
有一天，我想把IUser身上的属性都变成可选的，那我可能会再写一个interface

interface IUser2 {
  name?: string;
  age?: number;
  gender?: number;
}
但是如果属性多了的话，我们又得写很多额外的代码，这个时候就可以直接用Partial

type IUser2 = Partial<IUser1>

   等同于

interface IUser2 {
  name?: string;
  age?: number;
  gender?: number;
}
原理
type Partial<T> = {
  [P in keyof T]?: T[P];
};
Required
作用
Required 将类型的属性变成必选

例子
假如我现在有个interface

interface IUser1 {
  name: string;
  age?: number;
  gender?: number
}
可以看到有一些属性是可选的，但是突然有一天，我想让所有属性变成必选我会再写一个interface

interface IUser2 {
  name: string;
  age: number;
  gender: number
}
但如果属性多了的话，又要写很多额外的代码，这时候Required就派上用场了~

type IUser2 = Required<IUser1>

  等同于
  
interface IUser2 {
  name: string;
  age: number;
  gender: number
}
原理
type Required<T> = { 
    [P in keyof T]-?: T[P] 
};
Pick
作用
Pick 从某个类型中挑出一些属性出来

例子
假如我有一个interface

interface IUser1 {
  name: string;
  age: number;
  gender: number;
}
有一天我想要写一个新interface，它只拥有age、gender这两个属性，那我会重新写一个interface

interface IUser2 {
  age: number;
  gender: number;
}
但其实使用Pick非常方便去做这件事

type IUser2 = Pick<IUser1, 'age' | 'gender'>

  等同于
  
interface IUser2 {
  age: number;
  gender: number;
}
原理
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
Omit
作用
Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

例子
假如我有一个interface

interface IUser1 {
  name: string;
  age: number;
  gender: number;
}
有一天我想要写一个新interface，它只拥有age、gender这两个属性，那我会重新写一个interface

interface IUser2 {
  age: number;
  gender: number;
}
但其实使用Omit非常方便去做这件事

type IUser2 = Omit<IUser1, 'name'>

  等同于
  
interface IUser2 {
  age: number;
  gender: number;
}
原理
type Omit<T, K extends keyof any> = 
      Pick<T, Exclude<keyof T, K>>;
NonNullable
作用
NonNullable 的作用是用来过滤类型中的null及undefined类型。

例子
// string | number
type T0 = NonNullable<string | number | undefined>;
// string[]
type T1 = NonNullable<string[] | null | undefined>;
原理
type NonNullable<T> = T extends 
                      null | undefined 
                      ? never : T;
ReturnType
作用
用来得到一个函数的返回值类型

例子
假如我想定义一个变量来接受一个函数的返回值，但是不知道怎么定义这个变量的类型，这个时候可以用ReturnType

type Func = (value: number) => string;
let str: ReturnType<Func>;
  
const fun: Func = (value: number) => String(value)
  
str = fun(1)
原理
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
Exclude
作用
Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。

例子
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
原理
type Exclude<T, U> = T extends U ? never : T;
Record
作用
Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

例子
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
}; 
原理
type Record<K extends keyof any, T> = {
    [P in K]: T;
}; 
Readonly
作用
Readonly 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

例子
interface Todo {
 title: string;
}

const todo: Readonly<Todo> = {
 title: "Delete inactive users"
};

todo.title = "Hello"; 
// Error: cannot reassign a readonly property 
原理
type Readonly<T> = {
 readonly [P in keyof T]: T[P];
}; 
结语