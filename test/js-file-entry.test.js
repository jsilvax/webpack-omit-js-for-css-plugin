const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/js-file-entry/webpack.config.js');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');
const dirPath = path.join(__dirname, './fixtures/js-file-entry/dir');

describe('JS file with CSS Dependencies as Entry', () => {
	beforeEach((done) => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry file should not exist', (done) => {
		webpack(options, () => {
			fileShouldNotExist(dirPath, '/b.js');
			done();
		});
	});

	it('JS entry source map should not exist', (done) => {
		var optionSourceMap = Object.assign({}, options);
			optionSourceMap.devtool = 'source-map';
			
		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/b.js.map');
			done();
		});
	});

});