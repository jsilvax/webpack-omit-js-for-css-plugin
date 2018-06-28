const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OmitJSforCSSPlugin = require('../../../src/index.js');
const path = require('path');

module.exports = {
	entry: {
		s: [path.join(__dirname, 'two.scss'), path.join(__dirname, 'three.sass')]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dir')
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new OmitJSforCSSPlugin()],
	mode : 'development',
	devtool: 'source-map',
	stats: 'none'
};
