const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');
const fileShouldExist = require('./utils/file-should-exist.js');

const internalOptions = require('./fixtures/should-not-omit/internal-dep/webpack.config.js');
const internalDirPath = path.join(__dirname, './fixtures/should-not-omit/internal-dep/dir');

const externalOptions = require('./fixtures/should-not-omit/external-dep/webpack.config.js');
const externalOptionsArr = require('./fixtures/should-not-omit/external-dep/webpack.config.arr.js');
const externalDirPath = path.join(__dirname, '/fixtures/should-not-omit/external-dep/dir');

const mixedOptions = require('./fixtures/should-not-omit/mixed-dep/webpack.config.js');
const mixedDirPath = path.join(__dirname, '/fixtures/should-not-omit/mixed-dep/dir');

describe("JS Dependencies that shouldn't be omitted", () => {
	describe('Internal', () => {
		before(done => {
			rimraf(internalDirPath, () => {
				done();
			});
		});

		it('should not omit JS with internal deps', done => {
			webpack(internalOptions, () => {
				fileShouldExist(internalDirPath, '/b.js');
				fileShouldExist(internalDirPath, '/b.js.map');
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
			webpack(externalOptions, () => {
				fileShouldExist(externalDirPath, '/c.js');
				fileShouldExist(externalDirPath, '/c.js.map');
				done();
			});
		});

		it('should not omit JS with an array of external dependencies', done => {
			webpack(externalOptionsArr, () => {
				fileShouldExist(externalDirPath, '/e.js');
				fileShouldExist(externalDirPath, '/e.js.map');
				done();
			});
		});
	});

	describe('Mixed', () => {
		before(done => {
			rimraf(mixedDirPath, () => {
				done();
			});
		});

		it('should not omit JS with mixed dependencies', done => {
			webpack(mixedOptions, () => {
				fileShouldExist(mixedDirPath, '/d.js');
				fileShouldExist(mixedDirPath, '/d.js.map');
				fileShouldExist(mixedDirPath, '/d.css');
				fileShouldExist(mixedDirPath, '/d.css.map');
				done();
			});
		});
	});
});
