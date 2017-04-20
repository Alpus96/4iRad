const MySQL = require('mysql');
const dbConn = require('./dbConn');

class users {
	constructor () {

	}

	getUser (username) {
		dbConn.connection.query('query string', function (error, response) {
			if (!error) {
				
			} else {
				
			}
		});
	}
}