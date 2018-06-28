const path = require('path');
const fs = require('fs');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName) {
	expect(typeof dirPath).toEqual('string');
	expect(typeof fileName).toEqual('string');
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	expect(dirDirectoryExists).toEqual(true);
	expect(jsEntryFileExists).toEqual(true);
};
