//（1）索引访问类型
export type AppConfig = {
  username: string;
  layout: string;
}

type UserName = AppConfig['username']

// （2）索引签名
type User = {
  name: string;
  preference: {
    [key: string]: string;
  };
}

const currentUser: User = {
  name: 'Foo Bar',
  preference: {
    lang: 'en',
  },
}

const currentLang = currentUser.preference.lang

// （3）联合类型
type StringOrNumberUnion = string | number

// let value: StringOrNumberUnion = 'hello world'
// value = 10

type Animal = {
  name: string;
  species: string;
}

type Person = {
  name: string;
  age: number;
}

type AnimalOrPersonUnion = Animal | Person

function loadFromSomewhereElse () {
  return {
    name: 'test',
    age: 1,
    species: 'kind'
  }
}
const value: AnimalOrPersonUnion = loadFromSomewhereElse()

console.log(value.name); // ✅
// console.log(value.age); // ❌
// console.log(value.species); // ❌
if ('age' in value) {
  console.log(value.age); // ✅
}
if ('species' in value) {
  console.log(value.species);
}
if ('test' in value) {
  // console.log(value.test); // 类型never上不存在属性test
}

// （4）keyof 类型运算符
type AppConfigKey = keyof AppConfig // "username" | "layout"

type UserPreferenceKey = keyof User['preference'] // string | number

// （5）元组类型
type Currency = [number, string]

const amount: Currency = [100, 'USD']

function add(values: number[]) {
  return values.reduce((a, b) => a + b)
}
// add(amount)
//   Type 'string | number' is not assignable to type 'number'.
//     Type 'string' is not assignable to type 'number'.

type LatLong = [number, number]

const loc: LatLong = [48.858370, 2.294481]
// console.log(loc[2])
// Error: Tuple type 'LatLong' of length '2' has no element at index '2'.

// （6）条件类型
// T extends U ? X : Y
type ConditionalType = string extends boolean ? string : boolean
