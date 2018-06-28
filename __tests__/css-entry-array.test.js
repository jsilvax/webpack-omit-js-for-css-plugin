const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/css-array-entry/webpack.config.js');
const optionsSass = require('./fixtures/css-array-entry/webpack.config.sass');
const optionsLess = require('./fixtures/css-array-entry/webpack.config.less');
const dirPath = path.join(__dirname, './fixtures/css-array-entry/dir');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');

describe('Array of CSS Dependencies as Entry', () => {
	beforeEach(done => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry should not exist', done => {
		webpack(options, () => {
			fileShouldNotExist(dirPath, '/a.js');
			done();
		});
	});

	it('JS entry source map should not exist', done => {
		const optionSourceMap = Object.assign({}, options);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/a.js.map');
			done();
		});
	});

	it('JS entry should not exist w/ sass', done => {
		webpack(optionsSass, () => {
			fileShouldNotExist(dirPath, '/s.js');
			done();
		});
	});

	it('JS entry source map should not exist w/ sass', done => {
		const optionSourceMap = Object.assign({}, options);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/s.js.map');
			done();
		});
	});	

	it('JS entry should not exist w/ less', done => {
		webpack(optionsLess, () => {
			fileShouldNotExist(dirPath, '/l.js');
			done();
		});
	});

	it('JS entry source map should not exist w/ less', done => {
		const optionSourceMap = Object.assign({}, optionsLess);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/l.js.map');
			done();
		});
	});	
});
