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
        if @connection and !@config.quiet and @config.debug
          console.log 'Established database connection.'
        else if !@connection    
          throw new Error 'Unable to establish mysql database connection!'
          
        @connection.query('USE ' + @config.db.database)
        @database = new Flint.Mysql @connection
        @database.isSql = true
        
      # next up - mongo  
    
      
    this
  
  
  # called before and after the primary request method.
  before: =>
  after: =>
    
  finish: =>
    @database.close_connection()