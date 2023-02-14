// This section assumes some basic knowledge about modules. Please see the Modules documentation for more information.

// Module resolution is the process the compiler uses to figure out what an import refers to. 
// Consider an import statement like import { a } from "moduleA"; in order to check any use of a, the compiler needs to know exactly what it represents, and will need to check its definition moduleA.

// At this point, the compiler will ask “what’s the shape of moduleA?” 
// While this sounds straightforward, moduleA could be defined in one of your own .ts/.tsx files, or in a .d.ts that your code depends on.

// First, the compiler will try to locate a file that represents the imported module. 
// To do so the compiler follows one of two different strategies: <Classic> or <Node>. 
// These strategies tell the compiler where to look for moduleA.

// If that didn’t work and if the module name is non-relative (and in the case of "moduleA", it is), then the compiler will attempt to locate an ambient module declaration. We’ll cover non-relative imports next.

// Finally, if the compiler could not resolve the module, it will log an error. 
// In this case, the error would be something like error TS2307: Cannot find module 'moduleA'.

/** Relative vs. Non-relative module imports */

// Module imports are resolved differently based on whether the module reference is relative or non-relative.

// A relative import is one that starts with /, ./ or ../. Some examples include:

// import Entry from "./components/Entry";
// import { DefaultHeaders } from "../constants/http";
// import "/mod";

// Any other import is considered non-relative. Some examples include:

// import * as $ from "jquery";
// import { Component } from "@angular/core";

// A relative import is resolved relative to the importing file and cannot resolve to an ambient module declaration. 
// You should use relative imports for your own modules that are guaranteed to maintain their relative location at runtime.

// A non-relative import can be resolved relative to baseUrl, or through path mapping, which we’ll cover below. They can also resolve to ambient module declarations. 
// Use non-relative paths when importing any of your external dependencies.


/** Module Resolution Strategies */

// There are two possible module resolution strategies: Node and Classic.
// You can use the moduleResolution option to specify the module resolution strategy.
// If not specified, the default is Node for --module commonjs, and Classic otherwise (including when module is set to amd, system, umd, es2015, esnext, etc.).

// Note: node module resolution is the most-commonly used in the TypeScript community and is recommended for most projects. 
// If you are having resolution problems with imports and exports in TypeScript, try setting moduleResolution: "node" to see if it fixes the issue.


/** Classic */

// This used to be TypeScript’s default resolution strategy. Nowadays, this strategy is mainly present for backward compatibility.

// A relative import will be resolved relative to the importing file. So import { b } from "./moduleB" in source file /root/src/folder/A.ts would result in the following lookups:
// 1. /root/src/folder/moduleB.ts
// 2. /root/src/folder/moduleB.d.ts

// For non-relative module imports, however, the compiler walks up the directory tree starting with the directory containing the importing file, trying to locate a matching definition file.
// For example:
// A non-relative import to moduleB such as import { b } from "moduleB", in a source file /root/src/folder/A.ts, would result in attempting the following locations for locating "moduleB":
// 1. /root/src/folder/moduleB.ts
// 2. /root/src/folder/moduleB.d.ts
// 3. /root/src/moduleB.ts
// 4. /root/src/moduleB.d.ts
// 5. /root/moduleB.ts
// 6. /root/moduleB.d.ts
// 7. /moduleB.ts
// 8. /moduleB.d.ts


/** Node */

// This resolution strategy attempts to mimic the Node.js module resolution mechanism at runtime. 
// The full Node.js resolution algorithm is outlined in <Node.js module documentation>(https://nodejs.org/api/modules.html#modules_all_together).

// How Node.js resolves modules

// To understand what steps the TS compiler will follow, it is important to shed some light on Node.js modules. 
// Traditionally, imports in Node.js are performed by calling a function named require. 
// The behavior Node.js takes will differ depending on if require is given a relative path or a non-relative path.

// Relative paths are fairly straightforward. As an example, let’s consider a file located at /root/src/moduleA.js, which contains the import var x = require("./moduleB"); Node.js resolves that import in the following order:
// 1. Ask the file named /root/src/moduleB.js, if it exists.
// 2. Ask the folder /root/src/moduleB if it contains a file named package.json that specifies a "main" module. In our example, if Node.js found the file /root/src/moduleB/package.json containing { "main": "lib/mainModule.js" }, then Node.js will refer to /root/src/moduleB/lib/mainModule.js.
// 3. Ask the folder /root/src/moduleB if it contains a file named index.js. That file is implicitly considered that folder’s “main” module.

