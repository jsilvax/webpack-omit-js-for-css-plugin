const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OmitJSforCSSPlugin = require('../../../../src/index.js');
const path = require('path');

module.exports = {
	entry : {
		'b' : path.join(__dirname, '../shared/styles.js')
	},
	output : {
		filename : '[name].js',
		path : path.join(__dirname, '/dir')
	},
	module : {
		rules : [{
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: "css-loader"
	        })
	    }],
	},
	plugins : [
		new ExtractTextPlugin({ filename : '[name].css' }),
		new OmitJSforCSSPlugin({ cacheOnWatch : true })
	],
	stats : 'none',
	devtool : 'source-map'
};