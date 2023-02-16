namespace Shapes {
  export namespace Polygons {
    export class Triangle {
      constructor () {
        console.log('Triangle');
      }
    }
    export class Square {
      constructor () {
        console.log('Square');
      }
    }
  }
}

var polygons = Shapes.Polygons;
import polygons2 = Shapes.Polygons;

let sq = new polygons.Square();
let tri = new polygons2.Triangle();