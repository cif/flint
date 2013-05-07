#
#  server side implementation of Flint.Model
#  handles core CRUD interactions with the database layer (mysql/mongo/couch etc.) 
#

class Model
  
  # default key is assumed to be called id.
  key: 'id'
  
  # holds model attributes for server side impl.
  attributes: { }
    
  # takes the reponder and an optional store if specified  
  constructor: (@responder, options={}, callback) ->
    
    # set options
    @store = options.store if options.store
    @set options
    
    if !@store
      callback false, 'A store property was not specified for a Flint.Model instance'
    
    # defaults start as attributes
    if @defaults
      @attributes = @defaults
    
    this
    
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
  
  # first() returns the first result from a query
  # options - object which contains information about the query
  # callback (res, err) to handle the result
  first: (options, callback) =>
    @_find options, (res, err) =>
      if err
        callback null, err
      else if res
        callback res[0]
      else
        callback false
        
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
  
  _create:(props, callback) =>
    # extend any additional properties passed to save
    if props
      @attributes = @extend(@attributes, props)
    
    # delete the id attribute to ensure a new instance 
    delete @attributes[@key]
      
    # check to see if we should validate
    if !props or !props.silent
      validate = @validate(props)
      if typeof validate is 'undefined'
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
      else if res
        @set res
        if callback
          callback @attributes
      else
          callback false
          
  _save:( props, callback ) =>
    # extend any additional properties passed to save
    if props
      @attributes = @extend(@attributes, props)
    
    # check to see if we should validate
    if !props or !props.silent
      validate = @validate(props)
      if typeof validate is 'undefined'
        @__save(callback)
      else if callback
        callback(null, validate)
    else
      @__save(callback)
    
  __save: (callback) =>
    if @get(@key)
      # assume if key is present we are updating
      @clean (cleaned) =>
        cleaned.key = @key
        @responder.database.update cleaned, @store, (res, err) =>
          if err and callback
            callback(null, err)
          else if callback
            callback @attributes
    else
      @clean (cleaned) =>
        # automatic created_on storage
        if !cleaned.created_on
          cleaned.created_on = @datetime()
        cleaned.key = @key  
        @responder.database.insert cleaned, @store, (res, err) =>
          if err and callback
            callback(null, err)
          else if callback
            @set 'id', res.id
            callback @attributes
  
  _destroy: (id, callback) =>
    if @get(@key) 
      @attributes.key = @key
      @responder.database.destroy @attributes, @store, (res, err) ->
          if err and callback
            callback(null, err)
          else if callback
            callback @attributes
    else if callback
      callback(null, 'Trying to destroy '+@store+' record without the key attribute')
  
          
  # clean() scrubs any invalid attributes present prior to saving 
  # useful for stuctured storage, unused by nosql/document stores
  clean: (callback) =>
    
    # if the responder engine is mysql based, get fields out of the store 
    if !@fields and @responder.database and @responder.database.isSql
      @responder.database.describe @store, (fields, err) =>
        if err
          throw new Error '[flint] Database storage object ' + @store + ' does not exist!'
        else  
          @fields = fields
          @_clean(callback)
    else
      @_clean(callback)
  
  _clean: (callback) =>
    if @fields
      cleaned = {}
      for prop, val of @attributes
        for column in @fields
            if prop.toString() is column.name
              cleaned[prop] = val
              break
            
      callback cleaned
    else
      callback @attributes
  
  # validate needs to be present, but is generally overriden by the superclass,
  validate: =>
    # return value of undefined a la Backbone.js means it passed.
    return undefined  
     
  # quick and dirty non recusrive extend impl
  extend: (obj, source) ->
    for prop,value of source
      obj[prop] = value
    obj
  
  # returns current server date and time in sql format  
  datetime: =>
    now = new Date()
    sql =  now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate()
    sql += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    sql  
    