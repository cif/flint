
// flint command line tool

// require the things we need
optimist = require('optimist');
path = require('path')

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
  .default('f','./flint.js')
  .alias('b','build')
  .describe('b','Rebuilds the core flint javacript library')
  .argv


// load the configuration file and configure our tools
try { 
  
  flint = require(argv.file)
  base = path.dirname(argv.file) + '/'

 // dependencies - todo, people are going to want to specify a load order for these 
  depencency = {} 
  depencency.in =  base + flint.config.dependencies
  depencency.out = base + flint.config.compile_dependencies_to
  depend.on(depencency)

 // coffee destinations and template engine
  coffee_maker = {}
  coffee_maker.in =  base + flint.config.coffeescript
  coffee_maker.out = base + flint.config.compile_coffee_to
  coffee_maker.template_engine = flint.config.template_engine
  brewer.configure(coffee_maker)

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
  
  

} catch (e) { 

  console.log('[flint] configuration file missing or currupted: ' + argv.file + '\n')
  console.log(optimist.help())
  
}

/*

if( argv.watch ) {
  // compile and watch mode
  depends.watch()
  brewer.watch()
  styler.watch()
  ride.watch()

} 

if ( argv.compile ) {
  // compile it up
  depends.concat()
  brewer.compile()
  styler.compile()
  ride.compile()
  
}


if( !argv.compile && !argv.watch && !argv.build ){
  
  console.log(optimist.help())
  
} 


if (argv.build){
  
  console.log('building...')
  
} 
  

*/

/*

// wrap dependencies
//depencency = { 
// in: '/Users/benipsen/Sites/flybook/app/vendor',
// out: '/Users/benipsen/Sites/flybook/public/javascript/dependencies.js'
//}
//depend.on(depencency);
depends.watch();


// brew the coffee
//coffee_maker = {
//  in: '/Users/benipsen/Sites/flybook/app/coffee',
//  out: '/Users/benipsen/Sites/flybook/public/javascript/application.js'
//}
//brew.configure(coffee_maker);
brewer.watch();

// run the styler
//style_guide = {
//  in:'/Users/benipsen/Sites/flybook/app/stylus/',
//  out:'/Users/benipsen/Sites/flybook/public/application.css'
//}
//style.configure(style_guide)
styler.watch()


// ride on the handlebars
//bike = {
//  in:'/Users/benipsen/Sites/flybook/app/handlebars/',
//  out:'/Users/benipsen/Sites/flybook/public/javascript/templates.js',
//  minify: true
//}
//ride.configure(bike)
ride.watch()

*/
