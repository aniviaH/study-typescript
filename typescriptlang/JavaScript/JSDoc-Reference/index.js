// @ts-check

export {}

// import {TestJSDoc} from './index' // 'TestJSDoc' is a type and cannot be imported in JavaScript files. Use 'import("./index").TestJSDoc' in a JSDoc type annotation.

/**
 * @type {string}
 */
var s;

/** @type {Window} */
var win;

/**
 * @type { import('./index').TestJSDoc }
 */
var testDoc = {
  // num: 'a', // Type 'string' is not assignable to type 'number'.
  num: 1
}

/** @type {PromiseLike<string>} */
// var promisedString = new Promise(() => {});
// promisedString.then(() => {})
var promisedString = new Promise((resolve, reject) => {
  setTimeout(() => {
      reject(new Error('异常!'))
  }, 1000)
});
promisedString.then((value) => {
  console.log('resolve--', value)
}, (err) => {
  console.log('catch---', err)
})

/** @type {HTMLElement | null} */
var myElement = document.querySelector('#app')
if (myElement ) myElement.dataset.myData = 'aaa'

/** @type {number[]} */
var ns = []

/** @type {Array<number>} */
var ns2 = []

/** @type {Array.<number>} */
var ns3 = []


/** @type {{a: string, b: number}} */
var var9 = {
  a: 'a',
  b: 1
}

/** @type {Object.<string, number>} */
var stringToNumber = {
  a: 1
}

/** @type {Object.<number, object>} */
var arrayLike = [{}, {}]

/** @type {{[x: string]: boolean}} */
var arrayLike2 = {
  a: false,
  b: true
}


/** @type {function (string, boolean): number} Closure syntax */
var sbn = function (a, b) {
  return 1
}

/** @type {(a: string, b: boolean) => number} Typescript syntax */
var sbn2 = function (a, b) {
  return 2
}

/** @type {Function} */
var fn7

/** @type {Function} */
var f6 = () => {}

/** @type {*} - can be 'any' type */
var star

/** @type {?} - unknown type (same as 'any') */
var question = 1


/** @type {number | string} */
var numberOrString = Math.random() < 0.5 ? 'hello' : 100
var typeAssertedNumber = /**@type {number} */ (numberOrString)
typeAssertedNumber = 1

let one = /**@type {const} */ (1)
// one = 2 // Type '2' is not assignable to type '1'.

/** 
 * @param {import('./type').Pet} p
 * @param {string} c
 * */
function walk (p, c) {
  console.log(`Walking ${p.name}`)
}


/**
 * @typedef {import('./type').Pet} MyPet
 */

/** @type {MyPet}  */
var myPet = {
  name: 'a'
}
myPet.name


/**
 * @type {typeof import('./accounts').userAccount }
 */
var x = require('./accounts').userAccount


// Parameters may be declared in a variety of syntactic forms
/**
 * 
 * @param {string} p1 - A string param
 * @param {string=} p2 - An optional param(Google Closure syntax)
 * @param {string} [p3] - Another optional param(JSDoc syntax)
 * @param {string} [p4="test"] - An optional param with a default value
 * @returns {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  return p1 + p2 + p3 + p4
}

/**
 * @return {PromiseLike<string>}
 */
function ps () {
  return new Promise(() => {})
}

/**
 * @returns {{a: string, b: number}} - May use '@returns' as well as '@return'
 */
function ab () {
  return {
    a: '1',
    b: 2
  }
}

/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5 = 43] - an optional number property of SpecailType with default
 */
/** @type {SpecialType} */
var specialTypeObject = {
  prop1: '1',
  prop2: 2
}
specialTypeObject.prop5
console.log(specialTypeObject.prop5);

/**
 * 
 * @param {Object} options 
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=43]
 * @returns {number}
 */
function special(options) {
  return (options.prop4 || 1001) + (options.prop5 || 0)
}

/**
 * @callback Predict
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predict} */
const ok = (s) => !(s.length % 2)

/**
 * @typedef {(data: string, index?: number) => boolean} Predict2
 */
/** @type {Predict2}  */
const ok2 = (s) => !(s.length % 2)


/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @returns {T}
 */
function id (x) {
  return x
}
const a = id('string')
const b = id(123)
const c = id({})

/**
 * @template {string} K - K must be a string or string literal
 * @template {{serious(): string}} Seriousalizable
 * @param {K} key 
 * @param {Seriousalizable} object 
 */
function seriousalize (key, object) {
  // ???
}
seriousalize('a', {
  serious() {
    return 'a'
  }
})


