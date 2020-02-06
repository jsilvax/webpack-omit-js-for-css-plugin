const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const fileShouldExist = require('./utils/file-should-exist.js');
const chunkShouldContainFile = require('./utils/chunk-should-contain-file.js');
// Internal
const internalOptions = require('./fixtures/should-not-omit/internal-dep/webpack.config.js');
const internalDirPath = path.join(__dirname, './fixtures/should-not-omit/internal-dep/dir');
// External 
const externalOptions = require('./fixtures/should-not-omit/external-dep/webpack.config.js');
const externalOptionsArr = require('./fixtures/should-not-omit/external-dep/webpack.config.arr.js');
const externalDirPath = path.join(__dirname, '/fixtures/should-not-omit/external-dep/dir');
// External Internal 
const extInOptions = require('./fixtures/should-not-omit/external-internal/webpack.config.js');
const extInDirPath = path.join(__dirname, '/fixtures/should-not-omit/external-internal/dir');
const extInArrOptions = require('./fixtures/should-not-omit/external-internal/webpack.config.arr.js');
// Mixed
const mixedOptions = require('./fixtures/should-not-omit/mixed-dep/webpack.config.js');
const mixedDirPath = path.join(__dirname, '/fixtures/should-not-omit/mixed-dep/dir');

describe("JS Dependencies that shouldn't be omitted", () => {
	describe('Internal', () => {
		beforeEach(done => {
			rimraf(internalDirPath, () => {
				done();
			});
		});

		it('should not omit JS with internal deps', done => {
			webpack(internalOptions, (err, stats) => {
				fileShouldExist(internalDirPath, '/b.js');
				chunkShouldContainFile(stats, 'b', 'b.js');
				fileShouldExist(internalDirPath, '/b.js.map');
				chunkShouldContainFile(stats, 'b', 'b.js.map');
				done();
			});
		});
	});

	describe('External', () => {
		beforeEach(done => {
			rimraf(externalDirPath, () => {
				done();
			});
		});

		it('should not omit JS with external dependencies', done => {
			webpack(externalOptions, (err, stats) => {
				fileShouldExist(externalDirPath, '/c.js');
				chunkShouldContainFile(stats, 'c', 'c.js');
				fileShouldExist(externalDirPath, '/c.js.map');
				chunkShouldContainFile(stats, 'c', 'c.js.map');
				done();
			});
		});

		it('should not omit JS with an array of external dependencies', done => {
			webpack(externalOptionsArr, (err, stats) => {
				fileShouldExist(externalDirPath, '/e.js');
				chunkShouldContainFile(stats, 'e', 'e.js');
				fileShouldExist(externalDirPath, '/e.js.map');
				chunkShouldContainFile(stats, 'e', 'e.js.map');
				done();
			});
		});
	});

	describe('External Internal', () => {
		beforeEach(done => {
			rimraf(extInDirPath, () => {
				done();
			});
		});

		it('should not omit JS with external and internal dependencies', done => {
			webpack(extInOptions, (err, stats) => {
				fileShouldExist(extInDirPath, '/f.js');
				chunkShouldContainFile(stats, 'f', 'f.js');
				fileShouldExist(extInDirPath, '/f.js.map');
				chunkShouldContainFile(stats, 'f', 'f.js.map');
				fileShouldExist(extInDirPath, '/f.css');
				chunkShouldContainFile(stats, 'f', 'f.css');
				fileShouldExist(extInDirPath, '/f.css.map');
				chunkShouldContainFile(stats, 'f', 'f.css.map');
				done();
			});
		});
		
		it('should not omit JS with external and internal dependencies when entry is array', done => {
			webpack(extInArrOptions, (err, stats) => {
				fileShouldExist(extInDirPath, '/j.js');
				chunkShouldContainFile(stats, 'j', 'j.js');
				fileShouldExist(extInDirPath, '/j.js.map');
				chunkShouldContainFile(stats, 'j', 'j.js.map');
				fileShouldExist(extInDirPath, '/j.css');
				chunkShouldContainFile(stats, 'j', 'j.css');
				fileShouldExist(extInDirPath, '/j.css.map');
				chunkShouldContainFile(stats, 'j', 'j.css.map');
				done();
			});
		});		
	});	

	describe('Mixed', () => {
		beforeEach(done => {
			rimraf(mixedDirPath, () => {
				done();
			});
		});

		it('should not omit JS with mixed dependencies', done => {
			webpack(mixedOptions, (err, stats) => {
				fileShouldExist(mixedDirPath, '/d.js');
				chunkShouldContainFile(stats, 'd', 'd.js');
				fileShouldExist(mixedDirPath, '/d.js.map');
				chunkShouldContainFile(stats, 'd', 'd.js.map');
				fileShouldExist(mixedDirPath, '/d.css');
				chunkShouldContainFile(stats, 'd', 'd.css');
				fileShouldExist(mixedDirPath, '/d.css.map');
				chunkShouldContainFile(stats, 'd', 'd.css.map');
				done();
			});
		});
	});
});
