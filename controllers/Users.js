class Users {
    constructor () {
        // Require the users model to handle database information.
        this.user = require('./../models/UserModel');

        //  Require the node module to hash and validate passwords.
        this.bCrypt = require('bcryptjs');
        /*  NOTE:
        *   'bcryptjs' is ~30% slower than 'bcrypt' acording to documentation.
        *   (Since it uses pure javascript and not c++ bcrypt binding.)
        *   [Speeds messured @2GHz]
        *
        *   NOTE:
        *   'bcryptjs' hash takes a string of 72 bytes at most.
        *   (~18 UTF-8 characters. UTF-8 takes up to 4 bytes / character)
        * */
    }
    /*
    *   A function to handle user registration.
    *
    *   @params     data: {username: '', password: ''},
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    register (data, callback) {
        //  Save class this in variable as this is not defiend
        //  as this Users class inside callback functions.
        const users = this;
        //  Check the database for the requested username.
        this.user.read({username: data.username}, (error, result) => {
            //  Confirm there was no erorr reading from the database.
            if (!error) {
                //  Check if a user was found.
                if (result) {
                    //  If a user was found return false as result through
                    //  the callback function since the username is taken.
                    callback(null, false);
                } else {
                    //  If there was no user found the username is available continue by
                    //  hash the given password before writing the info to the database.
                    users.hashPassword(data.password, (error, hash) => {
                        //  Confirm there was no error hashing the password.
                        if (!error) {
                            //  If there was no error save the hash as the password.
                            data.password = hash;
                            //  Then create the new user in the database.
                            users.user.create(data, (error, result) => {
                                //  Confirm there was no error writing to the datbase.
                                if (!error) {
                                    //  If there was no error return the result
                                    //  as result through the callback function.
                                    callback(null, result);
                                } else {
                                    //  If there was an error writing to the database return
                                    //  the error as error through the callback function.
                                    callback(error, null);
                                }
                            });
                        } else {
                            //  If there was an error hashing the password return
                            //  the error as error through the callback function.
                            callback(error, null);
                        }
                    });
                }
            } else {
                //  If there was an error reading the database return
                //  the error as error through the callback function.
                callback(error, null);
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
        //  Save class this in variable as this is not defiend
        //  as this Users class inside callback functions.
        const users = this;
		//	Find the username in the database.
		this.user.read({username: cridentials.username}, (error, result) => {
			//	Confirm that there was no error searching for the user.
			if (!error) {
				//	If there was no error searching for the user confirm a user was found.
				if (result) {
                    //  Save user data to de returned.
                    const user = result;
					//	Compare the passed password with the hash.
					users.bCrypt.compare(cridentials.password, result[0].password, (error, result) => {
						//	Confirm there was no error comparing the password and the hash.
						if (!error) {
                            //	If no error confirm that the user validation was aproved.
                            if (result) {
                                //  If validation was aproved return the users information
                                //  as result through the callback function.
                                callback(null, user);
                            } else {
                                //  If the validation was not aproved return false
                                //  as result through the callback function.
                                callback(null, false);
                            }
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
	*								password: 'new password',
	*							}, an object containing the users data.
	*						  callback: (error, result) => {...}, a function to call when done.
	* */
	update (data, callback) {
        //  Save class this in variable as this is not defiend
        //  as this Users class inside callback functions.
        const users = this;
		//	Read the users current information from the database.
		this.user.read(data.currentName, (error, result) => {
			//	Confirm there was no error reading the users information.
			if (!error) {
				//	Save the id to use as identifier when updating.
				const id = {id: result[0].id};
				//	Search the database for the requested username.
				users.user.read(data.name, (error, result) => {
					//	Confirm there was no error searching for the user.
					if (!error) {
						//	If there was no error check if a user was found.
						if (result) {
							//	If a user was found the passed username is taken.
							callback(null, false);
						} else {
							//	If a user was not found the requested username is
							//	not taken, continue by updating the users information.
							users.user.update(data, id, (error, result) => {
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
	unregister (cridentials, callback) {
        //  Save class this in variable as this is not defiend
        //  as this Users class inside callback functions.
        const users = this;
		//	Validate the cridentals to aprove delete of user.
		this.user.validate(cridentials, (error, result) => {
			//	Confirm there was no error validating the user.
			if (!error) {
				//	If there was no error confirm the validation was aprved.
				if (result) {
					//	If the validation was aproved delete the user from the database.
					users.user.delete(result, (error, result) => {
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
        //  Save class this in variable as this is not defiend
        //  as this Users class inside callback functions.
        const users = this;
		//	Generate a salt to hash the password with.
        /*
		*	NOTE: 12 rounds ≈ 0.7 seconds per hash with 'bcryptjs'.
        *  (~0.5 secound per hash with 'bcrypt'.)
        * */
		this.bCrypt.genSalt(12, (error, salt) => {
			//	Confirm there was no error genereating the salt.
			if (!error) {
				//	If there was no error continue with hashing.
				users.bCrypt.hash(password, salt, (error, result) => {
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

module.exports = new Users();
