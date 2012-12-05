
// flint configuration


exports.config = {
    
  // dependencies
  dependencies: 'app/vendor',
  compile_dependencies_to: 'public/javascript/dependencies.js',
  
  // coffeescript (client)
  coffeescript: 'app/coffee',
  compile_coffee_to: 'public/javascript/application.js',
  
  // coffeescript (server)
  server_resources: 'app/responders'
  compile_resources_to : 'service/resources.js',
  
  // stylus
  stylus: 'app/stylus',
  compile_stylus_to: 'public/application.css',
      
  // templates
  template_engine: 'Handlebars',
  //template_engine: 'Eco',
  //template_engine: 'Jade', (sorry, no jade support just yet.. )
  templates: 'app/templates',
  compile_templates_to: 'public/javascript/templates.js',
  
  
  // for building the core libraries
  build_target: 'app/vendor'
  
  
}