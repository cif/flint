
// flint configuration

exports.config = {
    
  // dependencies
  compile_dependencies_to: 'public/javascript/dependencies.js',
  dependencies: 'app/vendor',
  
  // coffeescript (client)
  compile_coffee_to: 'public/javascript/application.js',
  coffeescript: 'app/coffee',
  
  // coffeescript (server)
  compile_resources_to : 'service/responders.js',
  server_resources: [
    {'models' : 'app/coffee/models'},
    {'controllers' : 'app/responders'},
  ],
  
  // stylus
  compile_stylus_to: 'public/application.css',
  stylus: 'app/stylus',
      
  // templates
  compile_templates_to: 'public/javascript/templates.js',
  templates: 'app/templates',
  template_engine: 'Handlebars',
  //template_engine: 'Eco', (sorry, no jade or eco support just yet)
  //template_engine: 'Jade', 
  
  // ports for server to run on
  develop_port: 3000,
  server_port: 80,
  socket_port: 8080,
  ssl_port: 443,
  
  // used for building the core into the flint.js depencency
  build_target: 'app/vendor'
  
  
}