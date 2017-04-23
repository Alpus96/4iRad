const DB = require('./dbConn');

class Highscore{

    create (data) {
        DB.connection.query('INSERT INTO highscore SET ?', data, (error, result) => {
            if (!error) {
                return true;
            } else {
                throw new Error(error);
            }
        });
    }

    read (callback) {
        DB.connection.query('SELECT * FROM highscore ORDER BY score ASC', function (error, result) {
            if (!error) {
                callback(null, result);
            } else {
                callback(error, null);
            }
        });
    }

    update (data) {
        this.read((error, result) => {
            if (!error) {
                if (result.legth < 10) {
                    try {
                        this.create(data);
                    } catch (error) {
                        return false;
                    }
                } else {
                    let qualified = false;
                    for (let highscore of result) {
                        if (data.score < highscore.score) {
                            qualified = true;
                            break;
                        }
                    }
                    if (qualified) {
                        try {
                            this.delete(result[9].id);
                            this.create(data);
                            return true;
                        } catch (error) {
                            console.error(error);
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                throw new Error(error);
            }
        });
    }

    delete (id) {
        DB.connection.query('DELETE FROM highscore WHERE id = ?', id, function (error) {
            if (!error) {
                return true;
            } else {
                throw new Error(error);
            }
        });
    }

}

module.exports = new Highscore();
