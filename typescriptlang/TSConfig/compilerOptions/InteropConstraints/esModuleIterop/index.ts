import * as fs from 'fs'
import _ from 'lodash'
// Module '"e:/010-TypeScript/study-typescript/typescriptlang/TSConfig/compilerOptions/InteropConstraints/esModuleIterop/node_modules/@types/lodash/index"' can only be default-imported using the 'esModuleInterop' flag

// import {chunk} from 'lodash'

fs.writeFileSync('file.txt', 'file text--')

const c = _.chunk(['a', 'b', 'c', 'd'], 2)
console.log(c)