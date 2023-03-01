// const foo = require('./foo')
import utils from './utilFunctions'

const foo = require('./foo')

foo()

interface Options {
  color: string
  volume: number
}
var options = {} as Options
options.color = 'blue'

console.log(utils.getStringLength('123'))

let num: number | undefined | null = 1
num = undefined
num = null

class Point {
  constructor(public x: number, public y: number) {}
  getDistance(p: Point) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
// ...
// Reopen the interface.
interface Point {
  distanceFromOrigin(): number;
}
Point.prototype.distanceFromOrigin = function (this: Point) {
  // return this.getDistance1({ x: 0, y: 0 }); // Property 'getDistance1' does not exist on type 'Point'. Did you mean 'getDistance'?
  return this.getDistance({ x: 0, y: 0 } as Point);
};