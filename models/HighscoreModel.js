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
    *   A function to add a new highscore to the database, and if
    *   the list is 10 items long delete the one with lowest score.
    *
    *   @params     data: {name: 'player name', score: X, userid: X}, an object
    *                         conatining the information to enter to the database.
    *                         callback: (error, result) => {...}, a function to cal when done.
    * */
    addNew (data, callback) {
        // Read the current highscore list.
        this.read((error, result) => {
            //  Confirm there was no error reading the highscore list.
            if (!error) {
                //  Check if the list is shorter than 10 items.
                if (result.legth < 10) {
                    //  If the list is shorter than 10 items create new item.
                    this.create(data, (error, result) => {
                        //  Confirm there was no error creating new highscore item.
                        if (!error) {
                            //  If there was no error return the result
                            //  as result through the callback function.
                            callback(null, result);
                        } else {
                            //  If there was an error creating new highscore item return
                            //  the error as error through the callback function.
                            callback(error, null);
                        }
                    });
                } else {
                    //  If the list is not shorter than 10 items determine
                    //   if the new highscore item is qualified.

                    //  Unqualified by default, will be qualified if proven.
                    let qualified = false;
                    //  Loop through the existing existing highscores.
                    for (let highscore of result) {
                        //  Check if the current highscore item has a higher
                        //  score than the new score. (Lower is better.)
                        if (data.score < highscore.score) {
                            //  If the new score is lower than the current
                            //  highscore set qualified to true.
                            qualified = true;
                            //  Then break the loop as the next highscores are irelevant.
                            break;
                        }
                    }
                    //  Check if the new score was qualified.
                    if (qualified) {
                        //  If so delete the lowest score in the highscore list.
                        this.delete(result[9].id, (error, result) => {
                            //  Confirm there was no error deleting the lowest score.
                            if (!error) {
                                //  If there was no error deleting the lowest
                                //  score enter the new highscore.
                                this.create(data, (error, result) => {
                                    //  Confirm there was no error entering the new highscore.
                                    if (!error) {
                                        //  If there was no error entering the new highscore return
                                        //  the result as reslut through the callback function.
                                        callback(null, result);
                                    } else {
                                        //  If there was an error entering the new highscore return
                                        //  the error as error through the callback function.
                                        callback(error, null);
                                    }
                                });
                            } else {
                                //  If there was an error deleting the lowest score in the highscore
                                //  return the error as error through the callback function.
                                callback(error, null);
                            }
                        });
                    } else {
                        //  If the new highscore did not qualify return false
                        //  as result through the callback function.
                        callback(null, false);
                    }
                }
            } else {
                //  If there was an error reading the highscore list return
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
