//dependencies
const fs = require('fs');
const path = require('path');

//container
var lib = {}

//base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');

lib.create = function(dir, file, data, callback) {
	//open the file for writing
	fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor) {
		if (!err && fileDescriptor) {
			//convert data to a string
			var stringData = JSON.stringify(data);
			//write to file
			fs.writeFile(fileDescriptor, stringData, function(err) {
				if (!err) {
					fs.close(fileDescriptor, function(err) {
						if (!err) {
							callback(false);
						} else {
							callback('error closing the file');
						}
					})
				} else {
					callback('error writing to a new file');
				}
			})
		} else {
			callback('error creating the file, it may already exist');
		}
	})
}

lib.read = function(dir, file, callback) {
	//read data from the file
	fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data){
		if (!err) {
			var jsonData = JSON.parse(data);
			callback(err, jsonData);
		} else {
			callback('file does not exist');
		}
	})
}

lib.update = function(dir, file, data, callback) {
	//open the file
	fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor) {
		if (!err && fileDescriptor) {
			//stringify the data
			var stringData = JSON.stringify(data);

			//truncate the file
			fs.truncate(fileDescriptor, function(err) {
				if (!err) {
					//write the data to the file
					fs.write(fileDescriptor, stringData, function(err) {
						if (!err) {
							// close the file after writing
							fs.close(fileDescriptor, function(err) {
								if (!err) {
									callback(false);
								} else {
									callback('error closing the file');
							    }
							});
						} else {
							callback('error wrtiting to the file');
						}
					})
				} else {
					callback('error truncating the file');
				}
			})
		} else {
			callback('error opening the file, it may not exist yet');
		}
	})
}

lib.delete = function(dir,file, callback) {
	//unlink the file
	fs.unlink(lib.baseDir+ dir+ '/'+ file+ '.json', function(err) {
		if(!err) {
			callback(false);
		} else {
			callback('error deleting the file');
		}
	})
}

//export
module.exports = lib;
