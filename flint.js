// flint configuration

exports.config = {
  
	// - routes --------------------------------
	// in case your application kicks it old school a bit. 
	// remember to restart the server when you add new routes.
	routes: {

		// example 
		// '/users/profile/:username?' : 'Users.profile'

		// documentation (this will be broken on new apps)
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
	// and emit to clients (twitter, etc.) specify them here e.g. ['TwitterFireHose']
	runtime: [],

	// - smtp --------------------------------
	// "services" are defined in node_modules/nodemailer/lib/wellknown.js
	// see: https://github.com/andris9/Nodemailer/blob/master/lib/wellknown.js
	mail_service: 'AuthSMTP',
	mail_username: '',
	mail_password: '',
	mail_default_from: 'My App <notifications@my-app.com>',

	// used for signing cookies. change it.
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
	templates: 'app/handlebars',
	template_engine: 'Handlebars',

	//  - server options --------------------------------
	// WARNING! changing these namespaces will cause the server to break. 
	// you can add more directories/namespaces to your backend if you need to. 
	compile_resources_to: 'service/responders.js',
	server_resources: [
	 {'models' : 'app/coffee/models'},   
	 {'controllers' : 'app/responders'}, 
	],

	// ports for server to run on
	develop_port: 3000,
	server_port: 8080,  // for SMTP and other sockets to work, you should forward traffic on 80 to 8080 with iptables or apache
	
	// -------------------------------- used for building core classes into the flint.js depencency / service 
	client_build_target: 'app/vendor/flint.js',
	server_build_target: 'service/flint.js'
 
}