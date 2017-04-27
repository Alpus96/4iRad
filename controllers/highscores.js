class Highscores {
    /*
    *   Requires all necesairy modules and setts up all necesairy class variables.
    * */
    constructor() {
        // Require the highscore model to read and write to the database.
        this.highscoreList = require('./../models/HighscoreModel');
    }

    /*
    *   A function to to read the highscore list from the database in ascending order.
    *
    *   @params     callback: (error, result) => {...}, a function to call when done.
    * */
    getHighscores (callback) {
        //  Read the list from the database.
        this.highscoreList.read((error, result) => {
            //  Confirm there was no error reading the database.
            if (!error) {
                //  If there was no error return the result
                //  as result through the callback function.
                callback(null, result);
            } else {
                //  If there was an error reading the database return
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
    *                         callback: (error, result) => {...}, a function to call when done.
    * */
    addNew (data, callback) {
        // Read the current highscore list.
        this.highscoreList.read((error, result) => {
            //  Confirm there was no error reading the highscore list.
            if (!error) {
                //  Check if the list is shorter than 10 items.
                if (result.length < 10) {
                    //  If the list is shorter than 10 items create new item.
                    this.highscoreList.create(data, (error, result) => {
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
                        this.highscoreList.delete(result[9].id, (error, result) => {
                            //  Confirm there was no error deleting the lowest score.
                            if (!error) {
                                //  If there was no error deleting the lowest
                                //  score enter the new highscore.
                                this.highscoreList.create(data, (error, result) => {
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
}

module.exports = new Highscores();
