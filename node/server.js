
// server maps requests to the resources created by sourcer

express = require('express');
path = require('path');

(function(){
  
  var app, socket, config, responders;
  
  var setupRoutes = function(){
    
    // serve public assets
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
    
    // serve our public index
    app.get('/', function(req, res){ 
      console.log(config.debug)
      file = config.debug ? './public/index_develop.html' : './public/index.html';
      res.sendfile(path.resolve(file))
    })
    
    // serve application requests
    app.get('*', function(req, res){
        
        uri_parts = req.url.split('/')
        uri_parts.shift()
        inflector = require('./inflector')
        responders = require('../service/responders')        
        response = respondToAppRequest(req, uri_parts)
        
        if(response.success){
        
          res.set('Content-Type','text/json')
          res.send(response.data)
          res.send(200)
        
        } else {
          
          // return an error
          res.set('Content-Type','text/plain')
          res.send('Flint.js server error:' + "\n" + response.error)
          res.send(500)
          
        }
        
    })
    
    
  }
  
  var respondToAppRequest = function(req, uri_parts){
    
    // get controller class and the method to call
    controller = uri_parts[0].camelize()
    request_method = req.method.toLowerCase()
    method_to_call = uri_parts[1] ? uri_parts[1].substring(1, uri_parts[1].length) : false;
    
    // if the method doesn't exist, default to the request method (get, post, put, delete etc.)
    if(!method_to_call) method_to_call = request_method;
    
    // make sure everything exists
    if(responders.controllers[controller]){
      
      Controller = new responders.controllers[controller];
      if(Controller[method_to_call]){
        
        // verify permissions
        
        
        return {
          data: Controller[method_to_call].call(),
          success: true 
        }
        
      } else {
        
        return {
          success: false,
          error: 'Missing  method ' + method_to_call + ' on responder class ' + controller
        }
        
      }
      
    } else {
      
      return {
        success: false,
        error: 'Missing responder class ' + controller
      }
      
    }
      
  }
  
  var respondersChanged = function(){
      
      // clear the responders.js from require cache
      cwd = process.cwd()
      delete require.cache[cwd + '/service/responders.js']
    
  }
  
  exports.configure = function(options){ config = options; }
  exports.start = function(debug, watch){
    
    // if we're watching, look for changes in the app
    if(watch){
      
      fs.watch(config.compile_resources_to, respondersChanged)
      
    }
    
    // start the server
    app = express()
    port = debug ? config.develop_port : config.server_port
    config.debug = debug
    app.listen(port)
    setupRoutes()
    console.log('Server ready on port ' + port)

  }

})()
