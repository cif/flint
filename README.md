# FlintJS: Model Your Data In ONE PLACE. (choir of angles noise here)
================

* Flint.Model is an extension of [Backbone.Model](http://backbonejs.org/#Model) that works on the client
* Flint.Model is a core class that facilitates MySQL and Mongo database transactions via [ExpressJS](http://expressjs.com/) on the server
* Flint.Responder class responds to URL patters  /class_name/method_name/

WEBSITE AND TUTORIALS COMING SOON.

### Install:

		npm install -g flint
		
### Usage:
    
    flint.
    Usage:

    Options:
    -n, --new      Creates a new flint application of specified name                                                     
    -s, --server   Starts the express server on port specified by the configuration                                      
    -w, --watch    Watches and compiles coffee, stylus, templates, dependencies as well as responders running the server.
    -q, --quiet    Watch modifier. Watches files but only outputs errors, change and compile messages are silenced         [default: false]
    -c, --compile  Compiles coffee, stylus, handlebars, templates and dependencies                                       
    -d, --deploy   Packages and minifies all javascript into a single production target                                  
    -f, --file     Specify a configuration file to work with.                                                              [default: "./flint.js"]
    -b, --build    Compiles the core flint libraries as flint.js to the build targets   
