const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new OmitJSforCSSPlugin()],
	mode : 'development',
	devtool: 'source-map',
	stats: 'none'
};
