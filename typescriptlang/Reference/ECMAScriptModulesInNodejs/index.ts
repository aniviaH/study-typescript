// For the last few years, Node.js has been working to support running ECMAScript modules (ESM). 
// This has been a very difficult feature to support, since the foundation of the Node.js ecosystem is built on a different module system called CommonJS (CJS).

// Interoperating between the two module systems brings large challenges, with many new features to juggle(兼顾); 
// however, support for ESM in Node.js is now implemented in Node.js, and the dust has begun to settle(尘埃落定).

// That’s why TypeScript brings two new module and moduleResolution settings: node16 and nodenext.

// {
//   "compilerOptions": {
//       "module": "nodenext",
//   }
// }

// These new modes bring a few high-level features which we’ll explore here.

// type in package.json and New Extensions

