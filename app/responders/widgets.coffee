
class Widgets extends Flint.Responder
  
  get: (data, credentials, callback) =>
    
    new models.Widget @, (widget) ->
      
      console.log widget.attributes
      
      widget.create 'color':'purple', ->
        
        widget.destroy()
        
        #widget.set 
        #  in_stock:'1'
        #  color:'orange'
        
        # widget.save()
        delete widget.attributes
        
        query = 
          order: 'size ASC'
        
        widget.find query, (res, err) ->
          if err
            callback false, err
          else  
            callback res
              
    
  some_other_method: (data, credentials, callback) =>
    
    response =
      test : 'fuck yeah RIGHT!'
      word : 'bird.........'
    
    callback response
        