#
#  resonds to requests from the client
#
class Responder
  
  # takes the flint.js configuration object as argument
  constructor: (@config) ->
    
    # check for database engine and require it as necessary
    if @config.db
      if @config.db.engine is 'mysql'
        # connect to mysql
        mysql = @require 'mysql' 
        @connection = mysql.createConnection @config.db
        @connection.connect()
        if !@connection    
          throw new Error 'Unable to establish mysql database connection!'
          
        @connection.query('USE ' + @config.db.database)
        @database = new Flint.Mysql @connection
        @database.isSql = true
        
      # TODO 
      # a bunch of other database opts. 
      # mongo or other nosql for document based apps  
      
    this
  
  
  # called before and after the primary request method.
  before: ->
    true
    
  after: ->
    true
    
  # generic implementations of get, post, put and delete
  get: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
    # try to return specific if an id is present, if not then all
    if data.id
      model.read data.id, (err, res) ->
        if err
          callback err
        
        # remove the generic store property
        delete res.store
        callback null, res
    else
      model.find false, callback
      
  post: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
    
    console.log data
    
    model.create data, (err, res) ->
      if err
        callback err
      else
        # emit a default created:store event out to socket
        res = {}
        res.emit = 
          event: 'created:' + model.store
          data: model.attributes
        callback null, res
    
  put: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
    model.save data, (err, res) ->
      if err
        callback err
      else
        # emit a default created:store event out to socket
        res = {}
        res.emit =
          event: 'modified:' + model.store
          data: model.attributes
        callback null, res
    
  delete: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
    model.destory data.id, callback
  
  # closes the database connection  
  finish: =>
    @database.close_connection()
  
    
  # resolves and requires path to where flint is installed when loading a flint module
  require: (module) =>
    require path.resolve(@config.flint_path + '/../node_modules/' + module) 
  
  
  # returns an instance of a model class if the superclass defines one via string.
  __get_model_instance: ->
    # try to set a default model
    if !@model and @default_store
      @model = @default_store.singularize().camelize()
      console.log 'using default model: ', @model
    Instance = if @model and models[@model] then models[@model] else Flint.Model
    if !Instance
      throw new Error 'Flint.Model class ' + @model + ' does not exist!'
    return Instance
  
  