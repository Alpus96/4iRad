
# **4iRad**
Is the root of this website. All subdirectories of the root have their own markdown file describing the content of that directory.

# **Server.js and package.json**
These are files related to Node.JS, do not mind them until node has been implemented.

## **Node.JS**
### **How to start using node**
* Go to [nodejs.org](https://nodejs.org/en/download/), download Node.JS and follow the installation process.
* Use the command line tool (cmd on windows/terminal on mac) to navigate to the project folder and type 'npm install'.
* Then type 'npm start' to start the Node.JS server.
* In your browser type '127.0.0.1:3000' to view the page locally.
* I recommend watching this [youtube tutorial series](https://www.youtube.com/playlist?list=PL_e8WAlDEO1gkAHAs06M27-PS_gN14s7J) which also explains the installation process and some of the basics of NodeJS.

This Node.JS application should follow the standard MVC structure. (Model, View, Controller)

> ### _Models:_
> * Handle database and data structures.
> ### _Views:_
> * Are rendered and sent to the client browser.
> ### _Controllers:_
> * Contain business logic and manipulates data to be sent from models to views.
>
> ![Image of MVC flow model](https://upload.wikimedia.org/wikipedia/commons/a/a0/MVC-Process.svg)
