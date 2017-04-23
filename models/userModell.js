//	Require the database class to send queries through the connection.
const DB = require('./dbConn');

//	NOTE: 'Bcryptjs' is ~30% slower than 'bcrypt' acording to documentation.
//	(Since it uses pure javascript and not c++ bcrypt binding.)
const bCrypt = require('bcryptjs');

//	Class to handle user-information in database.
class User {

	/*
	*	A function to enter a new user to the database.
	*
	*	@params		data: {
	*								name: 'username',
	*								mail: 'mailadress',
	*								password: 'passowrd',
	*								colore: 'player color',
	*								coins: 0
	*							}, an object containing the new users information.
	*						  callback: (error, result) => {...}, function to call when done that takes an error and result argument.
	* */
	create (data, callback) {
		//	Search the database for the passed username.
		this.read(data.name, (error, result) => {
			//	Confirm there was no error searching for the user in the database.
			if (!error) {
				//	If there was no error check if a user was found.
				if (result) {
					//	If a user was found the username is taken.
					callback(null, false);
				} else {
					//	If there was no user found the username is available.
					this.hashPassword(data.password, (error, result) => {
						// Confirm there was no error hashing the password.
						if (!error) {
							// If there was no error save the hash as the password.
							data.password = result;
							//	Then insert the information for the new user into the database.
							DB.connection.query('INSERT INTO users SET ?', data, (error, result) => {
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
						} else {
							//	If there was an error hashing the password return
							//	the error as error through the callback function.
							callback(error, null);
						}
					});
				}
			} else {
				//	If there was an error reading the user from the database return the error.
				callback(error, null);
			}
		});
	}

	/*
	*	A function to read user-information from the database selected by username.
	*
	*	@params			username: 'string', The username to search the database for.
	*							  callback: (error, result) => {...}, a function to handle response when done.
	* */
	read (username, callback) {
		//	Ask the database to find user by username
		DB.connection.query('SELECT * FROM users WHERE name = ?', [username], (error, result, fields) => {
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
	*	A function that returns user-information if the given cridentials where correct.
	*
	*	@params		  cridentials: {name: 'username', password: 'password'}
	*							callback: (error, result) => {...}, a function to handle response when done.
	* */
	validate (cridentials, callback) {
		//	Find the username in the database.
		this.read(cridentials.name, (error, result) => {
			//	Confirm that there was no error searching for the user.
			if (!error) {
				//	If there was no error searching for the user confirm a user was found.
				if (result) {
					//	Compare the passed password with the hash.
					bCrypt.compare(cridentials.password, result[0].password, (error, result) => {
						//	Confirm there was no error comparing the password and the hash.
						if (!error) {
							//	If no error return the result through the callback.
							callback(null, result);
						} else {
							//	If there was an error camparing the password and
							//	the hash return an error through the callback.
							callback(error, null);
						}
					});
				} else {
					//	If there was no user found the cridentials where incorrect
					//	return false as result through the callback function.
					callback(null, false);
				}
			} else {
				//	If there was an error finding the user or there was no
				//	user to be found return an error through the callback.
				callback(error, null);
			}
		});
	}

	/*
	*	A function to update the users information in the database.
	*
	*	@params		data: {
	*								currentName: 'the active username',
	*								name: 'new username',
	*								mail: 'new mailadress',
	*								password: 'new password',
	*								colore: 'new colore',
	*								coins: X
	*							}, an object containing the users data.
	*						  callback: (error, result) => {...}, a function to call when done.
	* */
	update (data, callback) {
		//	Read the users current information from the database.
		this.read(data.currentName, (error, result) => {
			//	Confirm there was no error reading the users information.
			if (!error) {
				//	Save the id to use as identifier when updating.
				const id = {id: result[0].id};
				//	Search the database for the requested username.
				this.read(data.name, (error, result) => {
					//	Confirm there was no error searching for the user.
					if (!error) {
						//	If there was no error check if a user was found.
						if (result) {
							//	If a user was found the passed username is taken.
							callback(null, false);
						} else {
							//	If a user was not found the requested username is
							//	not taken, continue by hashing the given password.
							this.hashPassword(data.password, (error, result) => {
								//	Confirm there was no error hashing the password.
								if (!error) {
									//	If there was no error update the users information.
									data.password = result;
									DB.connection.query('UPDATE users SET ? WHERE ?', [data, id], (error, result) => {
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
								} else {
									//	If there was an error hashing the password return
									//	the error as error through the callback function.
									callback(error, null);
								}
							});
						}
					} else {
						//	If there was an error searching for a user with the requested
						//	username return the error as error through the callback function.
						callback(error, null);
					}
				});
				//	While hashing the password delete the current username
				//	property of user data, since there is no such filed in the database.
				delete data.currentName;
			}
		});
	}

	/*
	*	A function to delete an existing user.
	*
	*	@params		cridentials: {name: 'username', password: 'password'}
	*						  callback: (error, result) => {...}, a function to call when done.
	* */
	delete (cridentials, callback) {
		//	Validate the cridentals to aprove delete of user.
		this.validate(cridentials, (error, result) => {
			//	Confirm there was no error validating the user.
			if (!error) {
				//	If there was no error confirm the validation was aprved.
				if (result) {
					//	If the validation was aproved delete the user from the database.
					DB.connection.query('DELETE FROM users WHERE ?', [{name: cridentials.name}], (error, result) => {
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
				} else {
					//	If the validation was not aproved return false as result as the user was not deleted..
					callback(null, false);
				}
			} else {
				//	If there was an error validating the user return the error as error through the callback function.
				callback(error, null);
			}
		});
	}

	/*
	*	A function to hash a password string securely.
	*
	*	@params		password: the password string.
	*						  callback. (error, result) => {...}, a function to call when done.
	* */
	hashPassword (password, callback) {
		//	Generate a salt to hash the password with.
		//	NOTE: 13 rounds ≈ 1.4 seconds per hash with
		//	'bcryptjs'. (~1 secound per hash with 'bcrypt'.)
		bCrypt.genSalt(13, (error, salt) => {
			//	Confirm there was no error genereating the salt.
			if (!error) {
				//	If there was no error continue with hashing.
				bCrypt.hash(password, salt, (error, result) => {
					//	Confirm there was no error hashing the password with the salt.
					if (!error) {
						//	If there was no error hashing return the hash through the callback result.
						callback(null, result);
					} else {
						//	If there was an error hashing return the error through the callback error.
						callback(error, null);
					}
				});
			} else {
				//	If there was an error generaiting a salt return the error through the callback error.
				callback(error, null);
			}
		});
	}

}

//  Export new instance of the User model class on require.
module.exports = new User();
