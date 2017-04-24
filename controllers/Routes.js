class Router {
    constructor() {
        //  Requre the users controller to handle users.
        this.users = require('./Users');
        //  Require the highscore model to handle highscores.
        this.highscores = require('./Highscores');

        //  Set default message on error.
        this.error = 'Sorry, an error occured, please try again later.';
        //  Set default message for invalid cridentials.
        this.invalid = 'Wrong username or password.';
        //  Set default message for taken username.
        this.taken = 'Requested username is taken.';
    }

    /*
    *   Function route all get requests.
    *
    *   @params     request: An object containing all request data recieved by the server.
    *                         response: An object to handle response data to the client.
    * */
    get (request, response) {
        //  Compare the get request url to all valid requests.
        if (request.url === '/') {
            //  If the root url / index was requested call index function.
            index(request, response);
        } else if (request.url === '/register') {
            //  If register page was requested call the register get function.
            registerGet(request, response);
        } else if (request.url === '/login') {
            //  If login page was requested call the login get function.
            loginGet(request, response);
        } else if (request.url === '/update') {
            //  If update page was requested call the update get function.
            updateGet(request, response);
        } else if (request.url === '/unregister') {
            //  If unregister page was requested call the unregister get function.
            unregisterGet(request, response);
        } else if (request.url === '/highscore') {
            //  If the highscore page was requested call the highscore get function.
            highscoreGet(request, response);
        } else {
            //  If the request did not match any of the above default to index.
            index(request, response);
        }
    }

    /*
    *   A function to route all post requests.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    post (request, response) {
        //  Compare the post request url to all valid requests.
        if (request.url === '/register') {
            //  If register was post requested call the register post function.
            registerPost(request, response);
        } else if (request.url === '/login') {
            //  If login was post requested call the login post function.
            loginPost(request, response);
        } else if (request.url === '/update') {
            //  If update was post requested call the update post function.
            updatePost(request, response);
        } else if (request.url === '/logout') {
            //  If logout was post requested call the logout post function.
            logout(request, response);
        } else if (request.url === '/unregister') {
            //  If unregister was post requested call the unregister post function.
            unregisterPost(request, response);
        } else if (request.url === '/highscore') {
            //  If highscore was post requested call the highscore post function.
            highscorePost(request, response);
        } else {
            //  If the request did not match any of the above default to index.
            index(request, response);
        }
    }

    /*
    *
    * */
    index(request, response) {

    }

    /*
    *
    * */
    registerGet (request, response) {

    }

    /*
    *   A function handeling registration requests.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    registerPost (request, response) {
        //  Send data to user controller for registration.
        this.users.register(request.body.register, function (error, result) {
            //  Confirm there was no error in registration.
            if (!error){
                //  Confirm the result.
                if (result){
                    //  If there was a result set message to success.
                    this.message = 'You have been registered.';
                    //  Then redirect to login, where the message will be displayed.
                    response.redirect('/login');
                } else {
                    //  If there was a false result set message to the username was taken.
                    this.message = this.taken;
                    //  Then redirect to register page where the message will be displayed.
                    response.redirect('/register');
                }
            } else {
                //  If there was an error registering the user set message to error message.
                this.message = this.error;
                //  Log the error object.
                console.error(error);
                //  Then redirect to register where the message will be displayed.
                response.redirect('/register');
            }
        });
    }

    /*
    *
    * */
    loginGet (request, response) {

    }

    /*
    *   A function to handle login requests.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    loginPost (request, response) {
        //  Send the login cridentials to the user controller login.
        this.users.login(request.body.login, (error, result) => {
            //  Confirm there was no error authenticating the user.
            if (!error) {
                //  Confirm the authentication was aproved.
                if (result) {
                    //  If the authentication was aproved set message to logged in.
                    this.message = 'You have been logged in!';
                    //  And save the users data in the session.
                    request.session.user = result;
                    //  Then redirect to the index page where the message will be displayed..
                    response.redirect('/');
                } else {
                    //  If the authentication was not aproved set message to invalid message.
                    this.message = this.invalid;
                    //  Then redirect to the login page where the message will be displayed.
                    response.redirect('/login');
                }
            } else {
                //  If there was an error authenticating the user set message to error message.
                this.message = this.error;
                //  Log the error object.
                console.error(error);
                //  Then redirect to the login page where the message will be displayed.
                response.redirect('/login');
            }
        });
    }

    /*
    *
    * */
    updateGet (request, response) {

    }

    /*
    *   A function to handle update requests of user information.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    updatePost (request, response) {
        //  Confirm the logged in users name and the currentName
        //  of the user to be updated is the same.
        if (request.session.user.username === request.body.newInfo.currentName) {
            //  If the names are the same send update request to user controller.
            this.users.update(request.body.newInfo, (error, reslut) => {
                //  Confirm there was no error updating the users information.
                if (!error) {
                    //  If there was no error check the result.
                    if (result) {
                        //  If there result was OK set message to success.
                        this.message = 'You information was updated successfully.';
                        //  Redirect to update where the message will be displayed.
                        response.redirect('/update');
                    } else {
                        //  If the result was not OK set message to taken message.
                        this.message = this.taken;
                        //  Redirect to update where the message will be displayed.
                        response.redirect('/update');
                    }
                } else {
                    //  If there was an error updating the users information set message to error message.
                    this.message = this.error;
                    //  Log the error object.
                    console.error(error);
                    //  Then redirect to update where the message will be displayed.
                    response.redirect('/update');
                }
            });
        } else {
            //  If the currentName of the user to update did not match the
            //  username of the logged in user set mesage to unathorized.
            this.message = 'You can not change information about an other user.';
            //  Redirect to update where the message will be displayed.
            response.redirect('/update');
        }
    }

    /*
    *   A function to handle the logout requests from a user.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    logout (request, response) {
        //  Destoy the session where the users data was temporairaly stored.
        request.session.destroy();
        //  Then redirect to index.
        response.redirect('/');
    }

    /*
    *
    * */
    unregisterGet (request, response) {

    }

    /*
    *   A function to handle unregister requests from a user.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    unregisterPost (request, response) {
        //  Send unregister request to the user controller.
        this.users.unregister(request.body.unregister, (error, result) => {
            //  Confirm there was no error unregistering the user.
            if (!error) {
                //  If there was no error check the result of the request.
                if (result) {
                    //  If the request was successful set message to unregistered.
                    this.message = 'You have been unregistered.';
                    //  Then redirect to the index page where the message will be displayed.
                    response.redirect('/');
                } else {
                    //  If the request was not aproved the cridentials where
                    //  invalid so set the message to invalid message.
                    this.message = this.invalid;
                    // Then redirect to the unregister page where the message will be displayed.
                    response.redirect('/unregister');
                }
            } else {
                //  If there was an error deleting the user ser message to error message.
                this.message = this.error;
                //  Log the error object.
                console.error(error);
                //  Redirect to the unregister page where the message will be displayed.
                response.redirect('/unregister');
            }
        });
    }

    /*
    *
    * */
    highscoreGet (request, response) {

    }

    /*
    *
    * */
    highscorePost (request, response) {

    }

}

module.exports = new Router();
