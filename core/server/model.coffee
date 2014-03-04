#
#  server side implementation of Flint.Model
#  handles core CRUD interactions with the database layer (mysql/mongo/couch etc.) 
#

class Model
  
  # default key is assumed to be called id.
  key: 'id'
  
  # holds model attributes for server side impl, 
  # these get recyled in mem. need to destroy in constructor!
  attributes: { }
    
  # takes the reponder and an optional store if specified  
  constructor: (@responder, @options) ->
    
    # set options
    @store = options.store if options.store
    throw new Error 'A store property was not specified for a Flint.Model instance' if !@store
      
    # defaults start as attributes
    @attributes = {}
    if @defaults
      @attributes = @defaults
    
    # set anything passed 
    @set options
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
  
  
  # data manipulation methods.
  
  # create()
  # props - additional properties to save along with currently stored attributes
  # callback (err, res) handles results
  create: (props, callback) =>
    @_create(props, callback)
    
  # find()
  # options - object which contains information about the query
  # callback (err, res) to handle the result
  find: (options, callback) =>
    @_find(options, callback)
  
  # find_only()
  # same as find, but wont look for related models specified by ORM options
  find_only: (options, callback) =>
    options.only = true
    @_find(options, callback)
  
  # first() returns the first result from a query
  # options - object which contains information about the query
  # callback (err, res) to handle the result
  first: (options, callback) =>
    @_find options, (err, res) =>
      if err
        callback err
      else if res
        @set res[0]
        callback null, res[0]
      else
        callback null, false
        
  # read()
  # id - the id to get
  # callback (err, res) handles results
  read: (id, callback) =>
    @_read(id, false, callback)
  
  # read_only()
  # bypasses any orm rules set for this object
  read_only: (id, callback) =>
    @_read(id, true, callback)
          
  # save()
  # props - additional properties to save along with currently stored attributes
  # callback (err, res) handles results  
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
    
    # assume we are starting over from scratch if props are passed in
    @attributes = @extend(@attributes, props) if props
    
    # delete the id attribute to ensure a new instance 
    delete @attributes[@key]
      
    # check to see if we should validate
    if !props or !props.silent
      validate = @validate props
      if typeof validate is 'undefined'
        @__save callback
      else if callback
        callback new Error 'Unable to save model: ' + validate
    else
      @__save callback
  
  
  _find: (options, callback) =>
    @responder.database.find options, @store, (err, res) =>
      if err
        callback err
      else if !options.only
        @find_related_models(res, callback)      
      else
        callback null, res
        
  _read: (id, only, callback) =>
    @responder.database.get id, @key, @store, (err, res) =>
      if err
        callback err
      else if res
        @set res
        if !only
          @find_related_models res, callback
        else  
          callback null, @attributes
      else
          callback null, false
          
  _save:( props, callback ) =>
    # extend any additional properties passed to save
    if props
      @attributes = @extend(@attributes, props)
    
    # check to see if we should validate
    if !props or !props.silent
      validate = @validate props
      if typeof validate is 'undefined'
        @__save callback
      else if callback
        callback new Error 'Unable to save model: ' + validate
    else
      @__save callback
    
  __save: (callback) =>
    @clean (err, cleaned) =>
      callback err if err
      if @get(@key)
        # assume if key is present we are updating
        if !cleaned.updated_on and @stamp_update
          cleaned.updated_on = @datetime()
        @responder.database.update cleaned, @key, @store, (err, res) =>
          if err
            callback err
          else
            callback null, cleaned
            
      else
        # automatic created_on storage
        if !cleaned.created_on and @stamp_create
          cleaned.created_on = @datetime()
        
        @responder.database.insert cleaned, @key, @store, (err, res) =>
          if err and callback
            callback err
          else if callback
            @set 'id', res.id
            callback null, cleaned

  _destroy: (id, callback) =>
    @responder.database.destroy id, @key, @store, (err, res) =>
        if err
          callback err
        else
          callback null, @attributes
  


  # data integrity methods.
  
  # standard validatation available client and server side - if validate is overriden... ?
  # return value of undefined a la Backbone.js means it passed.
  validate: (attrs) =>
    return @validate_fields(attrs) if @fields
      
  # validate_fields method will use the fields and any valid:'RULES' specified 
  validate_fields: (attrs) ->
    for field, options of @fields
      if options and options.valid
        rule = options.valid
        for key, value of attrs
          if field is key
            if rule is 'not_empty' and value is ''
              return field + ' must not have an empty value.'
            if rule is 'valid_email'
              valid_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              if !value.match(valid_email)
                return field + ' must be a valid email address.'
            
    # completed         
    return undefined
                
  # clean() scrubs any invalid attributes present prior to saving 
  # useful for stuctured storage, unused by nosql/document stores
  clean: (callback) =>
    # if the responder engine is mysql based, get fields out of the store 
    if !@fields and @responder.database and @responder.database.isSql
      @responder.database.describe @store, (err, fields) =>
        if err
          throw new Error 'database storage object ' + @store + ' does not exist!'
        else
          @fields = fields
          @_clean callback
    else
      @_clean callback
  
  _clean: (callback) =>
    if @fields
      cleaned = {}
      for prop, val of @attributes
          for column, options of @fields
            if options and options.name
              column = options.name
            if column and prop.toString() is column
              cleaned[prop] = val
              break
              
      callback null, cleaned
    
    else
      callback null, @attributes
  
  
  # manipulation shortcuts
  increment: (field, callback) =>
    @responder.database.bump @store, field, 1, @key, @attributes[@key], callback

  decrement: (field, callback) =>
    @responder.database.bump @store, field, -1, @key, @attributes[@key], callback
  
  bump: (field, value, callback) =>
    @responder.database.bump @store, field, value, @key, @attributes[@key], callback


  # object relationship modeling methods  
  
  # find_related_models()
  # orm bridge, handles relationships and delegates finding to
  find_related_models: (results, callback) =>
    
    # since we'll be executing lots of queries in dynamic loop structures, 
    # we use async to queue up all the results before sending to callback
    @async = @responder.require 'async'
    
    calls = []
    calls.push (callback) ->
      callback null, results
      
    if results and @has_one
      calls.push (results, callback) =>
       @find_related results, @parse_relations(@has_one), true, callback
      
    if results and @has_many
      calls.push (results, callback) =>  
        @find_related results, @parse_relations(@has_many), false, callback
        
    if @belongs_to
      calls.push (results, callback) =>  
        @find_related results, @parse_relations(@belongs_to, true), true, callback
    
    if @has_mutual
      calls.push (results, callback) =>  
        @find_related results, @parse_relations(@has_mutual, false, true), false, callback
    
    @async.waterfall calls, callback
  
  # constructs an object based on name conventions or actual options specified
  parse_relations: (related, belongs, joined) =>
    
    # parse relationships depending on how they are specified 
    # (string, arr, object are all acceptable)
    relationships = []
    if typeof related is 'string'
      relations = related.split(',')
    else if typeof related is 'object'
      relations = []
      for prop, value of related
        obj = {}
        obj[prop] = value
        relations.push obj
    else
      relations = related
    
    # examine each relationship and get the parts we need.
    for ship in relations
      
      if typeof ship is 'object'
        linking = ship
        ship = Object.keys(ship)[0]
        linking = linking[ship] or {}
      else
        linking = {}
      
      # use inflections to get default values
      singular =  @store.singularize().toLowerCase()
      plural = ship.pluralize().toLowerCase()
        
      if joined 
        foreign = ship.singularize().toLowerCase() + '_' + @key
        local = @key
        linking.link_table = @store + '_' + ship.pluralize().toLowerCase() if ! linking.link_table
        linking.local_link = singular + '_' + @key 
      else
        local = if belongs then ship.singularize().toLowerCase() + '_' + @key else @key
        foreign = if belongs then @key else singular + '_' + @key
      
      # cleanup any un-filled in variables with the defaults
      linking.link = ship if !linking.link
      linking.model = ship.singularize().camelize() if !linking.model
      linking.table = ship.pluralize() if !linking.table
      linking.local_key = local if !linking.local_key
      linking.foreign_key = foreign if !linking.foreign_key
        
      relationships.push linking
    
    # return the array of relationships we need to get
    relationships    
  
  
  # executes a has_ relationship 
  find_related: (results, relations, first, callback) =>
    
    find_related = (related, cb) =>
      
      if models[related.model]
        model  = new models[related.model] @responder, { store: related.table }
      else
        model = new Flint.Model @responder, { store: related.table }
        
      # collect the keys we're looking for since we'll be using a single query to get related objects the hash them out.
      if results.length and results.length > 0
        keys = []
        for res in results
          keys.push res[related.local_key]
      else    
        keys = [results[related.local_key]]
      
      if related.link_table
        # join for mutual relationships
        query =
          where: related.link_table + '.' + related.local_link + ' IN("'+keys.join('","')+'")'
          join:
            table: related.link_table
            on: related.table + '.' + model.key + '=' + related.link_table + '.' + related.foreign_key
      
      else
        # standard query
        query =
          where: related.foreign_key + ' IN("'+keys.join('","')+'")'
          
      if related.fields
        query.fields = related.fields
      if related.order
        query.order = related.order
      if related.limit
        query.limit = related.limit
        
      model.find query, (err, orm) =>
        cb null, 
          results: orm
          related: related
    
    
    # async map calls the function we just defined using each relation in relations as an argument.      
    @async.map relations, find_related, (err, mapped) =>
      
      # map the results by looping and comparing keys 
      # faster than lots of queries
      for map in mapped
        if !map 
          continue
        if map.results
          
          # for joined queryes have to switch
          if map.related.link_table
            map.related.foreign_key = map.related.local_link
          
          if results.length and results.length > 0
            for res in results
              res[map.related.link] = [] if ! first
              for orm in map.results
                if orm[map.related.foreign_key] is res[map.related.local_key]
                  if !first
                    res[map.related.link].push orm
                  else
                    res[map.related.link] = orm
              # set the link to false if nothing turned up      
              if !res[map.related.link] or res[map.related.link].length is 0
                res[map.related.link] = false
          else
            results[map.related.link] = map.results
        
        else
          for res in results
            res[map.related.link] = false
      
      callback null, results
  
  
  
  # utilities  
     
  # quick and dirty non recursive extend impl
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
    