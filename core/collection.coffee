
# Collection extends Backbone to keep the client happy, but also becomes an server resource thanks to node.
#  this is where you specify your own server methods, convenitently named after the backbone model request types.

class Collection extends Backbone.Collection
  
  # the default comparison by default a sort_order field.
  # specify one.  int(1) is cheap. 
  comparator: (model) ->
    return +model.get('sort_order')
  
      
  put: (data) ->
    
  
  post: (data) ->
    


    
    
  