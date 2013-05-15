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
    this.isTouch = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    this.isOnline = navigator.onLine;
    this.sync = new Flint.Sync;
    this.notifications = new Flint.Notifications(this);
    this.helpers = new views.Helpers;
    this.controllers = [];
    if (console && console.log) console.log('[flint] Application initialized.');
    if (Backbone.history) Backbone.history.start();
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
    this.email_testing = __bind(this.email_testing, this);
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

  Widgets.prototype.email_testing = function() {};

  return Widgets;

})();

models.Object = (function() {

  __extends(Object, Flint.Model);

  function Object() {
    Object.__super__.constructor.apply(this, arguments);
  }

  Object.prototype.store = 'objects';

  Object.prototype.fields = [
    {
      name: 'name',
      type: 'varchar(255)'
    }, {
      name: 'type',
      type: 'int(1)'
    }
  ];

  return Object;

})();

models.Widget = (function() {

  __extends(Widget, Flint.Model);

  function Widget() {
    Widget.__super__.constructor.apply(this, arguments);
  }

  Widget.prototype.url = '/widgets';

  Widget.prototype.store = 'widgets';

  Widget.prototype.has_many = {
    objects: {
      order: 'sort_order ASC'
    },
    animals: null
  };

  Widget.prototype.belongs_to = 'owner';

  Widget.prototype.has_mutual = 'features';

  Widget.prototype.fields = {
    'color': {
      type: 'varchar(255)',
      valid: 'not_empty'
    },
    'size': null,
    'in_stock': null,
    'owner_id': {
      type: 'varchar(36)'
    }
  };

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

