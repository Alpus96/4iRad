//  Session store and sessions library.
const mySqlStore = require('express-mysql-session');
const session = require('express-session');

class Config {
    /*
    *   The function run when a new instance of this class is created.
    *
    *   @params     autoKey: a boolean representing wheater or not to generate a key.
    * */
    constructor () {
        //  Require bcrypt and generate a secure key as session secret.
        this.bcrypt = require ('bcryptjs');
    }

    /*
    *   A function that generates a 14 rounds hash of a
    *   random number between 0 and 1'000'000.
    *
    *   @params     callback: (error, result) => {...}, a function to call when done.
    * */
    keyGen (callback) {
        //  Log that a key is being generated.
        console.log('Generaiting secure key for sessions...');
        //  Save this in function variable as 'this' is not defiened
        //  as Config class inside a callback function.
        const Config = this;
        //  Generate a secure salt for the hash.
        //	NOTE: 14 salt rounds ≈ 2Sec/hash@2GHz
        this.bcrypt.genSalt(14, function (error, salt){
            //  Confirm there was no error generaiting the salt.
            if (!error){
                //  If there was no error hash a random number between 0 and 1'000'000.
                Config.bcrypt.hash(Math.floor(Math.random() * 1000000).toString(), salt, function (error, hash) {
                    //  Confirm there was no error hashing.
                    if (!error) {
                        //  If there was no error log done.
                        console.log('Done: ' + hash);
                        //  Save the generated key as class default key.
                        Config.secret = hash;
                        //  Then return the hash as result
                        //  through the callback function.
                        callback(false, hash);
                    } else {
                        //  If there was an errorhashing log error.
                        console.log('Error.');
                        //  Then return the error as error
                        //  through the callback function.
                        callback(error, null);
                    }
                });
            } else {
                //  If there was an error generaiting the salt log error.
                console.log('Error.');
                //  Then return the error as error
                //  through the callback function.
                callback(error, null);
            }
        });
    }

    /*
    *   A function that contains the database configuration object.
    * */
    database () {
        //  Return database configuration data object.
        return {
        	host: 'localhost',
        	user: '4irad',
        	password: '1234',
        	database: '4irad'
        };
    }

    /*
    *   A function that returns the session store configuration object.
    * */
    sessionStore () {
        //  Require the database configuration.
        let dbStore = this.database();
        //  Then add to auto create sessions table.
        dbStore.createDatabaseTable = true;
        //  Return the configuration.
        return dbStore;
    }

    /*
    *   A function that generates a 14 rounds hash of a
    *   random number between 0 and 1'000'000.
    *
    *   @params     key: a string that will be used as session secret.
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    sessionsConf (key, callback) {
        //  If a session key was not passed set callback
        //  to function passed and key to false.
        if (typeof key == 'function') {
          callback = key;
          key = false;
        }

        //  Create the sessions configuration object.
        let options = {
            secret: '',
            cookie: { maxAge: (10 * 60 * 1000) },
            saveUninitialized: false,
            resave: true
        };

        //  Check if a key was given.
        if (key && typeof key == 'string') {
            //  If a key was given set the key as secret
            //  in the sessions configuration object.
            options.secret = key;
            //  Then return the object as result through the callback function.
            callback(null, options);
        } else if (this.secret) {
            //  If a key was not given but one has been generated set the key
            //  as class default secret in the sessions configuration object.
            //  NOTE: The const of generating a new key is high.
            options.secret = this.secret;
            //  Then return the object as result through the callback function.
            callback(null, options);
        } else {
            //  If a key was not given generate a key.
            this.keyGen((error, result) => {
                //  Confirm there was no error generating the key.
                if (!error) {
                    //  If there was no error set the key as result.
                    options.secret = result;
                    //  Then return the session configuration object
                    //  as result through the callback function.
                    callback(null, options);
                } else {
                    //  If there was an error return the error as error through the callback function.
                    callback(error, null);
                }
            });
        }
    }

}

module.exports = new Config();
