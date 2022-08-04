# 和webpack一起用

初始化一下这个项目：

```shell
mkdir ts-webpack
cd ts-webpack
npm init 
```

先安装依赖：

```shell
npm install webpack ts-loader typescript webpack-cli --save-dev
# 小师叔喜欢用yarn
# 感兴趣一起用: npm install -g yarn
# yarn add webpack ts-loader typescript webpack-cli

```

写一个用于测试的ts文件(src/index.ts)：

```ts
export class TreeNode<T> {
 left : TreeNode<T>
 right : TreeNode<T>
 data : T

 constructor(data : T) {
  this.data = data 
 }
}

function log(x){
 console.log(x)
}

const node = new TreeNode<number>(100)
log( node.data )
```

写一个`tsconfig.json`文件：

```json
{
}
```

然后配置一个针对ts文件打包处理的webpack配置。
文件名：webpack.config.js

```js
const path = require('path')
module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist"),
  }
}
```

为package.json增加指令：

```json
  "scripts": {
    "start:dev" : "webpack",   
  }
```

运行起来试一下效果：

```shell
npm run start:dev
```

编译时，根目录下需要有tsconfig.json文件，否则会编译报错

ERROR in ./src/index.ts
[tsl] ERROR
      TS18002: The 'files' list in config file 'tsconfig.json' is empty.
