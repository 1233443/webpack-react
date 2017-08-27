const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssConfig = require("./postcss.config.js");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const merger = require("webpack-merge");
const webpackConfig = require("./webpack.config");

const config = {
  entry: {
    app: path.join(__dirname, "..", "src", "index.js")
  },
  devtool: "source-map", //chrom调试工具资源里面可以断点调试
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    historyApiFallback: true,
    noInfo: true,
    stats: "minimal",
    publicPath: "",
    overlay: {
      //配置成在浏览器上显示的代码规范的警告跟错误
      error: true,
      warnings: true
    }
  },
  performance: {
    hints: "warning", //运行时以警告的方式提示warning error
    maxEntrypointSize: 5000000, //限制入口文件大小是10k
    maxAssetSize: 5000000 //限制图片大小是50k
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].bundle.js",
    publicPath: ""
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.NamedModulesPlugin(), //在HMR更新的浏览器控制台中打印更易读的模块名称
    new webpack.BannerPlugin({
      banner: "我是注释",
      raw: false, //如果为false，将作为注释输出
      entryOnly: true //如果为true,将只在入门chunks文件中添加
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // }),
    new ExtractTextPlugin({
      filename: "style/[name].css",
      ignoreOrder: true,
      disable: false,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    //等价于webpack-dev-server中的--hot
    /* new webpack.optimize.CommonsChunkPlugin({
     name: "vendor",
     minChunks: function (module) {
     //将node_module下的引入都打包到vender模块中
     return module.context && module.context.indexOf("node_modules") !== -1;
     }
     }),*/
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    }),
    //因为一些第三方库出现全局的$,jquery
    new webpack.ProvidePlugin({
      //把jquery当成全局变量，直接在页面里面引入$即可
      $: "jquery",
      "jQuery": "jquery"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return postcssConfig.plugins;
        }
      }
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
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '..', "build", 'manifest.json'))
    }),
    new AddAssetHtmlPlugin([{
      filepath: require.resolve(path.join(__dirname, "..", 'build', "vendor.js")),
      includeSourcemap: false
    }])
  ]
};
module.exports = merger(config, webpackConfig);
