const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName){
	expect(dirPath).to.be.a('string');
	expect(fileName).to.be.a('string');
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	expect(dirDirectoryExists).to.be.equal(true);
	expect(jsEntryFileExists).to.be.equal(true);
};