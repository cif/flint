// flint configuration
// 

exports.config = {
  
// - routes --------------------------------
	// in case your application needs some SEO/permalink love. NEW routes require a server restart.  
	// NOTE: splats (*) ARE NOT supported yet. SEE middleware in the docs if you need them.	
	routes:{

    // format - 'express/route/:args' : 'ResponderClass.method_to_call'
    '/docs/:file?' : 'Docs.static'  // documentation (this will be broken on new apps, you should probably delete it)
	},

// - database --------------------------------
	db:{
	  engine: 'mysql',
	  host: '127.0.0.1',
	  user: 'flint',
	  password: 'flint!',
	  database: 'flint'
	},
    
// - misc configuration -------------------------------- 	
	// if you require classes that listen to the web and emit to clients... 
	// (twitter, etc.) specify them here e.g. ['TwitterFireHose']
	runtime: [],

  // used for signing cookies. you should really change these.
	cookie_secret: '#ASECRETVALUETHATYOUSHOULDCHANGE',
  cookie_parser_hash: '4hhh-s3cr3t!0@',
 	
// - smtp --------------------------------
	//  "services" are defined in node_modules/nodemailer/lib/wellknown.js
	//  see: https://github.com/andris9/Nodemailer/blob/master/lib/wellknown.js
	mail_service: 'Gmail',
	mail_username: 'name@gmail.com',
	mail_password: 'gmailpassword',
	mail_default_from: 'My App <notifications@my-app.com>',
	
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
	templates: 'app/handlebars',
	compile_templates_to: 'public/javascript/templates.js',
	template_engine: 'Handlebars',

//  - server options --------------------------------
	// server side templating options. for a full list of options see https://github.com/barc/express-hbs
	templating: {
	  layoutsDir: 'app/html/layouts',
	  partialsDir: 'app/html/partials',
	  extname: '.html' 
	},
	
 // WARNING!! 
	// changing these namespaces will cause the server to break. 
	// you can add more directories/namespaces to your backend if you need to. 
	compile_resources_to: 'service/responders.js',
	server_resources: [
	  {'models' : 'app/coffee/models'},   
	  {'controllers' : 'app/responders'}, 
	],

	// ports for server to run on
	develop_port: 3000,
	server_port: 8080,  // for SMTP and other sockets to work, you should forward traffic on 80 to 8080 with iptables or apache

// --- other --	
	// used for building core classes into the flint.js depencency / service 
	client_build_target: 'app/vendor/flint.js',
	server_build_target: 'service/flint.js'
 
}