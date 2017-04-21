const DB = require('./dbConn');
//const MySQL = require('mysql');

class Highscore{
    constructor () {

    }

    getTopTen(callback) {
        DB.connection.query('SELECT * FROM highscore', function (error, result) {
            if (!error) {
                console.log(result);
            } else {
                callback(error, null);
            }
        });
    }

}
