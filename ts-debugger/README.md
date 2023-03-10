# VSCode Debug TypeScript

## 通过node

1. 当前项目需要先构建出项目的js文件同时包含map文件来(ts编译选项需要 sourceMap: true)
2. 使用node的debug进行执行

## 通过ts-node

1. 安装插件 Typescript-Debugger
2. 添加debug 配置文件 .vscode/launch.json文件(通过侧边栏Run and Debug，选择create a launch.json)
3. 执行对应的debug名
4. 如果执行过程中报错 Cannot find module 'ts-node/register'，需要安装ts-node和typescript到项目中

## 快捷键: F5

## 参考链接

<https://code.visualstudio.com/docs/typescript/typescript-tutorial#_debugging>

<https://code.visualstudio.com/docs/typescript/typescript-debugging>
