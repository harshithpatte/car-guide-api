/*
*
* router handlers
*/

// dependencies
const _data = require('./data');

//container
var handlers = {};

//sample handler
handlers.ping = function(data, callback){
	callback(200);
};

//user handler
// handlers.users = function(data, callback) {
// 	var acceptableMethods = ['POST','GET','PUT','DELETE'];
// 	if (acceptableMethods.indexOf(data.method) > -1) {
// 		handlers._users[data.method](data, callback);
// 	} else {
// 		callback(405);
// 	}
// }

handlers.addvehicle = function(data, callback) {
	var acceptableMethods = ['POST'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._addvehicle[data.method](data, callback);
	} else {
		callback(405);
	}
}

handlers.removevehicle = function(data, callback) {
	var acceptableMethods = ['POST'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._removevehicle[data.method](data, callback);
	} else {
		callback(405);
	}
}


handlers.getvehicle = function(data, callback) {
	var acceptableMethods = ['GET'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._getvehicle[data.method](data, callback);
	} else {
		callback(405);
	}
}
//container for the user submethods
handlers._addvehicle = {};
handlers._removevehicle = {};
handlers._getvehicle = {};


//POST handler
//req: firstname, lastname, phone, password, tosAgreement
//opt: none
handlers._addvehicle.POST = function(data, callback) {
	//verify that all the feilds are valid
	var username = typeof(data.payload.username) == 'string' && data.payload.username.trim().length > 0 ? data.payload.username : false;
	var vin = typeof(data.payload.vin) == 'string' && data.payload.vin.trim().length > 0 ? data.payload.vin : false;
	var nickname = typeof(data.payload.nickname) == 'string' && data.payload.username.trim().length > 0? data.payload.nickname : false;

	if (username && vin && nickname) {

		//create the user object
		var user = {
			'username':username,
			'vin':vin,
			'vehicle': {
				'nickname':nickname,
				'odometer' : 100000,
		    'fuel_level' : 85,
		    'dte' : 700,
				'oil_life' : 65,
		    'tpms' : {
		      'lf' : 32,
		      'rf' : 31,
		      'lb' : 32,
		      'rb' : 32
		    },
		    'engine_state' : false,
		    'lock_state' : true,
			}
		};

		_data.create('users', username, user, function(err) {
			if (!err) {
				callback(200);
				} else {
					callback(400, {'error': 'the user already has a vehicle'});
				}
			});

	} else {
		callback(400, {'error':'Required fields are missing'});
	}
}

handlers._removevehicle.POST = function(data, callback) {
	//verify that all the feilds are valid
	var username = typeof(data.payload.username) == 'string' && data.payload.username.trim().length > 0 ? data.payload.username : false;

	if (username) {

		_data.delete('users', username, function(err) {
			if (!err) {
				callback(200);
				} else {
					callback(400, {'error': 'unable to remove vehicle'});
				}
			});

	} else {
		callback(400, {'error':'incorrect username'});
	}
}

handlers._getvehicle.GET = function(data, callback) {
	//verify that all the feilds are valid
	var username = typeof(data.queryStrigObj.username) == 'string' && data.queryStrigObj.username.trim().length > 0 ? data.queryStrigObj.username : false;

	if (username) {

		_data.read('users', username, function(err, data) {
			if (!err) {
				res = {};
				res.vehicle = data.vehicle;
				callback(200, res);
				} else {
					callback(400, {'error': 'unable to fetch vehicle information'});
				}
			});
	} else {
		callback(400, {'error':'incorrect username'});
	}
}

// //GET handler
// handlers._users.GET = function(data, callback) {
// 	if (typeof(data.queryStrigObj.phone) == 'string' && data.queryStrigObj.phone.length == 10) {
// 		_data.read('users', data.queryStrigObj.phone, function(err, userData) {
// 		    if (!err && userData) {
// 			    delete userData.password;
// 			    callback(200, userData);
// 		    } else {
// 			    callback(400, {'error':'user with that phone number doesn\'t exist'});
// 		    }
// 		});
// 	} else {
// 		callback(400, {'error':'required field is missing'});
// 	}
// }
//
// //PUT handler
// handlers._users.PUT = function(data, callback) {
// 	if (typeof(data.queryStrigObj.phone) == 'string' && data.queryStrigObj.phone.length == 10) {
// 	    var firstname = typeof(data.payload.firstname) == 'string' && data.payload.firstname.trim().length > 0 ? data.payload.firstname : false;
// 	    var lastname = typeof(data.payload.lastname) == 'string' && data.payload.firstname.trim().length > 0 ? data.payload.lastname : false;
// 	    var password = typeof(data.payload.password) == 'string' && data.payload.password.length > 0 ? data.payload.password : false;
//
// 		if (firstname || lastname || password) {
// 			_data.read('users', data.queryStrigObj.phone, function(err, user) {
//
// 				if (firstname) {
// 				user.firstname = firstname;
// 			 	}
//
// 			 	if (lastname) {
// 				user.lastname = lastname;
// 			 	}
//
// 			 	if (password) {
// 				user.password = helpers.hash(password);
// 			 	}
//
// 				if (!err) {
// 					_data.update('users', data.queryStrigObj.phone, user, function(err){
// 						if(!err) {
// 							callback(200);
// 						} else {
// 							callback(400, {'error':'Could not update the user'});
// 						}
// 					});
// 				} else {
// 					callback(400, {'error':'User doesn\'t exist'});
// 				}
// 			})
// 		} else {
// 			callback(400, {'error':'required fields are missing'});
// 		}
// 	} else {
// 		callback(400, {'error':'required query param is improper'});
// 	}
// }
//
// //DELETE handler
// handlers._users.DELETE = function(data, callback) {
// 	var phone = data.queryStrigObj.phone;
// 	if (typeof(phone) == 'string' && phone.trim().length == 10) {
// 		_data.delete('users', phone, function(err){
// 			if (!err){
// 				callback(200);
// 			} else {
// 				callback(400, {'error':'could not delete the user'});
// 			}
// 		});
// 	} else {
// 		callback(400, {'error':'required query param is improper'})
// 	}
// }

//not found handler
handlers.notFound = function(data, callback){
	callback(404);
};

//export
module.exports = handlers
