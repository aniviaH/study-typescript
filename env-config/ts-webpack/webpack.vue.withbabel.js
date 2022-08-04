const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    'hello-vue-babel': './src/main.ts',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 经实践，下面三个改变顺序不影响编译，而且@babel/preset-env @babel/preset-typescript这两个去掉也不影响编译
              '@babel/preset-env',
              'babel-preset-typescript-vue3',
              '@babel/preset-typescript'
            ]
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  resolve: {
    extensions: [".vue", ".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "dist"),
    port: 3020,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
    new VueLoaderPlugin()
  ],
}