# Babel

## Install

```shell
npm install @babel/cli @babel/core @babel/preset-typescript --save-dev
```

## .babelrc

```json
{
  "presets": ["@babel/preset-typescript"]
}
```

Using Command Line Interface

```shell
./node_modules/.bin/babel --out-file bundle.js src/index.ts
```

```json
package.json
{
  "scripts": {
    "build": "babel --out-file bundle.js main.ts"
  },
}
```

Execute Babel from the command line

```shell
npm run build
```

Use Yarn

```shell
yarn babel --out-file bundle.js src/**
```
