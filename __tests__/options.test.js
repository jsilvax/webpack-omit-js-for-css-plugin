const rimraf = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const OmitJSforCSSPlugin = require('../src/index.js');
const fileShouldExist = require('./utils/file-should-exist.js');
const fileShouldNotExist = require('./utils/file-should-not-exist.js');
const chunkShouldContainFile = require('./utils/chunk-should-contain-file.js');
const previewOptions = require('./fixtures/options/preview/webpack.config.js');
const previewDirPath = path.join(__dirname, '/fixtures/options/preview/dir');
const verboseOptions = require('./fixtures/options/verbose/webpack.config.js');
const verboseDirPath = path.join(__dirname, '/fixtures/options/verbose/dir');

describe('Options', () => {
	describe('Argument', () => {
		it('should throw if an invalid argument is passed', done => {
			const errorMsg = 'OmitJSforCSSPlugin only takes an options "object" as an argument';
			expect(() => {
				new OmitJSforCSSPlugin(5);
			}).toThrow(errorMsg);
			expect(() => {
				new OmitJSforCSSPlugin('verbose');
			}).toThrow(errorMsg);
			expect(() => {
				new OmitJSforCSSPlugin(null);
			}).toThrow(errorMsg);
			expect(() => {
				new OmitJSforCSSPlugin([]);
			}).toThrow(errorMsg);
			done();
		});

		it('should not throw if a correct argument is passed', done => {
			expect(() => {
				new OmitJSforCSSPlugin({});
			}).not.toThrow();
			done();
		});
	});

	describe('Preview', () => {
		beforeEach(done => {
			jest.clearAllMocks();
			rimraf(previewDirPath, () => {
				done();
			});
		});

		afterAll(() => {
			console.log.mockRestore();
		});

		it('should display the files that would be omitted', done => {
			console.log = jest.fn();

			webpack(previewOptions, () => {

				expect(console.log).toHaveBeenNthCalledWith(1, 'PREVIEW File to be omitted for b : b.js');
				expect(console.log).toHaveBeenNthCalledWith(2, 'PREVIEW File to be omitted for b : b.js.map');

				done();
			});
		});

		it('should not omit files', done => {
			webpack(previewOptions, (err, stats) => {
				fileShouldExist(previewDirPath, 'b.js');
				chunkShouldContainFile(stats, 'b', 'b.js');
				fileShouldExist(previewDirPath, 'b.js.map');
				chunkShouldContainFile(stats, 'b', 'b.js.map');
				done();
			});
		});
	});

	describe('Verbose', () => {
		beforeEach(done => {
			jest.clearAllMocks();
			rimraf(verboseDirPath, () => {
				done();
			});
		});

		afterAll(() => {
			console.log.mockRestore();
		});

		it('should display the files that are omitted to console', done => {
			console.log = jest.fn();

			webpack(verboseOptions, () => {
				expect(console.log).toHaveBeenNthCalledWith(1, 'File omitted for b : b.js')
				expect(console.log).toHaveBeenNthCalledWith(2, 'File omitted for b : b.js.map')

				done();
			});
		});
	});

});
