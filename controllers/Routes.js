//  Requre the users controller to handle users.
const users = require('./Users');

//  Require the highscore model to handle highscores.
const highscores = require('./Highscores');

class Routes {
    constructor() {

    }

    get (request, response) {
        if (request.url === '/') {
            // respond with render index.ejs
        } else if (request.url === '/register') {

        } else if (request.url === '/login') {

        } else if (request.url === '/update') {

        } else if (request.url === '/logout') {

        } else if (request.url === '/highscore') {

        } else {

        }
    }

    post (request, response) {
        if (request.url === '/register') {
            users.register(request.body.register, function (error, result) {
                if (!error){
                    if (result){
                        this.message = 'You have been registered.';
                        response.redirect('/login');
                    } else {
                        this.message = 'The username is taken.';
                        response.redirect('/register');
                    }
                } else {
                    this.message = 'Sorry, an error occured, please try again later.';
                    console.log(error);
                    response.redirect('/register');
                }
            });
        } else if (request.url === '/login') {
            users.login(request.body.login, (error, result) => {
                if (!error) {
                    if (result) {
                        this.message = 'You have been logged in!';
                        request.session.user = result;
                        response.redirect('/');
                    } else {
                        this.message = 'Invalid username or password';
                        response.redirect('/login');
                    }
                } else {
                    this.message = 'Sorry, an error ocurred, please try again later.';
                    console.log(error);
                    response.redirect('/login');
                }
            });
        } else if (request.url === '/update') {
            users.updateInfo(request.body.newInfo, (error, reslut) => {
                if (!error) {
                    
                } else {

                }
            });
        } else if (request.url === '/logout') {

        } else if (request.url === '/highscore') {

        } else {

        }
    }

}
