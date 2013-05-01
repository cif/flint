#
#  Core server-side helpers for your views.  
#  Additional helpers can be implemented in service/helpers.js
#

class Helpers
  
  constructor: (@handlebars) ->
    
    # this is our way around the need to register partials
    @handlebars.registerHelper 'include', @include
    @handlebars.registerHelper 'cache_buster', @cache_buster
    
  
  cache_buster: ->
    Math.ceil(Math.random() * 10000)
    
  include: (file, data) =>
    fs = require 'fs'
    path = require 'path'
    ent = require path.resolve(@config.flint_path + '/../node_modules/ent')
    hbs = require path.resolve(@config.flint_path + '/../node_modules/hbs')
    content = fs.readFileSync(path.resolve(@config.base + 'app/views/' + file), 'utf8')
    if data
      template = hbs.handlebars.compile(content)
      content = template(data)
    decoded = ent.decode(content)
    return new hbs.handlebars.SafeString(decoded)
      