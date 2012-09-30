// compresses javascript for deployment

uglify = require('uglify-js');

(function(){
  
  //colored output
  var color = {
    red : '\u001b[31m',
    green: '\u001b[32m', 
    reset: '\u001b[0m'   
  }
  
  var sources = {}
  exports.configure = function(config){ sources = config; }
    
  exports.deploy = function(to_file){
    
      console.log(color.green + '[compressor] compressing javascript, this could take a moment...' + color.reset)
      
      try { 
        
        // concat and minify all the javascript output
        deps = fs.readFileSync(sources.depends)
        tmpl = fs.readFileSync(sources.plates)
        app = fs.readFileSync(sources.scripts)
      
        output = deps + '\n' + tmpl + '\n' + app
        
        // compress the file
        var ast = uglify.parser.parse(output);
        ast = uglify.uglify.ast_mangle(ast);
        ast = uglify.uglify.ast_squeeze(ast);
        output = uglify.uglify.gen_code(ast);
    
        // write the file
        fs.writeFileSync(to_file, output, 'utf8')
      
        // done!
        console.log(color.green + '[compressor] compiled and minifed deploy target file: ' + to_file + color.reset)
      
      } catch(e){
        
        console.log(color.red + '[compressor] ERROR: problem compressing javasript: ' + color.reset)
        console.log(e)
        
      }
    
  }
  
})()