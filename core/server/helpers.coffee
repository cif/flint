#
#  Core server-side helpers for your views.  
#  Additional helpers can be implemented in service/helpers.js
#

class Helpers
  
  constructor: (@handlebars) ->
    
    # this is our way around the need to register partials
    @handlebars.registerHelper 'include', @include
    
    @handlebars.registerHelper 'cache_buster', @cache_buster
    @handlebars.registerHelper 'eq', @eq
    @handlebars.registerHelper 'json', @json
  
  cache_buster: ->
    Math.ceil(Math.random() * 10000)
  
  eq: (value, test, options) ->
    if value is test
      return options.fn(this)
    else if options.inverse
      return options.inverse(this)
  
  json: (object) ->
    JSON.stringify(object)
    
  include: (file, data) =>
    ent = @require 'ent'
    hbs = @require 'hbs'
    content = fs.readFileSync(path.resolve(@config.base + 'app/views/' + file), 'utf8')
    if data
      template = hbs.handlebars.compile(content)
      content = template(data)
    decoded = ent.decode(content)
    return new hbs.handlebars.SafeString(decoded)
  
  
  # resolves and requires path to where flint is installed when loading a flint module
  require: (module) =>
    require path.resolve(@config.flint_path + '/../node_modules/' + module)    