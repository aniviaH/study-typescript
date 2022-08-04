const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    'hello-vue': './src/main.ts',
  },
  mode: 'development',
  module: {
    // .vue文件先用vue-loader编译，后面再用ts-loader编译ts语法
    // 然而ts-loader默认并不认识.vue文件里面的ts语法，需要为.vue文件增加个appendTsSuffixTo配置，让其识别ts语法并进行编译
    // 现象是：如果没有appendTsSuffixTo配置，则项目编译能通过，但页面内容为空
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "dist"),
    port: 3020,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    }),
    // vue-loader需要VueLoaderPlugin的配合使用
    // vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
    new VueLoaderPlugin()
  ]
}