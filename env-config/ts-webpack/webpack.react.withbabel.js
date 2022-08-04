const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    "hello-react-babel" : "./src/ReactHello.tsx",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 这几个的顺序改变不影响编译
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer : {
		// contentBase : path.resolve(__dirname, "dist"),
		port : 3020
	},
	plugins : [new HtmlWebpackPlugin({
    template : path.resolve(__dirname, "template.html")
  })]
}