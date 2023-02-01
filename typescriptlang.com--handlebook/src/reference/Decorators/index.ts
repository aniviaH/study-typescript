import "reflect-metadata";

export {}

/** Decorators */

// A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

// For example, given the decorator @sealed we might write the sealed function as follows:

function sealed(target: any) {
  // do something with 'target' ...
}


/** Decorator Factories */

// If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

// We can write a decorator factory in the following fashion:

function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target: any) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}


/** Decorator Composition */

// Multiple decorators can be applied to a declaration, for example on a single line:

// @f @g x

// On multiple lines:

/* 
  @f
  @g
  x
*/

// When multiple decorators apply to a single declaration, their evaluation is similar to function composition in mathematics. In this model, when composing functions f and g, the resulting composite (f ∘ g)(x) is equivalent to f(g(x)).

// As such, the following steps are performed when evaluating multiple decorators on a single declaration in TypeScript:

// 1. The expressions for each decorator are evaluated top-to-bottom.
// 2. The results are then called as functions from bottom-to-top.

// If we were to use decorator factories, we can observe this evaluation order with the following example:

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}

// Which would print this output to the console:

// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called


/** Decorator Evaluation */
// There is a well defined order to how decorators applied to various declarations inside of a class are applied:

// Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
// Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
// Parameter Decorators are applied for the constructor.
// Class Decorators are applied for the class.

/** Class Decorators */

// A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a declare class).

// The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument.

// If the class decorator returns a value, it will replace the class declaration with the provided constructor function.

// NOTE  Should you choose to return a new constructor function, you must take care to maintain the original prototype. The logic that applies decorators at runtime will not do this for you.

// The following is an example of a class decorator (@sealed) applied to a BugReport class:

function sealed2(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed2
class BugReport {
  type?: string = "report";
  title?: string;
 
  constructor(t: string) {
    this.title = t;
  }
}

// When @sealed is executed, it will seal both the constructor and its prototype, and will therefore prevent any further functionality from being added to or removed from this class during runtime by accessing BugReport.prototype or by defining properties on BugReport itself (note that ES2015 classes are really just syntactic sugar to prototype-based constructor functions). This decorator does not prevent classes from sub-classing BugReport.


function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}
 
@reportableClassDecorator
class BugReport2 {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
 
const bug = new BugReport2("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
 
// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
// console.log(bug.reportingURL);


/** Method Decorators */

// A Method Decorator is declared just before a method declaration. The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition. A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context (such as in a declare class).

// The expression for the method decorator will be called as a function at runtime, with the following three arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member.
// The Property Descriptor for the member.

// NOTE  The Property Descriptor will be undefined if your script target is less than ES5.

// If the method decorator returns a value, it will be used as the Property Descriptor for the method.

// NOTE  The return value is ignored if your script target is less than ES5.

// The following is an example of a method decorator (@enumerable) applied to a method on the Greeter class:

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
 
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

// The @enumerable(false) decorator here is a decorator factory. When the @enumerable(false) decorator is called, it modifies the enumerable property of the property descriptor.


/** Accessor Decorators */

// An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. An accessor decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).

// NOTE  TypeScript disallows decorating both the get and set accessor for a single member. Instead, all decorators for the member must be applied to the first accessor specified in document order. This is because decorators apply to a Property Descriptor, which combines both the get and set accessor, not each declaration separately.

// The expression for the accessor decorator will be called as a function at runtime, with the following three arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member.
// The Property Descriptor for the member.

// The following is an example of an accessor decorator (@configurable) applied to a member of the Point class:

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
 
  @configurable(false)
  get x() {
    return this._x;
  }
 
  @configurable(false)
  get y() {
    return this._y;
  }
}


/** Property Decorators */

// A Property Decorator is declared just before a property declaration. A property decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).

// The expression for the property decorator will be called as a function at runtime, with the following two arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member.

// NOTE  A Property Descriptor is not provided as an argument to a property decorator due to how property decorators are initialized in TypeScript. This is because there is currently no mechanism to describe an instance property when defining members of a prototype, and no way to observe or modify the initializer for a property. The return value is ignored too. As such, a property decorator can only be used to observe that a property of a specific name has been declared for a class.

// We can use this information to record metadata about the property, as in the following example:

// import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  console.log(`formatString: ${formatString}`);

  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  console.log(`target: ${target}`);
  console.log(`propertyKey: ${propertyKey}`);

  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter2 {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    console.log(`formatString: ${formatString}`);

    return formatString.replace("%s", this.greeting);
  }
}

