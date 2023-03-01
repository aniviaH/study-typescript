/** 1. The keyof type operator */

// The keyof operator takes an object type and produces a string or numeric literal union of its keys.
// he following type P is the same type as “x” | “y”:

type Point4 = { x: number; y: number };

type P = keyof Point4;
    // type P = keyof Point4

const pValue: P = 'x'

// const pValue2: P = 'z' // Type '"z"' is not assignable to type 'keyof Point4'.

// If the type has a string or number index signature, keyof will return those types instead:

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
    // type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
    // type M = string | number
// !!! Note that in this example, M is string | number — this is because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].

// keyof types become especially useful when combined with mapped types, which we’ll learn more about later.