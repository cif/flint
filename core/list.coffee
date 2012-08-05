
# list view supports basic things like sorting, edit, delete and view
class List extends Backbone.View
  
  _events:
    
    # common UI events
    'click .edit' : 'edit'
    'click .delete' : 'delete'
    'click .create,.new' : 'create'
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
    @pre_render()
    
    if @template
      $(@el).html tmpl[@template](@data)
    else
      console.log('flint List class error: @template is undefined.')
    
    if @sortable
      @sortable = $('.sortable').sortable({update:@sorted});
    
    @post_render()
    this  

    
  #
  #  pre, post render
  #  
  pre_render: ->
    
  post_render: ->
  
  #
  #  crud, cred in this case ;-)
  #    
  create: ->
    @trigger 'create'
  
  read: (e) ->
    id = $(e.target).parent().parent().attr('id')
    @trigger('read', id)
      
  edit: (e) ->
    id = $(e.target).parent().parent().attr('id')
    @trigger('edit', id)
    
  delete: (e) ->
    id = $(e.target).parent().parent().attr('id')   
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
    if @help_template
      $(@el).html tmpl[@help_template]({help:help}) 
  
  close_help: =>
    @render(false)
    