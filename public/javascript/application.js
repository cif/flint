collections = {}
controllers = {}
models = {}
views = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

collections.Widgets = (function() {

  __extends(Widgets, Flint.Collection);

  function Widgets() {
    Widgets.__super__.constructor.apply(this, arguments);
  }

  Widgets.prototype.url = '/widgets/';

  return Widgets;

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
    var _this = this;
    this.isTouch = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    this.isOnline = navigator.onLine;
    this.sync = new Flint.Sync;
    this.sync.on('myevent', function(data) {
      console.log('got data back from the app!');
      return console.log(data);
    });
    this.notifications = new Flint.Notifications(this);
    this.helpers = new views.Helpers;
    this.controllers = [];
    this.widgets = new controllers.Widgets(this);
    if (console && console.log) console.log('[flint] Application initialized.');
    Backbone.history.start();
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

controllers.Widgets = (function() {

  __extends(Widgets, Flint.Controller);

  function Widgets() {
    Widgets.__super__.constructor.apply(this, arguments);
  }

  Widgets.prototype.routes = {
    'widgets': 'main'
  };

  Widgets.prototype.collection = 'Widgets';

  Widgets.prototype.model = 'Widget';

  Widgets.prototype.list = 'WidgetList';

  Widgets.prototype.form = 'WidgetForm';

  Widgets.prototype.sortable = true;

  Widgets.prototype.sorted_url = '/widgets/sort';

  Widgets.prototype.main = function() {
    var _this = this;
    return this.fetch(function(todos) {
      _this.list.render('widgets/list', todos.models);
      return _this.form.render('widgets/form');
    });
  };

  return Widgets;

})();

models.Object = (function() {

  __extends(Object, Flint.Model);

  function Object() {
    Object.__super__.constructor.apply(this, arguments);
  }

  Object.prototype.store = 'objects';

  return Object;

})();

models.Widget = (function() {

  __extends(Widget, Flint.Model);

  function Widget() {
    Widget.__super__.constructor.apply(this, arguments);
  }

  Widget.prototype.store = 'widgets';

  return Widget;

})();

views.Helpers = (function() {

  __extends(Helpers, Flint.Helpers);

  function Helpers() {
    this.initialize = __bind(this.initialize, this);
    Helpers.__super__.constructor.apply(this, arguments);
  }

  Helpers.prototype.initialize = function() {};

  return Helpers;

})();

views.WidgetForm = (function() {

  __extends(WidgetForm, Flint.Form);

  function WidgetForm() {
    WidgetForm.__super__.constructor.apply(this, arguments);
  }

  WidgetForm.prototype.el = '#new';

  return WidgetForm;

})();

views.WidgetList = (function() {

  __extends(WidgetList, Flint.List);

  function WidgetList() {
    WidgetList.__super__.constructor.apply(this, arguments);
  }

  WidgetList.prototype.el = '#another-id';

  return WidgetList;

})();

