
// flint command line tool
optimist = require('optimist');
fs = require('fs');

brew = require('./coffee');
style = require('./styler');
depend = require('./dependency');
ride = require('handlebar-rider');

/*
// get optimist options
argv = optimist
  .usage('\nFlint: Full stack coffeescript development.\nCommand Line Use: ')
  
  
  .demand(' ')
 
.argv
*/

// wrap dependencies
//depencency = { 
// in: '/Users/benipsen/Sites/flybook/app/vendor',
// out: '/Users/benipsen/Sites/flybook/public/javascript/dependencies.js'
//}
//depend.on(depencency);
depend.watch();


// brew the coffee
//coffee_maker = {
//  in: '/Users/benipsen/Sites/flybook/app/coffee',
//  out: '/Users/benipsen/Sites/flybook/public/javascript/application.js'
//}
//brew.configure(coffee_maker);
brew.watch();

// run the styler
//style_guide = {
//  in:'/Users/benipsen/Sites/flybook/app/stylus/',
//  out:'/Users/benipsen/Sites/flybook/public/application.css'
//}
//style.configure(style_guide)
style.watch()


// ride on the handlebars
//bike = {
//  in:'/Users/benipsen/Sites/flybook/app/handlebars/',
//  out:'/Users/benipsen/Sites/flybook/public/javascript/templates.js',
//  minify: true
//}
//ride.configure(bike)
ride.watch()


