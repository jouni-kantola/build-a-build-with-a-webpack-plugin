const path = require('path');
const webpack = require('webpack');
const LifecycleHooksPlugin = require('./plugins/lifecycle-hooks-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[chunkhash].js',
		path: path.join(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /.jpg$/,
				exclude: /node_modules/,
				loader: ['./loaders/ascii-image-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015'],
					plugins: ['syntax-dynamic-import']
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [new LifecycleHooksPlugin()]
};
