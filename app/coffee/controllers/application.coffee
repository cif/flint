
class Application extends Backbone.Router
  
  # routes:
    # unless your application is light on routes, you'll probably them in other controllers
     
  initialize: =>
    
    # handy variables for mobile and online / offline
    @isTouch        = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) 
    @isOnline       = navigator.onLine
    
    # initialize storage helper, overrides backbone.sync, local, socket, ajax helper etc.
    @sync           = new Flint.Sync
    
    # notifications are great!
    @notifications  = new Flint.Notifications @
     
    # initialize helpers
    @helpers        = new views.Helpers
   
    # YOUR APP CONTROLLERS HERE.
    # be sure to pass @ so that Flint.Controllers can register themselves for binding/unbinding switches
    @controllers  = []
       
    # return the app 
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
      