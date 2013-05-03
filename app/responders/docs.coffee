
class Docs extends Flint.Responder
  
  static: (file='index.html', data, credentials, callback) ->
    
    response =
      current: file
      template: 'docs/' + file
    
    callback response  
    
  
  