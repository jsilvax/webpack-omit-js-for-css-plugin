const chai = require('chai').expect;
const fs = require('fs');
const path = require('path');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName){
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	chai(dirPath).to.be.a('string');
	chai(fileName).to.be.a('string');
	chai(dirDirectoryExists).to.be.equal(true);
	chai(jsEntryFileExists).to.be.equal(false);
};