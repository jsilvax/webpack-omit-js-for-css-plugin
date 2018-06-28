const fs = require('fs');
const path = require('path');
/**
 * @param dirPath {String} The directory path
 * @param fileName {String} The filename
 */
module.exports = function(dirPath, fileName) {
	const dirDirectoryExists = fs.existsSync(dirPath);
	const jsEntryFileExists = fs.existsSync(path.join(dirPath, fileName));
	expect(typeof dirPath).toEqual('string');
	expect(typeof fileName).toEqual('string');
	expect(dirDirectoryExists).toEqual(true);
	expect(jsEntryFileExists).toEqual(false);
};
