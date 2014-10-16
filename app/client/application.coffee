
class Application extends Backbone.Router
  
  initialize: =>
    
    
    # initialize helpers
    @helpers        = new views.Helpers
   
    @controllers    = []
    
 
    # console.log tip: note the simiple test case that preserves the location of output in application.js
    console.log '[flint] Application initialized.' if console and console.log
    
    
    # start backbone history
    Backbone.history.start() if Backbone.history
    
    # return the application instance
    this
                     
  #
  # register controllers that require delegation space, classes that you register must implement @undelegate!
  # 
  register: (controller) =>
    @controllers.push(controller)
  
  #
  # undelegates events on controller views, controllers call this method when they being switched to.
  # 
  undelegate: =>
    _.each @controllers, (controller) => 
      controller.undelegate()
      
      
    