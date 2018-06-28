const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OmitJSforCSSPlugin = require('../../../../src/index.js');
const path = require('path');

module.exports = {
	entry: {
		j: ['preact', path.join(__dirname, '..', '/shared/one.css')]
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
	mode : 'development',
	plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new OmitJSforCSSPlugin({verbose : true})],
	stats: 'none',
	devtool: 'source-map'
};
