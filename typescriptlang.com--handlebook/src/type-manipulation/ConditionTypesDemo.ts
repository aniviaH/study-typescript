interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type NameOrId2<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel4<T extends number | string> (nameOrId: T): NameOrId2<T> {
  if (!nameOrId) {
    return {
      name: nameOrId,
      id: nameOrId
    } as NameOrId2<T>
  } else {
    if (typeof nameOrId === 'string') {
      // nameOrId
      // (parameter) nameOrId: T & string
  
      // const res = {
      //   name: nameOrId,
      // } as NameOrId2<T>

      const res = {
        name: nameOrId, 
        id: -1,
      }
      return res // Type '{ name: string; }' is not assignable to type 'NameOrId<T>'.
    } else if (typeof nameOrId === 'number') {
      // nameOrId
      // (parameter) nameOrId: T & number
  
      // const res = {
      //   id: nameOrId,
      // } as NameOrId2<T>
      
      const res = {
        id: nameOrId,
        name: ''
      }
      return res
    } else {
      // nameOrId
      // (parameter) nameOrId: never

      const res = {
        id: nameOrId,
        name: nameOrId
      } as NameOrId2<T>
      return res
    }
  }

  // 返回值需要与NameOrId2<T>匹配，需要将IdLabel和NameLabel要求的字段都满足

  // return {
  //   name: nameOrId,
  //   id: nameOrId
  // } as NameOrId2<T>
}

let label11 = createLabel4("typescript");
    // let label1: NameLabel
let label22 = createLabel4(2.8);
    // let label2: IdLabel
let label33 = createLabel4(Math.random() > .5 ? "hello" : 0);
    // let label3: NameLabel | IdLabel

console.log('label11--', label11);
console.log('label22--', label22);
console.log('label33--', label33);