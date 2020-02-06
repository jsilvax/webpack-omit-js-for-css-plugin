[![npm version](https://img.shields.io/npm/v/webpack-omit-js-for-css-plugin.svg)](https://www.npmjs.com/package/webpack-omit-js-for-css-plugin) [![Build Status](https://travis-ci.org/jsilvax/webpack-omit-js-for-css-plugin.svg?branch=master)](https://travis-ci.org/jsilvax/webpack-omit-js-for-css-plugin) [![Coverage Status](https://coveralls.io/repos/github/jsilvax/webpack-omit-js-for-css-plugin/badge.svg)](https://coveralls.io/github/jsilvax/webpack-omit-js-for-css-plugin)

# Webpack Omit JS for CSS Plugin

This plugin will omit bundled JS files for dependencies that are exclusively CSS, which become obsolete once mini-css-extract-plugin extracts inlined CSS into its own .css file

## Rationale

This plugin should ONLY be used for LEGACY applications, whose goal is to transition into using a modern build process. This is not an optimized solution. This should ONLY be used as a means to get a legacy application into using bundled entries. The configuration here will NOT provide an optimzed solution for an evergreen project. DO NOT USE THIS if you're working on a NEW PROJECT in 2020+. 

In certain cases, you may want to organize some of your CSS dependencies into single files or entry arrays within Webpack. Even though mini-css-extract-plugin extracts CSS into its own .css file, Webpack will still generate a js file that will never be needed. This plugin will omit these types of files before Webpack begins its emitting step, so that you don't have to manually remove them. This plugin is especially useful for Webpack bundles that use a hash in the filename, as these change on every compilation.

Example as a file
```js
// styles.js
require('a.css');
require('b.css');

// webpack.config.js
module.exports = {
	entry: {
		'common.styles' : 'styles.js'
	}
}
```
> :warning: CSS dependencies in a JS file are 1 level deep. It will not recursively check for dependencies, that are exclusively CSS, when requiring additional JS files.

Example as an array
```js
module.exports = {
	entry: {
		'common.styles' : [
			'a.css',
			'b.css'
		]
	}
}
```
In both examples Webpack would output:
`` common.styles.js (Not Needed)``
``common.styles.css``


## Installation
```bash
// For Webpack v4.x
npm install --save-dev webpack-omit-js-for-css-plugin

// For Webpack v3.x
npm install --save-dev webpack-omit-js-for-css-plugin@2.0.0
```
## Usage

```js
const OmitJSforCSSPlugin = require("webpack-omit-js-for-css-plugin");

module.exports = {
	plugins: [
		new OmitJSforCSSPlugin()
	]
}
```
> Note: [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin "MiniCssExtractPlugin") is a Peer Dependency. You will need to configure that as you normally would in your webpack.config.js

## Options
```js
new OmitJSforCSSPlugin(options: object)
```
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`preview`**|`{Boolean}`|false|Will display a preview of the files that are to be omitted in the console (Will not actually omit)|
|**`verbose`**|`{Boolean}`|false|Whether it should display which files will be omitted to the console|

## :fire: Additional Notes :fire:
It is highly recommended you only include this plugin when you're building for production. 