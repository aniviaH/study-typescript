// esModuleInterop 不开启 会报错
// 文件“f:/study-typescript/beans/tools/ts-config/esModuleInterop/module-common.ts”不是模块。
// import common from './module-common'

// const common = require('./module-common')
// const es = require('./module-es')

// console.log('common: ', common);
// console.log('es: ', es);

// assumptions1: a namespace import like import * as moment from "moment" acts the same as const moment = require("moment")
// const esAll = require('./module-es')
// import * as esAll from './module-es'
// console.log('esAll: ', esAll);

// a default import like import moment from "moment" acts the same as const moment = require("moment").default
import esDefault from './module-es'
const esDefault2 = require('./module-es').default

console.log('esDefault: ', esDefault());
console.log('esDefault2: ', esDefault2());
