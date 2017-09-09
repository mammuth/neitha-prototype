const path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: ['./src/index.js', './src/less/main.less'],
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},

	devServer: {
		port: 5001,
		historyApiFallback: true
	},

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}]
			},
        	{ 	test: /\.(png|jpg|gif|jpeg)$/, 
        		loader: 'file-loader',
        		options: {
        			name: 'images/[name].[ext]'
        		}
        	},
        	{ 	test: /\.ico$/, 
        		loader: 'file-loader',
        		options: {
        			name: '[name].[ext]'
        		}
        	},
        	{ 	test: /\.(eot|ttf|otf|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        		loader: 'file-loader',
        		options: {
        			name: 'fonts/[name].[ext]'
        		}
        	},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
		],
	},

	plugins: [ 
		HtmlWebpackPluginConfig
	]
}