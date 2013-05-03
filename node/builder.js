
// handles file system operations that create a new application and shell components
fs = require('fs');
cmd = require('child_process').exec;

(function(){
  
  var color = {
    red : '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    reset: '\u001b[0m'
  }
  
  exports.new = function(name){
    
    try {
    
      console.log(color.yellow + '[builder] building new flint app "'+name+'"' + color.reset);
      
      // make the new directory
      var dir =  './' + name
      fs.mkdirSync(dir)
      
      // copy primary application directories
      cmd('cp -R ' + __dirname + '/../app/' + ' ' + dir + '/app/')
      cmd('cp -R ' + __dirname + '/../public/' + ' ' + dir + '/public/')
      cmd('cp -R ' + __dirname + '/../service/' + ' ' + dir + '/service/')
      cmd('cp -R ' + __dirname + '/../flint.js' + ' ' + dir + '/flint.js')
      
			// remove all the docs stuff
			cmd('rm -rf ' + dir + '/app/responders/docs.coffee')
			cmd('rm -rf ' + dir + '/public/images/flow_diagram.png')
			cmd('rm -rf ' + dir + '/app/stylus/docs.styl')
			cmd('rm -rf ' + dir + '/app/views/docs/')
			
      console.log(color.green + '[builder] your new app "'+name+'" is ready!' + color.reset);
      
      
    } catch (e){
      
      console.log(color.red + '[builder] error creating new flint app!' + color.reset);
      console.log(e.message);
    
    }
    
  }
  
})()