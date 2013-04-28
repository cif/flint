#
#  resonds to requests from the client
#
class Responder
  
  # takes the flint.js configuration object as argument
  constructor: (@config) ->
    
    # check for database engine and require it as necessary
    if @config.db
      
      # connect to mysql
      if @config.db.engine is 'mysql'
        @mysql = require 'mysql' 
        @connection = @mysql.createConnection @config.db
        @connection.connect()
        if !@connection    
          throw new Error 'Unable to establish mysql database connection!'
          
        @connection.query('USE ' + @config.db.database)
        @database = new Flint.Mysql @connection
        @database.isSql = true
        
      # todo - mongo or other nosql for document based apps  
      
      
    this
  
  
  # called before and after the primary request method.
  before: ->
  after: ->
  
  # generic implementations of get, post, put and delete
  get: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, { store: @default_store }, (model) =>
      # try to return specific if an id is present, if not then all
      if data.id
        model.read data.id, (result) ->
          # remove the generic store property
          delete result.store
          callback result
      else
        model.find false, callback
      
  post: (data, credentials, callback) =>
    console.log('calling as post?')
    Instance = @__get_model_instance()
    model = new Instance @, { store: @default_store }, (model) ->
      model.create data, (res, err) ->
        if err
          callback(null, err)
        else
          # emit a default created:store event out to socket
          res.emit = 
            event: 'created:' + @default_store
            data: data
          callback(res)
    
  put: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, { store: @default_store }, (model) ->
      model.save data, (res, err) ->
        if err
          callback(null, err)
        else
          # emit a default created:store event out to socket
          res.emit = 
            event: 'modified:' + @default_store
            data: data
          callback(res)
    
  delete: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, { store: @default_store }, (model) ->
      model.destory data.id, callback
    
  finish: =>
    @database.close_connection()
  
  # returns an instance of a model class if the superclass defines one via string.
  __get_model_instance: ->
    Instance = if @model then models[@model] else Flint.Model
    if !Instance
      throw new Error 'Flint.Model class ' + @model + ' does not exist!'
    return Instance
  
  