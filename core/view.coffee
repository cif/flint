# generic view class, extendable element runtime
  
class View extends Backbone.View
  
  render: (@template, @data={}) ->
    @pre_render =>
      $(@el).html tmpl[@template](@data)
  
   # these get overriden, or not
  pre_render: (callback) ->
    callback()
  
  post_render: ->