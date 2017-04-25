//	Require the database class to send queries through the connection.
const DB = require('./dbConn');

class Highscore{

    /*
    *   A function to write a new highscore to the database.
    *
    *   @params     data: {name: 'player name', score: X, userid: X}, an object containing the highscore information.
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    create (data, callback) {
        //  Send the data to the database.
        DB.connection.query('INSERT INTO highscore SET ?', data, (error, result) => {
            //  Confirm there was no error.
            if (!error) {
                //  If there was no error return the result
                //  as result through the callback function.
                callback(null, true);
            } else {
                //  If there was an error entering the data return the
                //  error as error through the callback function.
                callback(error, null);
            }
        });
    }

    /*
    *   A function to read all the highscores.
    *
    *   @params     callback: () =>{...}, a function to call when done.
    * */
    read (callback) {
        //  Read all the highscores sorted in ascending order by score.
        DB.connection.query('SELECT * FROM highscore ORDER BY score ASC', function (error, result) {
            //  Confirm there was no error reading from the database.
            if (!error) {
                //  If there was no error reading from the database return
                //  the result as result through the callback function.
                callback(null, result);
            } else {
                //  If there was an error reading from the database return
                //  the error as error through the callback function.
                callback(error, null);
            }
        });
    }

    /*
    *   A function to delete a highscore entry by id.
    *
    *   @params     id: The integer in the id field of the entry to delete.
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    delete (id, callback) {
        //  Delete highscore by id.
        DB.connection.query('DELETE FROM highscore WHERE ?', [{id: id}], function (error, result) {
            //  Confirm there was no error deleting row from teh database.
            if (!error) {
                //  If there was no error return the result
                //  as result through the callback function.
                callback(null, result);
            } else {
                //  If there was an error deleting the row from highscore
                //  return the error as error through the callback function.
                callback(error, null);
            }
        });
    }

}

//  Export new instance of the Highscore model class on require.
module.exports = new Highscore();
