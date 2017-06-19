const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OmitJSforCSSPlugin = require('../../../src/index.js');
const path = require('path');

module.exports = {
	entry: {
		a: [path.join(__dirname, 'one.css'), path.join(__dirname, 'two.css')]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dir')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			}
		]
	},
	plugins: [new ExtractTextPlugin({ filename: '[name].css' }), new OmitJSforCSSPlugin()],
	devtool: 'source-map',
	stats: 'none'
};
