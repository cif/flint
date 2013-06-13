// flint middleware
// a "raw" express javascript implementation alternative to routes: in your flint.js config.
// setup() will be called while the default server routes are being initialised. 

(function(){
  
  // app - the express server instance
  // socket - can be used to call emit
  // config - the flint.js config object
  // path - an instance of node path - common use:  require(path.resolve(config.base + 'service/module'))
  exports.setup = function(app, socket, config, path){
  
   /*
    example:
    
    app.get('/route/:id', do_something_tricky_first, function(req, res){  
      res.status(200);
      res.send('Middleware works!');
    });
   
   */
    
   
 };
  
})()
