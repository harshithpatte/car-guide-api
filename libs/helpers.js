/*
*
* helpers
*/

//dependencies

//container
var helpers = {}



helpers.parseJsonToObject =  function(buffer) {
	try {
		return JSON.parse(buffer);
	} catch(e) {
		return {};
	}
}

//export
module.exports = helpers;
