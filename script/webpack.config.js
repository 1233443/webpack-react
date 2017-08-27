/**
 * Created by dfc on 2017/8/25.
 */
const webpack = require("webpack");
const path = require("path");
module.exports = {
  resolve: {
    extensions: ["*", ".scss", ".less", ".css", ".js", ".jsx"],
    modules: [
      path.join(__dirname, "..", "src"),
      "node_modules"
    ],
    alias: {
      "jquery": path.join(__dirname, "..", "node_modules/jquery/dist/jquery.js"),
      "src": path.join(__dirname, "..", "src"),
      "css": path.join(__dirname, "..", "src", "style"),
      "com": path.join(__dirname, "..", "src", "components"),
      "stores": path.join(__dirname, "..", "src", "stores"),
      "view": path.join(__dirname, "..", "src", "view"),
      "service": path.join(__dirname, "..", "src", "service")
    }
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: path.join(__dirname, "..", "src"),
      use: [{
        loader: "babel-loader"
      }
      ]
    }, {
      test: /\.(png|jpg|svg|gif)$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "name].[ext]?[hash:8]"
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttr|otf)/,
      use: [
        "file-loader"
      ]
    }, {
      test: /\.(csv|tsv)$/,
      use: [
        "csv-loader"
      ]
    }, {
      test: /\.xml$/,
      use: [
        "xml-loader"
      ]
    }, {
      test: /\.json$/,
      use: [
        "json-loader"
      ]
    }]
  }
};
