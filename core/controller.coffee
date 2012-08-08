
class Controller extends Backbone.Router
  
  # configuration  
  template_create : 'forms/create'
  template_edit   : 'forms/edit'
  template_list   : 'forms/list'
  template_help   : false
      
  collection      : false
  model           : false  
  
  list            : 'List'
  list_el         : '#app'
  sortable        : false  
  sorted_url      : false
  sort_handle     : false
  
  form            : 'Form'
  form_el         : '#app'
  valid_changes   : true
  
  _messages:
    created        : '{{name}} has been created.'
    saved          : 'Changes to {{name}} have been saved.' 
    delete_warn    : 'You are about to delete {{name}}, proceed?'
    navigate_warn  : 'Did you want to save the changes you just made?'
    sorted         : 'You have changed the sort order.'
        
  #
  # creates instances of the list, form, collection, and model and binds events.
  #  
  initialize: (app) ->
    
    #extend any messages that were overriden
    @messages = {} unless @messages
    _.map @_messages, (val, key) =>
      if _.isUndefined(@messages[key])
        @messages[key] = val
         
    list = if views[@list] then views[@list] else Flint[@list]
    if !list
      throw new Error('List class "'+@list+'" does not exists')
    
    form = if views[@form] then views[@form] else Flint[@form]
    if !form
      throw new Error('Form class "'+@form+'" does not exists')
                  
    @list = new list { el: @list_el }, @sortable
    @list.sort_handle = @sort_handle
    @list.template = @template_list    
    @list.template_help = @template_help if @template_help
    @list.collection = if @collection then new collections[@collection] else new Backbone.Collection
    @list.collection.model = if @model then models[@model] else Backbone.Model    
      
    @form = new form { el: @form_el } 
    @form.model = new @list.collection.model
    @form.collection = @list.collection
    @form.valid_changes = @valid_changes
    
    # register this with the application so unbinding is called appropriately
    app.register(@) 
    @init(app)    
    this
  
  #
  # init is generally overriden by the superclass, good for setting up events that should only be put in place ahem... once
  #
  init: =>
    
  
  #
  #  binds the application components to common events
  #
  bind: =>
    @list.on 'create', @create
    @list.on 'edit', @edit
    @list.on 'sort', @sorted
    
    @list.collection.on 'add', @added
    @list.collection.on 'remove', @deleted 
    @list.collection.on 'change', @changed   
    @list.collection.on 'error', @error  
       
    @form.on 'delete', @deleted
    @form.on 'saved', @saved
    @form.on 'canceled', => @modelChanged = false
    @form.model.on 'error', @error
    
    @.on 'saved deleted destroyed delete_undone sort_undone destroy_error', @update
    
    #  bind to the app navigation/history listener
    app.on 'navigate', @navigated 
  
  
  #
  #  unbind frees up memory consumed by constantly listening for this many events. this is a MUST in a big applications
  #
  
  unbind: =>
    @list.off 'create edit sort'
    @list.collection.off 'add remove change error'
    @form.off 'delete saved canceled'
    @form.model.off 'error'
    @.off 'saved deleted destroyed delete_undone sort_undone destroy_error'
    
    # backwards unbinding to application
    app.off 'navigate'
  
  #
  #  fetch - fetches a collection if fetched previously or the server if not, or force:true is specified in options 
  #
  fetch: (callback, options={}) =>
    if @list.collection.length > 0 and not options.force
      return callback @list.collection
    else
      @list.collection.fetch
        silent: true
        success: =>
          if @list.collection.length is 0
             return callback false
          callback @list.collection
  
  #
  #  get - force fetches a model by id from the server. useful if not all data is provided to @list.collection to render the list.
  #  todo, create test option to get from cache instead.
  #
  get: (id, callback, options={}) =>
    if @list.collection.length is 0
      @fetch =>
        @__get(id, callback, options)
    else
      @__get(id, callback, options)
        
  __get:(id, callback, options) =>
    model = @list.collection.get(id)
    if !model
      callback false
    else if options.cached
      callback model
    else
      model.fetch
        silent: true
        success: => 
          callback model
            
  #
  #  begins the creation of a new model by rending form/create.hb
  #
  create: =>
    @form.model = new @list.collection.model({sort_order: @list.collection.length})
    #@unbind()
    #@bind()
    @form.render @template_create, {}, @form.model
    @trigger 'create', @
  
  #
  #  saves a new record on the server and notifies
  #
  added: (model) =>
    @trigger 'added', model
    app.notifications.notify('Saving...')
    model.save model, success: =>
        _tmpl = tmpl_compile(@messages.created)
        message = _tmpl(model.attributes)
        app.notifications.notify(message)        
        @edit model.id
        @list.render @template_list
             
  #
  # edit a model
  #
  edit: (id) =>
    @modelChanged = false
    model = @list.collection.get(id)
    @form.render @template_edit, {}, model
  
  #
  #  get change events from model.set
  #  super class should listen to implement updates to list, realtime socket.io push etc. 
  #
  changed: (model) =>
    @modelChanged = true
    @trigger 'changed', model
  
  #
  #  a model has been "saved" by UI, if anything changed push model to the server
  #
  saved: (model, retro=false) =>
    if @modelChanged or retro
      @modelChanged = false
      model.save null, success: =>
        # if the save has been fired because the user navigated away just close up shop
        if retro 
          @form.cancel()
        else
          _tmpl = tmpl_compile(@messages.saved)
          message = _tmpl(model.attributes)
          app.notifications.notify(message) 
          @trigger 'saved', model
  
  #
  #  deleted, this works by removing from the collection then confirming the delete via notification confirm 
  #
  deleted: (model, collection, options) =>
    
    #if an item from the list already teed up, just go ahead and destroy
    #todo: why not queue them ?
    if @to_delete
        @destroy()
    
    # deleted model looses reference to the collection URL, assign it manually
    Deletable = Backbone.Model.extend url:@list.collection.url
    @to_delete = new Deletable(model.attributes)
  
    _tmpl = tmpl_compile(@messages.delete_warn)
    message = _tmpl(model.attributes)
    app.notifications.notify(message, @undo_delete, @destroy)
    @trigger 'deleted', model
  
  
  #
  #  update method is called anytime something major like a save, delete, sort, destroy, undo etc happens.
  #
  update: =>
    @list.render @template_list
  
  #
  #  undo delete, add the model back to the collection
  #
  undo_delete: =>
    @list.collection.add new @list.collection.model(@to_delete.attributes), silent: true
    @to_delete = null
    @trigger 'delete_undone', @to_delete
  
  #
  # destroy, tell the server it's gone
  #
  destroy: => 
     @to_delete.destroy success: (data, response) =>
      if response and response.error
        app.notifications.error(response.error)
        @list.collection.add(@to_delete, {silent: true})
        @trigger 'destroyed', @to_delete
      else
        @trigger 'destroy_error', @to_delete
  
  #
  #  handles errors
  #      
  error: (object, error) ->
    if console and console.log
      console.log('Flint: error triggered on controller: ' + error)
    error = error.responseText unless _.isString(error)
    
    # check to see if we are getting 401 and logout if our permissions have gone bad.
    if error.indexOf('401') > 0
      app.update()
    else
      app.notifications.error(error)
      

  #
  #  handles sorting events if the list has been made sortable
  #
  sorted: (serialized) =>  
    app.notifications.notify(
      @messages.sorted, 
      @undo_sort_order, 
      =>
        # send request if confirmed
        app.sync.ajax @sorted_url,
            type:'POST'
            data:{json:JSON.stringify(serialized)}
      
    )
  
  #
  #  undo default sort order
  #
  undo_sort_order: =>
    _.each(@list.collection.models, (model) ->
      model.set('sort_order', model.get('order_before_sort'), {silent:true})
    )
    @list.collection.sort()
    @list.render()  
  
  #
  #  handles navigation events from controllers allowing a prompt for save if necessary
  #
  navigated: =>
    if @modelChanged
      @modelChanged = false  
      _tmpl = tmpl_compile(@messages.navigate_warn)
      message = _tmpl(@model.attributes)
      app.notifications.prompt_save message, => 
              @saved(@form.model, true)
    else
      @form.cancel(true)
    
  #
  #  deletage and undelegate: your best friends in a large scale app. 
  #  easily switch to another controller without worrying about memory leaks.
  #  
  delegate: =>
    @undelegate()
    @modelChanged = false  
    @bind()
    @form.delegateEvents()
    @list.delegateEvents()
    app.controller = @
    
  undelegate: =>
    @modelChanged = false
    @unbind() 
    @form.undelegateEvents()
    @list.undelegateEvents()
      