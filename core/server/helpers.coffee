#
#  Core server-side helpers for your views.  
#  Additional helpers can be implemented in service/helpers.js
#

class Helpers
  
  constructor: (@handlebars, @config) ->
    
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
    
  