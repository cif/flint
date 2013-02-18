// flint command line tool

// require the things we need
optimist = require('optimist');
path = require('path');

// get optimist options
argv = optimist
  .usage('\nflint.\nFull stack coffeescript development \n\Usage:')
  .alias('n','new')
  .describe('n','Creates a new flint application of specified name')
  .alias('s','server')
  .describe('s','Starts the express server on port specified by the configuration')
  .alias('w','watch')
  .describe('w','Watches and compiles coffee, stylus, templates, dependencies and responders which interface with the server.')
  .alias('q','quiet')
  .describe('q','Watch modifier. Watches files but only outputs errors, change and compile messages are silenced')
  .default('q', false)
  .alias('c','compile')
  .describe('c','Compiles coffee, stylus, handlebars, templates and dependencies')
  .alias('d','deploy')
  .describe('d','Packages and minifies all javascript into a single production target')
  .alias('f','file')
  .describe('f','Specify a configuration file to work with.')   
  .default('f','./flint.js')
  .alias('b','build')
  .describe('b','Compiles the core flint libraries as flint.js to the build targets')
  .argv


// load the configuration file and configure our tools
try { 

  // load the configuration and the base dir
  cwd = process.cwd();
  
  // ... unless we are copying to a new application
  if(!argv.new){
    
    flint = require(cwd + '/' + argv.file)
    base = path.resolve(path.dirname(argv.file)) + '/'
  
  }
  
 if(argv.compile || argv.watch || argv.deploy) {
    
    // dependencies - alphabetical load order matters, unfortunately.
    depencency = {} 
    depencency.in =  base + flint.config.dependencies
    depencency.out = base + flint.config.compile_dependencies_to
    depend = require('./dependency');
    depend.on(depencency)

    // coffee destinations and template engine
    maker = {}
    maker.in = flint.config.coffeescript
    maker.out = base + flint.config.compile_coffee_to
    maker.base = base
    maker.silent = argv.quiet
    brewer = require('./brewer');
    brewer.configure(maker)

    // stylus
    artist = {}
    artist.in =  base + flint.config.stylus
    artist.out = base + flint.config.compile_stylus_to
    artist.silent = argv.quiet
    styler = require('./styler');
    styler.configure(artist)

    // templates 
    plates = {}
    plates.in =  base + flint.config.templates
    plates.out = base + flint.config.compile_templates_to
    plates.engine = flint.config.template_engine
    plates.silent = argv.quiet
    plater = require('./plater');
    plater.configure(plates)

    // server side party, set up burner to do the work.
    if( argv.server ){
      
      burn = {}
      burn.in = flint.config.server_resources
      burn.out = base + flint.config.compile_resources_to
      burn.base = base
      burn.export = true
      burn.silent = argv.quiet
      burner = require('./burner')
      burner.configure(burn)
      if ( argv.watch )
        burner.watch()
      if ( argv.compile )
        burner.compile()
      
    }
    
    if ( argv.compile ) {
  
      // compile it up
      depend.concat()
      brewer.compile()
      styler.compile()
      plater.compile()
  
    }
  
    if ( argv.watch ) {
  
      // watch and compile 
      depend.watch()
      brewer.watch()
      styler.watch()
      plater.watch()  
  
    }
    
    if (argv.deploy) {
      
      // deploy all client side javascript to a single minified file.
      compressor = require('./compressor');
      dest = base + flint.config.deploy_javascript_to
      squeeze = {}
      squeeze.depends = depencency.out
      squeeze.plates = plates.out
      squeeze.scripts = maker.out
      compressor.configure(squeeze)
      compressor.deploy(dest)
      
    }
  
  }
  
  // start the express server on the specified port
  if ( argv.server || argv.run){
    
    
    
    // if we aren't running the live show, get a new brewer instance ready to watch the front end. 
    if (!argv.run)
      brewer = require('./brewer')
      
    // set base for the server config
    flint.config.base = base
    
    // fire up the server
    server = require('./server')
    server.configure(flint.config)
    server.start(!argv.run, argv.watch)
    
  }
  
  // build tools. 
  // create a new application
  if (argv.new || argv.generate){
    
    builder = require('./builder');
    
    if(argv.new){

      builder.new(argv.new);
    
    } else {
      
      // generators
      
      
    }
    
  }
  
  // this uses brewer to rebuild flint.js file from the ./core library coffeescript
  if( argv.build ) {
      
     brewer = require('./brewer');
    
     if(argv.file){
        
        client_dest = flint.config.client_build_target ? base + flint.config.client_build_target : './app/vendor/flint.js'
        server_dest = flint.config.server_build_target ? base + flint.config.server_build_target : './service/flint.js'
        
      } else {
        
        client_dest = './app/vendor/flint.js'
        server_dest = './service/flint.js'
      
      }
      
     // brew the core/client coffee and output to the destination file.   
     coffee_maker = {}
     coffee_maker.base = ''
     coffee_maker.in =  __dirname + '/../core/client/'
     coffee_maker.out = client_dest;
     coffee_maker.build = true
     coffee_maker.template_engine = false
     brewer.configure(coffee_maker)
     brewer.compile()
     
     // brew the core/server coffee and output to destiation file
     burner = require('./burner') 
     back_burner = {}
     back_burner.base = ''
     back_burner.in =  __dirname + '/../core/server/'
     back_burner.out = server_dest;
     back_burner.build = true
     back_burner.export = true
     back_burner.template_engine = false
     burner.configure(back_burner)
     burner.compile()
    
  }
  
  // if nothing was specified, ofter some guidance
  if(!argv.build && !argv.compile && !argv.watch && !argv.server && !argv.deploy && !argv.new && !argv.generate){
  
    console.log(optimist.help())
  
  }
 
  
  
} catch (e) { 
  
  // it hit the fan
  console.log('[flint] cli error:')
  console.log(e)
  console.log('[flint] configuration file: ' + argv.file)
      
}
