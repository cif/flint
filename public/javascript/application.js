collections = {}
controllers = {}
models = {}
views = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

controllers.Application = (function() {

  __extends(Application, Backbone.Router);

  function Application() {
    this.undelegate = __bind(this.undelegate, this);
    this.register = __bind(this.register, this);
    this.initialize = __bind(this.initialize, this);
    Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.initialize = function() {
    this.isTouch = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    this.isOnline = navigator.onLine;
    this.sync = new Flint.Sync;
    this.notifications = new Flint.Notifications(this);
    this.helpers = new views.Helpers;
    this.controllers = [];
    return this;
  };

  Application.prototype.register = function(controller) {
    return this.controllers.push(controller);
  };

  Application.prototype.undelegate = function() {
    var _this = this;
    return _.each(this.controllers, function(controller) {
      return controller.undelegate();
    });
  };

  return Application;

})();

models.Widget = (function() {

  __extends(Widget, Flint.Model);

  function Widget() {
    this.methods = __bind(this.methods, this);
    Widget.__super__.constructor.apply(this, arguments);
  }

  Widget.prototype.store = 'widgets';

  Widget.prototype.defaults = {
    color: 'red',
    size: 'large',
    in_stock: 1,
    price: 5.50
  };

  Widget.prototype.methods = function() {
    return console.log('not working?');
  };

  return Widget;

})();

views.Helpers = (function() {

  __extends(Helpers, Flint.Helpers);

  function Helpers() {
    Helpers.__super__.constructor.apply(this, arguments);
  }

  return Helpers;

})();

