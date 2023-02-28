module.exports = {
  entry: './src/app.tsx',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  devtool: "source-map"
}
