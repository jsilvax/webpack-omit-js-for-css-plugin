const chai = require('chai').expect;
const path = require('path');
const fs = require('fs');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName){
	chai(dirPath).to.be.a('string');
	chai(fileName).to.be.a('string');
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	chai(dirDirectoryExists).to.be.equal(true);
	chai(jsEntryFileExists).to.be.equal(true);
};