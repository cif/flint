
// server maps requests to the resources created by sourcer

express = require('express');
io = require('socket.io');
http = require('http');
path = require('path');

(function(){
  
  var app, sock, config, responders, hbs;
  
  var setupRoutes = function(routes){
    
    // serve public assets the app needs for GUI - this is old, express.static is probably better?
    app.get('/css/:file?', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/css/' + req.params.file)) });
    app.get('/javascript/:file?', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/javascript/' + req.params.file)) }); 
    app.get('/fonts/:file?', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/fonts/' + req.params.file)) });
		app.get('/images/:file?', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/images/' + req.params.file)) });
    app.get('/public/:file?', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/' + req.params.file)) });
		app.get('/favicon.ico', function(req, res){ res.sendfile(path.resolve(__dirname + '/../public/favicon.ico')) });
    
    
		if(!routes['/']){ // ... if a default path hasn't been established render the index.
			 
			app.get('/', function(req, res){  res.render('index.html', {flint:config}); });
		
		}
		
		// setup routes specified by routes.js
		for(route in routes){
			
			app.all(route, respondToCustomRouteRequest);
			
		}

    // all other requests are assumed to be REST API calls
    app.all('*', respondToAppRequest);
	
		
  }
	
	// sends the final response from the responder (controller) method
  var sendFinalResponse = function(res, response, error){
			
			if(!error){
       	
					if(response.emit){ 
						
						// if our response is told emit to io, send it along.
						sock.sockets.emit('data', response.emit); 
						
						// revert the response to the data emitted (prevent circular reference).
						response = response.emit.data;
						
					}
					
					// check for denied access.
					if (response.denied){
						
						res.set('Content-Type','text/plain');
          	res.send('Access denied');
          	res.send(403);
					
					} else if (response.template) {
						
						// this response wants to render a real view.
						response.flint = config;
						res.render(response.template, response);
						
						
					} else {
					
						// return the json back to our application
		        res.set('Content-Type','application/json');
					  res.send(response);
         
					}
				
				
        } else {
        
          // return an error
          res.set('Content-Type','text/plain')
          res.send('Flint.js server error:' + "\n" + error)
          res.send(500)
				 
        }

  }
	
	// relays the REST API request
	var respondToAppRequest = function(req, res){
       
			 // asyncronous JSON responder 
       getApplicationResponse(req, res, function(response, error){
         sendFinalResponse(res, response, error);
       });
       
   };

	// responds to custom route requests
	var respondToCustomRouteRequest = function(req, res){
		
		// find the method we need to call using our routes
		url = req.url;
		for(route in config.routes){
			
			// replace any string arguments with wildcards for matching the method we are trying to call.
			regex_string = '^' + route.replace(/\:(.*)/g,'(.*)') + '$'
			wild = new RegExp(regex_string);
			if(url.match(wild)){
				
				matched = config.routes[route];
				getCustomResponse(req, res, matched, function(response, error){
					
					 sendFinalResponse(res, response, error);
					
				});
				
				// no need to keep looking.
				return true;
		  }  
		}
		
		// unable to match a route
		sendFinalResponse(res, null, 'Not Found: Unable to match a route to this request.')
			
	}
  
	// responds to application requests
  var getApplicationResponse = function(req, res, callback){
    
		// parse parts for uri mapping
		uri_parts = req.url.split('/');
    uri_parts.shift();

		// get controller class and the method to call
		inflector = require('./inflector');
    responders = require(path.resolve(config.base + 'service/responders'));
		controller = uri_parts[0].camelize()
    request_method = req.method.toLowerCase()
    method_to_call = uri_parts[1] ? uri_parts[1] : false;
    
    // if the method doesn't exist, default to the request method (get, post, put, delete etc.)
    if(!method_to_call) method_to_call = request_method;
    
    // create the controller instance (make sure it and the method exist)
    if(responders.controllers[controller]){
      
      // instantantiate the controller
      Controller = new responders.controllers[controller](config);
      
    } else if(Flint.Responder.prototype[method_to_call]) {
      
			// use the generic Flint Responder fallback instead
			Controller = new Flint.Responder(config);
				
    } else {
			
			return callback(null, 'Missing responder class ' + controller);
			 
		}
		
		// provide request data to the method we are about to call
    data = getRequestData(req, res);
		credentials = getRequestCredentials(req, res);
		
		// if we have additional request parts, assume the first one is an id, per common REST API uris. 
		if(uri_parts[1]) data.id = uri_parts[1];
		
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
      
  };

  var getCustomResponse = function(req, res, responder_method, callback){
			
		// get the controller 
		responders = require(path.resolve(config.base + 'service/responders'));
		method = responder_method.split('.');
		controller = method[0];
		
		if(responders.controllers[controller]){
     
     	// instantantiate the controller
     	Controller = new responders.controllers[controller](config);
     	
			method_to_call = method[1];
			
			// todo
			data = getRequestData(req, res);
			credentials = getRequestCredentials(req, res);
			
			Controller.before(data, credentials);
				
			if(Controller[method_to_call]) {
      
				 // call the request_method on the controller
	       return_callback = function(response, error){
        
	         //wrap up the controler
	         Controller.after(data, credentials);
        
	         // callback to deliver the response
	         return callback(response, error);
      	 
	       };
				 
				 // get the arguments to apply in an array
				 arguments = [];
				 for(arg in req.params){
						arguments.push(req.params[arg]);
				 }
				 arguments.push(data, credentials, return_callback);
				 
				 // call the controller
				 Controller[method_to_call].apply(null, arguments);
				 	
		
			 } else {  // ... missing method on the controller
	       return callback(null, 'Missing  method ' + method_to_call + ' on responder class ' + controller);
	     }	

     
  		} else {   // ... missing the responder (controller) class.
				return callback(null, 'Missing responder class ' + controller);
		}
		
	
	};
	
	var getRequestData = function(req, res){
			
		data = {};
		
		// add any post body data
		for(obj in req.body){
			data[obj] = req.body[obj];
		}
		
		// extend query paramenters but dont override post data
		for(obj in req.query){
			if(!data.hasOwnProperty(obj)){
				 data[obj] = req.query[obj];
			}
		}
		return data;
		
	}
	
	var getRequestCredentials = function(req, res){
		
		// push all request cookie values into the credentials
		credentials = {};
		for(obj in req.signedCookies){
			credentials[obj] = req.signedCookies[obj];
		}
		
		// res to the credentials object for setting cookies in responders (controllers)
		credentials.res = res; 
		return credentials;
		
	}
  
	// this method is called when watching for changes (dev mode)
  var respondersChanged = function(){
      
    // clear the responders.js from require cache
    delete require.cache[path.resolve(config.base + 'service/responders.js')]
    
  };
  
  exports.configure = function(options){ config = options; }
  exports.start = function(debug, watch){
    
    // if we're watching, look for changes in the app
    if(watch){ fs.watch(config.compile_resources_to, respondersChanged); }
    
		// determine runtime config 
		port = debug ? config.develop_port : config.server_port
    config.debug = debug
    
    // start the app server
    app = express();
		server = http.createServer(app); 
		
		// register handlebars are our wonderful templating engine
		hbs = require('hbs');
		
		// register Flint.Helpers for server side app/views
		flint = require(path.resolve(config.base + 'service/flint'));
		helpers = new Flint.Helpers(hbs);
		helpers.config = config;
		
		app.set('view engine', 'html');
		app.set('views', path.resolve(config.base + 'app/views/'));
		app.engine('html', hbs.__express);
		
		// make sure we are parsing requests and keeping active sessions
		app.use(express.bodyParser());
		app.use(express.cookieParser('secret!'));
		app.use(express.session({secret: config.cookie_secret}));
		
		// setup the routes
		setupRoutes(config.routes);

		// start the socket server
		options = {
			'log level' : 0
		}
    sock = io.listen(server, options);
		sock.sockets.on('connection', function(client){ console.log('[flint] A client connected to socket.io.'); });
    
		// start the server 
    server.listen(port);
    console.log('[flint] Server listening on port ' + port);
		

  }

})()
