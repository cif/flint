collections = {}
controllers = {}
models = {}
views = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

collections.__SHELL__ = (function() {

  __extends(__SHELL__, Backbone.Collection);

  function __SHELL__() {
    __SHELL__.__super__.constructor.apply(this, arguments);
  }

  return __SHELL__;

})();

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

models.__SHELL__ = (function() {

  __extends(__SHELL__, Flint.Model);

  function __SHELL__() {
    __SHELL__.__super__.constructor.apply(this, arguments);
  }

  return __SHELL__;

})();

views.Helpers = (function() {

  __extends(Helpers, Flint.Helpers);

  function Helpers() {
    Helpers.__super__.constructor.apply(this, arguments);
  }

  return Helpers;

})();

