const webpack = require('webpack');
const expect = require('chai').expect;
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/css-array-entry/webpack.config.js');
const dirPath = path.join(__dirname, './fixtures/css-array-entry/dir');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');

describe('Array of CSS Dependencies as Entry', () => {
	before((done) => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry should not exist', (done) => {
		webpack(options, () => {
			fileShouldNotExist(dirPath, '/a.js');
			done();
		});
	});

	it('JS entry source map should not exist', (done) => {
		var optionSourceMap = Object.assign({}, options);
			optionSourceMap.devtool = 'source-map';
			
		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/a.js.map');
			done();
		});
	});
});