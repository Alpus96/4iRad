//  Script to creeate a database connection. (Node server)
const MySQL = require('mysql');
const Config = require('./config');
const dbConf = Config.database();

class Databese {
    constructor() {
        this.connection = connect();
        this.connection.on('disconnect', this.connection = connect());
    }

    connect () {
        return MySQL.createConnection({dbConf});
    }

    
}