// You can read more about this in Node.js documentation on file modules and folder modules.You can read more about this in Node.js documentation on <file modules>(https://nodejs.org/api/modules.html#modules_file_modules) and <folder modules>(https://nodejs.org/api/modules.html#modules_folders_as_modules).

// However, resolution for a non-relative module name is performed differently. 
// Node will look for your modules in special folders named node_modules. 
// A node_modules folder can be on the same level as the current file, or higher up in the directory chain.
// Node will walk up the directory chain, looking through each node_modules until it finds the module you tried to load.

// Following up our example above, consider if /root/src/moduleA.js instead used a non-relative path and had the import var x = require("moduleB");. 
// Node would then try to resolve moduleB to each of the locations until one worked.

// 1. /root/src/node_modules/moduleB.js
// 2. /root/src/node_modules/moduleB/package.json (if it specifies a "main" property)
// 3. /root/src/node_modules/moduleB/index.js

// 4. /root/node_modules/moduleB.js
// 5. /root/node_modules/moduleB/package.json (if it specifies a "main" property)
// 6. /root/node_modules/moduleB/index.js

// 7. /node_modules/moduleB.js
// 8. /node_modules/moduleB/package.json (if it specifies a "main" property)
// 9. /node_modules/moduleB/index.js

// Notice that Node.js jumped up a directory in steps (4) and (7).

// You can read more about the process in Node.js documentation on <loading modules from node_modules>.


/** How TypeScript resolves modules */

// TypeScript will mimic the Node.js run-time resolution strategy in order to locate definition files for modules at compile-time. 
// To accomplish this, TypeScript overlays the TypeScript source file extensions (.ts, .tsx, and .d.ts) over Node’s resolution logic.
// TypeScript will also use a field in package.json named types to mirror the purpose of "main" - the compiler will use it to find the “main” definition file to consult.

// For example, an import statement like import { b } from "./moduleB" in /root/src/moduleA.ts would result in attempting the following locations for locating "./moduleB":

// 1. /root/src/moduleB.ts
// 2. /root/src/moduleB.tsx
// 3. /root/src/moduleB.d.ts
// 4. /root/src/moduleB/package.json (if it specifies a types property)
// 5. /root/src/moduleB/index.ts
// 6. /root/src/moduleB/index.tsx
// 7. /root/src/moduleB/index.d.ts

// Recall that Node.js looked for a file named moduleB.js, then an applicable package.json, and then for an index.js.

// Similarly, a non-relative import will follow the Node.js resolution logic, first looking up a file, then looking up an applicable folder. 
// So import { b } from "moduleB" in source file /root/src/moduleA.ts would result in the following lookups:

// 1.  /root/src/node_modules/moduleB.ts
// 2.   /root/src/node_modules/moduleB.tsx
// 3.  /root/src/node_modules/moduleB.d.ts
// 4.  /root/src/node_modules/moduleB/package.json (if it specifies a types property)
// 5.  /root/src/node_modules/@types/moduleB.d.ts
// 6.  /root/src/node_modules/moduleB/index.ts
// 7.  /root/src/node_modules/moduleB/index.tsx
// 8.  /root/src/node_modules/moduleB/index.d.ts

// 9.  /root/node_modules/moduleB.ts
// 10. /root/node_modules/moduleB.tsx
// 11. /root/node_modules/moduleB.d.ts
// 12. /root/node_modules/moduleB/package.json (if it specifies a types property)
// 13. /root/node_modules/@types/moduleB.d.ts
// 14. /root/node_modules/moduleB/index.ts
// 15. /root/node_modules/moduleB/index.tsx
// 16. /root/node_modules/moduleB/index.d.ts

// 17. /node_modules/moduleB.ts
// 18. /node_modules/moduleB.tsx
// 19. /node_modules/moduleB.d.ts
// 20. /node_modules/moduleB/package.json (if it specifies a types property)
// 21. /node_modules/@types/moduleB.d.ts
// 22. /node_modules/moduleB/index.ts
// 23. /node_modules/moduleB/index.tsx
// 24. /node_modules/moduleB/index.d.ts

// Don’t be intimidated by the number of steps here - TypeScript is still only jumping up directories twice at steps (9) and (17). 
// This is really no more complex than what Node.js itself is doing.

