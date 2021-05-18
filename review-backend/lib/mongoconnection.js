/**
 * Sets the database connection using mongoose.
 * @module lib/mongoconnection
 * @type {exports}
 */

var mongoose = require('mongoose');
var config = require('./../config/config');
var db = mongoose.connection;
var connectionInstance;
if(connectionInstance) {
	module.exports = connectionInstance;
	return;
}
connectionInstance = mongoose.connect(config.DB_URL, { useNewUrlParser: true })

db.on('error', function (err) {
	console.log("err", err)
	if(err) {
		throw err;
	}
});
//db connected
db.once('open', function() {
	console.log("MongoDb connected successfully, date is = "+new Date());
});

//export the db connection
module.exports = connectionInstance;
var logDebug = config.MONGO_LOG_VERBOSE || false;
mongoose.set('debug', logDebug);
	