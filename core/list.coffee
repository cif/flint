
# list view supports basic things like sorting, edit, delete and view
class List extends Backbone.View
  
  _events:
    
    # common UI events
    'click .edit' : 'edit'
    'click .delete' : 'delete'
    'click .create' : 'create'
    'click .view' : 'read'
    
    # bonus help viwe rendering to make your apps even better!
    'click .help' : 'help'
    'click .close' : 'close_help'
  
  
  #
  #  initialize just extends the events automatically, careful to do this if you extend this class method!
  #
  initialize: (options, @sortable) ->
    @events = _.extend({}, @_events, @events)
    this
  
  
  render: (template, data) =>
    @template = template if template
    @data = data if data    
    @before()
    
    if @template
      $(@el).html tmpl[@template](@data)
    else
      console.log('WARNING Flint.List: @template is undefined.')
    
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
  #  crud, cred in this case ;-)
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
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
       
    model = @collection.get(id)
    @collection.remove(model)
      
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
    _.each(@sortable.find('li'), (item, index) =>
      id = item.getAttribute('id')
      last_order =   @collection.get(id).get('sort_order')
      @collection.get(id).set({sort_order:index, order_before_sort:last_order}, {silent:true})
      @serialized.push({
        id:id,
        sort_order:index
      })    
    )
    @collection.sort()
    @trigger 'sort', @serialized
  
  #
  # renders/closes help text if @help_template is provided
  #   
  help: (help=true) =>
    if @template_help
      $(@el).html tmpl[@template_help]({help:help}) 
  
  close_help: =>
    @render(false)
    