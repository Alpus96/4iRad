//  Script to creeate a database connection. (Node server)
const MySQL = require('mysql');
const Config = require('./../config');
const dbConf = Config.database();

class DBConn {
    constructor() {
        this.connection = this.connect();
        //this.connection.on('disconnect', this.connection = connect());
    }

    connect () {
        return MySQL.createConnection(dbConf);
    }

}

module.exports = new DBConn();
