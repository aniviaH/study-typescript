export {}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
    descriptor.get = function z() {
      return 999
    }

    console.log('propertyKey--', propertyKey);
    console.log('descriptor--', descriptor);
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

let p = new Point(1, 2)

console.log(p.x);
console.log(p.y);

