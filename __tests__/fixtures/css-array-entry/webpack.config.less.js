const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OmitJSforCSSPlugin = require('../../../src/index.js');
const path = require('path');

module.exports = {
	entry: {
		l: [path.join(__dirname, 'one.less'), path.join(__dirname, 'two.less')]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dir')
	},
	module: {
		rules: [
			{
				test: /\.(less)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			}
		]
	},
	mode: 'development',
	plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new OmitJSforCSSPlugin()],
	stats: 'none'
};
