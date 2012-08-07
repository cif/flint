
// compiles anything in the stylus directory into a single css application.css file

stylus = require('stylus');
fs = require('fs');

(function(){
  
  var files = []
  var config = {
    in: './app/stylus',
    out: './public/application.css'
  }
  
  //colored output
  var color = {
    red : '\u001b[31m',
    blue: '\u001b[36m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    reset: '\u001b[0m'
  }
  
  var directoryHasChanged = function(event, filename){
    
    console.log(color.blue + '[styler] new or renamed file deteted, recompiling css' + color.reset);
    unwatchAll();
    watch(config.in, true);
    
  }

  var fileHasChanged = function(event, filename){
        
      console.log(color.blue + '[styler] change detected to file, recompiling css' + color.reset);
      unwatchAll();
      watch(config.in, true);
  
  }
  
  var watchers = []
  var unwatchAll = function(){
    
    for(var w = 0; w < watchers.length; w++){
      watchers[w].close();
    }
    
  }
  
  var directory_watch = false;
  var watch = function(dir, skip_message){
   
      if(!dir) dir = config.in
      config.in = dir
      
      if(directory_watch) directory_watch.close()
      directory_watch = fs.watch(config.in, directoryHasChanged);
      
      if(!skip_message) console.log(color.yellow + '[styler] watching stylus directory: ' + dir + color.reset);
      compile(dir, true)
  
  }
  
  var compile = function(dir, watch){
    
    if(!dir) dir = config.in
    config.in = dir 
    files = readFiles(dir, watch);
   
  }
  
  var addToCss = function(css){
    config.css.push(css)

  }
  
  var buildOutput = function(files){
    
    try {
      //read in all the styles
      config.css = []
      for(var f = 0; f < files.length; f++){
        
        data = fs.readFileSync(files[f], 'utf8');
     
          stylus.render (data, {filename: files[f]}, function(err, css){
        
              if (err) throw err;
        
              addToCss(css)
        
        
            });
      
         }
         
         // run it through the styler
         writeCssFile(config.css.join('\n'));
      
      
      
    } catch (e) { 
      
      console.log(color.red + '[styler] Error compiling stylus: ' + color.reset);
      console.log(e.message);
      
    }
      
  }
  
  var readFiles = function(dir, watch){
   
    fs.readdir( dir, function( err, list ) {
        
        try{
          
          if(err) throw err
          _files = []
    
          for(var l = 0; l < list.length; l++){
            
            if(list[l].indexOf('.styl') > 0){
              _files.push(dir + '/' + list[l])
              if(watch) 
                watchers.push(fs.watch(dir + '/' + list[l], fileHasChanged));
            }
              
          }
        
          buildOutput(_files)
        
        } catch (e) {
            
          console.log(color.red + '[styler] Cound not read stylus directory: ' + dir + color.reset);
          
        }
        
    });  
    
      
  }
  
  var writeCssFile = function(css){
     
    try {
        
       // output the css
       fs.writeFileSync(config.out, css, 'utf8');
       console.log(color.green + '[styler] compiled css output to ' + config.out + color.reset);
    
    } catch(e){
    
        console.log(color.red + '[styler] ERROR! Destination file or directory does not exist.' + color.reset);
    
    }
    
  }
  
  exports.configure = function(cfg){ config = cfg };
  exports.compile = compile;
  exports.watch = watch;
  
})()