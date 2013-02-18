#
#  server side implementation of Flint.Model
#  handles core CRUD interactions with the database layer (mysql/mongo/couch etc.) 
#

class Model
  
  # default key is assumed to be called id.
  key: 'id'
  
  # holds model attributes
  attributes: { }
    
  # takes the reponder and an optional store if specified  
  constructor: (@responder, callback) ->
    
    # defaults start as attributes
    if @defaults
      @attributes = @defaults
    
    # if the responder engine is mysql based, get fields out of the store 
    if @responder.database and @responder.database.isSql
      @responder.database.describe @store, (fields) =>
        @storable_fields = fields
        callback @
    else
      callback @
    
  
  # simple set and get methods
  get: (prop) =>
    @attributes[prop]
  
  set: (prop, value) =>
    if prop instanceof Object
      for k, i of prop
        @attributes[k] = i
    else  
      @attributes[prop] = value
    @attributes
  
  
  # create()
  # props - additional properties to save along with currently stored attributes
  # callback (res, err) handles results
  create: (props, callback) =>
    @_create(props, callback)
    
  # find()
  # options - object which contains information about the query
  # callback (res, err) to handle the result
  find: (options, callback) =>
    @_find(options, callback)
      
  # read()
  # id - the id to get
  # callback (res, err) handles results
  read: (id, callback) =>
    @_read(id, callback)
          
  # save()
  # props - additional properties to save along with currently stored attributes
  # callback (res, err) handles results  
  save: (props, callback) =>
    @_save(props, callback)
    
  # destroy()
  # id (optional) 
  # callback recives events  
  destroy: (id, callback) =>  
    @_destroy(id, callback)
  
  #  
  # _methods serve as the actual implementations
  # this way primary functions are easily overridable and only copy a line  
  
  _create:(props, callback ) =>
    # extend any additional properties passed to save
    if props
      @attributes = @extend(@attributes, props)
    
    # delete the id attributes 
    delete @attributes.id
      
    # check to see if we should validate
    if props and props.silent
      validated = if @validate then @validate() else undefined
      if !validated
        @__save(callback)
      else if callback
        callback(null, validated)
    else
      @__save(callback)
  
  
  _find: (options, callback) =>
    @responder.database.find options, @store, callback
  
  _read: (id, callback) =>
    @responder.database.get id, @store, (res, err) =>
      if err and callback
        callback(null, err)
      else
        @set res
        if callback
          callback @attributes
          
  _save:( props, callback ) =>
    # extend any additional properties passed to save
    if props
      @attributes = @extend(@attributes, props)
      
    # check to see if we should validate
    if props and props.silent
      validated = if @validate then @validate() else undefined
      if !validated
        @__save(callback)
      else if callback
        callback(null, validated)
    else
      @__save(callback)
    
  __save: (callback) =>
    if @get 'id'
      @responder.database.update @clean(), @store, (res, err) =>
        if err and callback
          callback(null, err)
        else if callback
          callback @
    else
      @responder.database.insert @clean(), @store, (res, err) =>
        if err and callback
          callback(null, err)
        else if callback
          @set 'id', res.id
          callback @
  
  _destroy: (id, callback) =>
    if !id
      id = @get('id')
    if id  
      @responder.database.destroy id, @store, (res, err) ->
          if err and callback
            callback(null, err)
          else if callback
            callback @
    else if callback
      callback(null, 'Trying to destroy '+@store+' record without ID')
  
          
  # clean() scrubs any invalid attributes present prior to saving 
  # useful for stuctured storage, unused by nosql/document stores
  clean: =>
    if !@storable_fields
      return @attributes
      
    cleaned = {}
    for prop, val of @attributes
      if @storable_fields.indexOf(prop.toString()) >= 0
        cleaned[prop] = val  
    cleaned
     
  # quick extend impl
  extend: (obj, source) ->
    for prop,value of source
      obj[prop] = value
    obj
    