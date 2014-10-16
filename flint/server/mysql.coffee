
class Mysql
  
  # just takes the connection
  constructor: (connection) ->
    @connection = connection
  
  # find records
  find: (options, store, callback) =>
    
    # begin the query
    fields = if options.fields then options.fields else '*'
    query = 'SELECT ' + fields + ' FROM ' + store 
    
    if options.join
      direction = options.join.direction or 'LEFT'
      query += ' ' + direction + ' JOIN (' + options.join.table + ') '
      query += 'ON ' + options.join.on
    
    # parse through the where option formats
    if options.where
      if typeof options.where is 'string'
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
    
    @connection.query query, (err, rows, fields) =>
      if err and callback
        callback err
      else
        results = []
        if rows.length is 0
          callback null, false  
        else
          for row in rows
            for prop,value of row
              row[prop] = value
            results.push row
          if callback
            callback null, results
    
  # get a single record by id  
  get: (id, key, store, callback) =>
    
    @connection.query 'SELECT * FROM ' + store + ' WHERE ' + key + ' = ' + @connection.escape(id), (err, rows, fields) =>
      if err
        callback err
      
      if rows and rows.length > 0
        res = rows[0]
        for prop,value of res
          res[prop] = value
        callback null, res
      else
        callback null, false  
    
  # insert new records
  insert: (object, key, store, callback) =>
    
    # generate an id
    object[key] = @uuid()
    
    # store the object
    @connection.query 'INSERT INTO ' + store + ' SET ?', object, (err, res) ->
      if err
        callback err
      else if callback
        res.id = object.id
        callback null, res
  
  # update existing records
  update: (object, key, store, callback) =>
    
    # avoid setting the key value
    id = object[key]
    delete object[key]
    
    # udpate
    @connection.query 'UPDATE ' + store + ' SET ? WHERE ' + key + ' = ' + @connection.escape(id), object, callback
       
  
  # delete a record
  destroy: (id, key, store, callback) =>
    @connection.query 'DELETE FROM ' + store + ' WHERE ' + key + ' = ' + @connection.escape(id), callback
  

  # increment / decrement
  bump: (store, field, value, key, id, callback) =>
    @connection.query 'UPDATE ' + store + ' SET '+field+'='+field+'+'+value+' WHERE ' + key + ' = ' + @connection.escape(id), callback

  # raw query. 'nuff said.  # make sure you esacape your query values before using this function!!
  query: (query, callback) =>
    results = []
    @connection.query query, (err, rows, fields) ->
      if err
        callback err
      else
        if rows.length is 0
          callback false  
        else
          for row in rows
            for prop,value of row
              row[prop] = @objectify(value)
            results.push row
          if callback
            callback null, results
    
  
  # NOT IN USE JUST YET ...
  # stringify() - turns anything that isn't a string into JSON
  # this can happen if you have a valid key (field name) who's value is an object or array (common ORM pitfall)
  stringify: (object) =>
    for prop,value of object
      if typeof value != 'string'
        object[prop] = JSON.stringify(value)
    object
  
  # objectify() - the inverse of stringify. 
  objectify: (string_or_object) =>
    if typeof string_or_object != 'string'
      return string_or_object
    if (/^[\],:{}\s]*$/.test(string_or_object.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
        string_or_object = JSON.parse(string_or_object)
    string_or_object  
    
  # gets the fields out of a table store to prevent undefined column errors when "oversaving" objects  
  describe: (store, callback) =>
    @connection.query 'DESC ' + store, (err, rows, fields) ->
      if err
        callback err
      else
        valid = []
        for row in rows
          valid.push
            name: row.Field
            type: row.Type
        if callback
          callback null, valid
  
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