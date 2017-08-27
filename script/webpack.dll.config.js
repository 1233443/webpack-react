const webpack = require('webpack');
const path = require("path");
const packageConfig = require("../package.json");

module.exports = {
  output: {
    path: path.join(__dirname, "..", "build"),
    filename: '[name].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: Object.keys(packageConfig.dependencies),
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'build/manifest.json',
      name: '[name]_[chunkhash]'
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),
    /*
     * 作用域提升，打包出来的文件代码更小，运行的更快
     * webpack --display-optimization-bailout
     * 上面的代码会提示你为什么你的不能用scope hoisting作用域提升
     * 使用这个插件，热替换将不会起作用,只在优化的时候用就可以了
     * */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
};