class Notifications extends Backbone.View
  
  el:'#message'
  
  events:
    'click button.close' : 'dismiss'
    'click button.undo' : 'undo'
    
  render: (message, undo=false, dismiss='Close', undo_text='Undo') ->
    undo_callback = _.isFunction(undo)
    $(@el).html tmpl.notification({message:message, undo_callback:undo_callback, dismiss:dismiss, undo_text:undo_text})
    this
    
  error: (message, undo=false, callback=false) ->
    $(@el).attr('class','error')
          .css({top:0})
    @render(message, undo)
    @callback = callback
    
  notify: (message, undo=false, callback=false) ->
    $(@el).attr('class','notice')
          .css({top:0})
    @render(message, undo, 'OK')
    @callback = callback
    @undo = undo
  
  prompt_save: (message, save) ->
    $(@el).attr('class','notice')
          .css({top:0})
    @render(message, save, 'Save', 'Discard')
    @callback = save
    @undo = ->
      
  confirm: (message, save) ->
    $(@el).attr('class','notice')
          .css({top:0})
    @render(message, save, 'OK', 'Cancel')
    @callback = save
    @undo = ->
  
  warning: (message, save) ->
    $(@el).attr('class','error')
          .css({top:0})
    @render(message, save, 'OK', 'Cancel')
    @callback = save
    @undo = ->    
      
  yes_or_no: (message, save, cancel=false) ->
    $(@el).attr('class','notice')
          .css({top:0})
    @render(message, save, 'Yes', 'No')
    @callback = save
    @undo = cancel
  
  warn_and_resolve: (message, save, cancel=false) ->
    $(@el).attr('class','error')
          .css({top:0})
    @render(message, save, 'Yes', 'No')
    @callback = save
    @undo = cancel
  
  dismiss: (undo) =>
    $(@el).css({top:'-100px'})
          .html('')
    if @callback and !_.isUndefined(undo)
      @callback()
          
  undo: =>
    @dismiss()
    if @undo
      @undo(true)