//  Required modules.
const express = require('express');
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

//	Set server to express framework, and give it the 'file configuration'.
let server = express();
server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('./views/assets'));

//	Responde with index page
function index (request, response) {
	response.render('index');
}

//	Send 404.
function send404 (request, response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404! Page not found.");
	response.end();
	console.log("404 response.");
}

//	Handle url requests.
function urlRequest (request, response) {
	console.log('Request made.');
	if (request.method == 'GET') {
		let path = './views' + request.url;
		console.log(path);
		if (path == "./views/") {
			path += 'index.html';
			//index(request, response);
		}
		if (path) {
			// Check if the request is a file on the server.
			fs.stat(path, function (err, stat) {
				//	If there
				if (err == null) {
					/*if (path == "./site/") {
						index(request, response);
					} else {*/
						//	Implement sorting of files that should
						//	or should not be accessed through here.
						if (path.indexOf(".html") != -1) {
							response.writeHead(200, {"Content-Type": "text/html"});
						} else if (path.indexOf(".css") != -1) {
							response.writeHead(200, {"Content-Type": "text/css"});
						} else if (path.indexOf(".js") != -1) {
							response.writeHead(200, {"Content-Type": "text/javascipt"});
						} else if (path.indexOf(".jpg") != -1 || path.indexOf(".jpeg") != -1) {
							response.writeHead(200, {"Content-Type": "image/jpg"});
						} else if (path.indexOf(".png") != -1) {
							response.writeHead(200, {"Content-Type": "image/png"});
						} else if (path.indexOf(".gif") != -1) {
							response.writeHead(200, {"Content-Type": "image/gif"});
						} else if (path.indexOf(".svg") != -1) {
							response.writeHead(200, {"Content-Type": "image/svg+xml"});
						}
						//	Add more file types here...

						fs.createReadStream(path).pipe(response);
					//}
				} else if (err == 'ENOENT') {
					console.log("ENOENT error occured.");
					console.log("Request path: " + path);
					send404(request, response);
				} else {
					console.log("An error occured: " + err.code);
					console.log("Request path: " + path);
					send404(request, response);
				}
			});
		}
	} else {
		send404(request, response);
	}
}

//	Require ejsRequest
//	Use for '/ejs/*' requests

//	Use urlRequest function for handeling requests in '/'.
server.use('/', urlRequest);

//	Listen at localhost:3000.
http.createServer(server).listen(3000);
console.log("Running server...");
