import "reflect-metadata";

export {}

 class Point {
  constructor(public x: number, public y: number) {}
}
 
class Line {
  private _start: Point = {x: 0, y: 0};
  private _end: Point = {x: 100, y: 100};
 
  @validate
  set start(value: Point) {
    this._start = value;
  }
 
  get start() {
    return this._start;
  }
 
  @validate
  set end(value: Point) {
    this._end = value;
  }
 
  get end() {
    return this._end;
  }
}
 
function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set!;
  
  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log('type: ', type); // type:  [class Point]
 
    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    }
 
    set.call(this, value);
  };
}
 
const line = new Line()
line.start = new Point(0, 0)
 
// @ts-ignore
line.end = {}
 
// Fails at runtime with:
// > Invalid type, got object not Point
// TypeError: Invalid type, got object not Point.


// tsc ./ReflectMetadata.ts --module esnext --target esnext --emitDecoratorMetadata true --experimentalDecorators true
// ts-node .\ReflectMetadata.js