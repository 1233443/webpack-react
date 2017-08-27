const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const precss = require("precss");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssConfig = require("./postcss.config.js");
//const UglifyJsPlugin = require("uglify-js-plugin");
const merger = require("webpack-merge");
const webpackConfig = require("./webpack.config");

const config = {
  entry: {
    "app": path.join(__dirname, "..", "src/index.js")
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "script/app.[name].js",
    publicPath: ""
  },
  plugins: [
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
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      title: "这是一个测试的webpack2项目",
      filename: "index.html",
      template: path.join(__dirname, "..", "index.html"),
      inject: true, //自动写入依赖
      minify: {
        removeComments: false, //移除html中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin({
      filename: "style/[name].css",
      ignoreOrder: true,
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: function () {
          return postcssConfig.plugins;
        }
      }
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require(path.join(__dirname, "..", "build", 'manifest.json'))
    }),
    new AddAssetHtmlPlugin([{
      filepath: require.resolve(path.join(__dirname, "..", 'build', "vendor.js")),
      includeSourcemap: false
    }])
  ]
};
module.exports = merge(config, webpackConfig);