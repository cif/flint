
class Docs extends Flint.Responder
  
  static: (file='index.html', data, credentials, callback) ->
    
    response =
      testing: 'shit'
      template: 'docs/' + file
    
    callback response  