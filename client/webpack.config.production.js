const path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const less = new ExtractTextPlugin('main.css');

module.exports = {
	entry: ['./src/index.js', './src/less/main.less'],
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},

	devServer: {
		port: 3000,
		historyApiFallback: true
	},

	module: {
		rules: [
			{
				test: /\.less$/,
				use: less.extract({
					fallback: 'style-loader',
					use: [{ loader: 'css-loader' }, { loader: 'less-loader' }]
				})
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
					plugins: ['transform-decorators-legacy' ], // needed for ES6 decorators
					presets: ['es2015', 'stage-0', 'react']  // stage-0 is for ES6 decorators
				}
			},
		],
	},

	externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    },

	plugins: [ 
		HtmlWebpackPluginConfig,
		less
	]
}