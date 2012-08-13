
// flint command line tool

// require the things we need
optimist = require('optimist');
path = require('path');

brewer = require('./brewer');
styler = require('./styler');
depend = require('./dependency');
plater = require('./plater');

// get optimist options
argv = optimist
  .usage('\nflint.\nFull stack coffeescript development \n\nInstructions: ')
  .alias('w','watch')
  .describe('w','Watches and compiles coffee, stylus, templates and dependencies')
  .alias('c','compile')
  .describe('c','Compiles coffee, stylus, handlebars, templates and dependencies')
  .alias('f','file')
  .describe('f','Path to the flint configuration file')   
  .default('f','flint.js')
  .alias('b','build')
  .describe('b','Rebuilds the core flint javacript library')
  .argv


// load the configuration file and configure our tools
try { 
  
 // compile and watch generally do the same things, but watch will also watch the files  
 if(argv.compile || argv.watch) {
    
    cwd = process.cwd();
    flint = require(cwd + '/' + argv.file)
    base = path.dirname(argv.file) + '/'

    // dependencies - todo, people are going to want to specify a load order for these 
    depencency = {} 
    depencency.in =  base + flint.config.dependencies
    depencency.out = base + flint.config.compile_dependencies_to
    depend.on(depencency)

   // coffee destinations and template engine
    maker = {}
    maker.in = flint.config.coffeescript
    maker.out = base + flint.config.compile_coffee_to
    maker.base = base
    brewer.configure(maker)

   // stylus
    artist = {}
    artist.in =  base + flint.config.stylus
    artist.out = base + flint.config.compile_stylus_to
    styler.configure(artist)

   // templates 
    plates = {}
    plates.in =  base + flint.config.templates
    plates.out = base + flint.config.compile_templates_to
    plates.engine = flint.config.template_engine
    plater.configure(plates)

    if ( argv.compile ) {
  
      // compile it up
      depend.concat()
      brewer.compile()
      styler.compile()
      plater.compile()
  
    }
  
    if ( argv.watch ) {
  
      // compile it up
      depend.watch()
      brewer.watch()
      styler.watch()
      plater.watch()
  
    }
    
    // todo - deploy goes here.
  
  }
  
   // this uses brewer to rebuild the vendor/flint.js file from the ./core library files as Flint.Class .. 
  if( argv.build ) {
    
     if(argv.file){
        
        cwd = process.cwd();
        flint = require(cwd + '/' + argv.file)
        base = path.dirname(argv.file) + '/'
        dest = base + flint.config.build_target + '/flint.js'
      
      } else {
        
        dest = './app/vendor/flint.js'
        
      }
    
     coffee_maker = {}
     coffee_maker.base = ''
     coffee_maker.in =  __dirname + '/../core/'
     coffee_maker.out = dest;
     coffee_maker.build = true
     coffee_maker.template_engine = false
     brewer.configure(coffee_maker)
     brewer.compile()
    
  }
  
  
} catch (e) { 

  console.log('[flint] configuration file missing or currupted: ' + argv.file + '\n')
  console.log(e)
  console.log(optimist.help())
  
  
}
