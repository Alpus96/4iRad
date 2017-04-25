//	Log server start.
console.log('Server starting...');

//	Required modules.
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mySqlStore = require('express-mysql-session');

//	Require the class for configurations to setup sessions and session-store.
const Config = require('./config');

//	Log modules required.
console.log('Loaded requierd modules.\n');

//	Get the sessions configuration.
console.log('Getting sessions and session-stroe confgurations...');

//	Creating the session-store to use for sessions.
const mySqlSessionsStore = mySqlStore(Config.sessionStore());

//	Get sessions configuration.
Config.sessionsConf(function (error, result) {
	//	Confirm there was no error.
	if (!error) {
		//	If there was no error log success.
		console.log(`Sessions configuration retrieved.\n`);

		//	Log start of server framework setup.
		console.log( 'Setting up server framework...');
		//	Then set server framework.
		const server = express();

		//	Use sessions with sessionsConf and the same store as cluster-store.
		result.store = mySqlSessionsStore;
		server.use(session(result));
		console.log(`Sessions setup with session-store in framework.`);

		//	Set server files configuration.
		server.set('view engine', 'ejs');
		server.set('views', './views/ejs'); // TODO: Mode ejs to './views'.
		server.use(express.static('./views/assets'));
		console.log(`Server framework files configuration set.`);

		//	Require the router class to handle requests.
		const Router =  require('./controllers/Router');

		//	Setup request handlers.
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({extended: false}));
		server.get('*', (request, response) => Router.get(request, response));
		server.post('*', (request, response) => Router.post(request, response));
		console.log(`Server framework request handlers setup.`);


		//	Listen for requests.
		console.log(`\nServer setup done, atempting to listen...`);
		server.listen(3000, () => {
			console.log(`Server listening on port 3000.\n`);
		});
	} else {
		console.log('There was an error:');
		console.error(error);
	}
});
