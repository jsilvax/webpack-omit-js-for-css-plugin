const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/css-array-entry/webpack.config.js');
const optionsSass = require('./fixtures/css-array-entry/webpack.config.sass.js');
const optionsLess = require('./fixtures/css-array-entry/webpack.config.less.js');
const dirPath = path.join(__dirname, './fixtures/css-array-entry/dir');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');
const chunkShouldNotContainFile = require('./utils/chunk-should-not-contain-file.js');

describe('Array of CSS Dependencies as Entry', () => {
	beforeEach(done => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry should not exist', done => {
		webpack(options, (err, stats) => {
			fileShouldNotExist(dirPath, '/a.js');
			chunkShouldNotContainFile(stats, 'a', 'a.js');
			done();
		});
	});

	it('JS entry source map should not exist', done => {
		const optionSourceMap = Object.assign({}, options);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, (err, stats) => {
			fileShouldNotExist(dirPath, '/a.js.map');
			chunkShouldNotContainFile(stats, 'a', 'a.js.map');
			done();
		});
	});

	it('JS entry should not exist w/ sass', done => {
		webpack(optionsSass, (err, stats) => {
			fileShouldNotExist(dirPath, '/s.js');
			chunkShouldNotContainFile(stats, 's', 's.js');
			done();
		});
	});

	it('JS entry source map should not exist w/ sass', done => {
		const optionSourceMap = Object.assign({}, optionsSass);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, (err, stats) => {
			fileShouldNotExist(dirPath, '/s.js.map');
			chunkShouldNotContainFile(stats, 's', 's.js.map');
			done();
		});
	});	

	it('JS entry should not exist w/ less', done => {
		webpack(optionsLess, (err, stats) => {
			fileShouldNotExist(dirPath, '/l.js');
			chunkShouldNotContainFile(stats, 'l', 'l.js');
			done();
		});
	});

	it('JS entry source map should not exist w/ less', done => {
		const optionSourceMap = Object.assign({}, optionsLess);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, (err, stats) => {
			fileShouldNotExist(dirPath, '/l.js.map');
			chunkShouldNotContainFile(stats, 'l', 'l.js.map');
			done();
		});
	});	
});
