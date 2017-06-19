const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName) {
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	expect(dirPath).to.be.a('string');
	expect(fileName).to.be.a('string');
	expect(dirDirectoryExists).to.be.equal(true);
	expect(jsEntryFileExists).to.be.equal(false);
};
