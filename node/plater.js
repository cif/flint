
// plater pre compiles templates into your templates.js file using your template language of choice.

// increase max file size
global.maxFilesInFlight = 500

// deps
optimist = require('optimist')
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
  var plates = {
  
    in: './app/handlebars/', 
    out: './public/javascript/templates.js', 
    templates: [],
    minify: true
    
  }
  
  // recursively reads in directory and namespaces template and partial objects  
  var readTemplatesDirectory = function(dir, done) {
    
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
              readTemplatesDirectory(file, function(err, res) {
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
      
      console.log(color.yellow + '[plater] change detected to file, recompiling' + color.reset);
      compileTemplates();
        
  };
  
  
  // watches a directory for changes  
  var directoryHasChanged = function(event, filename){
     
      console.log(color.yellow + '[plater] new or removed file detected, recompiling' + color.reset);
      readAndCompile(plates.in, plates.watch);
        
  };
  
  // tracks and unwatches in case of rebuild
  var watchers = []
  var unwatchAll = function(){
    
    for(var w = 0; w < watchers.length; w++){
      watchers[w].close();
    }
    
  }
    
  //compiles to output destination
  var compileTemplates = function(){
    
    try {  
      
      // determine the engine of choice and compile output accordingly.
        output = [];
       
        if (plates.engine == 'Handlebars') {
      
          handlebars = require('handlebars');
          output.push('\n var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};');
          // there is probably a more graceful/efficient way of doing these, but it works a'ight
          output.push('\n Handlebars.partials = Handlebars.templates;');
          output.push('\n var tmpl = Handlebars.templates; var tmpl_compile = Handlebars.compile;\n');
          compile_template = handlebars.precompile;
        
        } 
        
        /* 
         todo - support other template engines... ?
        */
        
        
        for(var t = 0; t < plates.templates.length; t++){
            
            data = fs.readFileSync(plates.templates[t].file, 'utf8');
            
            // clean the templat comments up, it's getting compiled
            data = data.replace(/<!--(.*?)-->/gm, "")
                       .replace(/(\r\n|\n|\r)/gm,"");
            
            // check for partial conventions
            if (plates.templates[t].namespace.indexOf('/_') > 0){            
              compiled = 'templates[\'' + plates.templates[t].namespace.replace(/\/_/,'_') + '\'] = template(' + compile_template(data, {}) + ');\n'
            } else if( plates.templates[t].namespace.indexOf('partial') != 0 ) {              
              compiled = 'templates[\'' + plates.templates[t].namespace + '\'] = template(' + compile_template(data, {}) + ');\n'
            } else {
              compiled = 'templates[\'' + plates.templates[t].namespace.replace(/partials\//,'') + '\'] = template(' + compile_template(data, {}) + ');\n'
            }
            output.push(compiled);
        
        }
      
    } catch(e) {
    
        //ignore deleted file errors
      if(e.message.toString().indexOf('no such file') <= 0){
        console.log(color.red + '[plater] ERROR, template compiler error:' + color.reset);
        console.log(e.message);
      }
  
    }

    //complete output array to single string
    
    output = output.join('');

    if(plates.minify){
      
      var ast = uglify.parser.parse(output);
      ast = uglify.uglify.ast_mangle(ast);
      ast = uglify.uglify.ast_squeeze(ast);
      output = uglify.uglify.gen_code(ast);
    
    }

    //write the output file
    try {
      
      fs.writeFileSync(plates.out, output, 'utf8');
      console.log(color.green + '[plater] compiled template directory ' + plates.in + ' to ' + plates.out + color.reset);
      
    } catch(e){
    
        console.log(color.red + '[plater] ERROR! destination file or directory does not exist.' + color.reset + '\n:' + e);
    
    }

 };

  
 var readAndCompile = function(dir, watch){
   
    plates.templates = []
    
    // unwatch all the files
    unwatchAll();
    
    // watch the directory itself for changes
    if(watch)
      watchers.push( fs.watch(dir, directoryHasChanged) )
    
    //read files in the directory
    readTemplatesDirectory(dir, function(err, files) {
    
     try {
       
       if(err)
         throw new Error('directory does not exists: ' + dir)
      
       for(var f = 0; f < files.length; f++){
          
          // determine whether or not it's a file or directory. 
          info = files[f].split(':')
          
          if( info[0] == 'file' && (info[1].indexOf('.hb') > 0 || info[1].indexOf('.handlebars') > 0 || info[1].indexOf('.jade') > 0 || info[1].indexOf('.eco') > 0) ){
            
            // watch the file
            if(watch) {
              watchers.push(fs.watch(info[1], fileHasChanged))
            }
            
            // get the template namespace by using the extra directory
            template_dir = plates.in.toString();
            file_and_dir = info[1].substr( (info[1].indexOf(template_dir) + template_dir.length) + 1, info[1].length);
            
            namespaced = file_and_dir.substr(0, file_and_dir.lastIndexOf('.'));
            
            // push object for the compiler to work with
            plates.templates.push({
              namespace: namespaced,
              file: info[1]
            })
            
            
          } else if ( info[0] == 'directory') {
            
            // watch the directory for new / removed files
            if(watch){ 
              watchers.push(fs.watch(info[1], directoryHasChanged))
            }
            
          }
        
        }
        
        compileTemplates();
        
      } catch (e){
        
        console.log(color.red + '[plater] ERROR! check to be sure your directories exist. ' + color.reset  + "\n");
        if(plates.help)
          console.log(plates.help)
        
      }
        
    });
   
  }  

// export functions for module use
exports.configure = function(config){ plates = config; }
exports.watch = function(){
  
  console.log(color.yellow + '[plater] watching template directory ' + plates.in  + color.reset);
  plates.watch = true;
  readAndCompile(plates.in, true);
  
}

exports.compile = function(){
  plates.watch = false;
  readAndCompile(plates.in, false);
  
}

 
})()



