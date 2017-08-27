import express from "express";
import webpack from "webpack";
import path from "path";
import open from "opn";

/*import React from "react";
import {renderToString} from "react-dom/server";
import {RoutingContext, match} from "react-router";
import {Provider} from "react-redux";
import routes from "../src/routes";
import configStore from "../src/stores";*/

const port = process.env.PORT || 4001;

/*
 * 初始化
 * */
const app = express();

if(process.env.NODE_ENV == "development") {
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var webpackDevConfig = require('./webpack.dev.config.js');
	var devClient = './dev-client';
	Object.keys(webpackDevConfig.entry).forEach(function(name, i) {
		var extras = [devClient];
		webpackDevConfig.entry[name] = extras.concat(webpackDevConfig.entry[name]);
	});
	var compiler = webpack(webpackDevConfig);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackDevConfig.output.publicPath,
		stats: {
			colors: true
		}
	}));
	//监听html文件改变事件
	// compiler.plugin('compilation', function(compilation) {
	//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
	//         // 发布事件 reload,这个事件会在dev-client.js中接受到，然后刷新
	//         webpackHotMiddleware.publish({
	//             action: 'reload'
	//         });
	//         cb()
	//     })
	// });
	app.use(webpackHotMiddleware(compiler));
} else {
	app.use(express.static(path.join(__dirname, "..", 'dist')));
}
/*
 * 开启服务
 * */
app.listen(port, function() {
	console.log('Local http://localhost:' + port + '/\n');
	//open('http://localhost:' + port + '/\n');
});