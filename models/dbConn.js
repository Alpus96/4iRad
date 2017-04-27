//  Script to creeate a database connection. (Node server)
const MySQL = require('mysql');
const Config = require('./../config');
const dbConf = Config.database();

class DBConn {
    constructor() {
        this.connect();
        //this.connection.on('disconnect', this.connection = connect());
    }

    /*connect () {
        return MySQL.createConnection(dbConf);
    }*/

    connect() {
        // Recreate the connection, since the old one cannot be reused.
        this.connection = MySQL.createConnection(dbConf);

        const db = this;
        // The server is either down or restarting (takes a while sometimes).
        this.connection.connect(function(err) {
            if(err) {
                console.log('Database connection error:', err);
                setTimeout(db.connect, 2000); // We introduce a delay before attempting to reconnect,
            } // to avoid a hot loop, and to allow our node script to process asynchronous requests in the meantime.
        });

        // If you're also serving http, display a 503 error.
        this.connection.on('error', function(err) {
            console.log('Database error:', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('You fixed it!');
                // Connection to the MySQL server is usually
                // lost due to either server restart, or a
                // connnection idle timeout (the wait_timeout
                // server variable configures this)
                db.connect();
            } else {
                throw err;
            }
        });
    }

}

module.exports = new DBConn();
