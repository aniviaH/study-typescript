class Rectangle {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  getAreaFunction () {
    return function (this: Rectangle, ...args: any[]) {
      console.log('inner function called', args)
      return this.width * this.height
      // 'this' implicitly has type 'any' because it does not have a type annotation.
      // 'this' implicitly has type 'any' because it does not have a type annotation.
    }
  }
}

const r = new Rectangle(10, 10)
const inner = r.getAreaFunction()
// inner() // The 'this' context of type 'void' is not assignable to method's 'this' of type 'Rectangle'.
const area = inner.apply(r, [1, 2, 3])
const area2 = inner.call(r, 1, 2, 3)
console.log(area);