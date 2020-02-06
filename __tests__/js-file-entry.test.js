const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const options = require('./fixtures/js-file-entry/webpack.config.js');
const optionsLess = require('./fixtures/js-file-entry/webpack.config.less.js');
const optionsSass = require('./fixtures/js-file-entry/webpack.config.sass.js');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');
const chunkShouldNotContainFile = require('./utils/chunk-should-not-contain-file.js');
const dirPath = path.join(__dirname, './fixtures/js-file-entry/dir');

describe('JS file with CSS Dependencies as Entry', () => {
	beforeEach(done => {
		rimraf(dirPath, () => {
			done();
		});
	});

	it('JS entry file should not exist', done => {
		webpack(options, (err, stats) => {
			fileShouldNotExist(dirPath, '/b.js');
			chunkShouldNotContainFile(stats, 'b', 'b.js');
			done();
		});
	});

	it('JS entry source map should not exist', done => {
		const optionSourceMap = Object.assign({}, options);
		optionSourceMap.devtool = 'source-map';

		webpack(optionSourceMap, (err, stats) => {
			fileShouldNotExist(dirPath, '/b.js.map');
			chunkShouldNotContainFile(stats, 'b', 'b.js.map');
			done();
		});
	});

	it('JS entry file should not exist w/ less', done => {
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

	it('JS entry file should not exist w/ sass', done => {
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
});
