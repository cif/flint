## FlintJS: Model Your Data In ONE PLACE. (for real)
================

* Flint.Model began as an subclass of [Backbone.Model](http://backbonejs.org/#Model) which works on the client
* Flint.Model is also core class which facilitates MySQL and Mongo database transactions via [ExpressJS](http://expressjs.com/) on the server
* Flint.Responder class responds to URL patters /class_name/method_name/

FULL DOCS AND TUTORIALS COMING SUMMER 2013.

### Install:

		npm install -g flint
		
### CLI Usage:
    
    -n, --new      Creates a new flint application of specified name                                                     
    -s, --server   Starts the express server on port specified by the configuration                                      
    -w, --watch    Watches and compiles coffee, stylus, templates, dependencies as well as responders running the server.
    -q, --quiet    Watch modifier. Watches files but only outputs errors, change and compile messages are silenced         [default: false]
    -c, --compile  Compiles coffee, stylus, handlebars, templates and dependencies                                       
    -d, --deploy   Packages and minifies all javascript into a single production target                                  
    -f, --file     Specify a configuration file to work with.                                                              [default: "./flint.js"]
    -b, --build    Compiles the core flint libraries as flint.js to the build targets   


Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.