// The @format("Hello, %s") decorator here is a decorator factory. When @format("Hello, %s") is called, it adds a metadata entry for the property using the Reflect.metadata function from the reflect-metadata library. When getFormat is called, it reads the metadata value for the format.

// NOTE  This example requires the reflect-metadata library. See Metadata for more information about the reflect-metadata library.


/** Parameter Decorators */

// A Parameter Decorator is declared just before a parameter declaration. The parameter decorator is applied to the function for a class constructor or method declaration. A parameter decorator cannot be used in a declaration file, an overload, or in any other ambient context (such as in a declare class).

// The expression for the parameter decorator will be called as a function at runtime, with the following three arguments:

// Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// The name of the member.
// The ordinal index of the parameter in the function’s parameter list.

// NOTE  A parameter decorator can only be used to observe that a parameter has been declared on a method.

// The return value of the parameter decorator is ignored.

// The following is an example of a parameter decorator (@required) applied to parameter of a member of the BugReport class:

const requiredMetadataKey = Symbol("required");
 
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  
  console.log('existingRequiredParameters: ', existingRequiredParameters);
  existingRequiredParameters.push(parameterIndex);
  console.log('existingRequiredParameters: ', existingRequiredParameters);

  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;
 
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    console.log('requiredParameters: ', requiredParameters);
    console.log('arguments: ', arguments);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}

class BugReport3 {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
 
  @validate
  print(@required verbose: boolean) {
    console.log('print: ', verbose);
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
     return this.title; 
    }
  }
}

// The @required decorator adds a metadata entry that marks the parameter as required. The @validate decorator then wraps the existing greet method in a function that validates the arguments before invoking the original method.

// NOTE  This example requires the reflect-metadata library. See Metadata for more information about the reflect-metadata library.


// tsc ./ParameterDecorators.ts --module esnext --target esnext --emitDecoratorMetadata true --experimentalDecorators true
// ts-node .\ParameterDecorators.js


/** Metadata */

// Some examples use the reflect-metadata library which adds a polyfill for an experimental metadata API. This library is not yet part of the ECMAScript (JavaScript) standard. However, once decorators are officially adopted as part of the ECMAScript standard these extensions will be proposed for adoption.

// You can install this library via npm:

// npm i reflect-metadata --save

// TypeScript includes experimental support for emitting certain types of metadata for declarations that have decorators. To enable this experimental support, you must set the emitDecoratorMetadata compiler option either on the command line or in your tsconfig.json:

// Command Line:

// tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata

// tsconfig.json:

// {
//   "compilerOptions": {
//     "target": "ES5",
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// When enabled, as long as the reflect-metadata library has been imported, additional design-time type information will be exposed at runtime.

// We can see this in action in the following example:

// import "reflect-metadata";
 
class Point2 {
  constructor(public x: number, public y: number) {}
}
 
class Line {
  private _start: Point2 = {x: 0, y: 0};
  private _end: Point2 = {x: 100, y: 100};
 
  @validate2
  set start(value: Point2) {
    this._start = value;
  }
 
  get start() {
    return this._start;
  }
 
  @validate2
  set end(value: Point2) {
    this._end = value;
  }
 
  get end() {
    return this._end;
  }
}
 
function validate2<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set!;
  
  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);
 
    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    }
 
    set.call(this, value);
  };
}
 
const line = new Line()
line.start = new Point(0, 0)
 
// @ts-ignore
// line.end = {}
 
// Fails at runtime with:
// > Invalid type, got object not Point
 
// The TypeScript compiler will inject design-time type information using the @Reflect.metadata decorator. You could consider it the equivalent of the following TypeScript:

class Line2 {
  private _start: Point2 = {x: 0, y: 0};
  private _end: Point2 = {x: 100, y: 100};
  @validate2
  @Reflect.metadata("design:type", Point2)
  set start(value: Point2) {
    this._start = value;
  }
  get start() {
    return this._start;
  }

  @validate2
  @Reflect.metadata("design:type", Point2)
  set end(value: Point2) {
    this._end = value;
  }
  get end() {
    return this._end;
  }
}

// NOTE  Decorator metadata is an experimental feature and may introduce breaking changes in future releases.