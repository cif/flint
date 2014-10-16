
# Flint.Controller - extends Backbone.Router
#
#   * Binds / unbinds common events
#
#   * Pushes changes to Flint.Sync / Backbone.Models
#
#   * Calls @app.notifications methods with templated messages

class Controller extends Backbone.Router
  
  # Specify a template path for each CRUD action. 
  template_create : false
  template_edit   : false
  template_view   : false
  template_list   : false
  
  # Specify the collection and model classes if the exist.
  # Note that these are strings and not references to the classes themselves.    
  collection      : false
  model           : false  
  
  # Specify the list class and list element, by default Flint.List will be used
  list            : 'List'
  #list_el         : '#app'
  
  # If the list is sortable, a simple boolean flag and sorted_url attribute will take care of everything for you
  sortable        : false  
  sorted_url      : false
  sort_handle     : false
  
  # Speficy the form class and element, by default Flint.Form will be used
  form            : 'Form'
  #form_el         : '#app'
  
  # Determines whether or not validation will be called as the model is changed by the UI.
  # This uses silent: true when setting changed attributes on the model. See Flint.Form docs for more.
  valid_changes   : true
  
  # Default messages. If you want to display more verbose messages you can override these.  
  # Note that handlebars syntax can be used to display model attributes
  _messages:
    created        : '{{name}} has been created.'
    saved          : 'Changes to {{name}} have been saved.' 
    delete_warn    : 'You are about to delete {{name}}, proceed?'
    navigate_warn  : 'Did you want to save the changes you just made?'
    sorted         : 'You have changed the sort order.'
  
  # Backbone calls this method, sort of a psudo constructor if you will.      
  initialize: (app) =>
    
    # Extend any messages that were overriden by the subclass
    @messages = {} unless @messages
    _.map @_messages, (val, key) =>
      if _.isUndefined(@messages[key])
        @messages[key] = val
    
    # Instantiate @list as the specified class or Flint.List      
    list = if views[@list] then views[@list] else Flint[@list]
    if !list
      throw new Error('List class "'+@list+'" does not exists') 
    
    # Configure @list              
    @list = new list { }, @sortable
    @list.el = @list_el if @list_el
    @list.sort_handle = @sort_handle
    @list.template = @template_list    
    @list.template_help = @template_help if @template_help
    
    # Assign a collection to the list. In Flint, @list works with the collection, not so much the controller
    @list.collection = if @collection then new collections[@collection] else new Backbone.Collection
    @list.collection.model = if @model then models[@model] else Backbone.Model    
       
    # Instantiate @form as the specified class or Flint.Form
    form = if views[@form] then views[@form] else Flint[@form]
    if !form
      throw new Error('Form class "'+@form+'" does not exists')
    
    # Configure @form
    @form = new form { el: @form_el } 
    @form.model = new @list.collection.model
    @form.collection = @list.collection
    @form.valid_changes = @valid_changes
    
    # Undelegate backbone events since they get delegated automatically, in our case we do not want this.
    @list.undelegateEvents()
    @form.undelegateEvents()
    
    # Register this instance with the application so that binding and unbinding is called automatically
    app.register(@) 
    
    # Keep an internal reference to the app in case you want to intantiate it as something other than var app
    @app = app
    
    # Call @init
    @init.apply(@, arguments)
    
    # Return the instance  
    this
  
  
  # This is a method that is called after initialize, in case you need it
  init: =>
      
  #  Binds the application components to common events which include:
  #  creation, editing, sorting, saving, deleting, leaving the view (canceled)
  bind: =>  
  _bind: =>
    @bind()
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
    
    #  Note that all the default events will call @update. 
    #  Overriding @update is the easiest way to subscribe to all these events 
    #  at once without having to worry about cleanup.
    @.on 'saved deleted sorted destroyed delete_undone sort_undone destroy_error', @update
    
  
  #  Unbind frees up the memory consumed by listening for events. 
  unbind: =>
  _unbind: =>
    @unbind()
    @list.off 'create edit sort'
    @list.collection.off 'add remove change error'
    @form.off 'delete saved canceled'
    @form.model.off 'error'
    @.off 'saved deleted sorted destroyed delete_undone sort_undone destroy_error'
  
    
  # fetch()
  # is a helper method that will fetch the collection from the server if it is not already loaded
  # without having to rewrite this routine each time you want to make sure the collection is there
  fetch: (callback, refresh=false) =>
    if @list.collection.length > 0 and !refresh
      return callback @list.collection
    else
      @list.collection.fetch
        silent: true
        success: =>
          if @list.collection.length is 0
             return callback false
          callback @list.collection
        error: (obj, error) =>
          @error(obj, error)
  
  # refresh() simply calls fetch with the argument set to true, 
  # it will grab the collection from the data store even if it is already loaded
  refresh: (callback) =>
    @fetch callback, true
    
  #  get(id)
  #  is a helper method that returns a specific model from the collection by id. 
  #  it will call fetch if the collection is not populated.
  get: (id, callback, refresh=false) =>
    if @list.collection.length is 0
      @fetch =>
        callback @grab(id),
        refresh
    else
      callback @grab(id)
        
  __get: (id, callback, options) =>
    model = @list.collection.get(id)
    if !model
      if callback
        callback false
    else
      model.id = id
      model.fetch
        silent: true
        success: (result) =>
          if callback
            callback model
        error: (obj, error) =>
          @error(obj, error)
                      
  #  grab(id)
  #  a shortcut to simply call get on the collection assosicated with this controller.
  grab: (id) =>
    item = @list.collection.get(id)
    item
  
  # fresh(id) ensures we are fetching a fresh copy of the model from the server. 
  fresh: (id, callback) =>
    model = @grab id
    if !model
      callback false
      return
    model.fetch
      silent: true
      success: (result) =>
        if callback
          callback model
      error: (obj, error) =>
          @error(obj, error) 
  
  # create() is the c in your crud. it will render a new model instance into your form 
  # using defaults to populate any values specified.
  create: =>
    @form.model = new @list.collection.model sort_order: @list.collection.length
    @form.render @template_create, {}, @form.model
    @trigger 'create', @
  
  # added will get fired when @form save() pushes the model into the collection
  # the default Backbone.Model.Save() method pushes the model to the @app.sync for processing. 
  added: (model) =>
    @trigger 'added', model
    @app.notifications.notify('Saving...') unless not @app.notifications
    model.save model, success: =>
        _tmpl = tmpl_compile(@messages.created)
        message = _tmpl(model.attributes)
        @app.notifications.notify(message) unless not @app.notifications or not @messages.created       
        @edit model.id
        @trigger 'returned', model
        # handle errors resulting from save and remove the model from the collection 
      ,error: (obj, error) =>
          @error(obj, error)
             
  # edit() renders an existing model into @form
  edit: (id) =>
    model = @list.collection.get(id)
    @form.render @template_edit, {}, model
  
  # changed() is received from @form.chanaged method and then broadcast to listeners 
  # it is first pushed directly to @app.sync (Flint.Sync) for processing
  changed: (model) =>
    @app.sync.changed(model) unless not @app.sync
    @trigger 'changed', model
  
  #  saved() is called from @form.done()'s event broadcast and pushes the entire model to the server
  #  as a result Flint.Sync becomes aware of this change. 
  saved: (model) =>
    @trigger 'saved', model
    @app.notifications.notify('Saving...') unless not @app.notifications
    model.save null, success: =>
      _tmpl = tmpl_compile(@messages.saved)
      message = _tmpl(model.attributes)
      @app.notifications.notify(message) unless not @app.notifications or not @messages.saved      
      @trigger 'returned', model
      
  # deleted() is recieved from @list or @form and behaves differently than you might expect. 
  # Instead of blowing the model away, it retains a copy and will prompt undo
  deleted: (model, collection, options) =>
    
    @trigger 'deleted', model
    
    # if an item from the list already teed up, just go ahead and destroy it
    if @to_delete
        @destroy()
    
    # we lost reference to the collection as it was removed by @list or @form so the url needs to be re-assigned
    Deletable = Backbone.Model.extend url: @list.collection.url
    @to_delete = new Deletable model.attributes
    
    # if notifications are present, we know the undo action will recive the confirmation and @destroy as callback
    if @app.notifications 
      _tmpl = tmpl_compile(@messages.delete_warn)
      message = _tmpl(model.attributes)
      @app.notifications.notify(message, @undo_delete, @destroy)
    else
      @destroy()
    
  
  # If a user elects to take the notification's undo action callback 
  # then the model is added back to the collection quietly
  undo_delete: =>
    @list.collection.add new @list.collection.model(@to_delete.attributes), silent: true
    @to_delete = null
    @trigger 'delete_undone', @to_delete
  
  # destroy() tells the server to kill the model. 
  destroy: => 
     @to_delete.destroy success: (data, response) =>
      # in the event we get an error from destruction attempt (not authorzied etc.) 
      # let the user know and quietly put it back.
      if response and response.error
        @app.notifications.error(response.error) unless not @app.notifications
        @list.collection.add @to_delete, silent: true
        @trigger 'destroyed', @to_delete
        @update()
      else
        @trigger 'destroy_error', @to_delete
  
  # Update is a handy method to overide which gets all the events broadcast by this class by default 
  # unless overridden, it will simply re-render the @list view
  update: =>
    @list.render()
    
  # Handle any errors recived from validation or other     
  error: (object, error) =>    
    if console and console.log
      console.log('NOTICE: error triggered on Flint.Controller: ' + error)
    error = error.responseText unless _.isString(error)
    @app.notifications.error(error) unless not @app.notifications
      

  # sorted() handles sorting from @list. if the user confirms instead of undoing their action 
  # serialize the data and send to @app.sync
  sorted: (serialized) =>
    @trigger 'sorted'  
    @app.notifications.notify @messages.sorted, 
      @undo_sort_order, 
      =>
        # send request if confirmed
        @app.sync.ajax @sorted_url,
            type:'POST'
            data: 
              json:JSON.stringify(serialized)
    
  # Revert all the sort order attributes to their orignal state and broadcast sort_undone event
  undo_sort_order: =>
    _.each @list.collection.models, (model) ->
      model.set 'sort_order', model.get('order_before_sort'), silent:true
    @list.collection.sort()
    @trigger 'sort_undone'
  
  # delegate() and undelegate() bind / unbind the events specified by @form and @list 
  # as well as the internal events listened to by this class. 
  delegate: =>
    @undelegate()
    @_bind()
    @form.delegateEvents()
    @list.delegateEvents()
    
    # This reference makes the application instance aware of the fact this controller is currently locked and loaded.
    @app.controller = @
    
  undelegate: =>
    @_unbind()
    @form.undelegateEvents()
    @list.undelegateEvents()
      