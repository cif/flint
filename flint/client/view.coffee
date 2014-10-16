
# generic view class implements the ever-useful before and after methods
  
class View extends Backbone.View
  
  render: (@template, @data={}) ->
    @before =>
      $(@el).html tmpl[@template](@data)
    @after()
    
   # these get overriden, or not
  before: (callback) ->
    callback()
  
  after: ->