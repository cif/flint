
// server maps requests to the resources created by sourcer

var express = require('express')
var app = express()

app.all('*', function(req, res){
  
  var method = req.method.toString().toLowerCase()
  var uri = req.path
  console.log(method)
  console.log(uri)
  res.send('testing.');
  
})


app.listen('3000')
console.log('Server started on port 3000')
