
# Flint.List - generic list view implementation
#
#   * handles common CRUD related events and triggers them (create,read,update,delete)
#

class List extends Backbone.View
    
  _events:
    # common ui events
    'click .edit' : 'edit'
    'click .delete' : 'delete'
    'click .create' : 'create'
    'click .view' : 'read'
    
  
  #
  #  initialize just extends the events automatically, careful to do this if you extend this class method!
  #
  initialize: (options, @sortable) ->
    @events = _.extend({}, @_events, @events)
    this
  
  render: (template, data) ->
    @template = template if template
    @data = data if data    
    @before()
     
    # default data is simply the collection models as template variable 'items'. 
    # if the collection needs to be marshaled more than once (particuarly sorted) 
    # you should do so in a custom before() method 
    if !@data
      @data = 
        items: @collection.models
    
    if @template
      $(@el).html tmpl[@template](@data)
    else if console and console.log
      console.log('WARNING Flint.List: @template is undefined, unable to render view.')
    
    # make sortable
    if @sortable
      config = 
        update: @sorted
      if @sort_handle
        config.handle = @sort_handle
          
      @sortable = $('.sortable').sortable config
      
    @trigger 'rendered', @
    @after()
    this  
  
  #
  #  pre, post render
  #  
  before: ->  
  after: ->
  
  #
  #  crud, or "cred" in this case
  #    
  create: ->
    @trigger 'create'
  
  read: (e) ->
    # bubble up the target parents until we find an id
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
      
    @trigger 'read', id
      
  edit: (e) ->
    # bubble up the target parents until we find an id
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
      
    @trigger 'edit', id
    
  delete: (e) ->
    # bubble up the target parents until we find an id
    e.stopPropagation()
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
     
    model = @collection.get(id)
    @collection.remove(model)
    false
      
  #
  #  can be overriden to update items instead of re-rendering the entire list
  #  
  update: (model, field, selector='span') ->
    $('#'+model.get('id') + ' ' + selector).html(model.get(field))
  
  #
  # sortable handler
  #   
  sorted: =>
    @serialized = []
    order = 0
    _.each @sortable.find('li'), (item, index) =>
      id = item.getAttribute('id')
      model = @collection.get(id)
      if model
        last_order = model.get('sort_order')
        @collection.get(id).set 'sort_order', index, silent: true 
        @collection.get(id).set 'order_before_sort', last_order, silent: true
        @serialized.push
          id: id
          sort_order: index
    
    # sort the collection and update default data. custom before() methods should override @data setting.
    @collection.sort()
    @data = 
        items: @collection.models
    @trigger 'sort', @serialized
  
    