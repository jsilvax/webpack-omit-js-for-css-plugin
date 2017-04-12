# Webpack Omit JS for CSS Plugin

This plugin will omit the JS files, for CSS only dependencies, that become obsolete once extract-text-plugin extracts all inlined CSS into its own .css file

## Rationale

In some cases, you may want to organize some of your CSS dependencies into single files or entry arrays within Webpack. Extract-text-plugin extracts the CSS into its own .css file, but Webpack will still generate a js file that will never be needed. This plugin will omit these types of files before Webpack begins it's emitting step. This plugin is especially useful for Webpack bundles that use a hash in the the filename, as these change on every compilation.

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
// Webpack Output:
// common.styles.js (Not Needed)
// common.styles.css
```
NOTE: CSS dependencies in a JS file are 1 level deep. It will not recursively check for dependencies that are only CSS when requiring additional JS files.

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
// Webpack Output:
// common.styles.js (Not Needed)
// common.styles.css
```


## Installation
```bash
npm install --save-dev webpack-omit-js-for-css-plugin
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
NOTE: [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin "ExtractTextPlugin") is a Peer Dependency. You will need to configure that as you normally would in your webpack.config.js

## Options
```js
new OmitJSforCSSPlugin(options: object)
```
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`preview`**|`{Boolean}`|false|Will display a preview of the files that are to be omitted in the console (Will not actually omit)|
|**`cacheOnWatch`**|`{Boolean}`|false|Whether it should cache the JS filenames that should be omitted, on watch|
|**`verbose`**|`{Boolean}`|false|Whether it should display which files will be omitted to the console|

## Additional Notes 
Although, this plugin supports caching the omissable files on watch, ideally you shouldn't be using this plugin during Development. Rather, it is highly recommended that you only include this plugin when you are building for production.