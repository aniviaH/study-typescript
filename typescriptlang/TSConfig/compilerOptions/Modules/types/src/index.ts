console.log(process.cwd)
          // Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.

// 非 @types 的 packages 的声明，不受 `types` 和 `typeRoots` 选项影响
console.log(myJquery1.eq)

console.log(myJquery2)
const m2 : MyJquery2 = {
  eq: () => ('1')
}
console.log(myJquery3);

// By default all visible ”@types” packages are included in your compilation. Packages in node_modules/@types of any enclosing folder are considered visible. For example, that means packages within ./node_modules/@types/, ../node_modules/@types/, ../../node_modules/@types/, and so on.
// If `types` is specified, only packages listed will be included in the global scope.
jQuery.ajax