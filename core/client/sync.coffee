# this class reads model attributes and decides whether or not they should be stored locally
class Sync
  
  # listen for socket.io events
  listeners: {}
  
  # overrides backbone.sync
  constructor: (enable_socket_io=true) ->
    Backbone.sync = @backbone
    if enable_socket_io
      @io = io.connect('http://' + location.host)
      @io.on 'data', @broadcast
    this
  
  # this method allows application classes to listen for socket.io events
  on: (evnt, listener) =>
    if !@listeners[evnt]
      @listeners[evnt] = []
    @listeners[evnt].push listener  
    
  
  broadcast: (data) =>
    if data.event and @listeners[data.event] and @listeners[data.event].length > 0
      for to_call in @listeners[data.event]
        to_call(data)
    else if !data.event
      console.log '[flint] server emitted socket data with no event attached:' if console and console.log
        
  # this method overrides backbone.sync
  backbone: (method, model, options) =>  
      
    model.url = if _.isFunction(model.url) then model.url() else model.url
    options = {} unless options
    model.collection = {} unless model.collection
    
    #check to be sure somewhere to store the models has been specified
    if !options.url and !model.url and !model.localstore and !options.localstore and !model.collection.localstore
      throw new Error('A url or localstore property must be defined to use Storage.sync!')
        
    # TODO
    # check to see if we should use localstore. objects should be stored, but not read from local if the app is online
    #if options.localstore or model.localstore or model.collection.localstore
     # app.log('got localstore!')
    #  if method is not 'read' and app.isOnline
     #   @local(method, model, options)
    
    # sync the object up to the server if the application is online
    if model.url or options.url and app.isOnline 
      @server(method, model, options)
    else
      @local(method, model options)
  
  
  # pushes objects to local store
  local: (method, model, options) ->
    #app.log('local called' + model.localstore)
    switch method
      when 'read' then app.log('read shit!')
      when 'create' then app.log('create shit!')
      when 'delete' then app.log('update shit!')
      when 'delete' then app.log('delete shit!')
  
  
  # backbone .sync default server coms         
  server: (method, model, options) ->
    
    methodMap =
      'create': 'POST'
      'update': 'PUT'
      'delete': 'DELETE'
      'read':   'GET'
        
    type = methodMap[method]  
    options = {} unless options
    
    params =
      type: type
      dataType:'json'
              
    params.url = if options.url then options.url else model.url
    
    if !options.data and model and (method is 'create' or method is 'update' or method is 'delete')
      params.contentType = 'application/json'    
      params.data = JSON.stringify model.toJSON()
    
    if Backbone.emulateHTTP
      if type is 'PUT' or type is 'DELETE'
        if Backbone.emulateJSON
          params.data_method = type
        params.type = 'POST'
        params.beforeSend (xhr) ->
          xhr.sendRequestHeader('X-HTTP-Method-Override', type)
        
    if params.type != 'GET' and !Backbone.emulateJSON
      params.processData = false
      
    @last_request = $.ajax(_.extend(params, options))
    this
  
  
  # recieves change events from socket server
  changed: (model) =>
    
  
  ajax: (url, params) =>
    
    # todo - this should serve as both cache and update in the future for local use.
    # hijack the success method object for storage -
    
    params.url = url
    $.ajax(_.extend(params))
    this
    
  
  # TODO - implement methods used to interface with the local store
  
    
  