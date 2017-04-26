class Router {
    constructor() {
        //  Requre the users controller to handle users.
        this.users = require('./Users');
        //  Require the highscore model to handle highscores.
        this.highscores = require('./Highscores');

        //  Set default message on error.
        this.error = 'Ett fel upstod, vänligen försök igen senare.';
        //  Set default message for invalid cridentials.
        this.invalid = 'Fel användarnamn eller lösenord.';
        //  Set default message for taken username.
        this.taken = 'Användarnamnet finns redan.';
        //  Set logged in message.
        this.loggedIn = 'Du är redan inloggad.';
        //  Set not logged in message.
        this.notLoggedIn = 'Du är inte inloggad.';
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
            this.index(request, response);
        } else if (request.url === '/highscore') {
            //  If the highscore page was requested call the highscore get function.
            this.highscoreGet(request, response);
        } else {
            //  If the request did not match any of the above default to index.
            this.index(request, response);
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
            this.registerPost(request, response);
        } else if (request.url === '/login') {
            //  If login was post requested call the login post function.
            this.loginPost(request, response);
        } else if (request.url === '/update') {
            //  If update was post requested call the update post function.
            this.updatePost(request, response);
        } else if (request.url === '/logout') {
            //  If logout was post requested call the logout post function.
            this.logout(request, response);
        } else if (request.url === '/unregister') {
            //  If unregister was post requested call the unregister post function.
            this.unregisterPost(request, response);
        } else if (request.url === '/highscore') {
            //  If highscore was post requested call the highscore post function.
            this.highscorePost(request, response);
        } else {
            //  If the request did not match any of the above default to index.
            this.index(request, response);
        }
    }

    /*
    *   A function to render the index view.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    index(request, response) {
        //  Set the user to the username of the logged in users name or an empty string.
        const user = request.session.user ? request.session.user.username : '';
        //  Render the main page
        response.render(
            'index.ejs',
            {
                //  Pass eventual username.
                user: user,
                //  Pass eventual message.
                message: this.message
            }
        );
        //  Reset the message to an empty string.
        this.message = '';
    }

    /*
    *   A function handeling registration requests.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    registerPost (request, response) {
        //  Save class this in variable as this is not defiend
        //  as this router class inside callback functions.
        const router = this;
        //  Send data to user controller for registration.
        this.users.register(request.body, function (error, result) {
            //  Confirm there was no error in registration.
            if (!error){
                //  Confirm the result.
                if (result){
                    //  If there was a result send json and set response message to success.
                    response.writeHead(200, {"Content-Type": "application/json"});  //  Status 200: All OK.
                    response.end(JSON.stringify({status: true, message: 'You have been registered.'}));
                } else {
                    //  If there was a false result set message to the username was taken.
                    response.writeHead(200, {"Content-Type": "application/json"});  //  Status 409: Conflict.
                    response.end(JSON.stringify({status: false, message: router.taken}));
                }
            } else {
                //  If there was an error registering the user set message to error message.
                response.writeHead(200, {"Content-Type": "application/json"});  //  Status 500: Internal server error.
                response.end(JSON.stringify({status: false, message: router.error}));
                console.error(error);
            }
        });
    }

    /*
    *   A function to handle login requests.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    loginPost (request, response) {
        //  Save class this in variable as this is not defiend
        //  as this router class inside callback functions.
        const router = this;
        //
        if (!request.session.user) {
            //  Send the login cridentials to the user controller login.
            this.users.validate(request.body, (error, result) => {
                //  Confirm there was no error authenticating the user.
                if (!error) {
                    //  Confirm the authentication was aproved.
                    if (result) {
                        //   If the authentication was aproved save the users data in the session.
                        request.session.user = result;
                        //  Then send message back.
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify({status: true, message: 'You have been logged in!', cookie: result}));
                    } else {
                        //  If the authentication was not aproved set message to invalid message.
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify({status: false, message: router.invalid}));
                    }
                } else {
                    //  If there was an error logging in the user send error message.
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify({status: false, message: router.error}));
                    //  Then log the error object.
                    console.error(error);
                }
            });
        } else {
            //  If there was an error logging in the user send error message.
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify({status: false, message: router.loggedIn}));
        }
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
        if (request.session.user.username === request.body.currentName) {
            //  Save class this in variable as this is not defiend
            //  as this router class inside callback functions.
            const router = this;
            //  If the names are the same send update request to user controller.
            this.users.update(request.body, (error, reslut) => {
                //  Confirm there was no error updating the users information.
                if (!error) {
                    //  If there was no error check the result.
                    if (result) {
                        //  If there was an error registering the user send success message.
                        response.writeHead(200, {"Content-Type": "application/json"});  //  Status 200: All OK.
                        response.end(JSON.stringify({status: true, message: 'You information was updated successfully.'}));
                    } else {
                        //  If the result was not OK set message to taken message.
                        response.writeHead(200, {"Content-Type": "application/json"});  //  Status 409: Conflict.
                        response.end(JSON.stringify({status: false, message: router.taken}));
                    }
                } else {
                    //  If there was an error updating the users information set message to error message.
                    response.writeHead(200, {"Content-Type": "application/json"});  //  Status 500: Internal server error.
                    response.end(JSON.stringify({status: false, message: router.error}));
                    //  Log the error object.
                    console.error(error);
                }
            });
        } else {
            //  If the currentName of the user to update did not match the
            //  username of the logged in user set mesage to unathorized.
            response.writeHead(200, {"Content-Type": "application/json"});  //  Status 401: Unauthorized.
            response.end(JSON.stringify({status: false, message: 'You can not change information about another user.'}));
        }
    }

    /*
    *   A function to handle the logout requests from a user.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    logout (request, response) {
        //  Confirm the user was logged in.
        if (request.session) {
            //  Destoy the session where the users data was temporairaly stored.
            request.session.destroy();
            //  Then send response.
            response.writeHead(200, {"Content-Type": "application/json"});  //  Status 200: All OK.
            response.end(JSON.stringify({status: true, message: 'You have been logged out.'}));
        } else {
            //  If the user was not logged in send bad request response.
            response.writeHead(200, {"Content-Type": "application/json"});  //  Status 400: Bad request.
            response.end(JSON.stringify({status: false, message: this.notLoggedIn}));
        }
    }

    /*
    *   A function to handle unregister requests from a user.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    unregisterPost (request, response) {
        //  Save class this in variable as this is not defiend
        //  as this router class inside callback functions.
        const router = this;
        //  Send unregister request to the user controller.
        this.users.unregister(request.body, (error, result) => {
            //  Confirm there was no error unregistering the user.
            if (!error) {
                //  If there was no error check the result of the request.
                if (result) {
                    //  If the request was successful send message of unregistered.
                    response.writeHead(200, {"Content-Type": "application/json"});  //  Status 200: All OK.
                    response.end(JSON.stringify({status: true, message: 'You have been unregistered.'}));
                } else {
                    //  If the request was not aproved the cridentials where
                    //  invalid so send the message to invalid message.
                    response.writeHead(200, {"Content-Type": "application/json"});  //  Status 401: Unauthorized.
                    response.end(JSON.stringify({status: false, message: router.invalid}));
                }
            } else {
                //  If there was an error deleting the user ser message to error message.
                response.writeHead(200, {"Content-Type": "application/json"});  //  Status 500: Internal server error.
                response.end(JSON.stringify({status: false, message: router.error}));
                //  Log the error object.
                console.error(error);
            }
        });
    }

    /*
    *   A function to handle highscore list requests responing with json.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    highscoreGet (request, response) {
        //  Save class this in variable as this is not defiend
        //  as this router class inside callback functions.
        const router = this;
        //  Request the controller to get the highscore list.
        this.highscores.getHighscores((error, result) => {
            //  Confirm there was no error getting the highscore list.
            if (!error) {
                //  If there was no error respond with the result converted to json.
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(result));
            } else {
                //  If there was an error set message to error message.
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify({status: false, message: router.error}));
                //  Log the error object.
                console.error(error);
            }
        });
    }

    /*
    *   A function to handle saving new highscore received as json from a player.
    *
    *   @params     request: An object containing data about the request.
    *                         response: An object to handle response data to the client.
    * */
    highscorePost (request, response) {
        console.log(request.body);
        //  Save class this in variable as this is not defiend
        //  as this router class inside callback functions.
        const router = this;
        //  Request the controller to add the new score to the highscore list.
        this.highscores.addNew(request.body, (error, qualified) => {
            //  Confirm there was no error handling the request.
            if (!error) {
                //  If there was no error handling the request check
                //  if the user qualified for the highscore list.
                if (qualified) {
                    //  If the players score was qualified for the highscore
                    //  list respond with congratulation converted to json.
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify({message: 'You have qualified for the highscore list!'}));
                } else {
                    //  If the players score did not qualify for the highscore
                    //  list respond with condolence message converted to json.
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify({message: 'You did not qualify, sorry.'}));
                }
            } else {
                //  If there was an error handeling the request log the error object.
                console.error(error);
                //  Respond with the default error message converted to json.
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify({message: router.error}));
            }
        });
    }

}

module.exports = new Router();
