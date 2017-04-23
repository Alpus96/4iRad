const DB = require('./dbConn');

//	NOTE: 'Bcryptjs' is ~30% slower than 'bcrypt'. (Since it
//	uses pure javascript and not c++ bcrypt binding.)
const bCrypt = require('bcryptjs');

class User {
	ceate (data) {
		try {
			const existing = this.read(data.username);
		} catch (error) {
			console.error(error);
			return false;
		}

		if (!existing) {
			//	NOTE: 12 rounds ≈ 2 hashes per second with 'bcryptjs'. (~3 with 'bcrypt'.)
			bCrypt.genSalt(12, (error, salt) => {
				if (!error) {
					bCrypt.hash(data.password, salt, (error, passwordHash) => {
						data.password = passwordHash;
						DB.connection.query('INSERT INTO users SET ?', data, (error, result) => {
							if (!error) {
								return true;
							} else {
								throw new Error(error);
							}
						});
					});
				} else {
					throw new Error(error);
				}
			});
		} else {
			return false;
		}
	}

	read (username) {
		DB.connection.query('SELECT * FROM users WHERE username = ? LIMIT 1', username, (error, result) => {
			if (!error) {
				if (result.length > 0) {
					return result;
				} else {
					return false;
				}
			} else {
				throw new Error(error);
			}
		});
	}

	validate (cridentials) {
		let user;
		try {
			user = this.read(cridentials.username);
		} catch (error) {
			console.error(error);
			return false;
		}

		bCrypt.compare(cridentials.password, user.password, (error, result) => {
			if (!error) {
				return result;
			} else {
				throw new Error(error);
			}
		});
	}

	update (data) {
		let user;
		try {
			user = this.read(data.username);
		} catch (error) {
			console.error(error);
			return false;
		}

		if (user) {
			DB.connection.query('UPDATE users SET ? WHERE id = ?', [data, user.id], (error, result) => {
				if (!error) {
					return result;
				} else {
					throw new Error(error);
				}
			});
		} else {
			throw new Error('User does not exist. Invalid update request.')
		}
	}

	delete (cridentials) {
		let valid;
		try {
			valid = this.validate(cridentials);
		} catch (error) {
			console.error(error);
			return false;
		}

		if (valid) {
			DB.connection.query('DELETE FROM users WHERE username = ?', cridentials.username, (error, result) => {
				if (!error) {
					return result;
				} else {
					throw new Error(error);
				}
			});
		} else {
			return false;
		}
	}

}
