
// server maps requests to the resources created by sourcer

express = require('express');
io = require('socket.io');
http = require('http');
path = require('path');

(function(){
  
  var app, sock, config, responders;
  
  var setupRoutes = function(){
    
    // serve public assets the app needs for GUI
    app.get('/css/:file?', function(req, res){
      res.sendfile(path.resolve('./public/css/' + req.params.file))
    })
    
    app.get('/javascript/:file?', function(req, res){
      res.sendfile(path.resolve('./public/javascript/' + req.params.file))
    })
    
    app.get('/fonts/:file?', function(req, res){
      res.sendfile(path.resolve('./public/fonts/' + req.params.file))
    })
    
    app.get('/public/:file?', function(req, res){
      res.sendfile(path.resolve('./public/' + req.params.file))
    })

		app.get('/favicon.ico', function(req, res){
      res.sendfile(path.resolve('./public/favicon.ico'))
    })
    
		// reserved for documentation
		app.get('/docs/:file?', function(req, res){
			file = req.params.file ? req.params.file : 'index.html'
      res.sendfile(path.resolve('./docs/' + file))
    })
    
    // serve public index
    app.get('/', function(req, res){ 
      file = config.debug ? './public/index_develop.html' : './public/index.html';
      res.sendfile(path.resolve(file))
    })
    
    // all other requests are assumed to be REST API calls
    app.get('*', function(req, res){
        
        uri_parts = req.url.split('/')
        uri_parts.shift()
        inflector = require('./inflector')
        responders = require('../service/responders')       
        
        // asyncronous responder 
        respondToAppRequest(req, uri_parts, function(response, error){
          
          if(!error){
        		
						// see if we have to emit anything to io.
						if(response.emit){
							sock.sockets.emit('data', response.emit)
						}
						
            // return the json back to our application
            res.set('Content-Type','text/json')
            //res.send(200)
        		res.send(response)
            
						
          } else {
          
            // return an error
            res.set('Content-Type','text/plain')
            res.send('Flint.js server error:' + "\n" + error)
            res.send(500)
						
          
          }
        
        });
        
    });

  }
  
  var respondToAppRequest = function(req, uri_parts, callback){
    
    // get controller class and the method to call
    controller = uri_parts[0].camelize()
    request_method = req.method.toLowerCase()
    method_to_call = uri_parts[1] ? uri_parts[1] : false;
    
    // if the method doesn't exist, default to the request method (get, post, put, delete etc.)
    if(!method_to_call) method_to_call = request_method;
    
    // create the controller instance (make sure it and the method exist)
    if(responders.controllers[controller]){
      
      // instantantiate the controller
      Controller = new responders.controllers[controller](config);
      
      
    } else if(Flint.Responder[method_to_call]) {
      
			// use the generic Flint Responder fallback instead
			Controller = new Flint.Responder(config);
				
    } else {
			
			return callback(null, 'Missing responder class ' + controller);
			 
		}
		
		// provide request data to the method we are about to call
    data = {};

		// if we have additional request parts, assume the first one is an id, per common REST API uris. 
		if(uri_parts[1]) data.id = uri_parts[1];
		
		// TODO - extend any other request data that comes through
		// for(object in req.post) etc. 
		
		// TODO - use cookies in order to determine a requestor's credentials (security.js)
    credentials = {};
		
 		// call before on controller class
    Controller.before(data, credentials);
    
		// give the controller a default store (table) based on the url
    Controller.default_store = uri_parts[0];
 		
		// verify controller method is present
		if(Controller[method_to_call]){
       
       // call the controller method
       Controller[method_to_call](data, credentials, function(response, error){
         
         //wrap up the controler
         Controller.after(data, credentials);
         
         // callback to deliver the response
         return callback(response, error);
       	 
       });
       
     } else if(Controller[request_method]) {
       
			 // call the request_method on the controller
       Controller[request_method](data, credentials, function(response, error){
         
         //wrap up the controler
         Controller.after(data, credentials);
         
         // callback to deliver the response
         return callback(response, error);
       	 
       });
			
		 } else {
				
       return callback(null, 'Missing  method ' + method_to_call + ' on responder class ' + controller);

     }
      
  }
  
	// this method is called when watching for changes (dev mode)
  var respondersChanged = function(){
      
      // clear the responders.js from require cache
      cwd = process.cwd()
      delete require.cache[cwd + '/service/responders.js']
    
  }
  
  exports.configure = function(options){ config = options; }
  exports.start = function(debug, watch){
    
    // if we're watching, look for changes in the app
    if(watch){ fs.watch(config.compile_resources_to, respondersChanged); }
    
		// determine runtime config 
		port = debug ? config.develop_port : config.server_port
    config.debug = debug
    
    // start the app server
    app = express()
		server = http.createServer(app) 
    setupRoutes()

		// start the socket server
		options = {
			'log level' : 0
		}
    sock = io.listen(server, options);
		sock.sockets.on('connection', function(client){ console.log('[flint] A client connected to socket.io.'); });
    
		// start the server 
    server.listen(port)
    console.log('[flint] Server listening on port ' + port)
		

  }

})()
