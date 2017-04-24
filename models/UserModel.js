//	Class to handle user-information in database.
class User {

	constructor () {
		//	Require the database class to send queries through the connection.
		this.DB = require('./dbConn');
	}

	/*
	*	A function to enter a new user to the database.
	*
	*	@params		data: {
	*								username: 'username',
	*								password: 'passowrd'
	*							}, an object containing the new users information.
	*						  callback: (error, result) => {...}, function to call when done that takes an error and result argument.
	* */
	create (data, callback) {
		//	Insert the information for the new user into the database.
		this.DB.connection.query('INSERT INTO users SET ?', data, (error, result) => {
			//	Confirm that entering the new user information did not have an error.
			if (!error) {
				//	If no error return result true through the callback function.
				callback(null, result);
			} else {
				//	If there was an error saving the new user information
				//	return the error as error through the callback function.
				callback(error, null);
			}
		});
	}

	/*
	*	A function to read user-information from the database selected by username.
	*
	*	@params			identifier: {id: X} / {username: ''}, An object containing an id or a username to search the database for.
	*							  callback: (error, result) => {...}, a function to handle response when done.
	* */
	read (identifier, callback) {
		//	Ask the database to find user by username
		this.DB.connection.query('SELECT * FROM users WHERE ?', [identifier], (error, result, fields) => {
			//	Confirm there was no error.
			if (!error) {
				//	If there was no error confirm that there was data in the result.
				if (result.length > 0) {
					//	If there was data in the result return it through the callback function.
					callback(null, result);
				} else {
					//	If there was no data in the result return an error through callback.
					callback(null, false);
				}
			} else {
				//	If there was an error with the query return it through the callback.
				callback(error, null)
			}
		});
	}

	/*
	*	A function to update the users information in the database.
	*
	*	@params		data: {
	*								currentName: 'the active username',
	*								name: 'new username',
	*								password: 'new password',
	*							}, an object containing the users data.
	*						  callback: (error, result) => {...}, a function to call when done.
	* */
	update (data, id, callback) {
		//	Update the users information.
		this.DB.connection.query('UPDATE users SET ? WHERE ?', [data, id], (error, result) => {
			//	Confirm there was no error updating the users information.
			if (!error) {
				//	If there was no error return the result as result through the callback function.
				callback(null, result);
			} else {
				//	If there was an error updating the users information
				//	return the error as error through the callback function.
				callback(error, null);
			}
		});
	}

	/*
	*	A function to delete an existing user.
	*
	*	@params		cridentials: {name: 'username', password: 'password'}
	*						  callback: (error, result) => {...}, a function to call when done.
	* */
	delete (id, callback) {
		//	If the validation was aproved delete the user from the database.
		this.DB.connection.query('DELETE FROM users WHERE ?', [id], (error, result) => {
			//	Confirm there was no error deleting the user from the database.
			if (!error) {
				//	If there was no error return the result
				//	as result through the callback function.
				callback(null, result);
			} else {
				//	If there was an error deleting the user from the database
				//	return the error as error through the callback function.
				callback(error, null);
			}
		});
	}

}

//  Export new instance of the User model class on require.
module.exports = new User();
