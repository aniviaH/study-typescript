interface Point {
    x: number;
    y: number;
}
declare class SomePoint implements Point {
    x: number;
    y: number;
}
declare type Point2 = {
    x: number;
    y: number;
};
declare class SomePoint2 implements Point2 {
    x: number;
    y: number;
}
declare type PartialPoint = {
    x: number;
} | {
    y: number;
};
declare type Fruit = "apple" | "orange" | "banana";
declare type MyBool = true | false;
declare type WindowStates = "open" | "closed" | "minimized";
declare type LockStates = "locked" | "unlocked";
declare type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
declare type Nullable = undefined | null;
declare function getLength(obj: string | string[]): number;
declare function wrapInArray(obj: string | string[]): string[];
declare type StringArray = Array<string>;
declare type NumberArray = Array<number>;
declare type ObjectWithNameArray = Array<{
    name: string;
}>;
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}
interface Point {
    x: number;
    y: number;
}
interface Point3 {
    x: number;
    y: number;
}
interface Pointlike {
    x: number;
    y: number;
}
interface Named {
    name: string;
}
declare function logPoint(point: Pointlike): void;
declare function logName(x: Named): void;
declare const obj: {
    x: number;
    y: number;
    name: string;
};
declare class Empty {
}
declare function fn(arg: Empty): void;
declare class Car {
    drive(): void;
}
declare class Golfer {
    drive(): void;
}
declare let w: Car;
declare let fst: (a: any, b: any) => any;
declare let fst2: <T, U>(a: T, b: U) => T;
declare const anys: any[];
declare let o: {
    x: string;
    extra: number;
};
declare let o3: {
    x: string;
};
declare type One = {
    p: string;
    x: number;
};
interface Two {
    p: string;
}
declare class Three {
    p: string;
}
declare let x: One;
declare let two: Two;
declare let lit: {
    a: number;
};
declare let lit2: {
    a: number;
    b: number;
};
interface Student {
    name: string;
    age: number;
}
interface Student2 {
    name: string;
    age: number;
    sex: string;
}
declare const s1: Student;
declare const s2: {
    name: string;
    age: number;
    sex: string;
    f: number;
};
declare const s3: Student;
declare function start(arg: string | string[] | (() => string) | {
    s: string;
}): string;
declare type Combined = {
    a: string;
} & {
    a: unknown;
};
declare type Conflicting = {
    a: number;
} & {
    a: string;
};
declare const c1: Combined;
declare type c3 = Combined["a"];
declare type c4 = string & number;
declare function pad(s: string, n: number, direction: "left" | "right"): string;
declare let s: "left" | "right";
declare let ss: string;
declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
declare let sns: string[];
declare function map<T, U>(ts: T[], f: (t: T) => U): U[];
declare let sns2: string[];
declare function run<T>(thunk: (t: T) => void): T;
declare let i: {
    inference: string;
};
declare let ii: {
    sss: string;
};
declare type f = () => void;
declare const f2: () => void;
declare type Size = [number, number];
declare let x2: Size;
declare type FString = string & {
    __compileTimeOnly: any;
};
declare let sss: string;
declare type Shape = {
    kind: "circle";
    radius: number;
} | {
    kind: "square";
    x: number;
} | {
    kind: "triangle";
    x: number;
    y: number;
};
declare const shape: Shape;
declare function area(s: Shape): number;
declare function height(s: Shape): number;
declare function liftArray<T>(t: T): Array<T>;
declare function firstish<T extends {
    length: number;
}>(t1: T, t2: T): T;
declare const a: number[];
interface Rx {
    readonly x: number;
}
interface X {
    x: number;
}
declare let rx: Readonly<X>;
declare let a1: ReadonlyArray<number>;
declare let b: readonly number[];
declare let a2: readonly [string, number];
declare type MyReadOnly<T> = {
    readonly [P in keyof T]: T[P];
};
declare let a3: readonly [1, 2, 3];
declare let a4: {
    readonly a: "a";
    readonly b: "b";
};
//# sourceMappingURL=d.d.ts.map