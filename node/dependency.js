
// wraps up vendors into a single dependencies.js file
fs = require('fs')

var watcher = null;

var deps = {
  in: './app/vendor/',
  out: './public/javascript/dependencies.js',
  files: []
}

var color = {
  red : '\u001b[31m',
  blue: '\u001b[36m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  reset: '\u001b[0m'
}
  
var changed = function(){

  console.log(color.yellow + '[dependency] new or renamed file deteted, re-concatenating' + color.reset);
  if(watcher)
    watcher.close();  
  concat(true);

}

var concat = function(watch){
  

  readThenWrite();  
  if(watch)
    watcher = fs.watch(deps.in, changed);
  
}

var readThenWrite = function(){
  
  files = []

    // loop over directory and compile files
    
    fs.readdir( deps.in, function( err, list ) {
    
     try {
       if (err) throw err;
     
       for(var l = 0; l < list.length; l++){
        
         if(list[l] != '.DS_Store'){
           js = fs.readFileSync(deps.in + '/' + list[l], 'utf8');
           files.push(js);
         }
      
       }
     
       write(files);
     
     } catch (e) {
       
       console.log(color.red + '[dependency] ERROR: could not read dependencies from  : ' + deps.in + color.reset)
       
     }
    
    });
  
  
}

var write = function(files){
   
  try{
  
     fs.writeFileSync(deps.out, files.join('\n'), 'utf8');
     console.log(color.green + '[depencendcy] concatenated dependencies to ' + deps.out + color.reset);
    
  } catch (e) {
    
    console.log(color.red + '[dependency] ERROR: could not write file to : ' + deps.out + color.reset);
    
  }
  
  
}

exports.on = function(config) { deps = config; }
exports.watch = function(){ concat(true); };
exports.concat = concat;
