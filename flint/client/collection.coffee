
# Collection contains a simple sort_order comparison by default. Everything else is Backbone.Collection defaults.

class Collection extends Backbone.Collection
  
  # the default comparison by default a sort_order field.
  # specify one.  int(8) is cheap. 
  comparator: (model) ->
    return +model.get('sort_order')
  
    


    
    
  