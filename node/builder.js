
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
    
      console.log(color.yellow + '[builder] building your shiny new app "'+name+'"' + color.reset);
      
      // make the new directory
      var dir =  './' + name
      fs.mkdirSync(dir)
      
      // copy primary application directories
      cmd('cp -R ' + __dirname + '/../app/' + ' ' + dir + '/app/')
      cmd('cp -R ' + __dirname + '/../public/' + ' ' + dir + '/public/')
      cmd('cp -R ' + __dirname + '/../service/' + ' ' + dir + '/service/')
      cmd('cp -R ' + __dirname + '/../flint.js' + ' ' + dir + '/flint.js')
      
      // delete collection, controller and model shells and documentation
      cmd('rm ' + __dirname + '/../app/coffee/collections/_collection.shell.coffee')
      cmd('rm ' + __dirname + '/../app/coffee/controlers/controller.shell.coffee')
      cmd('rm ' + __dirname + '/../app/coffee/models/model.shell.coffee')
      cmd('rm ' + __dirname + '/../app/coffee/models/model.shell.coffee')
      
      // remove the docs folder from templates
      cmd('rm -rf ' + __dirname + '/../app/templates/views/docs')
      
      console.log(color.green + '[builder] your new app is "'+name+'" is ready!' + color.reset);
      
      
    } catch (e){
      
      console.log(color.red + '[builder] error creating new filnt app: ' + color.reset);
      console.log(e.message);
    
    }
    
  }
  
})()