// flint configuration

exports.config = {
  
	// - routes + database --------------------------------

  // in case your application kicks it old school a bit. 
  // remember to restart the server when you add new routes.
	routes: {
		
		// example 
		// '/users/profile/:username?' : 'Users.profile'
		
		
		// documentation (delete this. it will be broken on new apps)
		'/docs/:file?' : 'Docs.static'
	
	},
	
	// used for signing cookies in your application. CHANGE IT!
	cookie_secret: '#ASUPERSECRETVALUETHATYOUSHOULDCHANGE!',
	
	// database configuration
  db: {
    engine: 'mysql',
    host: '127.0.0.1',
    user: 'flint',
    password: 'flint!',
    database: 'flint'
  },
   
  //  - client side compilers --------------------------------
  
  // dependencies
  compile_dependencies_to: 'public/javascript/dependencies.js',
  dependencies: 'app/vendor',
  
  // coffeescript
	coffeescript: 'app/coffee',
	compile_coffee_to: 'public/javascript/application.js',
  deploy_javascript_to: 'public/javascript/production.js',
  deploy_dependencies_to: 'public/javascript/dependencies.min.js',
   
  // stylus
  stylus: 'app/stylus',
  compile_stylus_to: 'public/application.css',
	deploy_stylus_to: 'public/application.css',    
  	
  // templates
  compile_templates_to: 'public/javascript/templates.js',
  templates: 'app/templates',
  template_engine: 'Handlebars',
  
	
  //  - server options --------------------------------
  
	// coffeescript 
  compile_resources_to: 'service/responders.js',
  server_resources: [
    {'models' : 'app/coffee/models'},  // warning! changing these namespaces may cause the server to break. 
    {'controllers' : 'app/responders'}, // you are however, welcome to add more directories if you wish
  ],
  
  // ports for server to run on
  develop_port: 3000,
  server_port: 80,
  ssl_port: 443,
  // socket_port: 8080, - ignored for now, autodetect is pretty good.
  
  
  // -------------------------------- used for building core classes into the flint.js depencency / service 
  client_build_target: 'app/vendor/flint.js',
  server_build_target: 'service/flint.js'
  
  
}