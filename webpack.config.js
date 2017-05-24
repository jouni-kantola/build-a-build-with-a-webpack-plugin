const path = require('path');
const webpack = require('webpack');

const BuildingBlocksPlugin = require('./plugins/building-blocks-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /index\.js$/,
				exclude: /node_modules/,
				loader: ['./loaders/luke-loader', './loaders/darth-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
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

	plugins: [new BuildingBlocksPlugin()]
};