/** @template [T=boolean] */
class Cache {
  /** @param {T} initial */
  constructor (initial) {

  }
}
let cache = new Cache(1)


class C {
  /**
   * 
   * @param {number} data 
   */
  constructor (data) {
    // property types can be infered
    this.name = 'foo'

    // or set explicitly
    /** @type {string | null} */
    this.title = null

    // or simply annotated, if they're set elsewhere
    /** @type {number} */
    this.size

    // this.initialize(data) // Should error, initializer expects a string
    this.initialize('aaa')
  }

  /**
   * 
   * @param {string} s 
   */
  initialize = function (s) {
    this.size = s.length
  }
}

var c3 = new C(0)

// var result = C(1) // Value of type 'typeof C' is not callable. Did you mean to include 'new'?


class Car {
  constructor () {
    /**
     * @private
     * @readonly
     */
    this.identifier = 100
  }

  printIdentifier () {
    console.log(this.identifier);
  }

  setIdentifier () {
    // this.identifier = 200 // Cannot assign to 'identifier' because it is a read-only property.
  }
}

const car = new Car()
// console.log(car.identifier) // Property 'identifier' is private and only accessible within class 'Car'.

class C2 {
  m () {}
}

class D extends C2 {
  /** @override */
  m() {
    
  }
}


/**
 * @template {string} T
 * @extends {Set<T>}
 */
class SortableSet extends Set {

}


/**
 * @typedef {Object} Print
 */
/** @implements {Print} */
class TextBook {
  print() {

  }
}

/**
 * @constructor
 * @param {number} data 
 */
function C4 (data) {
  this.name = 'foo'

  /** @type {string | null} */
  this.title = null

  /** @type {number} */
  this.size

  // this.initialize(data) // Argument of type 'number' is not assignable to parameter of type 'string'.
  this.initialize('sss')
}

/**
 * 
 * @param {string} s 
 */
C4.prototype.initialize = function (s) {
  this.size = s.length
}

var c4 = new C4(0)
c4.size

// var result = C4(1) // Value of type 'typeof C4' is not callable. Did you mean to include 'new'?


/**
 * @this {HTMLElement}
 * @param {*} e 
 */
function callbackForLater (e) {
  // this.clientHeight = parseInt(e) // should be fine!
      // Cannot assign to 'clientHeight' because it is a read-only property.
}


/** @deprecated */
const apiV1 = {}
const apiV2 = {}

apiV1


/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 3
}
JSDocState.SawAsterisk

/** @enum {function (number): number} */
const MathFuncs = {
  /** @param {number} n */
  add1: (n) => n + 1,
  /**
   * 
   * @param {number} n 
   * @returns 
   */
  id: (n) => -n,
  /**
   * 
   * @param {number} n 
   */
  sub1: (n) => n - 1
}

MathFuncs.add1


/**
 * Welcome to anwsome.ts
 * @author Ian Awesome <i.am.awesome@example.com>
 */
const awesome = {}


var someObj = {
  /**
   * 
   * @param {string} param1 - JSDocs on property assignments work
   */
  x: function (param1) {}
}

/**
 * As do jsdocs on variable assignments
 * @return {Window}
 */
let someFunc = function () {
  return window
}

/**
 * Add arrow function expressions
 * @param {number} x - A multiplier
 * @returns 
 */
let myArrow = (x) => x * x

/**
 * Which means it works for function components in JSX too
 * @param {{a: string, b: number}} props - Some param
 * @returns 
 */
var fc = (props) => <div>{props.a.charAt(0)}</div>

/**
 * A parameter can be a class constructot, using Google Closure syntax.
 * 
 * @param {{new (...args: any[]): object}} C 
 */
function registerClass (C) {}

/**
 * 
 * @param {...string} p1 - A 'rest' arg(array) of strings. (treated as 'any')
 */
function fn10 (p1) {

}
fn10('1')

/**
 * 
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 * @returns 
 */
function fn9 (p1) {
  // return p1 ? p1.join() : ''
  return p1?.charAt(0)
}


/**
//  * @type {{a: string, b: number=}} // A type literal property cannot have an initializer.
 */
var wrong

/**
 * @type {{a: string, b?: number}}
 */
var right = {
  a: '1'
}

/**
 * @type {?number}
 * With strictNullChecks: true -- number | null
 * With strictNullChecks: false -- number
 */
var nullable

/**
 * @type {number | null}
 * With strictNullChecks: true -- number | null
 * With strictNullChecks: false -- number
 */
var unionNullable

/**
 * @type {!number}
 * Just has type number
 */
var normal
