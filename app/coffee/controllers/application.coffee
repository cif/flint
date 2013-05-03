
class Application extends Backbone.Router
   
  initialize: =>
    
    # handy variables for mobile and online / offline
    @isTouch        = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) 
    @isOnline       = navigator.onLine
    
    # initialize storage helper, overrides backbone.sync, local, socket, ajax helper etc.
    @sync           = new Flint.Sync
    @sync.on 'myevent', (data) =>
      console.log 'got data back from the app!'
      console.log data
    
    # notifications are great!
    @notifications  = new Flint.Notifications @
     
    # initialize helpers
    @helpers        = new views.Helpers
   
    # PLACE YOUR APP CONTROLLERS HERE.
    # be sure to pass @ so that Flint.Controllers can register themselves for binding/unbinding when switching
    @controllers  = []
    @widgets = new controllers.Widgets @
    
    
    # console messages - note the simiple test case that preserves the location of output in application.js
    console.log '[flint] Application initialized.' if console and console.log
    
    # start backbone history (note, this is best moved behind a login for real applications)
    Backbone.history.start()
    
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
      
      
    