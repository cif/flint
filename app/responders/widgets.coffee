
class Widgets extends Flint.Responder
  
  
  sort: (data, credentials, callback) =>
    
    console.log data
    callback res
  
  
  method: (param, data, credentials, callback) =>
    
    model = new models.Object @, { type:'1' }, (res, err) =>
      
      model.save(data)
      
      res = 
        object: model.attributes
        template: 'index.html'
      
      callback res
          