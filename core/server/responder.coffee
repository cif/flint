#
#  resonds to requests from the client
#

class Responder

  mysql = require 'mysql'
  path = require 'path'
  fs = require 'fs'

  # takes the flint.js configuration object as argument
  constructor: (@config) ->

    # check for database engine and require it as necessary
    if @config.db

      # mysql
      if @config.db.engine is 'mysql'
        # connect to mysql
        @connection = mysql.createConnection @config.db
        @connection.connect()
        if !@connection
          throw new Error 'Unable to establish mysql database connection!'
        @connection.query 'USE ' + @config.db.database, (err, row, field) =>
          if !err
            @database = new Flint.Mysql @connection
            @database.isSql = true
          else
            throw new Error 'Database ' + @config.db.database + ' does not exist!'

      # TODO: other stroage options
      # mongo anyone?

    this

  # called before and after the primary request method, to deny access simply return false.
  before: ->
    true

  after: (response, data, credentials) ->
    response

  # generic implementations of get, post, put and delete
  get: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
    # try to return specific if an id is present, if not then all
    if data.id
      model.read data.id, (err, res) ->
        if err
          callback err
        else
          # remove the generic store property
          delete res.store
          callback null, res
    else
      model.find false, callback

  post: (data, credentials, callback) =>
    Instance = @__get_model_instance()
    model = new Instance @, store: @default_store
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
    model.destroy data.id, callback

  # notifies using nodemailer
  notify: (file, message, callback) =>
    message.from = @config.mail_default_from if ! message.from
    message.text = 'This is an HTML email. Please enable HTML in your mail client' if !message.text
    if !message.to and !message.from
      callback new Error 'Both to: and from: address must be specified in message argument.'

    # parse the mail template content

    hbs = @require 'hbs'
    he = @require 'he'
    content = fs.readFileSync(path.resolve(@config.base + 'app/layouts/' + file), 'utf8')
    template = hbs.handlebars.compile(content)
    content = template(message)
    message.html = he.decode(content)

    # send via smtp configuration.
    mailer = @require 'nodemailer'
    transport = mailer.createTransport 'SMTP',
                  service: @config.mail_service
                  auth:
                    user: @config.mail_username
                    pass: @config.mail_password

    transport.sendMail message, (err, res) =>
      if err
        callback err
      else
        callback null, res


  cookie: (credentials, key, value, options={}) =>

  # closes the database connection, deletes the instance property
  finish: =>
    if @database
      @database.close_connection()
      delete @database

  # resolves and requires path to where flint is installed when loading a flint module
  require: (module) =>
    require path.resolve(@config.flint_path + '/../node_modules/' + module)

  # returns an instance of a model class if the superclass defines one via string.
  __get_model_instance: ->
    # try to set a default model
    if !@model and @default_store
      @model = @default_store.singularize().camelize()
    Instance = if @model and models and models[@model] then models[@model] else Flint.Model
    if !Instance
      throw new Error 'Flint.Model class ' + @model + ' does not exist!'
    return Instance

