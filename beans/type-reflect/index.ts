// 映射类型
// 用户的配置值
type AppConfig = {
  username: string;
  layout: string;
};
// 用户是否有权更改配置值
// type AppPermissions = {
//   changeUsername: boolean;
//   changeLayout: boolean;
// };
// 在上面的代码中，AppConfig 和 AppPermissions 之间是存在隐式关系的，每当向 AppConfig 添加新的配置值时，AppPermissions 中也必须有相应的布尔值。
// 这里可以使用映射类型来管理两者之间的关系：
type AppPermissions = {
  [Property in keyof AppConfig as `change${Capitalize<Property>}`]: boolean;
}
// 在上面的代码中，只要 AppConfig 中的类型发生变化，AppPermissions 就会随之变化。实现了两者之间的映射关系。

// （2）概念
// 在 TypeScript 和 JavaScript 中，最常见的映射就是 Array.prototype.map()：

// [1, 2, 3].map(value => value.toString()); // ["1", "2", "3"]
// 这里，我们将数组中的数字映射到其字符串的表示形式。因此，TypeScript 中的映射类型意味着将一种类型转换为另一种类型，方法就是对其每个属性进行转换。

// （3）实例
// 下面来通过一个例子来深入理解一下映射类型。对设备定义以下类型，其包含制造商和价格属性：
type Device = {
  manufacturer: string;
  price: number;
}
// 为了让用户更容易理解设备信息，因此为对象添加一个新类型，该对象可以使用适当的格式来格式化设备的每个属性：
type DeviceFormatter = {
  [Key in keyof Device as `format${Capitalize<Key>}`]: (value: Device[Key]) => string
}

// 我们来拆解一下上面的代码。Key in keyof Device 使用 keyof 类型运算符生成 Device 中所有键的并集。将它放在索引签名中实际上是遍历 Device 的所有属性并将它们映射到 DeviceFormatter 的属性。
// format${Capitalize<Key>} 是映射的转换部分，它使用 key 重映射和模板文字类型将属性名称从 x 更改为 formatX。
// (value: Device[Key]) => string; 利用索引访问类型 Device[Key] 来指示格式化函数的 value 参数是格式化的属性的类型。因此，formatManufacturer 接受一个 string（制造商），而 formatPrice 接受一个number（价格）。

// 实用程序中的映射
// TypeScript 附带了许多用作实用程序的映射类型，最常见的包括 Omit、Partial、Readonly、Readonly、Exclude、Extract、NonNullable、ReturnType 等。下面来看看其中的两个是如何构建的。
// （1）Partial
interface Point3D {
  x: number;
  y: number;
  z: number;
}
type PartialPoint3D = Partial<Point3D>

// type Partial<T> = {
//   [P in keyof T]?: T[P] | undefined;
// };
/* 下面来拆解一下这行代码：

使用泛型来传递目标接口 T；
使用 keyof T 来获取 T 的所有 key。
通过使用 [P in keyof T] 来访问并循环所有的 key；
它通过添加 ? 使 key 成为可选的。
使用联合类型 T[P] | undefined 使 key 的类型可以为空； */

// （2）Exclude
type animals = 'bird' | 'cat' | 'crocodile';

type mamals = Exclude<animals, 'crocodile'>

// Exclude 是一种映射类型，可让有选择地从类型中删除属性。其定义如下：
// type Exclude<T, U> = T extends U ? never : T
// 它通过使用条件类型从 T 中排除那些可分配给 U 的类型，并且在排除的属性上返回 nerver。

// 构建映射类型
// 通过上面的对 TypeScript 内置实用程序类型的原理解释，对映射类型有了更深的理解。最后，我们来构建一个自己的映射类型：Optional，它可以将原类型中指定 key 的类型置为可选的并且可以为空。
// 我们可以这样做：

// 将整个类型转换为 Optional
// 从该新类型中仅选择想要的属性使其成为可选的。
// 将原始类型与排除的属性连接起来。
// 实现代码及测试用例如下：

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type Optional<T, K extends keyof T> = {
  [P in K]?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Person = {
  name: string;
  surename: string;
  email: string;
}

type User = Optional<Person, 'email'>
// 现在 email 属性是可选的
const u: User = {
  name: 'a',
  surename: 'b',
}

type AnonymousUser = Optional<Person, 'name' | 'surename'>
// 现在 email 和 surname 属性是可选的
// const u2: AnonymousUser = {
//   email: 'aaa'
// }
// 注意，这里使用 K extends keyof T 来确保只能传递属于类型/接口的属性。否则，TypeScript 将在编译时抛出错误。

// 映射类型的一大优点就是它们的可组合性：可以组合它们来创建新的映射类型。

// 上面使用了已有的实用程序类型实现了我们想要的 Optional。当然，我们也可以在不使用任何其他映射类型的情况下重新创建 Optional 映射类型实用程序：

// type Optional2<T, K extends keyof T> = {
//   [P in K]?: T[P]
// } & {
//   [P in Exclude<keyof T, K>]: T[P]
// }

// 上面的代码结合了两种类型：
// 第一种类型通过使用 ? 修饰符使 T 的所有 K 的 key 都是可选的。
// 第二种类型通过使用 Excluse<keyof T,K>来获取剩余的key。
