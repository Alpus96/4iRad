//  Required modules.
const express = require('express');
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './views/ejs');
app.use(express.static('./views/assets'));

function index (request, response) {
	response.render('index');
}

function send404 (request, response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404! Page not found.");
	response.end();
	console.log("404 response.");
}

function urlRequest (request, response) {
	console.log('Request made.');
	if (request.method == 'GET') {
		let path = '.' + request.url; //"./site" +
		console.log(path);
		if (path == "./") {
			index(request, response);
		} else {
			fs.stat(path, function (err, stat) {
				if (err == null) {
					if (path == "./site/") {
						index(request, response);
					} else {
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
					}
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
		send404Response(response);
	}
}

app.use('/', urlRequest);

http.createServer(app).listen(3000);
console.log("Running server...");
