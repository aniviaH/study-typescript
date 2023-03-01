/// <reference path="./mynode.d.ts" />
import * as MYURL from 'myurl'
let myUrl = MYURL.parse('https://www.typescriptlang.org')

import x, {y} from 'hot-new-module'
x(y)

import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);


import { isPrime } from "./UMDModules";
isPrime(2);
// mathLib.isPrime(2); // 'mathLib' refers to a UMD global, but the current file is a module. Consider adding an import instead.