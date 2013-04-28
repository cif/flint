
class Mysql
  
  # just takes the connection
  constructor: (connection) ->
    @connection = connection
  
  # find records
  find: (options, store, callback) =>
    
    # begin the query
    fields = if options.fields then options.fields else '*'
    query = 'SELECT ' + fields + ' FROM ' + store 
    
    # parse through the where option formats
    if options.where
      if options.where instanceof String
        query += ' WHERE ' + options.where
      else
        conditions = []
        for field, value of options.where
           if value instanceof Object
             for operand, val of value
              conditions.push field + ' ' + operand + ' ' + @connection.escape(val)
           else
            conditions.push field + '=' + @connection.escape(value)
    
      query += ' WHERE ' + conditions.join(' AND ')
    
    if options.order
      query += ' ORDER BY ' + options.order
    if options.limit
      query += ' LIMIT ' + options.limit  
    
    @connection.query query, (err, rows, fields) ->
      if err and callback
        callback(null, err)
      else
        results = []
        for row in rows
          results.push row
        if callback
          callback(results)
    
  # get a single record by id  
  get: (id, store, callback) =>
    @connection.query 'SELECT * FROM ' + store + ' WHERE id = ' + @connection.escape(id), (err, rows, fields) ->
      if err and callback
        callback(null, err)
      else if callback
          callback(rows[0])
    
  # insert new records
  insert: (object, store, callback) =>
    
    # generate an id
    object.id = @uuid()
    # store the object
    @connection.query 'INSERT INTO ' + store + ' SET ?', object, (err, res) ->
      if err
        throw err
      if callback
        res.id = object.id
        callback(res, err)
  
  # update existing records
  update: (object, store, callback) =>
    
    # avoid setting the id
    id = object.id
    delete object.id
    
    # udpate
    @connection.query 'UPDATE ' + store + ' SET ? WHERE id = ' + @connection.escape(id), object, (err, res) ->
      if callback
        callback(res, err)
  
  # delete a record
  destroy: (id, store, callback) =>
    @connection.query 'DELETE FROM ' + store + ' WHERE id = ' + @connection.escape(id), (err, res) ->
      if callback
        callback(res, err)
  
  # raw query. 'nuff said. 
  query: (query, callback) =>
    results = []
    @connection.query @connection.escape(query), (err, rows, fields) ->
      if err
        callback(null, err)
      else
        for row in rows
          results.push row.Field
        callback(results)
  
  # gets the fields out of a table store to prevent undefined column errors when "oversaving" objects  
  describe: (store, callback) =>
    valid = []
    @connection.query 'DESC ' + store, (err, rows, fields) ->
      if err
        callback(null, err)
      else
        for row in rows
          valid.push row.Field
        if callback
          callback(valid)
  
  # generates unique ids
  s4: =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
        .toUpperCase()
        
  uuid: =>
    @s4() + @s4() + '-' + @s4() + '-' + @s4() + '-' + @s4() + '-' + @s4() + @s4() + @s4()
  
  
  close_connection: =>
    @connection.end()