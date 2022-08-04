# typescript基础使用

1. 使用ts-node
2. 使用typescript的官方compiler tsc

## ts-node

Node环境的typescript解释执行器。 REPL(Read eval print loop)

```shell
npm i -g ts-node
# yarn global add ts-node
```

用ts-node执行文件

```shell
ts-node some.ts
```

### tsc（typescript compiler)

一个ts的编译器。

``` shell
# npm i -g tsc # 已被弃用
# yarn global add tsc

# 使用typescript
npm install -g typescript
# yarn global add typescript
```

可以指定编译某个ts文件：

```shell
# tsc命令编译ts文件
tsc hello.ts
# tsc命令可以使用参数进行编译选项设置
tsc ./src/hello.ts --outDir build --module es6 --sourceMap true --target esnext

```

也可以通过`tsconfig.json` 配置。

```json
# 项目里配置scripts/build进行编译项目，使用tsconfig.json进行编译选项配置，其与tsc的命令行的基础编译选项是一致的
"build": "tsc"
```

`tsconfig` 有专门一节，这里先提一下：

- `tsc` 作为一个指令，可以用`--help` 查看用法
- 可以用`outDir` 配置项配置js文件输出的位置  --outDir  Specify an output folder for all emitted files.
- 可以用`module`指定生成模块的类型  --module, -m  Specify what module code is generated.
                one of:  none, commonjs, amd, umd, system, es6/es2015, es2020, es2022, esnext, node16, nodenext
               default:  undefined
- `target` --target, -t  Set the JavaScript language version for emitted JavaScript and include compatible library decla                         rations.
                one of:  es3, es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, esnext
               default:  es3

## 总结

这节课学完，环境就懂了1/3。

为啥是1/3：

1. 集成vue/react的配置方法下一小节我们再讲
2. 还有一些高级技巧需要学完整个课程才能算掌握
