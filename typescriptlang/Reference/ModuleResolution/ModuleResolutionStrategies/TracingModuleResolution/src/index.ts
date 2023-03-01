// tsc --traceResolution

/** tsconfig.json module 空  ===  tsc --traceResolution --moduleResolution classic */

// ======== Resolving module 'mytypescript' from 'F:/TracingModuleResolution/src/app.ts'. ========
// Module resolution kind is not specified, using 'Classic'.
// File 'F:/TracingModuleResolution/src/mytypescript.ts' does not exist.
// File 'F:/TracingModuleResolution/src/mytypescript.tsx' does not exist.
// File 'F:/TracingModuleResolution/src/mytypescript.d.ts' does not exist.
// File 'F:/TracingModuleResolution/mytypescript.ts' does not exist.
// File 'F:/TracingModuleResolution/mytypescript.tsx' does not exist.
// File 'F:/TracingModuleResolution/mytypescript.d.ts' does not exist.
// File 'F:/mytypescript.ts' does not exist.
// File 'F:/mytypescript.tsx' does not exist.
// File 'F:/mytypescript.d.ts' does not exist.
// Directory 'F:/TracingModuleResolution/src/node_modules' does not exist, skipping all lookups in it.
// Directory 'F:/TracingModuleResolution/node_modules/@types' does not exist, skipping all lookups in it.
// Directory 'F:/node_modules' does not exist, skipping all lookups in it.
// File 'F:/TracingModuleResolution/src/mytypescript.js' does not exist.
// File 'F:/TracingModuleResolution/src/mytypescript.jsx' does not exist.
// File 'F:/TracingModuleResolution/mytypescript.js' does not exist.
// File 'F:/TracingModuleResolution/mytypescript.jsx' does not exist.
// File 'F:/mytypescript.js' does not exist.
// File 'F:/mytypescript.jsx' does not exist.
// ======== Module name 'mytypescript' was not resolved. ========


/** tsconfig.json module: commonjs  ===  tsc --traceResolution --moduleResolution node */

// ======== Resolving module 'mytypescript' from 'F:/TracingModuleResolution/src/app.ts'. ========
// Module resolution kind is not specified, using 'NodeJs'.
// Loading module 'mytypescript' from 'node_modules' folder, target file type 'TypeScript'.
// Directory 'F:/TracingModuleResolution/src/node_modules' does not exist, skipping all lookups in it.
// Found 'package.json' at 'F:/TracingModuleResolution/node_modules/mytypescript/package.json'.
// 'package.json' does not have a 'typesVersions' field.
// File 'F:/TracingModuleResolution/node_modules/mytypescript.ts' does not exist.
// File 'F:/TracingModuleResolution/node_modules/mytypescript.tsx' does not exist.
// File 'F:/TracingModuleResolution/node_modules/mytypescript.d.ts' does not exist.
// 'package.json' does not have a 'typings' field.
// 'package.json' has 'types' field 'lib/typescript.d.ts' that references 'F:/TracingModuleResolution/node_modules/mytypescript/lib/typescript.d.ts'.
// File 'F:/TracingModuleResolution/node_modules/mytypescript/lib/typescript.d.ts' exist - use it as a name resolution result.
// Resolving real path for 'F:/TracingModuleResolution/node_modules/mytypescript/lib/typescript.d.ts', result 'F:/TracingModuleResolution/node_modules/mytypescript/lib/typescript.d.ts'.
// ======== Module name 'mytypescript' was successfully resolved to 'F:/TracingModuleResolution/node_modules/mytypescript/lib/typescript.d.ts'. ========