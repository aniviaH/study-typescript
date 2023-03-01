interface IColor {
  red: number,
  green: number,
  blue: number,
}
namespace Color2 {
  export function mixColor(colorName: IColor) {
    colorName = {
      red: 8,
      green: 9,
      blue: 10,
    }
    return colorName
  }
}

console.log(Color2.mixColor({
  red: 1,
  green: 2,
  blue: 3,
}))