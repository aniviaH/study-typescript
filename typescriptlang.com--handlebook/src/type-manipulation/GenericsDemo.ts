class GenericNumber1<NumType> {
  zeroValue: NumType;
  add (x: NumType, y: NumType) : NumType {
    console.log('x: ', x);
    console.log('y: ', y);
    console.log('zeroValue: ', this.zeroValue);

    return x
  } ;

  constructor (zeroValue: NumType) {
    this.zeroValue = zeroValue
  }
}
 
let myGenericNumber1 = new GenericNumber1<number>(100);
myGenericNumber1.add(1, 2)


// class MyClass2 {
//   a: number = 1

//   constructor () {

//   }

//   add (x: number, y: number) {
//     console.log('x:', x)
//     console.log('y:', y)
//   }
// }

// const my = new MyClass2()

// my.add(1, 2)