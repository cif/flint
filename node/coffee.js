
// compiles the coffeescript into a single file


// handlebar coffee

coffeescript = require('coffee-script');
uglify = require('uglify-js');
fs = require('fs');


(function(){
  
  //colored output
  var color = {
    red : '\u001b[31m',
    blue: '\u001b[36m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    reset: '\u001b[0m'
  }

  //options and helper functions scoped globally in simple namespaced object
  var coffee = {
  
    in: './app/coffee/', 
    out: './public/javascript/application.js',
    scripts: [],
    directories: [],
    minify: false
    
  }
  
  // recursively reads in directory and namespaces template and partial objects  
  var recurseCoffeeDirectory = function(dir, done) {
    
    // stores results    
    var results = []
    
    // read the directory    
    fs.readdir(dir, function(err, list) {
    
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
    
      // walk it
      list.forEach( function(file) {
      
        file = dir + '/' + file;
        
        // determine if file or directory
        fs.stat(file, function(err, stat) {
      
          if (stat && stat.isDirectory()) {
          
              // push as directory
              results.push('directory:' + file);          
              recurseCoffeeDirectory(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
          
            });
      
          } else {
            
            // push as file
            results.push('file:' + file);    
            if (!--pending) done(null, results);
      
          }
      
        });
      });
    });
      
  };
    
  
  //watches a file for changes
  var fileHasChanged = function(event, filename){
      
      console.log(color.blue + '[brew] change detected to file, recompiling' + color.reset);
      compileTemplates();
  
  };
  
  
  // watches a directory for changes  
  var directoryHasChanged = function(event, filename){
     
      console.log(color.blue + '[brew] new or removed file detected, recompiling' + color.reset);
      readAndCompile(coffee.in, coffee.watch);
        
  };
  
  var watchers = []
  var unwatchAll = function(){
    
    for(var w = 0; w < watchers.length; w++){
      watchers[w].close();
    }
    
  }
    
  //compiles to output destination
  var compileTemplates = function(){
    
    
    out = []
    
    
    try { 
      
      //console.log(coffee.directories)
    
      // scope all the directories as objects for the begining of the file
      for(var d = 0; d < coffee.directories.length; d++){
      
        object = coffee.directories[d].namespace.replace(/\//g,'.');
        out.push(object + ' = {}\n');
      
      }
      
      // add the __ methods required for class inheritance
      out.push('\n');
      out.push('__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },\n');
      out.push('__hasProp = {}.hasOwnProperty,\n');
      out.push('__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n');
    
      // compile all the coffee scripts
      out.push('\n');
      
      for(var s = 0; s < coffee.scripts.length; s++){
          data = fs.readFileSync(coffee.scripts[s].file, 'utf8');
          compiled = coffeescript.compile(data, {bare:true})
          
          // hack off var Whatever line
          compiled = compiled.substr(compiled.indexOf('\n\n'), compiled.length);
          
          // trim so we can rescope objects based on the directory structure
          compiled = compiled.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          spaced = coffee.scripts[s].namespace.substr(0, coffee.scripts[s].namespace.lastIndexOf('/')).replace(/\//g,'.')
          
          out.push(spaced + '.' + compiled + '\n')
      
      }
      
    } catch (e) {
      
      console.log(color.red + '[brew] warning, a file was deleted ' + color.reset + e);
      
    }
    
    output = out.join('');
  
    if(coffee.minify){
      
      var ast = uglify.parser.parse(output);
      ast = uglify.uglify.ast_mangle(ast);
      ast = uglify.uglify.ast_squeeze(ast);
      output = uglify.uglify.gen_code(ast);
    
    }

    //write the output file
    try {
      
      fs.writeFileSync(coffee.out, output, 'utf8');
      console.log(color.green + '[brew] compiled ' + coffee.in + ' to ' + coffee.out + color.reset);
      
    } catch(e){
    
        console.log(color.red + '[brew] ERROR! destination file or directory does not exist.' + color.reset + '\n:' + e);
    
    }
  

 };

  
 var readAndCompile = function(dir, watch){
   
    coffee.scripts = []
    coffee.directories = []
    
    // unwatch all the files
    unwatchAll();
    
    //read files in the directory
    recurseCoffeeDirectory(dir, function(err, files) {
    
     try {
       
       if(err)
         throw new Error('directory does not exists: ' + dir)
      
       source_dir = coffee.in.toString();
       for(var f = 0; f < files.length; f++){
          
          // determine whether or not it's a file or directory. 
          info = files[f].split(':')
          
          if( info[0] == 'file' && info[1].indexOf('.coffee') > 0 ){
            
            // watch the file
            if(watch) {
              
              watchers.push(fs.watch(info[1], fileHasChanged))
            
            }
            
            // get the template namespace by using the extra directory
            file_and_dir = info[1].substr( (info[1].indexOf(dir) + dir.length) + 1, info[1].length);
            namespaced = file_and_dir.replace(/\.coffee/,'');
            
            // push object for the compiler to work with
            coffee.scripts.push({
              namespace: namespaced,
              file: info[1]
            })
            
            
          } else if ( info[0] == 'directory') {
            
            namespaced = info[1].substr( (info[1].indexOf(source_dir) + source_dir.length) + 1, info[1].length);
            coffee.directories.push({
              namespace: namespaced,
              directory: info[0]
            })
            
            // watch the directory for new / removed files
            if(watch){ 
              
              watchers.push(fs.watch(info[1], directoryHasChanged))
            
            }
            
          }
        
        }
        
        compileTemplates();
        
      } catch (e){
        
        console.log(color.red + '[brew] ERROR! check to be sure your directories exist. ' + color.reset  + "\n" + e + "\n");
        console.log('[brew] input directory: ' + dir);
        console.log('[brew] destination file: ' + coffee.out + "\n");
        if(coffee.help)
          console.log(coffee.help)
        
      }
        
    });
   
  }  


// export functions for module use
exports.configure = function(config){ coffee = config; }
exports.watch = function(){
  
  console.log(color.yellow + '[brew] watching template directory ' + coffee.in  + color.reset);
  coffee.watch = true;
  readAndCompile(coffee.in, true);
  
}

exports.compile = function(){
  coffee.watch = false;
  readAndCompile(coffee.in, false);
  
}

 
})()



