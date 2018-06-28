const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/js-file-entry/webpack.config.js');
const optionsLess = require('./fixtures/js-file-entry/webpack.config.less.js');
const optionsSass = require('./fixtures/js-file-entry/webpack.config.sass.js');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');
const dirPath = path.join(__dirname, './fixtures/js-file-entry/dir');

describe('JS file with CSS Dependencies as Entry', () => {
	beforeEach(done => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry file should not exist', done => {
		webpack(options, () => {
			fileShouldNotExist(dirPath, '/b.js');
			done();
		});
	});

	it('JS entry source map should not exist', done => {
		const optionSourceMap = Object.assign({}, options);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/b.js.map');
			done();
		});
	});

	it('JS entry file should not exist w/ less', done => {
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

	it('JS entry file should not exist w/ sass', done => {
		webpack(optionsSass, () => {
			fileShouldNotExist(dirPath, '/s.js');
			done();
		});
	});

	it('JS entry source map should not exist w/ sass', done => {
		const optionSourceMap = Object.assign({}, optionsSass);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, () => {
			fileShouldNotExist(dirPath, '/s.js.map');
			done();
		});
	});		
});
