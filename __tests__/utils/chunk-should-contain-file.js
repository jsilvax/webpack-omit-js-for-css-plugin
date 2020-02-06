/**
 * @param stats {String} The webpack compilation stats object
 * @param chunkName {String} The name of a chunk
 * @param fileName {String} The name of a file which should be contained in the chunk
 */
module.exports = function(stats, chunkName, fileName) {
	const chunks = stats.compilation.namedChunks;
	expect(typeof chunkName).toEqual('string');
	const chunk = chunks.get(chunkName);
	expect(typeof chunk).toEqual('object');
	expect(typeof fileName).toEqual('string');
	expect(chunk.files).toContain(fileName);
}
