// flint middleware
// a "raw" express javascript implementation alternative to routes: in your flint.js config.
// setup() will be called while the default server routes are being initialised. 

(function(){
  
  var io_events = false;
  // to employe more complex socket io_event broadcasting (emits), see docs.
  // io_events = function(emit, callback){ }
  

  // app - the express server instance
  // socket - the socket server instance
  // config - the flint.js config object
  // path - an instance of path to the application - e.g:  require(path.resolve(config.base + 'service/module'))
  exports.setup = function(app, socket, config, path){
  
  
  /*
    example:
    
    app.get('/route/:id', do_something_first, function(req, res){  
      res.status(200);
      res.send('Middleware works!');
    });
   
   */
    
   
 };
 
 exports.io_events = io_events;
  
})()
