#
#  client side implementation of Flint.Model.
#  nothing is overriden on the client (Backbone is great) but... 
#  your application models should extending Flint.Model if you wish to use the server
#

class Model extends Backbone.Model
  
  
    
  # generic validation. 
  validate: (attrs) =>
    return @validate_fields(attrs) if @fields
  
  # field based validation
  validate_fields: (attrs) =>
    return undefined
    
  
  