/** => ./object-types/index.ts 3. Intersection Types （交叉类型）   */

type IntersectTest1 = string & 'name'

interface IntersectTest2 {
  a: string
}
interface IntersectTest3 {
  b: string
}

type IntersectTest4 = IntersectTest2 & IntersectTest3

// 交叉类型，使用操作符 &，返回每个类型字段的总和，不管是 interface 还是 type 定义的类型

const i4: IntersectTest4 = {
  a: 'a',
  b: 'b'
}

type IntersectTest5 = {
  a: string
}
type IntersectTest6 = {
  b: string
}

type IntersectTest7 = IntersectTest5 & IntersectTest6

const i5: IntersectTest7 = {
  a: 'a',
  b: 'b'
}