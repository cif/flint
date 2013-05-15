// flint configuration

exports.config = {
  
	// - routes --------------------------------
	// in case your application kicks it old school a bit. 
	// remember to restart the server when you add new routes.
	routes: {

		// example 
		// '/users/profile/:username?' : 'Users.profile'

		// documentation (delete this. it will be broken on new apps)
		'/docs/:file?' : 'Docs.static'

	},

	// - database --------------------------------

	db: {
	  engine: 'mysql',
	  host: '127.0.0.1',
	  user: 'flint',
	  password: 'flint!',
	  database: 'flint'
	},
  
	// - runtime classes -------------------------------- 	
	// if you require classes to listen to the web 
	// and emit to the clients (twitter, etc.) specify them here
	runtime: [],

	// - smtp --------------------------------
	// "services" are defined in node_modules/nodemailer/lib/wellknown.js
	// see: https://github.com/andris9/Nodemailer/blob/master/lib/wellknown.js
	mail_service: 'AuthSMTP',
	mail_username: 'ac53771',
	mail_password: 'ppnrqqd7vzdfsd',
	mail_default_from: 'ACT-HERE <notifications@act-here.com>',


	// used for signing cookies in your application. change it.
	cookie_secret: '#ASUPERSECRETVALUETHATYOUSHOULDCHANGE',

 
    //  - client side compiler options --------------------------------
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
	// WARNING! changing these namespaces will likely cause the server to break. 
	// you are however, welcome to add more directories/namespaces if you wish 
	compile_resources_to: 'service/responders.js',
	server_resources: [
	 {'models' : 'app/coffee/models'},   
	 {'controllers' : 'app/responders'}, 
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