# Flint.Form - extends Backbone.View
#
#   * Listends for changes in input fields, selects, text areas etc.
#
#   * Brodcasts changed and changed:attribute to Flint.Sync and any other listeners
#
#   * Handles .save (new), .done (save changes), .cancel (cancel), .delete (destroy) via class attributes assigned to view DOM elements.
class Form extends Backbone.View
  
  _events:  
    'change input,textarea,select' : 'changed'
    'click .done' : 'done'
    'click .save' : 'save'
    'click .delete' : 'delete'
    'click .cancel' : 'cancel'
    'click label' : 'label_click'
    'submit form' : 'nosubmit'
  
  # initialize() is called by Backbone.View automaticallly, there was not a need to overwrite the contructor in this case 
  initialize: ->  
    # extend additional events by the subclass
    @events = _.extend {}, @_events, @events
    # call init for any other task, useful if you have to create life-cycle instances in a form class.
    @init.apply @, arguments
    this
  
  init: =>
  
  #  render() takes three arguments, a template, data object. the first two become properties of the form instance by default 
  #  you can initialize the form class with model: new models.Widget or replace with a different model using the third argument    
  render: (@template, @data={}, model=false) ->
    
    # expose all the model attributes to the template
    if model 
      @model = model
      @data.model = @model  
      @data = _.extend {}, @data, @model.attributes
    
    # call before() using the actual markup replacement routine as a callback
    @before =>
      $(@el).html tmpl[@template](@data)
      # call after()
      @after()
    
    #return the view  
    this
  
  # before() and after() are called in respect to DOM insertion carried out by render().
  # you will find them very useful.
  before: (callback) ->
    callback()
  
  after: ->
    
  # changed() is called from the events property on form inputs.
  # this will broadcast two events, changed and changed:[property] if you want to listen to a specific property's change 
  changed: (e) ->
    # stop propegation and get the target
    e.stopPropagation()  
    input = $ e.target
    value = input.val()
  
    # handle checkbox values as simple 1 or 0 flags
    if input.attr('type') is 'checkbox'
      if input.is ':checked'
        value = input.val()
      else
        value = 0
    
    # adding the class .num to input fields ensures that common formatting characters like . , and $ are stripped out
    if input.hasClass 'num'
      value = value.toString().replace(/[A-Za-z$-,]/g, '')
    
    # as long as we have a definitive value, assign it to the model. 
    # note the use of @valid_changes which determines whether or not it will validate the change realtime
    if !_.isUndefined value and !_.isUndefined @model
      attribute = input.attr('name')
      @model.set attribute, value.toString(), silent: !@valid_changes
      @trigger 'changed', @model, attribute, value
      @trigger 'changed:' + attribute, @model, value
    
  
  # save() is called when a DOM element with class="save" is clicked. it should be used in forms that intend to create
  # a new model as opposed to done() which may save changes to an existing model.  
  # because the controller is listening for collection added event we need not broadcast anything
  save: ->
    @collection.add(@model)
  
  # done() is called when a DOM element with class="done" is clicked. it is used for saving changes made to a model
  # done() can be called with an optional silent argument which preents the 'saved' event from firing 
  done: (silent=false) =>
    @trigger 'saved', @model unless silent and !_.isObject(silent)
    @cancel()
  
  # cancel() is called when a DOM element with class="cancel" is clicked. 
  # this method will unrender the view and trigger a 'canceled' event
  # cancel() can be called with an optional silent argument which will prevent the event from firing.
  cancel: (silent=false) =>
    @trigger 'canceled', @model unless silent and !_.isObject(silent)
    $(@el).empty()
  
  # save() is called when a DOM element with class="delete" is clicked. it removes a model from the collection
  # because the controller is listening for collection removed event, we need not broadcast anything
  delete: =>
    @done true
    @collection.remove @model
  
  
  # this is called on all label tags and forces a click on the next and previous siblings.
  # useful for checkbox and radio labels, as well as clicking a form field label to focus.
  label_click: (e) ->
    e.stopPropagation()
    input = $ e.target
    input.prev().click() if input.prev().get(0).tagName is 'INPUT'
    input.next().click() if input.next().get(0).tagName is 'INPUT'
    
  # prevents form tags from being submited like back in the day when forms got sent to the server ; )
  nosubmit: ->
    false  
  