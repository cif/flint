collections = {}
controllers = {}
flybook = {}
models = {}
views = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

collections.Accounts = (function() {

  __extends(Accounts, Backbone.Collection);

  function Accounts() {
    this.search = __bind(this.search, this);
    Accounts.__super__.constructor.apply(this, arguments);
  }

  Accounts.prototype.url = '/api/accounts/';

  Accounts.prototype.comparator = function(model) {
    return model.get('company');
  };

  Accounts.prototype.search = function(search, field) {
    var result;
    var _this = this;
    if (field == null) field = 'company';
    if (search === '') return this.models;
    result = [];
    search = search.toLowerCase();
    _.each(this.models, function(model) {
      var company;
      company = model.get(field).toLowerCase();
      if (company.indexOf(search) >= 0) return result.push(model);
    });
    return result;
  };

  return Accounts;

})();

collections.Activities = (function() {

  __extends(Activities, Flint.Collection);

  function Activities() {
    Activities.__super__.constructor.apply(this, arguments);
  }

  Activities.prototype.url = '/api/activities/';

  return Activities;

})();

collections.Clients = (function() {

  __extends(Clients, Backbone.Collection);

  function Clients() {
    this.search = __bind(this.search, this);
    Clients.__super__.constructor.apply(this, arguments);
  }

  Clients.prototype.url = '/api/clients/';

  Clients.prototype.comparator = function(model) {
    return model.get('name');
  };

  Clients.prototype.search = function(search, field) {
    var result;
    var _this = this;
    if (field == null) field = 'name';
    result = [];
    search = search.toLowerCase();
    _.each(this.models, function(model) {
      field = model.get(field).toLowerCase();
      if (field.indexOf(search) >= 0) return result.push(model);
    });
    return result;
  };

  return Clients;

})();

collections.Employees = (function() {

  __extends(Employees, Backbone.Collection);

  function Employees() {
    Employees.__super__.constructor.apply(this, arguments);
  }

  Employees.prototype.url = '/api/employees/';

  Employees.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Employees;

})();

collections.Lodges = (function() {

  __extends(Lodges, Backbone.Collection);

  function Lodges() {
    Lodges.__super__.constructor.apply(this, arguments);
  }

  Lodges.prototype.url = '/api/lodging/';

  Lodges.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Lodges;

})();

collections.Orders = (function() {

  __extends(Orders, Backbone.Collection);

  function Orders() {
    this.search = __bind(this.search, this);
    Orders.__super__.constructor.apply(this, arguments);
  }

  Orders.prototype.url = '/api/orders/';

  Orders.prototype.comparator = function(model) {
    return +Date.parse(model.get('arriving_on')) * 1000;
  };

  Orders.prototype.search = function(search, field) {
    var result;
    var _this = this;
    if (field == null) field = 'name';
    if (search === '') return this.models;
    result = [];
    search = search.toLowerCase();
    _.each(this.models, function(model) {
      var locate;
      locate = model.get(field).toLowerCase();
      if (locate.indexOf(search) >= 0) return result.push(model);
    });
    return result;
  };

  return Orders;

})();

collections.Pages = (function() {

  __extends(Pages, Backbone.Collection);

  function Pages() {
    Pages.__super__.constructor.apply(this, arguments);
  }

  Pages.prototype.url = '/api/pages';

  Pages.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Pages;

})();

collections.Products = (function() {

  __extends(Products, Backbone.Collection);

  function Products() {
    Products.__super__.constructor.apply(this, arguments);
  }

  Products.prototype.url = '/api/products/';

  Products.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Products;

})();

collections.Reservations = (function() {

  __extends(Reservations, Backbone.Collection);

  function Reservations() {
    this.update_activity = __bind(this.update_activity, this);
    this.delete_order_reservations = __bind(this.delete_order_reservations, this);
    this.remove_reservation = __bind(this.remove_reservation, this);
    this.cleanup = __bind(this.cleanup, this);
    this.update = __bind(this.update, this);
    this.search = __bind(this.search, this);
    Reservations.__super__.constructor.apply(this, arguments);
  }

  Reservations.prototype.url = '/api/reservations/';

  Reservations.prototype.comparator = function(model) {
    return model.get('created_on').toString();
  };

  Reservations.prototype.search = function(search, field) {
    var result;
    var _this = this;
    if (field == null) field = 'name';
    result = [];
    search = search.toLowerCase();
    _.each(this.models, function(model) {
      var name;
      name = model.get(field).toLowerCase();
      if (name.indexOf(search) >= 0) return result.push(model);
    });
    return result;
  };

  Reservations.prototype.update = function(order) {
    var _this = this;
    return _.each(this.models, function(res) {
      if (!res.get('order') || (res.get('order_id') === order.get('id'))) {
        return res.set('order', order.attributes);
      }
    });
  };

  Reservations.prototype.cleanup = function(order) {
    var _this = this;
    return _.each(this.models, function(res) {
      if (!res.get('order')) return _this.remove(res);
    });
  };

  Reservations.prototype.remove_reservation = function(id) {
    var _this = this;
    return _.each(this.models, function(res) {
      if (res.get('id') === id) return _this.remove(res);
    });
  };

  Reservations.prototype.delete_order_reservations = function(id) {
    var _this = this;
    return _.each(this.models, function(res) {
      if (res.get('order').id === id) return _this.remove(res);
    });
  };

  Reservations.prototype.update_activity = function(id, group_number, date) {
    var update;
    var _this = this;
    update = false;
    return _.each(this.models, function(res) {
      var activity, _i, _len, _ref, _results;
      res = res.attributes;
      if (res.activities) {
        _ref = res.activities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          activity = _ref[_i];
          if (activity.id === id) {
            activity.group_number = group_number;
            res.start_date = date;
            activity.date = date;
            update = {
              activity: activity,
              reservation: res
            };
            _results.push(_this.trigger('updated:activity', update));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
  };

  return Reservations;

})();

collections.DataStores = (function() {

  __extends(DataStores, Backbone.Collection);

  function DataStores() {
    DataStores.__super__.constructor.apply(this, arguments);
  }

  DataStores.prototype.url = '/api/stores';

  DataStores.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return DataStores;

})();

collections.Trips = (function() {

  __extends(Trips, Backbone.Collection);

  function Trips() {
    Trips.__super__.constructor.apply(this, arguments);
  }

  Trips.prototype.url = '/api/trips/';

  Trips.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Trips;

})();

controllers.Accounts = (function() {

  __extends(Accounts, Flint.Controller);

  function Accounts() {
    this.switch_account = __bind(this.switch_account, this);
    this.make_admin_account = __bind(this.make_admin_account, this);
    this.search = __bind(this.search, this);
    this.update = __bind(this.update, this);
    this.edit = __bind(this.edit, this);
    Accounts.__super__.constructor.apply(this, arguments);
  }

  Accounts.prototype.routes = {
    'accounts': 'main',
    'accounts/gone': 'gone',
    'accounts/switch/:id/': 'switch_account',
    'statements/admin': 'statements'
  };

  Accounts.prototype.template_list = 'accounts/list';

  Accounts.prototype.template_create = 'accounts/create';

  Accounts.prototype.template_edit = 'accounts/edit';

  Accounts.prototype.model = 'Account';

  Accounts.prototype.collection = 'Accounts';

  Accounts.prototype.form = 'AccountForm';

  Accounts.prototype.form_el = '#dropdown';

  Accounts.prototype.messages = {
    created: 'New account for {{company}} has been created.',
    saved: 'Changes to {{company}} have been saved.',
    delete_warn: 'You are about to delete {{company}}, proceed?'
  };

  Accounts.prototype.contents = [
    {
      id: '_accounts',
      href: '#accounts',
      title: 'All Accounts'
    }, {
      id: '_gone',
      href: '#accounts/gone',
      title: 'gone. Signups'
    }, {
      id: '_staements',
      href: '#statements/admin',
      title: 'Statements'
    }
  ];

  Accounts.prototype.main = function() {
    var _this = this;
    $('title').html('Accounts | Flybook');
    if (!app.helpers.check_role(app.user, 'super')) {
      app.notifications.error('You do not have permissions to administer flybook accounts');
      return false;
    }
    this.setup('accounts');
    app.helpers.after_transition('#app', function() {
      return $('#app').css({
        left: '230px'
      });
    });
    app.helpers.loader('#app');
    this.fetch(function(accounts) {
      return _this.list.render(_this.template_list, {
        accounts: accounts.models,
        title: 'All Accounts'
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Accounts.prototype.gone = function() {
    var _this = this;
    this.setup('gone');
    app.helpers.after_transition('#app', function() {
      return $('#app').css({
        left: '230px'
      });
    });
    app.helpers.loader('#app');
    this.fetch(function(accounts) {
      var signups;
      signups = accounts.where({
        status: 'gone_signup'
      });
      return _this.list.render(_this.template_list, {
        accounts: signups,
        title: 'Gone Signups'
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Accounts.prototype.edit = function(id) {
    var _this = this;
    return this.fetch(function(accounts) {
      return _this.get(id, function(account) {
        return app.helpers.get_countries_and_states(function() {
          _this.form.render(_this.template_edit, {
            countries: app.countries,
            states: app.states
          }, account);
          return _this.form.on('created:admin', _this.make_admin_account);
        });
      });
    });
  };

  Accounts.prototype.update = function() {
    var results;
    if (this.query) {
      results = this.list.collection.search(this.query);
      return this.list.render(false, {
        accounts: results
      });
    } else {
      return this.list.render(false, {
        accounts: this.list.collection.models
      });
    }
  };

  Accounts.prototype.search = function(query) {
    var results;
    this.query = query;
    results = this.list.collection.search(this.query);
    return this.list.render(false, {
      accounts: results,
      title: 'Search Results'
    });
  };

  Accounts.prototype.make_admin_account = function(model) {
    var _this = this;
    return app.sync.ajax('/api/accounts/_make_admin/', {
      data: model.toJSON(),
      type: 'POST',
      success: function(result, text) {
        if (result.user) {
          app.notifications.notify('Administrator account created for ' + model.get('company') + '. An email has been sent to ' + model.get('email'));
          return _this.edit(result.account_id, true);
        } else {
          return app.notifications.error(result.error);
        }
      },
      error: function(error) {
        return app.notifications.error(error.statusText);
      }
    });
  };

  Accounts.prototype.switch_account = function(id) {
    var _this = this;
    app.helpers.cookie('event_sources', false);
    return app.sync.ajax('/api/users/_switch_account/', {
      data: {
        to: id
      },
      type: 'POST',
      success: function(result, text) {
        if (result.switched) {
          return window.location = '/';
        } else {
          return app.notifications.error('Sorry, you do not have permission to use this account.');
        }
      }
    });
  };

  Accounts.prototype.setup = function(selected) {
    app.undelegate();
    this.delegate();
    app.navigation.select(false);
    app.sidebar.render({
      contents: this.contents,
      title: 'Flybook Admin',
      search: 'Search Accounts'
    }).show().select(selected);
    return app.sidebar.on('search', this.search);
  };

  return Accounts;

})();

controllers.Application = (function() {

  __extends(Application, Backbone.Router);

  function Application() {
    this.undelegate = __bind(this.undelegate, this);
    this.register = __bind(this.register, this);
    this.update = __bind(this.update, this);
    this.login = __bind(this.login, this);
    this.authenticate = __bind(this.authenticate, this);
    this.main = __bind(this.main, this);
    this.initialize = __bind(this.initialize, this);
    Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.initialize = function() {
    this.isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    this.isOnline = navigator.onLine;
    this.sync = new Flint.Sync;
    this.notifications = new Flint.Notifications(this);
    this.helpers = new views.Helpers;
    this.controllers = [];
    this.accounts = new controllers.Accounts(this);
    this.settings = new controllers.Settings(this);
    this.employees = new controllers.Employees(this);
    this.trips = new controllers.Trips(this);
    this.lodging = new controllers.Lodging(this);
    this.products = new controllers.Products(this);
    this.forms = new controllers.Forms(this);
    this.preferences = new controllers.Preferences(this);
    this.pages = new controllers.Pages(this);
    this.dashboard = new controllers.Dashboard(this);
    this.reports = new controllers.Reports(this);
    this.clients = new controllers.Clients(this);
    this.calendar = new controllers.Calendar(this);
    this.reservations = new controllers.Reservations(this);
    this.navigation = new views.Navigation(this);
    this.sidebar = new views.NavigationSidebar(this);
    this.dropdown = new views.Dropdown(this);
    this.user = new models.User;
    this.date = new Date();
    if (this.helpers.cookie('month')) {
      this.month = this.helpers.cookie('month');
      this.year = this.helpers.cookie('year');
      this.focus_day = this.helpers.cookie('day');
    } else {
      this.month = this.date.getMonth();
      this.helpers.cookie('month', this.month);
      this.year = this.date.getFullYear();
      this.helpers.cookie('year', this.year);
      this.focus_day = this.date.getDate();
      this.helpers.cookie('day', this.focus_day);
    }
    return this;
  };

  Application.prototype.main = function() {
    this.reserved = new collections.Reservations;
    this.reserved.model = models.Reservation;
    this.activities = new collections.Activities;
    return this.authenticate(function() {
      Backbone.history.start();
      return this.update_timer = window.setTimeout(this.update, 15000);
    });
  };

  Application.prototype.authenticate = function(callback) {
    var _this = this;
    this.callback = callback ? callback : function() {};
    return this.user.fetch({
      success: function(user) {
        _this.trigger('refresh', _this, _this.user);
        if (user.get('token') && user.get('authenticated')) {
          _this.user = user;
          return _this.callback();
        } else {
          Backbone.history.stop();
          _this.undelegate();
          if (!_this.user) _this.user = new models.User;
          return _this.loginView = new views.Login({
            model: _this.user
          });
        }
      },
      error: function() {
        if (_this.user.get('authorized')) {
          _this.notifications.notify('Sorry, the server is currently unavailable to authentciate you. Please try again soon.');
          _this.trigger('timeout', _this.user);
        }
        _this.undelegate();
        if (!_this.user) _this.user = new models.User;
        return _this.loginView = new views.Login({
          model: _this.user
        });
      }
    });
  };

  Application.prototype.login = function(user) {
    var _this = this;
    this.notifications.dismiss();
    return this.user.fetch({
      data: user,
      success: function(user) {
        if (user.get('token') && user.get('authenticated')) {
          _this.loginView.done().undelegateEvents();
          delete _this.loginView;
          _this.trigger('login', _this.user);
          _this.update_timer = window.setTimeout(_this.update, 15000);
          return Backbone.history.start();
        } else {
          _this.loginView.failed('Invalid username or password.');
          return Backbone.history.stop();
        }
      },
      error: function() {
        _this.loginView.failed('Could not connect to the server.');
        return Backbone.history.stop();
      }
    });
  };

  Application.prototype.logout = function() {
    var _this = this;
    Backbone.history.stop();
    this.trigger('logout', this.user);
    return this.user.fetch({
      data: {
        logout: true
      },
      success: function() {
        app.notifications.notify('You are now logged out.');
        window.clearTimeout(_this.update_timer);
        _this.undelegate();
        return _this.loginView = new views.Login({
          model: _this.user
        });
      }
    });
  };

  Application.prototype.update = function() {
    var _this = this;
    window.clearTimeout(this.update_timer);
    return this.user.fetch({
      success: function(user) {
        if (user.get('token') && user.get('authenticated')) {
          _this.user = user;
          _this.trigger('update', _this, _this.user);
          return _this.update_timer = window.setTimeout(_this.update, 60 * 1000);
        } else if (_this.user) {
          Backbone.history.stop();
          _this.trigger('logout', _this.user);
          app.notifications.notify('You are logged out of the network. Please sign in again to continue.');
          _this.undelegate();
          return _this.loginView = new views.Login({
            model: _this.user
          });
        }
      }
    });
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

controllers.Calendar = (function() {

  __extends(Calendar, Backbone.Router);

  function Calendar() {
    this.undelegate = __bind(this.undelegate, this);
    this.delegate = __bind(this.delegate, this);
    this.update_date = __bind(this.update_date, this);
    Calendar.__super__.constructor.apply(this, arguments);
  }

  Calendar.prototype.routes = {
    'calendar': 'main',
    'manifest/:trip/:date': 'manifest',
    'manifest/:trip/:date': 'manifest'
  };

  Calendar.prototype.initialize = function(app) {
    app.register(this);
    return this;
  };

  Calendar.prototype.main = function() {
    var _this = this;
    $('title').html('Calendar | Flybook');
    app.dropdown.collapse();
    app.navigation.select('calendar');
    if (this.rendered) return true;
    this.setup();
    app.helpers.loader('#nav');
    this.data = {
      calendar: true
    };
    app.helpers.after_transition('#app', function() {
      return app.reserved.fetch({
        success: function(object) {
          return app.trips.fetch(function(trips) {
            _this.data.trips = trips.models;
            return app.lodging.fetch(function(lodges) {
              _this.data.lodges = lodges.models;
              return app.employees.fetch(function(staff) {
                _this.data.staff = staff ? staff.where({
                  active: '1'
                }) : false;
                return app.lodging.fetch_meals(function(meals) {
                  var width;
                  _this.data.meals = meals;
                  app.sidebar.render(_this.data);
                  width = $(window).width() - 300;
                  app.helpers.after_transition('#app', function() {
                    var defaults, sources;
                    sources = app.helpers.cookie('event_sources');
                    if (!sources || sources === 'false') {
                      defaults = [];
                      _.each(_this.data.trips, function(trip) {
                        return defaults.push(trip.get('id') + ':' + 'trip');
                      });
                      sources = app.helpers.cookie('event_sources', defaults.join('|'));
                    }
                    app.sidebar.update_selected(sources);
                    _this.delegate();
                    _this.view.render();
                    return _this.rendered = true;
                  });
                  return $('#app').css({
                    left: '230px',
                    width: width + 'px'
                  });
                });
              });
            });
          });
        }
      });
    });
    return $('#app').empty().css({
      left: '-600px'
    });
  };

  Calendar.prototype.setup = function() {
    app.undelegate();
    this.view = new views.CalendarView;
    app.sidebar.on('search', this.search);
    app.sidebar.show();
    return this.delegate();
  };

  Calendar.prototype.update_date = function(date) {
    app.month = date.getMonth();
    app.year = date.getFullYear();
    app.focus_day = date.getDate();
    app.helpers.cookie('month', app.month);
    app.helpers.cookie('year', app.year);
    return app.helpers.cookie('day', app.focus_day);
  };

  Calendar.prototype.delegate = function() {
    var _this = this;
    this.view.delegateEvents();
    app.reserved.on('updated:activity', function(update) {
      _this.view.refresh();
      return app.sync.ajax('/api/reservations/_update_activity', {
        data: JSON.stringify(update),
        type: 'POST',
        success: function() {}
      });
    });
    if (app.sidebar.calendar) {
      app.sidebar.on('added:eventsource', this.view.add_event_source);
      app.sidebar.on('removed:eventsource', this.view.remove_event_source);
      app.sidebar.calendar.on('clicked', function(sql, date) {
        _this.update_date(date);
        return _this.view.set_focus_date(sql, date);
      });
      app.reservations.on('refresh', this.view.refresh);
      app.employees.on('refresh', this.view.refresh);
      this.view.on('selected:date', function(sql, date) {
        app.sidebar.calendar.set_focus_date(sql, date);
        return _this.update_date(date);
      });
      this.view.on('changed:view', function(view) {
        return app.sidebar.calendar.set_focus_and_highlight(view);
      });
      return app.controller = this;
    }
  };

  Calendar.prototype.undelegate = function() {
    this.rendered = false;
    app.reserved.off('updated:activity');
    app.sidebar.off('added:eventsource removed:eventsource');
    app.sidebar.off('search');
    app.reservations.off('refresh');
    app.employees.off('refresh');
    if (app.sidebar.calendar) app.sidebar.calendar.off('clicked');
    if (this.view) {
      this.view.off('selected:date changed:view');
      this.view.undelegateEvents();
      this.view.unrender();
      return delete this.view;
    }
  };

  return Calendar;

})();

controllers.Clients = (function() {

  __extends(Clients, Flint.Controller);

  function Clients() {
    this.search = __bind(this.search, this);
    Clients.__super__.constructor.apply(this, arguments);
  }

  Clients.prototype.routes = {
    'clients': 'main',
    'addresses': 'addresses',
    'emails': 'emails',
    'postcards': 'postcards',
    'clients/data': 'data'
  };

  Clients.prototype.contents = [
    {
      id: '_clients',
      href: '#clients',
      title: 'Client List'
    }, {
      id: '_addresses',
      href: '#addresses',
      title: 'Address Book'
    }, {
      id: '_emails',
      href: '#emails',
      title: 'Mailing List'
    }, {
      id: '_postcards',
      href: '#postcards',
      title: 'Send Postcards'
    }, {
      id: '_data',
      href: '#clients/data',
      title: 'Import/Export'
    }
  ];

  Clients.prototype.template_create = 'clients/create';

  Clients.prototype.template_edit = 'clients/edit';

  Clients.prototype.template_list = 'clients/list';

  Clients.prototype.collection = 'Clients';

  Clients.prototype.model = 'Client';

  Clients.prototype.main = function() {
    var _this = this;
    $('title').html('Clients | Flybook');
    this.setup('clients');
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.fetch(function(clients) {
        return _this.list.render(_this.template_list, {
          clients: clients.models
        });
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Clients.prototype.addresses = function() {
    var _this = this;
    this.setup('addresses');
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.fetch(function(clients) {
        return _this.list.render('clients/addresses', {
          clients: clients.models
        });
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Clients.prototype.emails = function() {
    var _this = this;
    this.setup('emails');
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.list.render('clients/mailing_list');
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Clients.prototype.postcards = function() {
    var _this = this;
    this.setup('postcards');
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.list.render('clients/postcards');
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Clients.prototype.data = function() {
    var _this = this;
    this.setup('data');
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.list.render('clients/data_tools');
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Clients.prototype.search = function(q) {};

  Clients.prototype.setup = function(selected) {
    app.dropdown.collapse();
    app.navigation.select('clients');
    app.sidebar.on('search', this.search);
    app.sidebar.render({
      contents: this.contents,
      title: 'Clients',
      search: 'Search Clients'
    }).show().select(selected);
    app.undelegate();
    this.delegate();
    return $('#app').css({
      left: '-540px',
      width: '450px'
    });
  };

  return Clients;

})();

controllers.Dashboard = (function() {

  __extends(Dashboard, Flint.Controller);

  function Dashboard() {
    this.search = __bind(this.search, this);
    Dashboard.__super__.constructor.apply(this, arguments);
  }

  Dashboard.prototype.contents = [
    {
      id: '_reservations',
      href: '#reservations',
      title: 'Reservations'
    }, {
      id: '_balances',
      href: '#balances',
      title: 'Balances Due'
    }, {
      id: '_messages',
      href: '#messages',
      title: 'Staff Messages'
    }, {
      id: '_phone',
      href: '#phone',
      title: 'Phone List'
    }, {
      id: '_todo',
      href: '#todo',
      title: 'Todo List'
    }
  ];

  Dashboard.prototype.main = function() {
    var _this = this;
    $('title').html('Dashboard | Flybook');
    app.dropdown.collapse();
    this.setup('home');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('dashboard/home', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Dashboard.prototype.search = function(query) {
    var results;
    this.query = query;
    results = this.list.collection.search(this.query);
    return this.list.render(false, {
      accounts: results
    });
  };

  Dashboard.prototype.setup = function(selected) {
    app.undelegate();
    this.delegate();
    app.navigation.select('dashboard');
    app.sidebar.render({
      contents: this.contents,
      title: 'Dashboard',
      search: 'Search Reservations'
    }).show().select(selected);
    return app.sidebar.on('search', app.reservations.search);
  };

  return Dashboard;

})();

controllers.Employees = (function() {

  __extends(Employees, Flint.Controller);

  function Employees() {
    this.canceled = __bind(this.canceled, this);
    this.catch_save = __bind(this.catch_save, this);
    this.update = __bind(this.update, this);
    this.activity = __bind(this.activity, this);
    this.edit = __bind(this.edit, this);
    Employees.__super__.constructor.apply(this, arguments);
  }

  Employees.prototype.routes = {
    'employees': 'main',
    'staff/edit/:id': 'edit',
    'activity/:date/:guide_id': 'activity'
  };

  Employees.prototype.template_create = 'employees/create';

  Employees.prototype.template_edit = 'employees/edit';

  Employees.prototype.template_list = 'employees/list';

  Employees.prototype.template_help = 'employees/help';

  Employees.prototype.model = 'Employee';

  Employees.prototype.collection = 'Employees';

  Employees.prototype.form = 'EmployeeForm';

  Employees.prototype.form_el = '#dropdown';

  Employees.prototype.sortable = true;

  Employees.prototype.sorted_url = '/api/employees/_sort/';

  Employees.prototype.messages = {
    created: '{{nickname}} has been added as an employee.',
    saved: 'Changes to {{nickname}} have been saved.',
    delete_warn: 'You are about to delete {{nickname}}, proceed?',
    sorted: 'You have changed the default guiding order.'
  };

  Employees.prototype.main = function() {
    var _this = this;
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app').css({
        left: '230px'
      });
      return _this.display();
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Employees.prototype.edit = function(id) {
    var _this = this;
    _.each(app.controllers, function(controller) {
      if (!controller.rendered) return controller.undelegate();
    });
    this.delegate();
    this.form.on('canceled', this.canceled);
    this.form.on('saved', this.catch_save);
    return this.fetch(function(staff) {
      var model;
      model = _this.list.collection.get(id);
      return _this.form.render(_this.template_edit, {}, model);
    });
  };

  Employees.prototype.activity = function(date, guide_id) {
    return this.form.render('employees/activity');
  };

  Employees.prototype.update = function() {};

  Employees.prototype.catch_save = function() {
    if (window.location.hash.indexOf('staff') < 0) return this.list.render();
  };

  Employees.prototype.canceled = function(model) {
    if (window.location.hash.indexOf('staff') >= 0) {
      history.go('-1');
      this.undelegate();
    }
    return this.trigger('refresh');
  };

  Employees.prototype.display = function() {
    var _this = this;
    app.sidebar.render({
      contents: app.settings.menus.settings.contents,
      title: app.settings.menus.settings.title
    }).show().select('employees');
    app.navigation.select('setup');
    app.undelegate();
    this.delegate();
    this.list.before = function() {
      return this.data = {
        active: this.collection.where({
          active: '1'
        }),
        inactive: this.collection.where({
          active: '0'
        })
      };
    };
    return this.fetch(function(models) {
      if (models) {
        _this.list.collection = models;
        return _this.list.render(_this.template_list, _this.list.collection);
      } else {
        return _this.list.help(false);
      }
    });
  };

  return Employees;

})();

controllers.Forms = (function() {

  __extends(Forms, Flint.Controller);

  function Forms() {
    Forms.__super__.constructor.apply(this, arguments);
  }

  Forms.prototype.routes = {
    'forms': 'main'
  };

  Forms.prototype.form = 'StoreForm';

  Forms.prototype.form_el = '#dropdown';

  Forms.prototype.model = 'DataStore';

  Forms.prototype.collection = 'DataStores';

  Forms.prototype.template_list = 'forms/list';

  Forms.prototype.template_help = 'forms/help';

  Forms.prototype.template_create = 'forms/create';

  Forms.prototype.template_edit = 'forms/edit';

  Forms.prototype.valid_changes = false;

  Forms.prototype.sortable = true;

  Forms.prototype.sorted_url = '/api/stores/_sort/';

  Forms.prototype.main = function() {
    var _this = this;
    app.undelegate();
    this.delegate();
    this.setup();
    this.list.before = function() {
      return this.data = {
        fields: this.collection.models
      };
    };
    app.helpers.after_transition('#app', function() {
      _this.account = app.user.get('account');
      _this.fetch(function(stores) {
        _this.stores = stores;
        if (_this.stores) {
          return _this.list.render('forms/list');
        } else {
          return _this.list.help(false);
        }
      });
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Forms.prototype.setup = function() {
    app.helpers.loader('#app').css({
      left: '230px',
      width: '450px'
    });
    app.sidebar.render({
      contents: app.settings.menus.settings.contents,
      title: app.settings.menus.settings.title
    }).show().select('forms');
    app.navigation.select('settings');
    return this.form.on('deleted:doc', this.document_deleted);
  };

  return Forms;

})();

controllers.Lodging = (function() {

  __extends(Lodging, Flint.Controller);

  function Lodging() {
    this.meals_updated = __bind(this.meals_updated, this);
    this.fetch_meals = __bind(this.fetch_meals, this);
    this.edit = __bind(this.edit, this);
    Lodging.__super__.constructor.apply(this, arguments);
  }

  Lodging.prototype.routes = {
    'lodging': 'main'
  };

  Lodging.prototype.model = 'Lodge';

  Lodging.prototype.collection = 'Lodges';

  Lodging.prototype.form = 'LodgeForm';

  Lodging.prototype.form_el = '#dropdown';

  Lodging.prototype.list = 'LodgeList';

  Lodging.prototype.template_list = 'lodging/list';

  Lodging.prototype.template_help = 'lodging/help';

  Lodging.prototype.template_create = 'lodging/create';

  Lodging.prototype.template_edit = 'lodging/edit';

  Lodging.prototype.sortable = true;

  Lodging.prototype.sorted_url = '/api/lodging/_sort/';

  Lodging.prototype.main = function() {
    var _this = this;
    app.dropdown.collapse();
    app.helpers.after_transition('#app', function() {
      _this.setup();
      return _this.fetch(function(lodges) {
        if (lodges) {
          return _this.list.render();
        } else {
          return _this.list.help(false);
        }
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Lodging.prototype.edit = function(id) {
    var _this = this;
    return app.dropdown.position('200px', function() {
      app.helpers.loader('#dropdown');
      return _this.fetch(function(lodges) {
        return app.trips.fetch(function(trips) {
          return _this.get(id, function(model) {
            return _this.form.render('lodging/edit', {
              trips: trips
            }, model);
          });
        });
      });
    });
  };

  Lodging.prototype.fetch_meals = function(callback) {
    var _this = this;
    return app.sync.ajax('/api/lodging/_meals/', {
      success: function(data) {
        return callback(data);
      }
    });
  };

  Lodging.prototype.meals_updated = function(data) {
    var _this = this;
    app.notifications.notify('Updating meal service...');
    return app.sync.ajax('/api/lodging/_save_meals/', {
      type: 'POST',
      data: data,
      success: function(data) {
        _this.meals = data;
        _this.list.update_meals(data);
        return app.notifications.notify('Meal service has been updated.');
      }
    });
  };

  Lodging.prototype.setup = function(callback) {
    var _this = this;
    app.helpers.loader('#app').css({
      left: '230px',
      width: '450px'
    });
    app.sidebar.render({
      contents: app.settings.menus.settings.contents,
      title: app.settings.menus.settings.title
    }).show().select('lodging');
    app.navigation.select('settings');
    app.undelegate();
    this.delegate();
    this.list.on('rendered', function() {
      if (!_this.meals) {
        return _this.fetch_meals(function(data) {
          _this.meals = data;
          return _this.list.render_meals(data);
        });
      } else {
        return _this.list.render_meals(_this.meals);
      }
    });
    return this.list.on('meals_update', this.meals_updated);
  };

  return Lodging;

})();

controllers.Pages = (function() {

  __extends(Pages, Flint.Controller);

  function Pages() {
    Pages.__super__.constructor.apply(this, arguments);
  }

  Pages.prototype.routes = {
    'pages': 'main'
  };

  Pages.prototype.model = 'Page';

  Pages.prototype.collection = 'Pages';

  Pages.prototype.form = 'PageForm';

  Pages.prototype.form_el = '#dropdown';

  Pages.prototype.template_list = 'pages/list';

  Pages.prototype.template_help = 'pages/help';

  Pages.prototype.template_create = 'pages/edit';

  Pages.prototype.template_edit = 'pages/edit';

  Pages.prototype.sortable = true;

  Pages.prototype.sorted_url = '/api/pages/_sort/';

  Pages.prototype.valid_changes = false;

  Pages.prototype.messages = {
    created: '{{title}} has been created',
    saved: 'Changes to {{title}} have been saved.',
    delete_warn: 'You are about to delete {{title}}, proceed?',
    navigate_warn: 'Did you want to save the changes you just made?',
    sorted: 'You have changed the page architecture.'
  };

  Pages.prototype.main = function() {
    var _this = this;
    app.helpers.after_transition('#app', function() {
      _this.setup();
      return _this.fetch(function(pages) {
        if (pages) {
          return _this.list.render();
        } else {
          return _this.list.help(false);
        }
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Pages.prototype.create = function() {
    this.list.collection.add(new models.Page({
      sort_order: this.list.collection.length
    }));
    return this.update();
  };

  Pages.prototype.setup = function(callback) {
    app.helpers.loader('#app').css({
      left: '230px'
    });
    app.sidebar.render({
      contents: app.settings.menus.account.contents,
      title: app.settings.menus.account.title
    }).show().select('pages');
    app.navigation.select(false);
    app.undelegate();
    return this.delegate();
  };

  return Pages;

})();

controllers.Preferences = (function() {

  __extends(Preferences, Flint.Controller);

  function Preferences() {
    this.saved = __bind(this.saved, this);
    this.passchange = __bind(this.passchange, this);
    Preferences.__super__.constructor.apply(this, arguments);
  }

  Preferences.prototype.routes = {
    'preferences': 'main',
    'notifications': 'notifications',
    'password': 'password',
    'gone-profile': 'profile',
    'theme': 'theme'
  };

  Preferences.prototype.contents = [
    {
      id: '_gone_profile',
      href: '#gone-profile',
      title: 'Edit Your Profile'
    }, {
      id: '_theme',
      href: '#theme',
      title: 'Change Theme'
    }, {
      id: '_password',
      href: '#password',
      title: 'Change Password'
    }
  ];

  Preferences.prototype.form = 'SettingsForm';

  Preferences.prototype.main = function() {
    app.dropdown.collapse();
    return this.setup();
  };

  Preferences.prototype.profile = function() {
    var _this = this;
    this.setup('gone_profile');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      _this.form.render('preferences/profile', {}, _this.form.model);
      return _this.uploader = new views.PhotoUploader('logo-upload', 'icon', '/api/uploads/_user_icon/', app.user.get('id'), '#user li .cover');
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Preferences.prototype.password = function() {
    var _this = this;
    this.setup('password');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.form.render('preferences/password', {}, _this.form.model);
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Preferences.prototype.passchange = function(user) {
    var _this = this;
    app.helpers.loader('#app');
    return user.save(null, {
      success: function(model, response) {
        if (response.error) {
          app.notifications.error('Unable to change password. Make sure your old password is correct!');
          return _this.form.render('preferences/password', {}, _this.form.model);
        } else {
          app.notifications.notify('Your password has been changed sucessfully.');
          $('#app').css({
            left: '-550px'
          });
          return window.location.hash = '#noop';
        }
      }
    });
  };

  Preferences.prototype.saved = function(user) {
    app.notifications.notify('Changes to your preferences have been saved');
    app.user = user;
    return app.user.save();
  };

  Preferences.prototype.setup = function(selected) {
    if (selected == null) selected = false;
    this.form.model = app.user;
    this.form.on('changed:password', this.passchange);
    app.navigation.select(false);
    app.sidebar.render({
      contents: this.contents,
      title: 'Preferences'
    }).show().select(selected);
    app.undelegate();
    this.delegate();
    return $('#app').css({
      left: '-540px',
      width: '450px'
    });
  };

  return Preferences;

})();

controllers.Products = (function() {

  __extends(Products, Flint.Controller);

  function Products() {
    this.edit = __bind(this.edit, this);
    Products.__super__.constructor.apply(this, arguments);
  }

  Products.prototype.routes = {
    'products': 'main'
  };

  Products.prototype.form = 'ProductForm';

  Products.prototype.form_el = '#dropdown';

  Products.prototype.model = 'Product';

  Products.prototype.collection = 'Products';

  Products.prototype.template_list = 'products/list';

  Products.prototype.template_help = 'products/help';

  Products.prototype.template_create = 'products/create';

  Products.prototype.template_edit = 'products/edit';

  Products.prototype.sortable = true;

  Products.prototype.sorted_url = '/api/products/_sort/';

  Products.prototype.main = function() {
    var _this = this;
    app.dropdown.collapse();
    app.helpers.after_transition('#app', function() {
      _this.setup();
      return _this.fetch(function(products) {
        if (products) {
          return _this.list.render();
        } else {
          return _this.list.help(false);
        }
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Products.prototype.edit = function(id) {
    var _this = this;
    app.helpers.loader('#dropdown');
    return this.fetch(function(products) {
      return app.trips.fetch(function(trips) {
        return _this.get(id, function(model) {
          return _this.form.render('products/edit', {
            trips: trips
          }, model);
        });
      });
    });
  };

  Products.prototype.setup = function(callback) {
    this.list.before = function() {
      return this.data = {
        active: this.collection.where({
          web_active: '1'
        }),
        inactive: this.collection.where({
          web_active: '0'
        })
      };
    };
    app.helpers.loader('#app').css({
      left: '230px'
    });
    app.sidebar.render({
      contents: app.settings.menus.settings.contents,
      title: app.settings.menus.settings.title
    }).show().select('products');
    app.navigation.select('settings');
    app.undelegate();
    return this.delegate();
  };

  return Products;

})();

controllers.Reports = (function() {

  __extends(Reports, Flint.Controller);

  function Reports() {
    Reports.__super__.constructor.apply(this, arguments);
  }

  Reports.prototype.routes = {
    'reports': 'main',
    'statements': 'statements',
    'revenue': 'revenue',
    'client-data': 'clients',
    'traffic': 'traffic',
    'sources': 'sources'
  };

  Reports.prototype.contents = [
    {
      id: '_statements',
      href: '#statements',
      title: 'Statements'
    }, {
      id: '_revenue',
      href: '#revenue',
      title: 'Booking &amp; Revenue'
    }, {
      id: '_sources',
      href: '#sources',
      title: 'Referral Sources'
    }, {
      id: '_traffic',
      href: '#traffic',
      title: 'Web Traffic'
    }, {
      id: '_clients',
      href: '#client-data',
      title: 'Client Data'
    }
  ];

  Reports.prototype.main = function() {
    $('title').html('Reports | Flybook');
    return this.setup();
  };

  Reports.prototype.statements = function() {
    var _this = this;
    this.setup('statements');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('reports/statements', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Reports.prototype.revenue = function() {
    var _this = this;
    this.setup('revenue');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('reports/revenue', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Reports.prototype.sources = function() {
    var _this = this;
    this.setup('sources');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('reports/sources', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Reports.prototype.traffic = function() {
    var _this = this;
    this.setup('traffic');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('reports/traffic', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Reports.prototype.clients = function() {
    var _this = this;
    this.setup('clients');
    app.helpers.after_transition('#app', function() {
      $('#app').css({
        left: '230px'
      });
      return _this.list.render('reports/clients', {});
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Reports.prototype.setup = function(selected) {
    if (selected == null) selected = false;
    app.dropdown.collapse();
    app.navigation.select('reports');
    app.sidebar.render({
      contents: this.contents,
      title: 'Reports'
    }).show().select(selected);
    app.undelegate();
    this.delegate();
    return $('#app').css({
      left: '-640px',
      width: '450px'
    });
  };

  return Reports;

})();

controllers.Reservations = (function() {

  __extends(Reservations, Flint.Controller);

  function Reservations() {
    this.unbind = __bind(this.unbind, this);
    this.bind = __bind(this.bind, this);
    this.canceled = __bind(this.canceled, this);
    this.apply_discount = __bind(this.apply_discount, this);
    this.refund_payment = __bind(this.refund_payment, this);
    this.process_payment = __bind(this.process_payment, this);
    this.deleted = __bind(this.deleted, this);
    this.added = __bind(this.added, this);
    this.update = __bind(this.update, this);
    this.search = __bind(this.search, this);
    this.edit = __bind(this.edit, this);
    this.make = __bind(this.make, this);
    this.guide = __bind(this.guide, this);
    this.trip = __bind(this.trip, this);
    this.room = __bind(this.room, this);
    this.lodge = __bind(this.lodge, this);
    this.manifest = __bind(this.manifest, this);
    this.format_reservations = __bind(this.format_reservations, this);
    this.balances = __bind(this.balances, this);
    Reservations.__super__.constructor.apply(this, arguments);
  }

  Reservations.prototype.routes = {
    'reservations': 'main',
    'dashboard': 'main',
    'balances': 'balances',
    'reservation': 'make',
    'reservation/trip/:id/': 'trip',
    'reservation/trip/:id/:start': 'trip',
    'reservation/trip/:id/:start/:end': 'trip',
    'reservation/lodge/:id/': 'lodge',
    'reservation/lodge/:id/:start': 'lodge',
    'reservation/lodge/:id/:start/:end': 'lodge',
    'reservation/room/:id/:start/:room': 'room',
    'reservation/edit/:id': 'edit',
    'reservation/guide/:id/:start/:guide/:time': 'guide',
    'reservation/guide/:id/:start/:guide': 'guide',
    'manifest/:trip_id/:date': 'manifest',
    'manifest/:trip_id/:date/:time': 'manifest'
  };

  Reservations.prototype.model = 'Order';

  Reservations.prototype.collection = 'Orders';

  Reservations.prototype.form = 'OrderForm';

  Reservations.prototype.form_el = '#dropdown';

  Reservations.prototype.valid_changes = false;

  Reservations.prototype.messages = {
    created: 'Reservation(s) for {{name}} has been created. {{notified}}',
    saved: 'Reservation(s) for {{name}} has been saved. {{notified}}',
    delete_warn: 'You are about to completely erase {{name}}&apos;s reservation(s). Forever. Proceed?'
  };

  Reservations.prototype.main = function() {
    var _this = this;
    $('title').html('Dashboard | Flybook');
    this.setup('reservations');
    this.template = 'reservations/approval_list';
    app.dropdown.collapse();
    app.helpers.after_transition('#app', function() {
      _this.filter = function(orders) {
        var count, display, hold, pending;
        orders.sort();
        pending = orders.where({
          status: '2'
        });
        hold = orders.where({
          status: '4'
        });
        pending.sort();
        display = _this.format_reservations(pending);
        hold = _this.format_reservations(hold);
        count = display.length;
        return {
          reservations: display,
          count: count,
          hold: hold
        };
      };
      return _this.refresh(function(orders) {
        return _this.list.render('reservations/approval_list', _this.filter(_this.list.collection));
      });
    });
    return app.helpers.loader('#app').css({
      left: '230px',
      width: '450px'
    });
  };

  Reservations.prototype.balances = function() {
    var _this = this;
    $('title').html('Dashboard | Flybook');
    this.setup('balances');
    this.template = 'reservations/balances_due';
    app.dropdown.collapse();
    app.helpers.after_transition('#app', function() {
      _this.filter = function(orders) {
        var balances, order, _i, _len, _ref;
        balances = [];
        if (orders.models) {
          _ref = orders.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            order = _ref[_i];
            if (order.attributes.balance_due > 0) balances.push(order);
          }
        }
        return {
          reservations: _this.format_reservations(balances),
          count: balances.length,
          hold: false
        };
      };
      return _this.refresh(function(orders) {
        return _this.list.render('reservations/balances_due', _this.filter(orders));
      });
    });
    return app.helpers.loader('#app').css({
      left: '230px',
      width: '450px'
    });
  };

  Reservations.prototype.format_reservations = function(reservations) {
    var display;
    var _this = this;
    display = [];
    _.each(reservations, function(reservation) {
      var lodge_name, object;
      object = reservation.attributes;
      object.dates = app.helpers.sql_to_slash(object.start_date);
      if (object.end_date > object.start_date) {
        object.dates += ' - ' + app.helpers.sql_to_slash(object.end_date);
      }
      if (object.dates === '') object.dates = 'No dates set';
      object.party = parseInt(object.adults) + parseInt(object.children) + parseInt(object.seniors);
      if (object.trip_reservations.length > 0) {
        object.trip = object.trip_reservations[0].attributes ? object.trip_reservations[0].get('trip').name : object.trip_reservations[0].trip.name;
      } else {
        object.trip = '';
      }
      if (object.lodge_reservations.length > 0) {
        lodge_name = object.lodge_reservations[0].attributes ? object.lodge_reservations[0].get('lodge').name : object.lodge_reservations[0].lodge.name;
        if (object.trip !== '') object.trip += ' / ';
        object.trip += lodge_name;
      }
      if (object.trip === '') object.trip = 'No trips or lodging set';
      console.log(object);
      return display.push(object);
    });
    return display;
  };

  Reservations.prototype.manifest = function(trip_id, date, time) {
    var _this = this;
    return app.reserved.fetch({
      success: function() {
        return app.clients.fetch(function(clients) {
          return app.employees.fetch(function(staff) {
            return app.trips.fetch(function(trips) {
              var data, jsdate, schedule, trip;
              trip = app.trips.list.collection.get(trip_id);
              jsdate = moment(date).toDate();
              schedule = trip.schedule_on(jsdate, time);
              time = time ? app.helpers.twenty_four_to_twelve(time) : false;
              data = {
                program: schedule[0].program,
                trip: trip.attributes,
                date: moment(date).format('YYYY-MM-DD'),
                time: time
              };
              _this.daily = new views.TripDaily;
              _this.daily.on('error', _this.error);
              _this.daily.on('canceled', _this.canceled);
              return _this.daily.render('reservations/manifest', data);
            });
          });
        });
      }
    });
  };

  Reservations.prototype.lodge = function(id, start, end) {
    return this.make(false, id, start, end);
  };

  Reservations.prototype.room = function(id, start, room) {
    return this.make(false, id, start, false, false, false, room);
  };

  Reservations.prototype.trip = function(id, start, end) {
    return this.make(id, false, start);
  };

  Reservations.prototype.guide = function(trip_id, start, guide_id, time) {
    return this.make(trip_id, false, start, false, guide_id, time);
  };

  Reservations.prototype.make = function(trip_id, lodge_id, start, end, guide_id, time, room_id) {
    var _this = this;
    if (trip_id == null) trip_id = false;
    if (lodge_id == null) lodge_id = false;
    if (start == null) start = false;
    if (end == null) end = false;
    if (guide_id == null) guide_id = false;
    if (time == null) time = false;
    if (room_id == null) room_id = false;
    window.scrollTo(0, 0);
    _.each(app.controllers, function(controller) {
      if (!controller.rendered) return controller.undelegate();
    });
    this.delegate();
    app.navigation.select('reservation');
    $('.prompt,.screen').remove();
    app.dropdown.position('600px', function() {
      return app.helpers.loader('#dropdown');
    });
    return app.reserved.fetch({
      success: function() {
        return app.trips.fetch(function(trips) {
          return app.lodging.fetch(function(lodges) {
            return app.employees.fetch(function(staff) {
              return app.products.fetch(function(products) {
                return app.helpers.get_countries_and_states(function() {
                  var reservation;
                  reservation = new models.Reservation;
                  reservation.set('entered_by', app.user.get('name'), {
                    silent: true
                  });
                  _this.form.trip_id = trip_id;
                  _this.form.lodge_id = lodge_id;
                  _this.form.room_id = room_id;
                  _this.form.start_date = start;
                  _this.form.end_date = end;
                  _this.form.guide_id = guide_id;
                  _this.form.selected_time = time;
                  _this.data = {
                    trips: trips,
                    staff: staff,
                    lodges: lodges,
                    lodge_id: lodge_id,
                    trip_id: trip_id,
                    start_date: start,
                    end_date: end,
                    countries: app.countries,
                    states: app.states
                  };
                  return _this.form.render('reservations/form', _this.data, new models.Order);
                });
              });
            });
          });
        });
      }
    });
  };

  Reservations.prototype.edit = function(id) {
    var _this = this;
    window.scrollTo(0, 0);
    _.each(app.controllers, function(controller) {
      if (!controller.rendered) return controller.undelegate();
    });
    this.delegate();
    window.location.hash = '#reservation/edit/' + id;
    return app.dropdown.position('600px', function() {
      app.helpers.loader('#dropdown');
      return app.reserved.fetch({
        success: function() {
          return app.trips.fetch(function(trips) {
            return app.lodging.fetch(function(lodges) {
              return app.employees.fetch(function(staff) {
                return app.products.fetch(function(products) {
                  return app.helpers.get_countries_and_states(function() {
                    _this.data = {
                      trips: trips,
                      staff: staff,
                      lodges: lodges,
                      products: products,
                      countries: app.countries,
                      states: app.states
                    };
                    return _this.get(id, function(order) {
                      if (!order) {
                        console.log('order ' + id + ' fucking vanished mysteriously...');
                        throw new Error;
                      }
                      return _this.form.render('reservations/form', _this.data, order);
                    });
                  });
                });
              });
            });
          });
        }
      });
    });
  };

  Reservations.prototype.search = function(query) {
    var display, results;
    this.query = query;
    if (this.query === '') {
      return this.list.render(this.template, this.filter(this.list.collection));
    } else {
      results = this.list.collection.search(this.query);
      display = this.format_reservations(results);
      return this.list.render('reservations/search_results', {
        reservations: display,
        count: display.length
      });
    }
  };

  Reservations.prototype.update = function() {
    if (this.filter && !app.calendar.rendered) {
      this.list.collection.sort();
      return this.list.render(this.list.template, this.filter(this.list.collection));
    }
  };

  Reservations.prototype.added = function(model) {
    var _this = this;
    console.log('got added event');
    this.trigger('added', model);
    this.app.notifications.notify('Saving...');
    return model.save(model, {
      success: function() {
        var message, _tmpl;
        _tmpl = tmpl_compile(_this.messages.created);
        message = _tmpl(model.attributes);
        _this.app.notifications.notify(message);
        return _this.trigger('returned', model);
      },
      error: function(model, message) {
        if (!!_this.app.notifications) _this.app.notifications.error(message);
        return _this.list.collection.remove(model, {
          silent: true
        });
      }
    });
  };

  Reservations.prototype.deleted = function(model, collection, options) {
    var Deletable;
    app.reserved.delete_order_reservations(model.get('id'));
    Deletable = Backbone.Model.extend({
      url: this.list.collection.url
    });
    this.to_delete = new Deletable(model.attributes);
    this.destroy();
    app.notifications.notify('The reservation has been deleted.');
    this.trigger('refresh');
    if (window.location.hash.indexOf('reservation') >= 0) {
      history.go('-1');
      return this.undelegate();
    }
  };

  Reservations.prototype.process_payment = function(payment) {
    var _this = this;
    return payment.save(null, {
      success: function(response) {
        if (response.get('error')) {
          return app.notifications.error('Error processing credit card: ' + response.get('error'));
        } else {
          return _this.form.add_payment(response);
        }
      }
    });
  };

  Reservations.prototype.refund_payment = function(attrs) {
    var payment;
    var _this = this;
    payment = new models.Payment(attrs);
    return payment.destroy({
      success: function(payment) {
        return _this.form.payment_refunded(payment);
      }
    });
  };

  Reservations.prototype.apply_discount = function(code) {
    var _this = this;
    return app.sync.ajax('/api/payments/_update_discount', {
      data: {
        id: code
      },
      success: function(response) {
        if (response.error) {
          return app.notifications.error(reponse.error);
        } else {
          return _this.form.update_discount(response);
        }
      }
    });
  };

  Reservations.prototype.canceled = function(model) {
    if (window.location.hash.indexOf('reservation') >= 0 || window.location.hash.indexOf('manifest') >= 0) {
      history.go('-1');
      this.undelegate();
    }
    app.reserved.cleanup(model);
    this.form.trip_id = false;
    this.form.lodge_id = false;
    this.form.start_date = false;
    this.form.end_date = false;
    return delete this.daily;
  };

  Reservations.prototype.bind = function() {
    var _this = this;
    this.form.on('process:payment', this.process_payment);
    this.form.on('refund:payment', this.refund_payment);
    this.form.on('selected:discount', this.apply_discount);
    this.form.on('error', this.error);
    this.form.on('canceled', this.canceled);
    return this.on('returned', function(model) {
      return app.reserved.fetch({
        success: function() {
          app.reserved.update(model);
          return _this.trigger('refresh');
        }
      });
    });
  };

  Reservations.prototype.unbind = function() {
    this.form.off('process:payment refund:payment selected:discount error canceled tabbed');
    return this.off('saved added');
  };

  Reservations.prototype.setup = function(selected) {
    app.undelegate();
    this.delegate();
    app.navigation.select('dashboard');
    app.sidebar.render({
      contents: app.dashboard.contents,
      title: 'Dashboard',
      search: 'Search Reservations'
    }).show().select(selected);
    return app.sidebar.on('search', this.search);
  };

  return Reservations;

})();

controllers.Schedules = (function() {

  __extends(Schedules, Flint.Controller);

  function Schedules() {
    this.undelegate = __bind(this.undelegate, this);
    this.delegate = __bind(this.delegate, this);
    this.deleted = __bind(this.deleted, this);
    this.saved = __bind(this.saved, this);
    this.canceled = __bind(this.canceled, this);
    this.edit = __bind(this.edit, this);
    Schedules.__super__.constructor.apply(this, arguments);
  }

  Schedules.prototype.routes = {
    'schedule/:id/:start': 'main',
    'schedule/:id/:start/:end': 'main'
  };

  Schedules.prototype.form = 'TripForm';

  Schedules.prototype.form_el = '#dropdown';

  Schedules.prototype.main = function(id, start, end) {
    var _this = this;
    this.delegate();
    $('.prompt,.screen').remove();
    return app.employees.fetch(function(staff) {
      return app.trips.get(id, function(trip) {
        var schedule;
        staff = app.employees.list.collection.models;
        schedule = new models.Schedule(_.extend(trip.clone().attributes, {
          id: false,
          trip_id: id,
          staff: staff
        }));
        schedule.update_dates_and_times(staff, app.helpers.sqldate_to_js(start), app.helpers.sqldate_to_js(end));
        delete schedule.id;
        app.dropdown.clear();
        _this.form.render('trips/schedule', {}, schedule);
        _this.form.on('canceled', _this.canceled);
        _this.form.on('saved', _this.saved);
        return _this.delegate();
      });
    });
  };

  Schedules.prototype.edit = function(calendar_event) {
    var _this = this;
    app.helpers.loader('#dropdown');
    return app.employees.fetch(function(staff) {
      var schedule;
      schedule = new models.Schedule;
      return schedule.fetch({
        data: {
          id: calendar_event.id
        },
        success: function() {
          staff = app.employees.list.collection.models;
          schedule.update_dates_and_times(staff);
          _this.form.render('trips/schedule', {}, schedule);
          _this.form.on('deleted', _this.deleted);
          _this.form.on('saved', _this.saved);
          _this.modelChanged = true;
          return _this.delegate();
        }
      });
    });
  };

  Schedules.prototype.canceled = function() {
    this.undelegate();
    return window.location.hash = '#calendar';
  };

  Schedules.prototype.saved = function(schedule) {
    var _this = this;
    app.notifications.notify('Saving schedule...');
    return schedule.save(null, {
      success: function(response) {
        var isNew, schedules, trip, trip_id;
        app.notifications.notify('Changes to ' + schedule.get('name') + ' have been saved.');
        trip_id = schedule.get('trip_id');
        trip = app.trips.list.collection.get(trip_id);
        schedules = trip.get('schedules');
        isNew = true;
        _.each(schedules, function(sch, index) {
          if (sch.id === schedule.get('id')) {
            schedules[index] = schedule.attributes;
            return isNew = false;
          }
        });
        if (isNew) schedules.push(schedule.attributes);
        trip.set('schedules', schedules, {
          silent: true
        });
        return _this.trigger('changed:schedule', schedule);
      }
    });
  };

  Schedules.prototype.deleted = function(schedule) {
    var schedules, trip, trip_id;
    var _this = this;
    schedule.destroy();
    trip_id = schedule.get('trip_id');
    trip = app.trips.list.collection.get(trip_id);
    schedules = trip.get('schedules');
    _.each(schedules, function(sch, index) {
      if (sch.id === schedule.get('id')) return schedules.splice(index, 1);
    });
    trip.set('schedules', schedules, {
      silent: true
    });
    this.modelChanged = false;
    this.trigger('changed:schedule', schedule);
    return app.dropdown.collapse();
  };

  Schedules.prototype.delegate = function() {
    var _this = this;
    _.each(app.controllers, function(controller) {
      if (app.controller === !controller) return controller.undelegate();
    });
    this.on('saved', this.schedule_saved);
    this.form.delegateEvents();
    return this.bind();
  };

  Schedules.prototype.undelegate = function() {
    this.off('saved');
    this.form.undelegateEvents();
    return this.unbind();
  };

  return Schedules;

})();

controllers.Settings = (function() {

  __extends(Settings, Flint.Controller);

  function Settings() {
    this.setup = __bind(this.setup, this);
    this.noop = __bind(this.noop, this);
    this.saved = __bind(this.saved, this);
    this.navigated = __bind(this.navigated, this);
    Settings.__super__.constructor.apply(this, arguments);
  }

  Settings.prototype.routes = {
    'setup': 'main',
    'promos': 'promotions',
    'docs': 'documents',
    'account': 'account',
    'partners': 'partners',
    'company': 'profile',
    'bank': 'bank',
    'payment': 'payment',
    'noop': 'noop'
  };

  Settings.prototype.form = 'SettingsForm';

  Settings.prototype.menus = {
    settings: {
      title: 'Setup',
      contents: [
        {
          id: '_employees',
          href: '#employees',
          title: 'Guides &amp; Staff'
        }, {
          id: '_trips',
          href: '#trips',
          title: 'Activities &amp; Trips'
        }, {
          id: '_lodging',
          href: '#lodging',
          title: 'Lodging &amp; Meals'
        }, {
          id: '_products',
          href: '#products',
          title: 'Products &amp; Rentals'
        }, {
          id: '_forms',
          href: '#forms',
          title: 'Client Form Data'
        }, {
          id: '_promos',
          href: '#promos',
          title: 'Promotion Codes'
        }, {
          id: '_docs',
          href: '#docs',
          title: 'Documents'
        }
      ]
    },
    account: {
      title: 'Settings',
      contents: [
        {
          id: '_pages',
          href: '#pages',
          title: 'Website Pages'
        }, {
          id: '_profile',
          href: '#company',
          title: 'Company Profile'
        }, {
          id: '_bank',
          href: '#bank',
          title: 'Bank Account'
        }, {
          id: '_payment',
          href: '#payment',
          title: 'Payment Method'
        }, {
          id: '_partners',
          href: '#partners',
          title: 'Manage Partners'
        }
      ]
    }
  };

  Settings.prototype.main = function() {
    $('title').html('Setup | Flybook');
    return this.setup(this.menus.settings, false, false);
  };

  Settings.prototype.account = function() {
    return this.setup(this.menus.account, false, false);
  };

  Settings.prototype.navigated = function() {
    return app.dropdown.collapse();
  };

  Settings.prototype.promotions = function() {
    var _this = this;
    this.setup(this.menus.settings, 'promos');
    app.helpers.after_transition('#app', function() {
      _this.form.render('settings/promotions', {}, _this.form.model);
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.documents = function() {
    var _this = this;
    this.setup(this.menus.settings, 'docs');
    this.doc_list = new views.FormsList;
    this.doc_list.on('document:deleted', function(doc) {
      return app.sync.ajax('/api/documents/', {
        contentType: 'application/json',
        type: 'DELETE',
        data: JSON.stringify(doc)
      });
    });
    this.doc_list.on('documents:saved', function() {
      var account;
      app.notifications.notify('Changes to your settings have been saved');
      account = new models.Account(app.user.get('account'));
      account.url = '/api/accounts/';
      return account.save(null, {
        success: function(result) {
          _this.account = account;
          return app.user.set('account', account.attributes, {
            silent: true
          });
        }
      });
    });
    app.helpers.after_transition('#app', function() {
      _this.doc_list.render('settings/documents');
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.partners = function() {
    var _this = this;
    this.setup(this.menus.account, 'partners');
    app.helpers.after_transition('#app', function() {
      _this.form.render('settings/partners_intro', {}, _this.form.model);
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.profile = function() {
    var _this = this;
    this.setup(this.menus.account, 'profile');
    this.form.model.industries.sort();
    app.helpers.after_transition('#app', function() {
      app.helpers.loader('#app');
      $('#app').css({
        left: '230px'
      });
      return app.helpers.get_countries_and_states(function() {
        return _this.form.render('settings/company_profile', {
          countries: app.countries,
          states: app.states
        }, _this.form.model);
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.bank = function() {
    var _this = this;
    this.setup(this.menus.account, 'bank');
    app.helpers.after_transition('#app', function() {
      _this.form.render('settings/bank_account', {}, _this.form.model);
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.payment = function() {
    var _this = this;
    this.setup(this.menus.account, 'payment');
    app.helpers.after_transition('#app', function() {
      _this.form.render('settings/payment', {}, _this.form.model);
      return $('#app').css({
        left: '230px'
      });
    });
    return $('#app').css({
      left: '-450px'
    });
  };

  Settings.prototype.saved = function(account) {
    var _this = this;
    app.notifications.notify('Changes to your settings have been saved');
    account.url = '/api/accounts/';
    return account.save(null, {
      success: function(result) {
        _this.account = account;
        app.user.set('account', account.attributes, {
          silent: true
        });
        return app.navigation.render();
      }
    });
  };

  Settings.prototype.noop = function() {
    return app.sidebar.deselect();
  };

  Settings.prototype.setup = function(menu, selected, expand) {
    if (selected == null) selected = false;
    if (expand == null) expand = true;
    this.form.model = new models.Account(app.user.get('account'));
    app.dropdown.collapse();
    app.undelegate();
    this.delegate();
    if (menu === this.menus.settings) {
      app.navigation.select('setup');
    } else {
      app.navigation.select(false);
    }
    app.sidebar.render({
      contents: menu.contents,
      title: menu.title
    }).show().select(selected);
    return $('#app').css({
      left: '-540px',
      width: '450px'
    });
  };

  return Settings;

})();

controllers.Trips = (function() {

  __extends(Trips, Flint.Controller);

  function Trips() {
    this.update = __bind(this.update, this);
    Trips.__super__.constructor.apply(this, arguments);
  }

  Trips.prototype.routes = {
    'trips': 'main'
  };

  Trips.prototype.form = 'TripForm';

  Trips.prototype.form_el = '#dropdown';

  Trips.prototype.model = 'Trip';

  Trips.prototype.collection = 'Trips';

  Trips.prototype.template_list = 'trips/list';

  Trips.prototype.template_help = 'trips/help';

  Trips.prototype.template_create = 'trips/create';

  Trips.prototype.template_edit = 'trips/edit';

  Trips.prototype.sortable = true;

  Trips.prototype.sorted_url = '/api/trips/_sort/';

  Trips.prototype.main = function() {
    var _this = this;
    this.list.before = function() {
      return this.data = {
        active: this.collection.where({
          active: '1',
          package: '0'
        }),
        packages: this.collection.where({
          active: '1',
          package: '1'
        }),
        inactive: this.collection.where({
          active: '0'
        })
      };
    };
    app.helpers.after_transition('#app', function() {
      _this.setup();
      return _this.refresh(function(trips) {
        if (trips) {
          return _this.list.render();
        } else {
          return _this.list.help(false);
        }
      });
    });
    return $('#app').css({
      left: '-450px',
      width: '450px'
    });
  };

  Trips.prototype.edit = function(id) {
    var _this = this;
    return app.employees.fetch(function(staff) {
      return _this.refresh(function(trips) {
        var model;
        model = _this.list.collection.get(id);
        return app.dropdown.position('250px', function() {
          app.helpers.loader('#dropdown');
          return _this.get(id, function(model) {
            return app.lodging.fetch(function(lodges) {
              var activities, lodging;
              lodging = [[0, 'No Lodging Packaged'], [1, 'Any Available Lodge (Check Availability)'], [-1, 'Any Available Lodge (Ignore Availability)']];
              _.each(lodges.models, function(lodge) {
                return lodging.push([lodge.get('id'), lodge.get('name')]);
              });
              activities = [[0, 'Primary package activity...'], [1, 'N/A, this is the activity']];
              _.each(_this.list.collection.models, function(trip) {
                if (trip.get('id') !== model.get('id')) {
                  return activities.push([trip.get('id'), trip.get('name')]);
                }
              });
              return _this.form.render('trips/edit', {
                lodges: lodging,
                activities: activities
              }, model);
            });
          });
        });
      });
    });
  };

  Trips.prototype.update = function() {
    return this.list.render();
  };

  Trips.prototype.setup = function(callback) {
    app.helpers.loader('#app').css({
      left: '230px'
    });
    app.sidebar.render({
      contents: app.settings.menus.settings.contents,
      title: app.settings.menus.settings.title
    }).show().select('trips');
    app.navigation.select('setup');
    app.undelegate();
    return this.delegate();
  };

  return Trips;

})();

flybook.Form = (function() {

  __extends(Form, Flint.Form);

  function Form() {
    this.cancel = __bind(this.cancel, this);
    this.next_tab = __bind(this.next_tab, this);
    this.tab = __bind(this.tab, this);
    this.pre_check_docs = __bind(this.pre_check_docs, this);
    this.document_click = __bind(this.document_click, this);
    this.extend_exceptions = __bind(this.extend_exceptions, this);
    this.extend_highlights = __bind(this.extend_highlights, this);
    this.render_starts = __bind(this.render_starts, this);
    this.dateclick = __bind(this.dateclick, this);
    this.destroy_map = __bind(this.destroy_map, this);
    this.lookup_location = __bind(this.lookup_location, this);
    this.setup_map = __bind(this.setup_map, this);
    this.upload_complete = __bind(this.upload_complete, this);
    this.setup_photos = __bind(this.setup_photos, this);
    this.update_upsells = __bind(this.update_upsells, this);
    this.upsell_click = __bind(this.upsell_click, this);
    this.rental_click = __bind(this.rental_click, this);
    this.remove_deposit_rule = __bind(this.remove_deposit_rule, this);
    this.add_deposit_rule = __bind(this.add_deposit_rule, this);
    this.remove_price_point = __bind(this.remove_price_point, this);
    this.add_price_point = __bind(this.add_price_point, this);
    this.before = __bind(this.before, this);
    Form.__super__.constructor.apply(this, arguments);
  }

  Form.prototype.el = '#dropdown';

  Form.prototype.events = {
    'click #weekdays input,#weekdays label': 'weekday_click',
    'keyup #lat,#lng': 'reverse_lookup',
    'click .lookup': 'lookup_location',
    'click .add-price-point': 'add_price_point',
    'click .remove-price-point': 'remove_price_point',
    'click .add-deposit-rule': 'add_deposit_rule',
    'click .remove-deposit-rule': 'remove_deposit_rule',
    'click .ups': 'upsell_click',
    'click .ren': 'rental_click',
    'click .frm': 'document_click',
    'click .tabs a': 'tab',
    'click .next-step': 'next_tab'
  };

  Form.prototype.init = function() {
    return this.events = _.extend({}, this.__events, this.events);
  };

  Form.prototype.before = function(callback) {
    var _this = this;
    $(window).scrollTop(0);
    this.tab_index = 0;
    _.extend(this.data, {
      account: app.user.get('account'),
      trips: app.trips.list.collection.models
    });
    return app.dropdown.expand(function() {
      app.helpers.loader(_this.el);
      callback();
      return app.dropdown.fluid();
    });
  };

  Form.prototype.add_price_point = function() {
    var end_date, end_month, price, start_date, start_month;
    price = {
      id: Math.random() * 3000
    };
    $('.trip-pricing input,.trip-pricing select').each(function() {
      var field, val;
      field = $(this).attr('name');
      val = $(this).val().toString().replace(/[A-Za-z$-,]/g, '');
      return price[field] = val;
    });
    if ($('.nope').is(':checked')) {
      start_month = price.start_month < 10 ? '0' + price.start_month : price.start_month;
      start_date = price.start_dt < 10 ? '0' + price.start_dt : price.start_dt;
      end_month = price.end_month < 10 ? '0' + price.end_month : price.end_month;
      end_date = price.end_dt < 10 ? '0' + price.end_dt : price.end_dt;
      price.start_date = price.start_year + '-' + start_month + '-' + start_date;
      price.end_date = price.end_year + '-' + end_month + '-' + end_date;
    }
    if (price.price === '') {
      app.notifications.error('You need to specify a price!');
      return false;
    }
    if (price.days === '') price.days = '1';
    if (price.people === '' || price.price === '') {
      app.notifications.error('You need a both number of people and the cost per person to add this price');
      return false;
    }
    this.model.set('prices_changed', true);
    this.price_points.push(price);
    return this.update_prices();
  };

  Form.prototype.remove_price_point = function(e) {
    var id, li;
    var _this = this;
    this.model.set('prices_changed', true);
    li = $(e.target).parent();
    id = li.attr('id');
    return _.each(this.price_points, function(price) {
      if (price.id.toString() === id.toString()) {
        _this.price_points = _.without(_this.price_points, price);
        _this.update_prices();
      }
    });
  };

  Form.prototype.update_prices = function(price) {
    var _this = this;
    $('#prices').html('');
    $('.add-fields input').val('');
    if (this.price_points.length > 0) {
      $('.pricing-help').css({
        display: 'none'
      });
    } else if (!app.isMobile) {
      $('.pricing-help').css({
        display: 'block'
      });
    }
    _.each(this.price_points, function(price) {
      var html;
      html = tmpl['trips_price'](price);
      return $('#prices').append(html);
    });
    this.model.set('pricing', this.price_points);
    return this.delegateEvents();
  };

  Form.prototype.add_deposit_rule = function() {
    var deposit;
    deposit = {
      id: Math.random() * 3000
    };
    $('.deposits input').each(function() {
      var field, val;
      field = $(this).attr('name');
      val = $(this).val().toString().replace(/[A-Za-z$-,]/g, '');
      return deposit[field] = val;
    });
    if (deposit.days_prior === '' || deposit.percent_due === '') {
      app.notifications.error('You need a both number of days prior and precent due to add this rule.');
      return false;
    }
    this.model.set('deposits_changed', true);
    this.deposit_rules.push(deposit);
    return this.update_deposits();
  };

  Form.prototype.remove_deposit_rule = function(e) {
    var id, li;
    var _this = this;
    this.model.set('deposits_changed', true);
    li = $(e.target).parent();
    id = li.attr('id');
    return _.each(this.deposit_rules, function(dep) {
      if (dep.id.toString() === id.toString()) {
        _this.deposit_rules = _.without(_this.deposit_rules, dep);
        _this.update_deposits();
      }
    });
  };

  Form.prototype.update_deposits = function(price) {
    var out;
    var _this = this;
    $('#deposits').html('');
    $('.deposits input').val('');
    if (this.deposit_rules.length > 0) {
      $('.deposit-help').css({
        display: 'none'
      });
    } else if (!app.isMobile) {
      $('.deposit-help').css({
        display: 'block'
      });
    }
    out = tmpl_compile(this.deposit_tmpl);
    _.each(this.deposit_rules, function(price) {
      var html;
      html = out(price);
      return $('#deposits').append(html);
    });
    this.model.set('deposit_rules', this.deposit_rules);
    return this.delegateEvents();
  };

  Form.prototype.rental_click = function(e) {
    var box, id, set_rental;
    var _this = this;
    box = $(e.target);
    id = box.parent().parent().attr('id');
    if (box.attr('checked')) {
      set_rental = '1';
    } else {
      set_rental = '0';
    }
    _.each(this.upsell, function(up, index) {
      if (up.trip_id === id) return _this.upsell[index].as_rental = set_rental;
    });
    return this.update_upsells();
  };

  Form.prototype.upsell_click = function(e) {
    var box, id;
    var _this = this;
    box = $(e.target);
    id = box.parent().parent().attr('id');
    if (box.attr('checked')) {
      this.upsell.push({
        trip_id: id
      });
    } else {
      _.each(this.upsell, function(up, index) {
        if (up.trip_id === id) return _this.upsell.splice(index, 1);
      });
    }
    this.model.set('trips', this.upsell);
    return this.update_upsells();
  };

  Form.prototype.update_upsells = function() {
    var _this = this;
    $('.ups,.ren').attr('checked', false);
    return _.each(this.upsell, function(up) {
      $('#' + up.trip_id + ' .ups').attr('checked', true);
      if (up.as_rental === '1') {
        return $('#' + up.trip_id + ' .ren').attr('checked', true);
      }
    });
  };

  Form.prototype.setup_photos = function(object_name, id_relation_object, max) {
    var account, num, photos, uploader, url, _results;
    if (max == null) max = 6;
    account = app.user.get('account');
    photos = this.model.get('photos');
    _results = [];
    for (num = 1; 1 <= max ? num <= max : num >= max; 1 <= max ? num++ : num--) {
      uploader = new views.PhotoUploader('photo-upload-' + num, 'photo' + num, '/api/uploads/_' + object_name + '_photo/', this.model.get('id'), '', id_relation_object, object_name + '_');
      uploader.photo_index = num;
      uploader.on('complete', this.upload_complete);
      if (photos && photos.indexOf(num) >= 0) {
        url = 'https://s3.amazonaws.com/flybook/' + object_name + '_photo' + num + '_' + this.model.get('id') + '.jpg?' + Math.random() * 1000;
        _results.push($('#photo' + num + ' div:first').css({
          'background-image': 'url("' + url + '")'
        }));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Form.prototype.upload_complete = function(uploader) {
    var photos, uploaded;
    uploaded = uploader.photo_index;
    photos = this.model.get('photos') ? this.model.get('photos').split(',') : [];
    photos.push(uploaded.toString());
    photos = _.uniq(photos, true);
    return this.model.set({
      photos: photos.join(',')
    });
  };

  Form.prototype.setup_map = function() {
    var lat, latLng, lng, map_options;
    var _this = this;
    lat = this.model.get('lat');
    lng = this.model.get('lng');
    if (lat === '0' || lat === '') lat = '61.127274';
    if (lng === '0' || lng === '') lng = '-146.344617';
    latLng = new google.maps.LatLng(lat, lng);
    map_options = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.gmap = new google.maps.Map(document.getElementById('gmap'), map_options);
    this.geocoder = new google.maps.Geocoder;
    google.maps.event.addListener(this.gmap, 'click', function(event) {
      var res;
      res = event.latLng;
      lat = res.lat().toString().substr(0, 8);
      lng = res.lng().toString().substr(0, 8);
      $('#lat').val(lat);
      $('#lng').val(lng);
      _this.model.set('lat', lat, {
        silent: true
      });
      _this.model.set('lng', lng, {
        silent: true
      });
      _this.marker.setMap(null);
      return _this.marker = new google.maps.Marker({
        map: _this.gmap,
        position: event.latLng
      });
    });
    return this.marker = new google.maps.Marker({
      map: this.gmap,
      position: latLng
    });
  };

  Form.prototype.lookup_location = function(e) {
    var _this = this;
    this.cancel_lookup = true;
    this.lookup_value = $('#location').val();
    if (this.lookup_value === '') return false;
    window.clearTimeout(app.helpers.timer);
    return app.helpers.delay(800, function() {
      if (!_this.geocoder) return false;
      return _this.geocoder.geocode({
        'address': _this.lookup_value
      }, function(results, status) {
        var lat, lng, res;
        if (status === google.maps.GeocoderStatus.OK) {
          res = results[0].geometry.location;
          lat = res.lat().toString().substr(0, 8);
          lng = res.lng().toString().substr(0, 8);
          $('#lat').val(lat);
          $('#lng').val(lng);
          _this.model.set({
            lat: lat,
            lng: lng
          });
          _this.gmap.setCenter(results[0].geometry.location);
          if (_this.marker) _this.marker.setMap(null);
          return _this.marker = new google.maps.Marker({
            map: _this.gmap,
            position: results[0].geometry.location
          });
        } else {
          return app.notifications.error('Not even google knows where that is! ');
        }
      });
    });
  };

  Form.prototype.reverse_lookup = function(e) {
    var _this = this;
    if (this.cancel_lookup) return false;
    this.model.set({
      lat: lat,
      lng: lng
    });
    if (lat && lng) {
      window.clearTimeout(app.helpers.timer);
      return app.helpers.delay(800, function() {
        var latLng;
        latLng = new google.maps.LatLng(lat, lng);
        return _this.geocoder.geocode({
          'latLng': latLng
        }, function(results, status) {
          var addr;
          if (status === google.maps.GeocoderStatus.OK && results[1]) {
            _this.gmap.setCenter(latLng);
            if (_this.marker) _this.marker.setMap(null);
            _this.marker = new google.maps.Marker({
              map: _this.gmap,
              position: latLng
            });
            addr = results[1].formatted_address;
            $('#location').val(addr);
            return _this.model.set('location', addr);
          } else {
            return app.notifications.error('Not even google knows where that is!');
          }
        });
      });
    }
  };

  Form.prototype.destroy_map = function() {
    $('#gmap').empty();
    delete this.gmap;
    delete this.geocoder;
    return delete this.marker;
  };

  Form.prototype.weekday_click = function() {
    var attribute, days, val;
    var _this = this;
    days = [];
    _.each($('#weekdays').find('input[type=checkbox]:checked'), function(item, index) {
      return days.push(item.value);
    });
    attribute = 'start_days';
    val = days.join(',');
    this.start_days = days;
    this.model.set(attribute, val.toString());
    return this.render_starts();
  };

  Form.prototype.dateclick = function(date, jsdate, selected, e) {
    var dow;
    dow = $(e.target).attr('data-dow');
    if (_.indexOf(this.start_days, dow) >= 0) date = "-" + date;
    if (_.indexOf(this.start_dates, date) >= 0) {
      this.start_dates = _.without(this.start_dates, date);
    } else {
      this.start_dates.push(date);
    }
    this.model.set('start_dates', this.start_dates.join(','));
    return this.render_starts();
  };

  Form.prototype.render_starts = function() {
    var exceptions, selected_dates;
    var _this = this;
    $('input[name="dow[]"]').attr('checked', false);
    $('#weekday-calendar td').removeClass('start').removeClass('trip-date').removeClass('trip-night');
    selected_dates = [];
    _.each(this.start_days, function(dow) {
      $('#dow' + dow).attr('checked', true);
      return $('.dow' + dow).each(function(item) {
        $(this).addClass('start');
        return selected_dates.push($(this).attr('data-sql'));
      });
    });
    exceptions = [];
    _.each(this.start_dates, function(date) {
      if (date.substr(0, 1) === "-") {
        date = date.substr(1, date.length - 1);
        $('td[data-sql=' + date + ']').removeClass('start').removeClass('trip-date');
        return exceptions.push(date);
      } else {
        $('td[data-sql=' + date + ']').addClass('start');
        return selected_dates.push(date);
      }
    });
    this.extend_highlights(selected_dates);
    return this.extend_exceptions(exceptions);
  };

  Form.prototype.extend_highlights = function(selected_dates) {
    var duration, nights;
    var _this = this;
    duration = this.model.get('duration');
    nights = this.model.get('lodging_nights');
    if (duration > 1 || nights > 1) {
      return _.each(selected_dates, function(date) {
        var end, jsdate, light, sql, start, _results;
        jsdate = app.helpers.sqldate_to_js(date);
        if (jsdate && duration > 1) {
          start = jsdate.getTime();
          end = new Date(start + (60 * 60 * 24 * (duration - 2) * 1000)).getTime();
          while (start <= end + (60 * 60 * 24 * 1000)) {
            start += 60 * 60 * 23 * 1000;
            light = new Date(start);
            sql = app.helpers.jsdate_to_sql(light);
            $('td[data-sql=' + sql + ']').addClass('trip-date');
          }
        }
        if (jsdate && nights > 1) {
          start = jsdate.getTime();
          end = new Date(start + (60 * 60 * 24 * (nights - 2) * 1000)).getTime();
          if (_this.model.get('arrive_night_prior') === '1') {
            start -= 60 * 60 * 21 * 2 * 1000;
            end -= 60 * 60 * 25 * 1000;
          }
          _results = [];
          while (start <= end + (60 * 60 * 25 * 1000)) {
            start += 60 * 60 * 23 * 1000;
            light = new Date(start);
            sql = app.helpers.jsdate_to_sql(light);
            _results.push($('td[data-sql=' + sql + ']').addClass('trip-night'));
          }
          return _results;
        }
      });
    }
  };

  Form.prototype.extend_exceptions = function(exceptions) {
    var duration, nights;
    var _this = this;
    duration = this.model.get('duration');
    nights = this.model.get('lodging_nights');
    if (duration > 1 || nights > 1) {
      return _.each(exceptions, function(date) {
        var end, jsdate, light, sql, start, _results;
        jsdate = app.helpers.sqldate_to_js(date);
        if (jsdate && duration > 1) {
          start = jsdate.getTime() - 60 * 60 * 24 * 1000;
          end = new Date(start + (60 * 60 * 24 * (duration - 1) * 1000)).getTime();
          while (start <= end) {
            start += 60 * 60 * 24 * 1000;
            light = new Date(start);
            sql = app.helpers.jsdate_to_sql(light);
            $('td[data-sql=' + sql + ']').removeClass('trip-date').removeClass('start');
          }
        }
        if (jsdate && nights > 1) {
          start = jsdate.getTime();
          end = new Date(start + (60 * 60 * 24 * (nights - 2) * 1000)).getTime();
          if (_this.model.get('arrive_night_prior') === '1') {
            start -= 60 * 60 * 24 * 2 * 1000;
            end -= 60 * 60 * 23 * 1000;
          }
          _results = [];
          while (start <= end) {
            start += 60 * 60 * 24 * 1000;
            light = new Date(start);
            sql = app.helpers.jsdate_to_sql(light);
            _results.push($('td[data-sql=' + sql + ']').removeClass('trip-night'));
          }
          return _results;
        }
      });
    }
  };

  Form.prototype.document_click = function(e) {
    var docs, id, there;
    var _this = this;
    id = $(e.target).val();
    docs = this.model.get('documents') ? this.model.get('documents').split(',') : [];
    there = false;
    _.each(docs, function(doc, index) {
      if (doc === id) {
        docs.splice(index, 1);
        return there = true;
      }
    });
    if (!there) docs.push(id);
    return this.model.set('documents', docs.join(','));
  };

  Form.prototype.pre_check_docs = function() {
    var docs;
    var _this = this;
    docs = this.model.get('documents') ? this.model.get('documents').split(',') : [];
    return _.each(docs, function(doc) {
      return $('input[value="' + doc + '"]').attr('checked', true);
    });
  };

  Form.prototype.tab = function(e) {
    var tab, tabs;
    window.clearTimeout(app.helpers.timer);
    $('.tabs a').removeClass('current');
    $(e.target).addClass('current');
    this.tab_index = $('.tabs a').index(e.target);
    $('.tabshell').css({
      left: ((this.tab_index * 730) * -1) + 'px'
    });
    tabs = $('.tabs').children('li').length;
    if (this.tab_index === tabs - 1 && (this.model.get('setup_complete') === '0' || !this.model.get('setup_complete'))) {
      this.model.set('setup_complete', '1');
      $('.done').empty();
      $('.next-step').text('Finished!').removeClass('continue').removeClass('next-step').addClass('done');
      this.delegateEvents();
    }
    tab = $(e.target);
    this.trigger('tabbed', tab);
    if (tab.html().toString().indexOf('hotos') > 0) {
      if (document.getElementById('google-maps')) {
        return this.setup_map();
      } else {
        return app.helpers.load_google_maps_api(this.gmap_callback_method);
      }
    } else {
      return this.destroy_map();
    }
  };

  Form.prototype.next_tab = function() {
    var current, next, tabs;
    window.clearTimeout(app.helpers.timer);
    tabs = $('.tabs').children('li').length;
    if (this.tab_index < tabs) {
      current = $('.tabs li a[class="tab current"]');
      current.removeClass('current');
      next = $(current.parent().next().children('a')[0]);
      next.addClass('current');
      if (next && next.html() && next.html().indexOf('hotos') > 0) {
        if (document.getElementById('google-maps')) {
          this.setup_map();
        } else {
          app.helpers.load_google_maps_api('app.trips.form.setup_map');
        }
      } else {
        this.destroy_map();
      }
      this.tab_index++;
      $('.tabshell').css({
        left: ((this.tab_index * 730) * -1) + 'px'
      });
      if (this.tab_index === tabs - 1) {
        this.model.set('setup_complete', '1');
        $('.done').empty();
        $('.next-step').text('Finished!').removeClass('continue').addClass('done');
        this.delegateEvents();
      }
      return this.trigger('tabbed', next);
    }
  };

  Form.prototype.cancel = function(silent) {
    var _this = this;
    if (silent == null) silent = false;
    this.modelChanged = false;
    app.helpers.after_transition('#dropdown', function() {
      _this.destroy_map();
      if (!(silent && !_.isObject(silent))) {
        return _this.trigger('canceled', _this.model);
      }
    });
    return app.dropdown.collapse();
  };

  return Form;

})();

models.Account = (function() {

  __extends(Account, Backbone.Model);

  function Account() {
    Account.__super__.constructor.apply(this, arguments);
  }

  Account.prototype.defaults = {
    country: 'USA',
    state: 'OR',
    notes: '',
    description: ''
  };

  Account.prototype.payment_methods = [['1', 'Invoice'], ['2', 'Credit Card']];

  Account.prototype.packages = [['1', 'Basic'], ['2', 'Custom'], ['3', 'Some Clever Name'], ['3', 'Super Pro VIP Badass']];

  Account.prototype.industries = ['Fishing (Fly)', 'Fishing (Freshwater/ Other)', 'Fishing (Saltwater)', 'Charter Boats', 'Kayaking (Sea/Touring)', 'Whitewater', 'Boardsailing/ Windsurfing', 'Surfing', 'SUP Lessons/Rentals', 'Scuba Diving/ Snorkeling', 'Climbing', 'Mountaineering', 'Skiing/ Snowboarding (Downhill)', 'Skiing (Nordic)', 'Bungee jumping', 'Hang Gliding', 'Para Gliding', 'Heli-skiing', 'Snowshoeing', 'Snowmobile Rental', 'Snowmobile Tours', 'Cycling', 'Sailing', 'Canoeing', 'Backpacking', 'Hiking', 'Hunting', 'Birdwatching', 'Motorcycle Tours', 'Off-Road Tours', 'Camping', 'Wildlife Viewing', 'Eco-Tours', 'Lodging', 'Adventure Travel', 'Equestrian/ Horseback', 'Scenic Tours', 'Motorsports', 'Dude Ranch', 'Skydive', 'Flightseeing / Helicopter', 'Boat Tours', 'Vehicle Tours', 'Photography', 'Spelunking', 'Nature Hikes/ Interpretive', 'Events', 'Educational classes', 'Lessons', 'Rentals', 'Other'];

  Account.prototype.validate = function(attrs) {
    var in_use, valid_email;
    var _this = this;
    if (!attrs.company || attrs.company === '') {
      return 'You must enter a company name for the account!';
    }
    if (this.collection) {
      in_use = false;
      _.each(this.collection.models, function(model) {
        if (model.id !== _this.id) {
          if (model.get('flybook_url') !== '' && model.get('flybook_url') === attrs.flybook_url) {
            return in_use = true;
          }
        }
      });
      if (in_use) {
        return 'The Flybook URL you have choosen is use! Please try another.';
      }
    }
    valid_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (attrs.email && attrs.email.length > 0 && !attrs.email.match(valid_email)) {
      return 'You must use a valid email address!';
    }
  };

  return Account;

})();

models.Client = (function() {

  __extends(Client, Backbone.Model);

  function Client() {
    Client.__super__.constructor.apply(this, arguments);
  }

  Client.prototype.url = '/api/clients/';

  Client.prototype.validate = function(attrs) {};

  return Client;

})();

models.Employee = (function() {

  __extends(Employee, Backbone.Model);

  function Employee() {
    this.calendar_events = __bind(this.calendar_events, this);
    this.is_blacked_out = __bind(this.is_blacked_out, this);
    this.is_guiding = __bind(this.is_guiding, this);
    this.is_available = __bind(this.is_available, this);
    Employee.__super__.constructor.apply(this, arguments);
  }

  Employee.prototype.defaults = {
    email: '',
    phone: '',
    nickname: '',
    role: 'guide',
    active: 1,
    self_managed: 1,
    blackout_dates: [],
    blackout_days: []
  };

  Employee.prototype.roles = [['manager', 'Manager / Owner'], ['staff', 'Office Staff'], ['guide', 'Guide'], ['assistant', 'Assistant']];

  Employee.prototype.initialize = function() {
    return this.url = '/api/employees/';
  };

  Employee.prototype.validate = function(attrs) {
    var valid_email;
    if (!attrs.id && attrs.nickname === '') {
      return 'Your new employee needs a name!';
    }
    if (attrs.id && attrs.nickname === '') return 'Your employee needs a name!';
    valid_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (attrs.email.length > 0 && !attrs.email.match(valid_email)) {
      return 'You must use a valid email address or leave it blank.';
    }
  };

  Employee.prototype.is_available = function(date, omit_trip) {
    var available, dow, sql, valid;
    if (omit_trip == null) omit_trip = false;
    available = true;
    date = moment(date);
    dow = date.day();
    valid = this.get('blackout_days') && this.get('blackout_days').indexOf(dow) < 0;
    if (valid && this.get('blackout_dates') > '') {
      sql = date.format('YYYY-MM-DD');
      available = this.get('blackout_dates').indexOf(sql) < 0;
      available = this.get('blackout_dates').indexOf('-' + sql) >= 0;
    }
    return available;
  };

  Employee.prototype.is_guiding = function(date) {
    var guiding, is_guiding, res, reservations, _i, _len, _ref;
    var _this = this;
    guiding = [];
    reservations = new Backbone.Collection(app.reserved.models);
    _ref = reservations.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      res = _ref[_i];
      res = res.attributes;
      if (res.activities && res.start_date === moment(date).format('YYYY-MM-DD')) {
        _.each(res.activities, function(activity) {
          if (activity.guide_id === _this.get('id')) {
            return guiding.push({
              reservation: res,
              trip_id: res.trip_id,
              time: res.start_time
            });
          }
        });
      }
    }
    is_guiding = guiding.length > 0 ? guiding : false;
    return is_guiding;
  };

  Employee.prototype.is_blacked_out = function(date) {
    var blacked_out, dow, sql;
    blacked_out = false;
    dow = date.getDay();
    blacked_out = this.get('blackout_days') && this.get('blackout_days').indexOf(dow) >= 0;
    sql = moment(date).clone().format('YYYY-MM-DD');
    if (this.get('blackout_dates') > '' && this.get('blackout_dates').indexOf(sql) >= 0) {
      blacked_out = true;
    }
    if (this.get('blackout_dates') > '' && this.get('blackout_dates').indexOf('-' + sql) >= 0) {
      blacked_out = false;
    }
    return blacked_out;
  };

  Employee.prototype.calendar_events = function(start, end, callback) {
    var caldate, clients, events, fevent, guiding;
    var _this = this;
    events = [];
    start = moment(start);
    end = moment(end);
    while (start < end) {
      caldate = start.clone();
      caldate.hours(22);
      caldate.add('minutes', this.get('sort_order'));
      fevent = {
        title: this.get('nickname'),
        type: 'employee',
        backgroundColor: 'transparent',
        color: 'transparent',
        employee: this.attributes
      };
      guiding = this.is_guiding(caldate.toDate());
      if (guiding) {
        fevent.textColor = '#6a6944';
        clients = [];
        _.each(guiding, function(busy) {
          return clients.push(busy.reservation.order.name);
        });
        fevent.title += '(' + clients.join(',') + ')';
        fevent.start = caldate.toDate();
        events.push(fevent);
      } else if (!this.is_blacked_out(caldate.toDate())) {
        fevent.textColor = '#333';
        fevent.start = caldate.toDate();
        events.push(fevent);
      } else {
        fevent.textColor = '#cc0000';
        fevent.title += ' (out)';
        fevent.start = caldate.add('minutes', 90).toDate();
        events.push(fevent);
      }
      start = start.add('days', 1);
    }
    return callback(events);
  };

  return Employee;

})();

models.Lodge = (function() {

  __extends(Lodge, Backbone.Model);

  function Lodge() {
    this.schedule_on = __bind(this.schedule_on, this);
    this.calendar_events = __bind(this.calendar_events, this);
    this.get_party_size = __bind(this.get_party_size, this);
    this.get_cost = __bind(this.get_cost, this);
    this.room_is_available = __bind(this.room_is_available, this);
    this.room_is_available_between = __bind(this.room_is_available_between, this);
    this.is_available = __bind(this.is_available, this);
    this.get_availability_by_month = __bind(this.get_availability_by_month, this);
    Lodge.__super__.constructor.apply(this, arguments);
  }

  Lodge.prototype.defaults = {
    name: '',
    style: 'Lodge',
    description: '',
    end_date: '31',
    end_month: '12'
  };

  Lodge.prototype.styles = ['Cabin', 'Dormitory', 'Hotel', 'Lodge', 'Motel', 'Yurt'];

  Lodge.prototype.months = [['1', 'Jan'], ['2', 'Feb'], ['3', 'Mar'], ['4', 'Apr'], ['5', 'May'], ['6', 'Jun'], ['7', 'Jul'], ['8', 'Aug'], ['9', 'Sep'], ['10', 'Oct'], ['11', 'Nov'], ['12', 'Dec']];

  Lodge.prototype.days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  Lodge.prototype.validate = function(attrs) {
    if (!attrs.id && attrs.name === '') return 'Your new lodge needs a name!';
    if (attrs.id && attrs.name === '') return 'Your lodge needs a name!';
  };

  Lodge.prototype.get_availability_by_month = function(year, month, people, which_room, nights) {
    var availability, available, date, day, range, _ref;
    if (which_room == null) which_room = false;
    if (nights == null) nights = false;
    available = [];
    for (day = 1, _ref = moment([year, month, 1]).daysInMonth() + 1; 1 <= _ref ? day < _ref : day > _ref; 1 <= _ref ? day++ : day--) {
      date = moment([year, month, day]);
      range = date;
      if (date > moment()) {
        if (nights) range = date.clone().add('days', nights - 1);
        availability = this.is_available(date.toDate(), range.toDate(), people, which_room);
        if (availability.is_available) {
          available.push({
            availability: availability,
            date: date,
            sql: date.format('YYYY-MM-DD')
          });
        }
      }
    }
    return available;
  };

  Lodge.prototype.is_available = function(date, end, people, which_room) {
    var availability, available, beds_available, occupied, rooms, start;
    var _this = this;
    available = true;
    occupied = false;
    start = date.getTime();
    end = end.getTime();
    while (start <= end) {
      start = moment(start);
      if (moment() <= moment(start)) {
        rooms = [];
        beds_available = 0;
        if (which_room && this.room_is_available(start.clone().toDate(), which_room)) {
          beds_available = which_room.quantity * which_room.sleeps;
        } else if (!which_room) {
          rooms = this.get('rooms');
          beds_available = 0;
          _.each(rooms, function(room) {
            if (_this.room_is_available(start.clone().toDate(), room)) {
              return beds_available += room.sleeps * room.quantity;
            } else {
              return rooms = _.without(rooms, room);
            }
          });
        }
        if (beds_available <= 0) available = false;
      }
      start = moment(start).add('days', '1');
    }
    availability = {
      is_available: available,
      beds: beds_available,
      occupied: occupied,
      rooms: rooms
    };
    return availability;
  };

  Lodge.prototype.room_is_available_between = function(start, end, room) {
    var available, check;
    available = false;
    start = start.getTime();
    end = end.getTime();
    while (start <= end) {
      check = new Date(start);
      if (this.room_is_available(check, room)) available = true;
      start += 60 * 60 * 24 * 1000;
    }
    return available;
  };

  Lodge.prototype.room_is_available = function(date, room) {
    var available, check, check_date, check_month, end_date, end_month, price_end, price_start, reserved, start_date, start_month;
    var _this = this;
    available = false;
    check_date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    check_month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    check = check_month + '-' + check_date;
    start_month = room.start_month < 10 ? '0' + room.start_month : room.start_month;
    start_date = room.start_date < 10 ? '0' + room.start_date : room.start_date;
    end_month = room.end_month < 10 ? '0' + room.end_month : room.end_month;
    end_date = room.end_date < 10 ? '0' + room.end_date : room.end_date;
    price_start = start_month + '-' + start_date;
    price_end = end_month + '-' + end_date;
    if (price_start <= check && check <= price_end) available = true;
    check = moment(date);
    if (available) {
      reserved = app.reserved.models;
      _.each(reserved, function(res) {
        var end, room_id, start;
        room_id = res.get('room_id');
        start = moment(res.get('start_date'));
        end = moment(res.get('end_date'));
        if (room.id === room_id && start <= check && check <= end) {
          return available = false;
        }
      });
    }
    return available;
  };

  Lodge.prototype.get_cost = function(start_date, nights, room) {
    var check, cost, per_night, split;
    var _this = this;
    split = start_date.split('-');
    check = split[1] + '-' + split[2];
    per_night = 0;
    _.each(this.get('rooms'), function(room) {
      var end_date, end_month, price_end, price_start, start_month;
      if (in_room.id.toString() === room.id.toString()) {
        start_month = room.start_month < 10 ? '0' + room.start_month : room.start_month;
        start_date = room.start_date < 10 ? '0' + room.start_date : room.start_date;
        end_month = room.end_month < 10 ? '0' + room.end_month : room.end_month;
        end_date = room.end_date < 10 ? '0' + room.end_date : room.end_date;
        price_start = start_month + '-' + start_date;
        price_end = end_month + '-' + end_date;
        if (price_start <= check && check <= price_end) {
          return per_night = parseFloat(room.price);
        }
      }
    });
    cost = per_night * nights;
    return cost;
  };

  Lodge.prototype.get_party_size = function(res) {
    var party;
    party = 0;
    if (res.get('adults')) party += parseInt(res.get('adults'));
    if (res.get('seniors')) party += parseInt(res.get('seniors'));
    return party;
  };

  Lodge.prototype.calendar_events = function(start, end, callback) {
    var events, is_this_lodge, reservations;
    var _this = this;
    events = [];
    is_this_lodge = {
      status: '1',
      lodge_id: this.get('id')
    };
    reservations = app.reserved.where(is_this_lodge);
    _.each(reservations, function(res) {
      var party, start_date;
      start_date = res.get('start_date') + ' 23:00:00';
      party = _this.get_party_size(res);
      return events.push({
        title: _this.get('name') + ', ' + res.get('order').name + ' (' + party + ')',
        start: start_date,
        end: res.get('end_date'),
        type: 'reservation',
        backgroundColor: '#555',
        color: '#555',
        textColor: '#fff',
        reservation: res.attributes
      });
    });
    return callback(events);
  };

  Lodge.prototype.schedule_on = function(date) {
    var schedule, _status;
    var _this = this;
    schedule = {
      booked: [],
      available: [],
      checking_in: [],
      checking_out: []
    };
    _status = ['none', 'pending', 'confirmed', 'approved', 'hold'];
    _.each(this.get('rooms'), function(room) {
      var checkout, compare, res, reservations, reserved, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (_this.room_is_available(date, room)) {
        schedule.available.push(room);
        reservations = new Backbone.Collection(app.reserved.models);
        _ref = reservations.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          res = _ref[_i];
          compare = moment(date).clone().format('YYYY-MM-DD');
          checkout = moment(res.get('end_date')).add('days', '1').format('YYYY-MM-DD');
          if (res.attributes.room_id === room.id && checkout === compare) {
            _results.push(schedule.checking_out.push({
              id: res.attributes.order.id,
              name: res.attributes.order.name,
              room: room.type,
              status: _status[res.attributes.order.status]
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        reserved = false;
        reservations = new Backbone.Collection(app.reserved.models);
        _ref2 = reservations.models;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          res = _ref2[_j];
          compare = moment(date).clone().format('YYYY-MM-DD');
          checkout = moment(res.get('end_date')).add('days', '1').format('YYYY-MM-DD');
          if (res.attributes.room_id === room.id) {
            if (res.get('start_date') <= compare && compare <= res.get('end_date')) {
              reserved = res;
              reserved.status = _status[res.attributes.order.status];
            }
            if (res.get('start_date') === compare) {
              schedule.checking_in.push({
                id: res.attributes.order.id,
                name: res.attributes.order.name,
                room: room.type,
                status: _status[res.attributes.order.status]
              });
            }
          }
        }
        if (reserved) {
          return schedule.booked.push({
            id: reserved.attributes.order.id,
            name: reserved.attributes.order.name,
            party: reserved.head_count(),
            room: room.type,
            status: reserved.status
          });
        }
      }
    });
    return schedule;
  };

  return Lodge;

})();

models.Order = (function() {

  __extends(Order, Flint.Model);

  function Order() {
    Order.__super__.constructor.apply(this, arguments);
  }

  Order.prototype.defaults = {
    status: 0,
    adults: 1,
    children: 0,
    seniors: 0,
    nights: 1,
    discount: 0,
    trip_reservations: [],
    lodge_reservations: [],
    purchases: [],
    clients: [],
    guests: [],
    payments: [],
    country: 'USA',
    setup_complete: '0',
    add_as_guest: 1,
    status: 2,
    notify: '0'
  };

  Order.prototype.payment_methods = [['credit', 'Credit Card'], ['cash', 'Cash'], ['check', 'Check'], ['wire', 'Wire Transfer'], ['other', 'Other']];

  Order.prototype.hours = [['00', '12am'], ['01', '1am'], ['02', '2am'], ['03', '3am'], ['04', '4am'], ['05', '5am'], ['06', '6am'], ['07', '7am'], ['08', '8am'], ['09', '9am'], ['10', '10am'], ['11', '11am'], ['12', '12pm'], ['13', '1pm'], ['14', '2pm'], ['15', '3pm'], ['16', '4pm'], ['17', '5pm'], ['18', '6pm'], ['19', '7pm'], ['20', '8pm'], ['21', '9pm'], ['22', '10pm'], ['23', '11pm']];

  Order.prototype.minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  Order.prototype.statuses = [['2', 'New/Waiting Approval'], ['3', 'Approved'], ['4', 'On hold']];

  Order.prototype.validate = function(attrs) {
    if (attrs.included_nights > 0) {
      return 'WARNING: You have a package with included lodging nights that need to be reserved.';
    }
    if ((!attrs.name || attrs.name === '') || (attrs.client && attrs.client.name === '')) {
      return 'Please enter a primary contact name in CLIENT INFO to save this reservation';
    }
  };

  return Order;

})();

models.Page = (function() {

  __extends(Page, Flint.Model);

  function Page() {
    Page.__super__.constructor.apply(this, arguments);
  }

  Page.prototype.defaults = {
    title: 'New Webpage',
    content: '',
    summary: ''
  };

  return Page;

})();

models.Payment = (function() {

  __extends(Payment, Backbone.Model);

  function Payment() {
    Payment.__super__.constructor.apply(this, arguments);
  }

  Payment.prototype.url = '/api/payments';

  Payment.prototype.validate = function(attr) {};

  return Payment;

})();

models.Product = (function() {

  __extends(Product, Backbone.Model);

  function Product() {
    Product.__super__.constructor.apply(this, arguments);
  }

  Product.prototype.defaults = {
    name: '',
    description: '',
    price: 0,
    sale_price: 0
  };

  Product.prototype.validate = function(attrs) {
    if (!attrs.id && attrs.name === '') return 'Your new product needs a name!';
    if (attrs.id && attrs.name === '') return 'Your product needs a name!';
  };

  return Product;

})();

models.Reservation = (function() {

  __extends(Reservation, Backbone.Model);

  function Reservation() {
    this.party_detail = __bind(this.party_detail, this);
    this.head_count = __bind(this.head_count, this);
    this.match_pricing = __bind(this.match_pricing, this);
    this.get_lodge_pricing = __bind(this.get_lodge_pricing, this);
    this.set_all_dates = __bind(this.set_all_dates, this);
    this.formatted_lodging_dates = __bind(this.formatted_lodging_dates, this);
    this.validate = __bind(this.validate, this);
    Reservation.__super__.constructor.apply(this, arguments);
  }

  Reservation.prototype.defaults = {
    adults: 1,
    children: 0,
    seniors: 0,
    email: '',
    name: '',
    status: 'pending',
    notes: ''
  };

  Reservation.prototype.validate = function(attrs) {};

  Reservation.prototype.formatted_lodging_dates = function() {
    var end, formatted, start;
    this.set_all_dates();
    start = app.helpers.sqldate_to_js(this.get('start_date'));
    end = app.helpers.sqldate_to_js(this.get('end_date'));
    formatted = 'Check In: ' + app.helpers.js_to_slash(start) + '  Check Out: ' + app.helpers.js_to_slash(this.get('check_out'));
    return formatted;
  };

  Reservation.prototype.set_all_dates = function() {
    var check_out, date, end, end_time, nights, start, start_time;
    start = app.helpers.sqldate_to_js(this.get('start_date'));
    end = app.helpers.sqldate_to_js(this.get('end_date'));
    check_out = new Date(end.getTime() + (60 * 60 * 24 * 1000));
    this.set('check_out', check_out, {
      silent: true
    });
    this.set('check_in', start);
    start_time = start.getTime();
    end_time = end.getTime();
    nights = [];
    while (start_time <= end_time) {
      start_time += 60 * 60 * 23 * 1000;
      date = new Date(start_time);
      nights.push({
        date: date,
        sql: app.helpers.jsdate_to_sql(date)
      });
    }
    this.set('nights', nights);
    return this;
  };

  Reservation.prototype.get_lodge_pricing = function(lodge, nights, in_room) {
    var check, cost, per_night, split, start;
    var _this = this;
    if (in_room == null) in_room = false;
    start = this.get('start_date');
    split = start.split('-');
    check = split[1] + '-' + split[2];
    per_night = 0;
    _.each(lodge.get('rooms'), function(room) {
      var end_date, end_month, price_end, price_start, start_date, start_month;
      if (in_room) {
        if (in_room.id.toString() === room.id.toString()) {
          start_month = room.start_month;
          start_date = room.start_date;
          if (start_month < 10) start_month = '0' + start_month;
          if (start_date < 10) start_date = '0' + start_date;
          end_month = room.end_month;
          end_date = room.end_date;
          if (end_month < 10) end_month = '0' + end_month;
          if (end_date < 10) end_date = '0' + end_date;
          price_start = start_month + '-' + start_date;
          price_end = end_month + '-' + end_date;
          if (price_start <= check && check <= price_end) {
            return per_night = parseFloat(room.price);
          }
        }
      } else {
        return per_night = 300;
      }
    });
    cost = per_night * nights;
    return cost;
  };

  Reservation.prototype.match_pricing = function(adults, pricing) {
    var rate;
    var _this = this;
    rate = {
      "default": 0,
      single: 0
    };
    _.each(pricing, function(pp) {
      if (parseInt(pp.people) < 2) {
        rate.single = parseInt(pp.price);
        return rate["default"] = parseInt(pp.price);
      } else if (adults >= parseInt(pp.people)) {
        rate["default"] = parseInt(pp.price);
        return rate.group = parseInt(pp.price);
      }
    });
    return rate;
  };

  Reservation.prototype.head_count = function(include_kids) {
    var heads;
    if (include_kids == null) include_kids = true;
    heads = 0;
    if (this.get('adults')) heads += parseInt(this.get('adults'));
    if (this.get('seniors')) heads += parseInt(this.get('seniors'));
    if (this.get('children') && include_kids) {
      heads += parseInt(this.get('children'));
    }
    return heads;
  };

  Reservation.prototype.party_detail = function() {
    var adult_out, adults, kids, kids_out, out, seniors, seniors_out;
    adults = parseInt(this.get('adults'));
    adult_out = adults > 1 ? adults + ' Adults' : '1 Adult';
    kids = parseInt(this.get('children'));
    kids_out = kids > 1 ? kids + ' Children' : '1 Child';
    seniors = parseInt(this.get('seniors'));
    seniors_out = seniors > 1 ? seniors + ' Seniors' : '1 Seniors';
    out = adult_out;
    if (kids) out += ', ' + kids_out;
    if (seniors) out += ', ' + seniors_out;
    return out;
  };

  return Reservation;

})();

models.Schedule = (function() {

  __extends(Schedule, Backbone.Model);

  function Schedule() {
    this.update_dates_and_times = __bind(this.update_dates_and_times, this);
    Schedule.__super__.constructor.apply(this, arguments);
  }

  Schedule.prototype.initialize = function() {
    var _this = this;
    return this.on('error', function(object, error) {
      if (!_.isString(error)) error = error.responseText;
      return app.notifications.error(error);
    });
  };

  Schedule.prototype.url = '/api/schedules/';

  Schedule.prototype.defaults = {
    start_time: '08:00',
    end_time: '18:00'
  };

  Schedule.prototype.hours = [['00', '12am'], ['01', '1am'], ['02', '2am'], ['03', '3am'], ['04', '4am'], ['05', '5am'], ['06', '6am'], ['07', '7am'], ['08', '8am'], ['09', '9am'], ['10', '10am'], ['11', '11am'], ['12', '12pm'], ['13', '1pm'], ['14', '2pm'], ['15', '3pm'], ['16', '4pm'], ['17', '5pm'], ['18', '6pm'], ['19', '7pm'], ['20', '8pm'], ['21', '9pm'], ['22', '10pm'], ['23', '11pm']];

  Schedule.prototype.minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  Schedule.prototype.validate = function(attrs) {};

  Schedule.prototype.update_dates_and_times = function(staff, start, end) {
    var sp, start_utc;
    var _this = this;
    if (start == null) start = false;
    if (end == null) end = false;
    if (!start) {
      sp = this.get('start_date').split('-');
      start = new Date(sp[0], sp[1] - 1, sp[2]);
    } else {
      this.set('start_date', app.helpers.jsdate_to_sql(start));
    }
    if (!end) {
      if (this.get('end_date')) {
        sp = this.get('end_date').split('-');
        end = new Date(sp[0], sp[1] - 1, sp[2]);
      } else if (this.get('duration') > 1) {
        start_utc = start.getTime();
        end = new Date(start_utc + (1000 * 25 * 60 * 60 * (this.get('duration') - 1)));
      } else {
        end = start;
      }
    }
    this.set('end_date', app.helpers.jsdate_to_sql(end));
    this.set('js_start', start);
    this.set('js_end', end);
    sp = this.get('start_time').split(':');
    this.set('start_hr', sp[0]);
    this.set('start_min', sp[1]);
    sp = this.get('end_time').split(':');
    this.set('end_hr', sp[0]);
    this.set('end_min', sp[1]);
    _.each(staff, function(employee) {
      var available;
      available = employee.is_available(start, end);
      return employee.set('is_available', available, {
        silent: true
      });
    });
    return this.set('staff', staff);
  };

  return Schedule;

})();

models.DataStore = (function() {

  __extends(DataStore, Flint.Model);

  function DataStore() {
    DataStore.__super__.constructor.apply(this, arguments);
  }

  DataStore.prototype.defaults = {
    name: '',
    type: 'text'
  };

  DataStore.prototype.validate = function(attrs) {
    if (!attrs.name || attrs.name === '') {
      return 'You need to ask a question if you want an answer.';
    }
  };

  DataStore.prototype.types = [['text', 'Stanard Text Answer'], ['textarea', 'Longer Text Answer'], ['short', 'Short Text Answer'], ['number', 'Number'], ['dropdown', 'Dropdown Menu'], ['radio', 'Multiple Choice, Choose One'], ['checkbox', 'Multiple Choice, Choose Many']];

  return DataStore;

})();

models.Trip = (function() {

  __extends(Trip, Flint.Model);

  function Trip() {
    this.schedule_on = __bind(this.schedule_on, this);
    this.activity_on = __bind(this.activity_on, this);
    this.get_guides_and_groups = __bind(this.get_guides_and_groups, this);
    this.calendar_events = __bind(this.calendar_events, this);
    this.create_activity = __bind(this.create_activity, this);
    this.match_pricing = __bind(this.match_pricing, this);
    this.get_cost_breakdown = __bind(this.get_cost_breakdown, this);
    this.is_available = __bind(this.is_available, this);
    this.get_availability_by_month = __bind(this.get_availability_by_month, this);
    this.set_all_dates = __bind(this.set_all_dates, this);
    this.formatted_dates = __bind(this.formatted_dates, this);
    Trip.__super__.constructor.apply(this, arguments);
  }

  Trip.prototype.defaults = {
    hour: '08',
    minute: '00',
    name: '',
    location: '',
    description: '',
    toggled: true,
    scheduled: 0,
    end_date: '31',
    end_month: '12',
    end_year: '2012',
    group_size: 4,
    active: '0'
  };

  Trip.prototype.hours = [['00', '12am'], ['01', '1am'], ['02', '2am'], ['03', '3am'], ['04', '4am'], ['05', '5am'], ['06', '6am'], ['07', '7am'], ['08', '8am'], ['09', '9am'], ['10', '10am'], ['11', '11am'], ['12', '12pm'], ['13', '1pm'], ['14', '2pm'], ['15', '3pm'], ['16', '4pm'], ['17', '5pm'], ['18', '6pm'], ['19', '7pm'], ['20', '8pm'], ['21', '9pm'], ['22', '10pm'], ['23', '11pm']];

  Trip.prototype.minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  Trip.prototype.months = [['1', 'Jan'], ['2', 'Feb'], ['3', 'Mar'], ['4', 'Apr'], ['5', 'May'], ['6', 'Jun'], ['7', 'Jul'], ['8', 'Aug'], ['9', 'Sep'], ['10', 'Oct'], ['11', 'Nov'], ['12', 'Dec']];

  Trip.prototype.days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  Trip.prototype.years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];

  Trip.prototype.capacity_options = [['0', 'Guide Availability'], ['1', 'Max Trip Capacity']];

  Trip.prototype.include_options = [['0', 'Not Included'], ['1', 'Included'], ['2', 'Upsell']];

  Trip.prototype.colors = [['1', 'Color One'], ['2', 'Color Two'], ['3', 'Color Three'], ['4', 'Color Four'], ['5', 'Color Five'], ['6', 'Color Six'], ['7', 'Color Seven'], ['8', 'Color Eight'], ['9', 'Color Nine']];

  Trip.prototype.validate = function(attrs) {
    if (!attrs.id && attrs.name === '') {
      return 'Your trip, activity or package needs a name!';
    }
    if (attrs.id && attrs.name === '') {
      return 'Your trip, activity or package needs a name!';
    }
    if (attrs.id && parseInt(attrs.group_size) === 0) {
      return 'Your guides must be pretty lazy... You have a zero for Group Size in AVAILABILITY';
    }
  };

  Trip.prototype.formatted_dates = function(w_lodging) {
    var end, end_format, formatted, start;
    if (w_lodging == null) w_lodging = false;
    this.set_all_dates(this.get('start_date'));
    start = this.get('start_date');
    end = this.get('end_date');
    formatted = w_lodging ? app.helpers.js_to_slash(this.get('check_in_date')) : app.helpers.js_to_slash(this.get('start_date_js'));
    if (start < end) {
      end_format = w_lodging ? app.helpers.js_to_slash(this.get('check_out_date')) : app.helpers.js_to_slash(this.get('end_date_js'));
      formatted += ' - ' + end_format;
    }
    return formatted;
  };

  Trip.prototype.set_all_dates = function(date) {
    var day, night, nights, start, trip_dates, trip_nights, _ref, _ref2;
    this.set('start_date', moment(date).format('YYYY-MM-DD'));
    this.set('start_date_js', moment(date).toDate());
    trip_dates = [];
    for (day = 0, _ref = this.get('duration'); 0 <= _ref ? day < _ref : day > _ref; 0 <= _ref ? day++ : day--) {
      trip_dates.push({
        date: moment(date).add('days', day).toDate(),
        sql: moment(date).add('days', day).format('YYYY-MM-DD')
      });
    }
    trip_nights = [];
    nights = parseInt(this.get('lodging_nights'));
    start = this.get('arrive_night_prior') === '1' ? -1 : 0;
    for (night = start, _ref2 = nights + start; start <= _ref2 ? night < _ref2 : night > _ref2; start <= _ref2 ? night++ : night--) {
      trip_nights.push({
        date: moment(date).add('days', night).toDate(),
        sql: moment(date).add('days', night).format('YYYY-MM-DD')
      });
    }
    this.set('trip_dates', trip_dates);
    this.set('nights', trip_nights);
    this.set('check_in_date', moment(date).add('days', start).toDate());
    this.set('check_in_sql', moment(date).add('days', start).format('YYYY-MM-DD'));
    this.set('check_out_date', moment(date).add('days', (nights + start) - 1).toDate());
    this.set('check_out_sql', moment(date).add('days', (nights + start) - 1).format('YYYY-MM-DD'));
    this.set('end_date', moment(date).add('days', this.get('duration') - 1).format('YYYY-MM-DD'));
    this.set('end_date_js', moment(date).add('days', this.get('duration') - 1).toDate());
    return this;
  };

  Trip.prototype.get_availability_by_month = function(year, month, people, time, web) {
    var availability, check_schedule, date, day, dow, in_season, season_end, season_start, sql, trip_date, valid, valid_dates, _i, _len, _ref, _ref2;
    if (time == null) time = false;
    if (web == null) web = false;
    valid_dates = [];
    for (day = 1, _ref = moment([year, month, 1]).daysInMonth() + 1; 1 <= _ref ? day < _ref : day > _ref; 1 <= _ref ? day++ : day--) {
      date = moment([year, month, day]);
      valid = false;
      if (date > moment()) {
        season_start = moment([year, this.get('season_start_month') - 1, this.get('season_start_date')]);
        season_end = moment([year, this.get('season_end_month') - 1, this.get('season_end_date')]);
        in_season = season_start <= date && date <= season_end;
        if (in_season) {
          dow = date.day();
          if (this.get('start_days') === '' || this.get('start_days') && this.get('start_days').indexOf(dow) >= 0) {
            valid = true;
          }
          if (this.get('start_dates') > '') {
            sql = date.format('YYYY-MM-DD');
            if (this.get('start_dates').indexOf('-' + sql) > 0) {
              valid = false;
            } else if (this.get('start_dates').indexOf(sql) > 0) {
              valid = true;
            }
          }
          availability = false;
          if (valid) {
            if (this.get('activity_id') > '1') {
              if (!app.trips.grab) {
                check_schedule = app.trips.get(this.get('activity_id'));
              } else {
                check_schedule = app.trips.grab(this.get('activity_id'));
              }
            } else {
              check_schedule = this;
            }
            this.set_all_dates(date);
            _ref2 = this.get('trip_dates');
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              trip_date = _ref2[_i];
              availability = check_schedule.is_available(trip_date.date, people, time, web);
            }
          }
        }
      }
      if (valid && availability.is_available) {
        valid_dates.push({
          date: date.toDate(),
          sql: date.format('YYYY-MM-DD'),
          times: availability.times
        });
      }
    }
    return valid_dates;
  };

  Trip.prototype.is_available = function(date, people, time, web) {
    var availability, available, now, space_available, trips;
    if (web == null) web = false;
    date = moment(date);
    availability = {};
    available = date.format('YYYY-MM-DD');
    now = moment();
    if (date < now) available = false;
    trips = this.schedule_on(date.toDate(), time);
    if (!trips) {
      available = false;
    } else {
      space_available = trips[0].program.available;
      if (space_available < people) available = false;
    }
    availability.is_available = available;
    return availability;
  };

  Trip.prototype.get_cost_breakdown = function(reservation) {
    var adults, children, cost_fees, costs, days_until_trip, fees, matched_pricing, min_percent_due, non_dated_pricing, pricing, rates, res, rules, seniors, start, today, total_fees;
    var _this = this;
    res = reservation.attributes ? reservation.attributes : reservation;
    adults = parseInt(res.adults);
    children = parseInt(res.children);
    seniors = parseInt(res.seniors);
    pricing = this.get('pricing');
    rules = this.get('deposit_rules');
    fees = this.get('fees');
    matched_pricing = [];
    non_dated_pricing = [];
    _.each(pricing, function(price) {
      if (price.start_date && price.start_date !== '0000-00-00') {
        if (price.start_date < _this.get('start_date') && _this.get('end_date') < price.end_date) {
          return matched_pricing.push(price);
        }
      } else {
        return non_dated_pricing.push(price);
      }
    });
    if (matched_pricing.length === 0) matched_pricing = non_dated_pricing;
    if (matched_pricing.length === 0) {
      app.notifications.notify('Unable to match a price to selected dates! Pricing for this trip may not be configured correctly.');
    }
    rates = this.match_pricing(adults, matched_pricing);
    costs = {
      adults: 0,
      children: 0,
      seniors: 0
    };
    if (parseInt(adults) > 1) {
      costs.adults = rates["default"] * adults;
    } else {
      costs.adults = rates.single;
    }
    if (children && this.get('child_rate')) {
      costs.children = children * this.get('child_rate');
    }
    if (seniors && trip.get('senior_rate')) {
      costs.seniors = seniors * this.get('senior_rate');
    }
    costs.total = costs.adults + costs.seniors + costs.children;
    today = new Date;
    start = app.helpers.sqldate_to_js(res.start_date);
    days_until_trip = (start.getTime() - today.getTime()) / (60 * 60 * 24 * 1000);
    min_percent_due = 100;
    _.each(rules, function(rule) {
      if (rule.days_prior < days_until_trip && min_percent_due > rule.percent_due) {
        return min_percent_due = rule.percent_due;
      }
    });
    costs.deposit = Math.ceil(costs.total * (min_percent_due / 100));
    cost_fees = [];
    total_fees = 0;
    costs.fees = 0;
    _.each(fees, function(fee) {
      var fee_amount;
      if (fee.percent) {
        fee_amount = Math.round(costs.total * (parseFloat(fee.percent) / 100));
      } else {
        fee_amount = parseFloat(fee.flat);
      }
      total_fees += parseFloat(fee_amount);
      return cost_fees.push({
        name: fee.name,
        amount: fee_amount
      });
    });
    costs.total += parseFloat(total_fees);
    costs.fees += parseFloat(total_fees);
    costs.fee_structure = cost_fees;
    return costs;
  };

  Trip.prototype.match_pricing = function(adults, pricing) {
    var rate;
    var _this = this;
    rate = {
      "default": 0,
      single: 0
    };
    _.each(pricing, function(pp) {
      if (parseInt(pp.people) < 2) {
        rate.single = parseInt(pp.price);
        return rate["default"] = parseInt(pp.price);
      } else if (adults >= parseInt(pp.people)) {
        rate["default"] = parseInt(pp.price);
        return rate.group = parseInt(pp.price);
      }
    });
    return rate;
  };

  Trip.prototype.create_activity = function(reservation, start_time, preset_guide_id) {
    var check_trip, create_reservations, group_size, head_count, reservations, trip_dates, trip_id;
    var _this = this;
    if (preset_guide_id == null) preset_guide_id = false;
    reservation.activities = [];
    reservations = [reservation];
    head_count = parseInt(reservation.adults) + parseInt(reservation.children) + parseInt(reservation.seniors);
    group_size = parseInt(this.get('group_size'));
    trip_dates = this.get('trip_dates');
    if (this.get('activity_id') > '1') {
      trip_id = this.get('activity_id');
      check_trip = app.trips.list.collection.get(this.get('activity_id')).clone();
      create_reservations = true;
    } else {
      trip_id = this.get('id');
      check_trip = this;
      create_reservations = true;
    }
    _.each(trip_dates, function(trip_date) {
      var copy, schedule, seats_to_fill, set_guide_id, spaces, use_reservation, _results;
      use_reservation = reservations[0];
      use_reservation.activities = [];
      if (create_reservations) {
        copy = new models.Reservation(reservation).clone().attributes;
        copy.trip_id = trip_id;
        copy.id = Math.random() * 3000;
        copy.trip = check_trip.attributes;
        copy.name = check_trip.attributes.name;
        copy.total = 0;
        copy.deposit = 0;
        copy.start_date = trip_date.sql;
        copy.end_date = trip_date.sql;
        copy.start_date_js = trip_date.date;
        copy.end_date_js = trip_date.date;
        copy.created_on = moment().format('YYYY-MM-DD HH:mm:ss');
        copy.activities = [];
        reservations.push(copy);
        use_reservation = copy;
      }
      schedule = check_trip.schedule_on(trip_date.date, start_time);
      seats_to_fill = head_count;
      spaces = schedule[0].program.schedule;
      set_guide_id = preset_guide_id;
      _results = [];
      while (seats_to_fill > 0) {
        if (preset_guide_id) {
          _.each(spaces, function(check) {
            var activity, guide, guide_id, takeup;
            if (check.space > 0 && seats_to_fill > 0 && check.guide.id === preset_guide_id && set_guide_id) {
              guide_id = check.guide.id;
              guide = check.guide;
              takeup = check.space;
              if (seats_to_fill < takeup) takeup = seats_to_fill;
              activity = {
                trip_id: trip_id,
                reservation_id: use_reservation.id,
                guide_id: guide_id,
                guide: guide,
                group_number: check.number,
                people: takeup,
                date: trip_date.sql,
                start_time: start_time,
                cleanup: true
              };
              use_reservation.activities.push(activity);
              reservation.activities.push(activity);
              seats_to_fill -= takeup;
              return set_guide_id = false;
            }
          });
        }
        _results.push(_.each(spaces, function(check) {
          var activity, guide, guide_id, takeup;
          if (check.space > 0 && seats_to_fill > 0) {
            guide_id = check.guide.id;
            guide = check.guide;
            takeup = check.space;
            if (seats_to_fill < takeup) takeup = seats_to_fill;
            activity = {
              trip_id: trip_id,
              reservation_id: use_reservation.id,
              guide_id: guide_id,
              guide: guide,
              group_number: check.number,
              people: takeup,
              date: trip_date.sql,
              start_time: start_time,
              cleanup: true
            };
            use_reservation.activities.push(activity);
            reservation.activities.push(activity);
            return seats_to_fill -= takeup;
          }
        }));
      }
      return _results;
    });
    console.log(reservations);
    return reservations;
  };

  Trip.prototype.calendar_events = function(start, end, callback) {
    var events, is_this_trip, reservations;
    var _this = this;
    events = [];
    is_this_trip = {
      status: '1',
      trip_id: this.get('id')
    };
    reservations = app.reserved.where(is_this_trip);
    _.each(reservations, function(res) {
      var party, start_date;
      start_date = res.get('start_date');
      if (res.get('start_time')) {
        start_date += ' ' + res.get('start_time');
      } else {
        start_date += ' 06:00:00';
      }
      party = parseInt(res.get('adults')) + parseInt(res.get('children')) + parseInt(res.get('seniors'));
      return events.push({
        title: _this.get('name') + ', ' + res.get('order').name + ' (' + party + ')',
        start: start_date,
        end: res.get('end_date'),
        type: 'reservation',
        backgroundColor: '#6a6944',
        color: '#6a6944',
        textColor: '#fff',
        reservation: res.attributes
      });
    });
    return callback(events);
  };

  Trip.prototype.get_guides_and_groups = function(date, time) {
    var assigned, employees, group_count, group_size, groups, guide, guides, _i, _j, _k, _len, _ref, _ref2, _results, _results2;
    var _this = this;
    groups = [];
    group_size = this.get('group_size');
    if (group_size <= 0) group_size = 2;
    if (this.get('capacity_only') === '1') {
      group_count = this.get('capacity') / group_size;
      groups = (function() {
        _results = [];
        for (var _i = 0; 0 <= group_count ? _i < group_count : _i > group_count; 0 <= group_count ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    }
    assigned = this.get('guides_assigned') ? this.get('guides_assigned').split(',') : false;
    employees = app.employees.list ? app.employees.list.collection : app.employees;
    if (!assigned) {
      guides = [];
      _ref = employees.models;
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        guide = _ref[_j];
        guides.push(guide);
      }
    } else {
      guides = [];
      _.each(assigned, function(guide_id) {
        return guides.push(employees.get(guide_id));
      });
    }
    _.each(guides, function(guide, index) {
      var guiding;
      guiding = guide && guide.attributes ? guide.is_guiding(date) : false;
      if (guiding) {
        return _.each(guiding, function(out) {
          if (out.trip_id !== _this.get('id')) {
            return guides = _.without(guides, guide);
          }
        });
      } else if (guide && guide.is_blacked_out(date)) {
        return guides = _.without(guides, guide);
      }
    });
    if (this.get('capacity_only') === '0') {
      groups = (function() {
        _results2 = [];
        for (var _k = 0, _ref2 = guides.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; 0 <= _ref2 ? _k++ : _k--){ _results2.push(_k); }
        return _results2;
      }).apply(this);
    }
    return {
      groups: groups,
      guides: guides
    };
  };

  Trip.prototype.activity_on = function(date, time) {
    var activity, c, client, clients, guest, guests, happening, id, mappable, people, res, reservations, _clients, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _res, _status;
    happening = [];
    guests = [];
    _status = ['none', 'pending', 'confirmed', 'approved', 'hold'];
    reservations = new Backbone.Collection(app.reserved.models);
    _ref = reservations.models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      res = _ref[_i];
      _res = res.attributes;
      if (_res.activities) {
        mappable = [];
        if (_res.order.guests) {
          _ref2 = _res.order.guests;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            guest = _ref2[_j];
            mappable.push(guest);
          }
        }
        _ref3 = _res.activities;
        for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
          activity = _ref3[_k];
          if (activity.trip_id === this.get('id')) {
            if (activity.date === moment(date).format('YYYY-MM-DD')) {
              if (!time || (activity.start_time === time || activity.start_time === time + ':00')) {
                people = parseInt(activity.people);
                _clients = activity.client_ids ? activity.client_ids.split(',') : [];
                clients = [];
                for (_l = 0, _len4 = _clients.length; _l < _len4; _l++) {
                  id = _clients[_l];
                  for (_m = 0, _len5 = mappable.length; _m < _len5; _m++) {
                    client = mappable[_m];
                    if (client.id === id) mappable.splice(_j, 1);
                  }
                }
                for (c = 0; 0 <= people ? c < people : c > people; 0 <= people ? c++ : c--) {
                  if (_clients[c] && app.clients.get(clients[c])) {
                    client = app.clients.get(clients[c]);
                  } else if (mappable && mappable.length > 0) {
                    client = mappable[0];
                    mappable.splice(0, 1);
                  } else {
                    client = {
                      id: 'none',
                      name: _res.order.name + ' (guest)'
                    };
                  }
                  clients.push(client);
                }
                happening.push({
                  id: _res.order.id,
                  activity_id: activity.id,
                  reservation_id: _res.id,
                  name: _res.order.name,
                  status: _status[_res.order.status],
                  people: people,
                  guide_id: activity.guide_id,
                  group_number: activity.group_number,
                  clients: clients
                });
              }
            }
          }
        }
      }
    }
    return happening;
  };

  Trip.prototype.schedule_on = function(date, time) {
    var activities, activity, capacity, filled, gag, group, group_size, groups, guides, in_season, people, program, schedule, season_end, season_start, start_times, times, trips_today, year, _i, _j, _k, _l, _len, _len2, _len3, _m, _results, _results2;
    if (time == null) time = false;
    if (this.get('activity_id') > '1' || this.get('activities_scheduled') === '1') {
      return false;
    }
    year = date.getFullYear();
    season_start = moment([year, this.get('season_start_month') - 1, this.get('season_start_date')]);
    season_end = moment([year, this.get('season_end_month') - 1, this.get('season_end_date')]);
    in_season = season_start <= date && date <= season_end;
    if (!in_season) return false;
    trips_today = [];
    start_times = _.isString(this.get('start_times')) && this.get('start_times') !== '' ? this.get('start_times').split(',') : false;
    if (time) {
      times = [time];
    } else if (start_times) {
      times = start_times;
    } else {
      times = [false];
    }
    for (_i = 0, _len = times.length; _i < _len; _i++) {
      time = times[_i];
      schedule = [];
      filled = 0;
      gag = this.get_guides_and_groups(date, time);
      guides = gag.guides;
      groups = gag.groups;
      group_size = this.get('group_size');
      capacity = group_size * groups.length;
      activities = this.activity_on(date, time);
      for (_j = 0, _len2 = groups.length; _j < _len2; _j++) {
        group = groups[_j];
        if (guides[_j]) {
          group = {
            guide: guides[_j].attributes,
            number: _j + 1,
            available: (function() {
              _results = [];
              for (var _k = 0; 0 <= group_size ? _k < group_size : _k > group_size; 0 <= group_size ? _k++ : _k--){ _results.push(_k); }
              return _results;
            }).apply(this),
            space: parseInt(group_size),
            empty: true,
            time: time
          };
        } else {
          group = {
            guide: {
              nickname: 'Group ' + (_j + 1),
              id: 'capacity ' + (_j + 1)
            },
            available: (function() {
              _results2 = [];
              for (var _l = 0; 0 <= group_size ? _l < group_size : _l > group_size; 0 <= group_size ? _l++ : _l--){ _results2.push(_l); }
              return _results2;
            }).apply(this),
            space: parseInt(group_size),
            empty: true,
            time: time,
            number: _j + 1,
            id: this.get('id')
          };
        }
        group.filled = 0;
        group.reservations = [];
        group.clients = [];
        for (_m = 0, _len3 = activities.length; _m < _len3; _m++) {
          activity = activities[_m];
          if (parseInt(activity.group_number) === parseInt(group.number)) {
            people = parseInt(activity.people);
            filled += people;
            group.filled += people;
            group.available.splice(0, people);
            group.space -= people;
            group.empty = false;
            group.reservations.push(activity);
          }
        }
        group.filled = group.filled + '/' + group_size;
        schedule.push(group);
      }
      program = {
        schedule: schedule,
        capacity: capacity,
        available: capacity - filled,
        reserved: filled
      };
      if (filled <= 0) program.empty = true;
      trips_today.push({
        time: time,
        program: program
      });
    }
    return trips_today;
  };

  return Trip;

})();

models.User = (function() {

  __extends(User, Flint.Model);

  function User() {
    User.__super__.constructor.apply(this, arguments);
  }

  User.prototype.defaults = {
    email: '',
    password: ''
  };

  User.prototype.url = '/api/users/';

  User.prototype.validate = function(attrs) {};

  return User;

})();

views.AccountForm = (function() {

  __extends(AccountForm, flybook.Form);

  function AccountForm() {
    this.make_admin = __bind(this.make_admin, this);
    AccountForm.__super__.constructor.apply(this, arguments);
  }

  AccountForm.prototype.__events = {
    'click .new-user-account': 'make_admin'
  };

  AccountForm.prototype.make_admin = function() {
    return this.trigger('created:admin', this.model);
  };

  return AccountForm;

})();

views.CalendarDayView = (function() {

  __extends(CalendarDayView, Flint.Form);

  function CalendarDayView() {
    this.get_arrivals_and_departures = __bind(this.get_arrivals_and_departures, this);
    this.get_lodging_schedule = __bind(this.get_lodging_schedule, this);
    this.get_trip_schedule = __bind(this.get_trip_schedule, this);
    this.edit_daily = __bind(this.edit_daily, this);
    this.edit_manifest = __bind(this.edit_manifest, this);
    this.make_reservation = __bind(this.make_reservation, this);
    this.edit_reservation = __bind(this.edit_reservation, this);
    this.toggle_clients = __bind(this.toggle_clients, this);
    this.toggle_available_staff = __bind(this.toggle_available_staff, this);
    this.toggle_availability = __bind(this.toggle_availability, this);
    this.show_sources = __bind(this.show_sources, this);
    this.show_focus_date = __bind(this.show_focus_date, this);
    this.setup_drag_n_drop = __bind(this.setup_drag_n_drop, this);
    this.render = __bind(this.render, this);
    CalendarDayView.__super__.constructor.apply(this, arguments);
  }

  CalendarDayView.prototype.events = {
    'click .reservation': 'edit_reservation',
    'click .available': 'make_reservation',
    'click .trip h4': 'edit_manifest',
    'click .guide-name': 'edit_daily'
  };

  CalendarDayView.prototype.el = '#day-view';

  CalendarDayView.prototype.init = function() {
    this.model = new Backbone.Model({
      'sha-space': app.helpers.cookie('show_available'),
      'sha-staff': app.helpers.cookie('show_available_staff'),
      'sha-client': app.helpers.cookie('show_clients')
    });
    this.on('changed:sha-space', this.toggle_availability);
    this.on('changed:sha-staff', this.toggle_available_staff);
    return this.on('changed:sha-client', this.toggle_clients);
  };

  CalendarDayView.prototype.render = function(date, sources) {
    var data, days, is_lodging, lodging, travels;
    this.date = date;
    this.sources = sources;
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    lodging = this.get_lodging_schedule(this.date);
    travels = this.get_arrivals_and_departures(moment(this.date).format('YYYY-MM-DD'));
    if (lodging && lodging.length > 0) is_lodging = true;
    data = {
      lodging: lodging,
      trips: this.get_trip_schedule(this.date),
      arrivals: travels.arriving,
      departures: travels.departing,
      slash: moment(this.date).format('ddd M/D'),
      sql: moment(this.date).format('YYYY-MM-DD'),
      label: days[this.date.getDay()] + ', ' + $.fullCalendar.formatDate(this.date, "MMMM dS yyyy")
    };
    $(this.el).html(tmpl['calendar/day'](data));
    this.toggle_availability();
    this.toggle_available_staff();
    this.toggle_clients();
    this.show_focus_date();
    this.setup_drag_n_drop();
    return this.show_sources(this.sources);
  };

  CalendarDayView.prototype.setup_drag_n_drop = function() {
    $('.reservation').draggable({
      zIndex: 50000,
      cancel: '.client',
      revert: true
    });
    return $('.available').droppable({
      over: function(event, ui) {
        return $(this).css({
          background: '#fff'
        });
      },
      out: function(event, ui) {
        return $(this).css({
          background: '#eee'
        });
      },
      drop: function(event, ui) {
        var activity_id, date, group_number, people, space;
        var _this = this;
        activity_id = ui.draggable.attr('data-activity');
        people = ui.draggable.attr('data-people');
        space = group_number = $(this).parent().attr('data-space');
        group_number = $(this).parent().attr('data-number');
        date = $(this).parent().parent().parent().attr('data-sql');
        if (people > space) {
          return app.notifications.confirm('There is not enough space in the gudie group for this record to fit. Move it anyway?', function() {
            return app.reserved.update_activity(activity_id, group_number, date);
          });
        } else {
          return app.reserved.update_activity(activity_id, group_number, date);
        }
      }
    });
  };

  CalendarDayView.prototype.show_focus_date = function() {
    var sql;
    $('.week').removeClass('fb-highlight');
    sql = moment(this.date.getTime()).format('YYYY-MM-DD');
    return $('.' + sql).addClass('fb-highlight');
  };

  CalendarDayView.prototype.show_sources = function(sources) {
    var _this = this;
    this.sources = sources;
    $('.trip,.lodge,.guide').css({
      display: 'none'
    });
    $('.capacity').css({
      display: 'block'
    });
    if (this.sources) {
      _.each(this.sources, function(source_str) {
        var split;
        split = source_str.split(':');
        return $('.' + split[0]).css({
          display: 'block'
        });
      });
    }
    return $('.generic').css({
      display: 'block'
    });
  };

  CalendarDayView.prototype.toggle_availability = function() {
    var checked, display, show;
    show = this.model.get('sha-space');
    app.helpers.cookie('show_available', show);
    display = show > 0 ? 'block' : 'none';
    checked = show > 0 ? true : false;
    $('.available').css({
      display: display
    });
    return $('.sha-space input').attr('checked', checked);
  };

  CalendarDayView.prototype.toggle_available_staff = function() {
    var checked, display, show;
    show = this.model.get('sha-staff');
    app.helpers.cookie('show_available_staff', show);
    display = show > 0 ? 'block' : 'none';
    checked = show > 0 ? true : false;
    $('.empty').css({
      display: display
    });
    return $('.sha-staff input').attr('checked', checked);
  };

  CalendarDayView.prototype.toggle_clients = function() {
    var checked, display, show;
    show = this.model.get('sha-client');
    app.helpers.cookie('show_clients', show);
    display = show > 0 ? 'block' : 'none';
    checked = show > 0 ? true : false;
    $('.client').css({
      display: display
    });
    display = show > 0 ? 'none' : 'block';
    $('.client-group').css({
      display: display
    });
    return $('.sha-client input').attr('checked', checked);
  };

  CalendarDayView.prototype.edit_reservation = function(e) {
    var id;
    id = $(e.target).attr('id');
    if ($(e.target).hasClass('client-group') || $(e.target).hasClass('lodging')) {
      return window.location.hash = '#reservation/edit/' + id;
    } else {
      return window.location.hash = '#clients/edit/' + id;
    }
  };

  CalendarDayView.prototype.make_reservation = function(e) {
    var guide, id, room, space, start, time;
    space = $(e.target);
    id = space.attr('id');
    start = space.attr('data-sql');
    if (space.hasClass('seat')) {
      guide = space.attr('data-guide');
      time = space.attr('data-time') > '' ? '/' + space.attr('data-time') : '';
      return window.location.hash = '#reservation/guide/' + id + '/' + start + '/' + guide + time;
    } else {
      room = space.attr('data-room');
      return window.location.hash = '#reservation/room/' + id + '/' + start + '/' + room;
    }
  };

  CalendarDayView.prototype.edit_manifest = function(e) {
    var date, node, time, trip_id;
    node = $(e.target).parent();
    trip_id = node.attr('class').replace(/trip\ /, '');
    date = node.attr('data-sql');
    time = node.attr('data-time') ? '/' + node.attr('data-time') : '';
    return window.location.hash = '#manifest/' + trip_id + '/' + date + time;
  };

  CalendarDayView.prototype.edit_daily = function(e) {};

  CalendarDayView.prototype.get_trip_schedule = function(date) {
    var trip_schedule;
    var _this = this;
    trip_schedule = [];
    _.each(app.trips.list.collection.models, function(trip) {
      var trips_today;
      trips_today = trip.schedule_on(date);
      return _.each(trips_today, function(time) {
        if (time.program) {
          if (time.time) {
            time.start = app.helpers.twenty_four_to_twelve(time.time);
            time.twofour = time.time;
          }
          return trip_schedule.push({
            time: time,
            trip: trip.attributes,
            schedule: time.program.schedule,
            available: time.program.reserved + '/' + time.program.capacity,
            empty: time.program.empty
          });
        }
      });
    });
    return trip_schedule;
  };

  CalendarDayView.prototype.get_lodging_schedule = function(date) {
    var lodge_schedule;
    var _this = this;
    lodge_schedule = [];
    _.each(app.lodging.list.collection.models, function(lodge) {
      var schedule;
      schedule = lodge.schedule_on(date);
      return lodge_schedule.push({
        lodge: lodge.attributes,
        schedule: schedule
      });
    });
    return lodge_schedule;
  };

  CalendarDayView.prototype.get_arrivals_and_departures = function(date) {
    var arrivals, departures, _arrivals, _departures;
    var _this = this;
    arrivals = {};
    departures = {};
    _.each(app.reserved.models, function(res) {
      var order;
      order = res.attributes.order;
      if (order.arriving_on === date) {
        if (!arrivals[order.arriving_at]) {
          arrivals[order.arriving_at] = {
            time: app.helpers.twenty_four_to_twelve(order.arriving_at),
            parties: []
          };
        }
        if (!arrivals[order.arriving_at][order.id]) {
          arrivals[order.arriving_at][order.id] = true;
          arrivals[order.arriving_at].parties.push({
            who: order.name,
            via: order.arriving_by
          });
        }
      }
      if (order.departing_on === date) {
        if (!departures[order.departing_at]) {
          departures[order.departing_at] = {
            time: app.helpers.twenty_four_to_twelve(order.departing_at),
            parties: []
          };
        }
        if (!departures[order.departing_at][order.id]) {
          departures[order.departing_at][order.id] = true;
          return departures[order.departing_at].parties.push({
            who: order.name,
            via: order.departing_by
          });
        }
      }
    });
    _arrivals = [];
    _.each(arrivals, function(arr) {
      return _arrivals.push(arr);
    });
    _departures = [];
    _.each(departures, function(dep) {
      return _departures.push(dep);
    });
    return {
      arriving: _arrivals,
      departing: _departures
    };
  };

  return CalendarDayView;

})();

views.CalendarPrompt = (function() {

  __extends(CalendarPrompt, Backbone.View);

  function CalendarPrompt() {
    this.close = __bind(this.close, this);
    this.show = __bind(this.show, this);
    this.create = __bind(this.create, this);
    this.render = __bind(this.render, this);
    CalendarPrompt.__super__.constructor.apply(this, arguments);
  }

  CalendarPrompt.prototype.el = 'body';

  CalendarPrompt.prototype.events = {
    'click .screen': 'close',
    'click .close': 'close'
  };

  CalendarPrompt.prototype.render = function(start, end, event) {
    var data, display, display_end, height, left, sql_end, sql_start, top, window_height, window_width;
    display = $.fullCalendar.formatDate(start, "MMMM dS yyyy");
    display_end = $.fullCalendar.formatDate(end, "MMMM dS yyyy");
    display = display !== display_end ? display + ' to ' + display_end : display;
    sql_start = $.fullCalendar.formatDate(start, 'yyyy-MM-dd');
    sql_end = $.fullCalendar.formatDate(end, 'yyyy-MM-dd');
    sql_end = sql_start !== sql_end ? '/' + sql_end : '';
    data = {
      display: display,
      start: sql_start,
      end: sql_end,
      trips: app.trips.list.collection.models,
      lodges: app.lodging.list.collection.models
    };
    height = (data.trips.length + data.lodges.length) * 45;
    window_width = $(window).width();
    window_height = $(window).height();
    top = 150;
    left = (window_width - 380) / 2;
    this.create();
    $('.pad').html(tmpl['calendar/prompt'](data));
    return this.show(top, left, height);
  };

  CalendarPrompt.prototype.create = function() {
    return $(this.el).append('<div class="prompt"><div class="pad"></div></div><div class="screen"></div>');
  };

  CalendarPrompt.prototype.show = function(top, left, height) {
    $('.prompt').css({
      opacity: 1,
      width: 380,
      height: height + 'px',
      top: top + 'px',
      left: left + 'px'
    });
    return $('.pad').css({
      height: (height - 20) + 'px'
    });
  };

  CalendarPrompt.prototype.close = function() {
    return $('.screen,.prompt').remove();
  };

  return CalendarPrompt;

})();

views.CalendarView = (function() {

  __extends(CalendarView, Flint.View);

  function CalendarView() {
    this.unrender = __bind(this.unrender, this);
    this.resize = __bind(this.resize, this);
    this.refresh = __bind(this.refresh, this);
    this.render = __bind(this.render, this);
    this.init_sources = __bind(this.init_sources, this);
    this.get_source = __bind(this.get_source, this);
    this.remove_event_source = __bind(this.remove_event_source, this);
    this.add_event_source = __bind(this.add_event_source, this);
    this.set_focus_date = __bind(this.set_focus_date, this);
    this.next = __bind(this.next, this);
    this.prev = __bind(this.prev, this);
    this.event_clicked = __bind(this.event_clicked, this);
    this.dates_selected = __bind(this.dates_selected, this);
    this.switch_view = __bind(this.switch_view, this);
    this.init_fullcalendar = __bind(this.init_fullcalendar, this);
    this.month_view = __bind(this.month_view, this);
    this.week_view = __bind(this.week_view, this);
    this.day_view = __bind(this.day_view, this);
    CalendarView.__super__.constructor.apply(this, arguments);
  }

  CalendarView.prototype.el = '#app';

  CalendarView.prototype.events = {
    'click .next': 'next',
    'click .prev': 'prev',
    'click .day': 'day_view',
    'click .week': 'week_view',
    'click .month': 'month_view'
  };

  CalendarView.prototype.day_view = function() {
    this.switch_view('day');
    return this.day.render(this.date, this.sources);
  };

  CalendarView.prototype.week_view = function() {
    this.switch_view('week', false);
    return this.week.render(this.date, this.sources);
  };

  CalendarView.prototype.month_view = function() {
    var date;
    this.init_fullcalendar();
    this.switch_view('month', false);
    return date = $('#month-view').fullCalendar('render').fullCalendar('select', this.date).fullCalendar('getDate');
  };

  CalendarView.prototype.init_fullcalendar = function() {
    var fc_config;
    fc_config = {
      header: {
        left: '',
        center: '',
        right: 'title'
      },
      selectable: true,
      select: this.dates_selected,
      eventClick: this.event_clicked,
      eventSources: null,
      month: app.month,
      year: app.year,
      height: $(window).height() - 130
    };
    $('#month-view').fullCalendar('destroy').fullCalendar(fc_config);
    return this.init_sources(app.helpers.cookie('event_sources'));
  };

  CalendarView.prototype.switch_view = function(view, init_view) {
    this.view = view;
    if (init_view == null) init_view = true;
    if (init_view && this.view === 'month') this.init_fullcalendar();
    $('.cal-buttons button').removeClass('selected');
    $('.cal-buttons .' + this.view).addClass('selected');
    $('.schedule-view').css({
      display: 'none'
    });
    $('#' + this.view + '-view').css({
      display: 'block'
    });
    app.helpers.cookie('calendar_view', this.view);
    return this.trigger('changed:view', this.view);
  };

  CalendarView.prototype.dates_selected = function(start, end, allday, jsevent) {
    var sql_date;
    sql_date = $.fullCalendar.formatDate(start, 'yyyy-MM-dd');
    this.date = start;
    this.trigger('selected:date', sql_date, this.date);
    if (this.view === 'month' && jsevent) {
      return this.prompt.render(start, end, jsevent);
    }
  };

  CalendarView.prototype.event_clicked = function(event, jsevent) {
    if (event.reservation && event.reservation.order) {
      return window.location.hash = '#reservation/edit/' + event.reservation.order.id;
    } else if (event.employee) {
      return window.location.hash = '#staff/edit/' + event.employee.id;
    }
  };

  CalendarView.prototype.prev = function() {
    var sql_date;
    if (this.view === 'month') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, this.date.getDate());
    }
    if (this.view === 'week') {
      this.date = new Date(this.date.getTime() - 7 * (24 * 60 * 60 * 1000));
    }
    if (this.view === 'day') {
      this.date = new Date(this.date.getTime() - 1 * (24 * 60 * 60 * 1000));
    }
    this.set_focus_date(null, this.date);
    sql_date = $.fullCalendar.formatDate(this.date, 'yyyy-MM-dd');
    return this.trigger('selected:date', sql_date, this.date);
  };

  CalendarView.prototype.next = function() {
    var sql_date;
    if (this.view === 'month') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());
    }
    if (this.view === 'week') {
      this.date = new Date(this.date.getTime() + 7 * (24 * 60 * 60 * 1000));
    }
    if (this.view === 'day') {
      this.date = new Date(this.date.getTime() + 1 * (24 * 60 * 60 * 1000));
    }
    this.set_focus_date(null, this.date);
    sql_date = $.fullCalendar.formatDate(this.date, 'yyyy-MM-dd');
    return this.trigger('selected:date', sql_date, this.date);
  };

  CalendarView.prototype.set_focus_date = function(sql, date) {
    this.date = date;
    if (this.view === 'month') {
      $('#month-view').fullCalendar('gotoDate', this.date).fullCalendar('unselect').fullCalendar('select', this.date);
    }
    if (this.view === 'week') this.week.render(this.date, this.sources);
    if (this.view === 'day') return this.day.render(this.date, this.sources);
  };

  CalendarView.prototype.add_event_source = function(source_str) {
    var source;
    if (_.indexOf(this.sources, source_str) < 0) {
      this.sources.push(source_str);
      app.helpers.cookie('event_sources', this.sources.join('|'));
      source = this.get_source(source_str);
      $('#month-view').fullCalendar('addEventSource', source);
    }
    return this.week.show_sources(this.sources);
  };

  CalendarView.prototype.remove_event_source = function(source_str) {
    var source;
    this.sources = _.without(this.sources, source_str);
    app.helpers.cookie('event_sources', this.sources.join('|'));
    source = this.get_source(source_str);
    $('#month-view').fullCalendar('removeEventSource', source);
    return this.week.show_sources(this.sources);
  };

  CalendarView.prototype.get_source = function(source_str) {
    var lodge, member, source, split, trip;
    split = source_str.split(':');
    source = {
      id: split[0],
      type: split[1]
    };
    if (source.type === 'staff') {
      member = app.employees.list.collection.get(source.id);
      if (!member) return false;
      source.events = member.calendar_events;
    }
    if (source.type === 'trip') {
      trip = app.trips.list.collection.get(source.id);
      if (!trip) return false;
      source.events = trip.calendar_events;
    }
    if (source.type === 'lodge') {
      lodge = app.lodging.list.collection.get(source.id);
      if (!lodge) return false;
      source.events = lodge.calendar_events;
    }
    return source;
  };

  CalendarView.prototype.init_sources = function(sources_str) {
    var _this = this;
    this.sources = sources_str ? sources_str.split('|') : [];
    if (this.sources) {
      return _.each(this.sources, function(source_str) {
        var source;
        source = _this.get_source(source_str);
        if (source) return $('#month-view').fullCalendar('addEventSource', source);
      });
    }
  };

  CalendarView.prototype.render = function(view) {
    var sql_date, today;
    this.view = view != null ? view : 'week';
    today = new Date().getDate();
    this.date = new Date(app.year, app.month, app.focus_day);
    sql_date = $.fullCalendar.formatDate(this.date, 'yyyy-MM-dd');
    this.trigger('selected:date', sql_date, this.date);
    $(this.el).html(tmpl['calendar/main']());
    this.init_sources(app.helpers.cookie('event_sources'));
    this.prompt = new views.CalendarPrompt;
    this.week = new views.CalendarWeekView;
    this.day = new views.CalendarDayView;
    $(window).bind('resize', this.resize);
    if (app.helpers.cookie('calendar_view')) {
      this.view = app.helpers.cookie('calendar_view');
      if (this.view === 'eek') this.view = 'week';
      if (this.view === 'onth') this.view = 'month';
      if (this.view === 'ay') this.view = 'day';
    }
    if (this.view === 'week') this.week.render(this.date, this.sources);
    if (this.view === 'day') this.day.render(this.date, this.sources);
    return this.switch_view(this.view);
  };

  CalendarView.prototype.refresh = function() {
    $('#month-view').fullCalendar('refetchEvents');
    this.week.render(this.date, this.sources);
    return this.day.render(this.date, this.sources);
  };

  CalendarView.prototype.resize = function() {
    var _this = this;
    window.clearTimeout(app.helpers.timer);
    return app.helpers.delay(300, function() {
      var height, width;
      width = $(window).width() - 300;
      height = $(window).height() - 130;
      app.helpers.after_transition('#app', function() {
        return $('#month-view').fullCalendar('option', 'height', height).fullCalendar('render');
      });
      return $('#app').css({
        width: width + 'px'
      });
    });
  };

  CalendarView.prototype.unrender = function() {
    $(window).unbind('resize');
    $(this.el).empty();
    if (this.week) {
      this.week.undelegateEvents();
      this.day.undelegateEvents();
      delete this.week;
      delete this.day;
      return delete this.prompt;
    }
  };

  return CalendarView;

})();

views.CalendarWeekView = (function() {

  __extends(CalendarWeekView, views.CalendarDayView);

  function CalendarWeekView() {
    this.render = __bind(this.render, this);
    CalendarWeekView.__super__.constructor.apply(this, arguments);
  }

  CalendarWeekView.prototype.el = '#week-view';

  CalendarWeekView.prototype.render = function(date, sources) {
    var data, days, is_lodging, lodging, saturday, start, sunday, travels;
    this.date = date;
    this.sources = sources;
    sunday = moment(this.date).clone().subtract('days', this.date.getDay()).toDate();
    saturday = moment(sunday.getTime()).add('days', 6).toDate();
    days = [];
    start = moment(sunday.getTime());
    is_lodging = false;
    while (start <= saturday) {
      lodging = this.get_lodging_schedule(start.toDate());
      travels = this.get_arrivals_and_departures(start.format('YYYY-MM-DD'));
      if (lodging && lodging.length > 0) is_lodging = true;
      days.push({
        lodging: lodging,
        trips: this.get_trip_schedule(start.toDate()),
        arrivals: travels.arriving,
        departures: travels.departing,
        slash: start.format('ddd M/D'),
        sql: start.format('YYYY-MM-DD')
      });
      start = start.clone().add('days', 1);
    }
    data = {
      range: $.fullCalendar.formatDate(sunday, "MMMM dS yyyy") + ' - ' + $.fullCalendar.formatDate(saturday, "MMMM dS yyyy"),
      days: days,
      is_lodging: is_lodging
    };
    $(this.el).html(tmpl['calendar/week'](data));
    this.toggle_availability();
    this.toggle_available_staff();
    this.toggle_clients();
    this.show_focus_date();
    this.setup_drag_n_drop();
    return this.show_sources(this.sources);
  };

  return CalendarWeekView;

})();

views.ClientForm = (function() {

  __extends(ClientForm, Flint.Form);

  function ClientForm() {
    ClientForm.__super__.constructor.apply(this, arguments);
  }

  return ClientForm;

})();

views.Dropdown = (function() {

  __extends(Dropdown, Backbone.View);

  function Dropdown() {
    this.clear = __bind(this.clear, this);
    this.fluid = __bind(this.fluid, this);
    this.position = __bind(this.position, this);
    this.expand = __bind(this.expand, this);
    this.collapse = __bind(this.collapse, this);
    this.render = __bind(this.render, this);
    Dropdown.__super__.constructor.apply(this, arguments);
  }

  Dropdown.prototype.el = ' #dropdown';

  Dropdown.prototype.initialize = function(app) {
    var _this = this;
    app.on('login', this.collapse);
    app.on('refresh', function() {
      if (app.user && app.user.get('authenticated')) return _this.collapse();
    });
    app.on('logout', function() {
      $(_this.el).css({
        height: 0
      });
      return _this.clear();
    });
    return this;
  };

  Dropdown.prototype.render = function(template, data) {
    return $(this.el).html(tmpl[template](data));
  };

  Dropdown.prototype.collapse = function(callback) {
    if (_.isFunction(callback)) app.helpers.after_transition(this.el, callback);
    this.clear();
    return $(this.el).css({
      height: '43px',
      position: 'fixed'
    });
  };

  Dropdown.prototype.expand = function(callback, height) {
    if (height == null) height = '620px';
    if (_.isFunction(callback)) app.helpers.after_transition($(this.el), callback);
    return $(this.el).css({
      height: height,
      position: 'absolute'
    });
  };

  Dropdown.prototype.position = function(height, callback) {
    if (_.isFunction(callback)) app.helpers.after_transition($(this.el), callback);
    return $(this.el).css({
      height: height,
      position: 'absolute'
    });
  };

  Dropdown.prototype.fluid = function() {
    var inner;
    inner = $(this.el).children([0]).height();
    return $(this.el).css({
      height: (inner + 100) + 'px'
    });
  };

  Dropdown.prototype.clear = function() {
    return $(this.el).empty();
  };

  return Dropdown;

})();

views.EmployeeForm = (function() {

  __extends(EmployeeForm, flybook.Form);

  function EmployeeForm() {
    this.role_clicked = __bind(this.role_clicked, this);
    this.render_blackouts = __bind(this.render_blackouts, this);
    this.dateclick = __bind(this.dateclick, this);
    this.after = __bind(this.after, this);
    this.init = __bind(this.init, this);
    EmployeeForm.__super__.constructor.apply(this, arguments);
  }

  EmployeeForm.prototype.__events = {
    'click .role': 'role_clicked'
  };

  EmployeeForm.prototype.init = function() {
    this.events = _.extend({}, this.__events, this.events);
    return this;
  };

  EmployeeForm.prototype.after = function() {
    if (this.template === 'employees/edit') {
      this.calendar = new Flint.Calendar('#weekday-calendar', app.year, app.month);
      this.calendar.on('clicked', this.dateclick);
      this.calendar.on('next prev', this.render_blackouts);
      this.blackout_dates = _.isString(this.model.get('blackout_dates')) ? this.model.get('blackout_dates').split(',') : [];
      this.blackout_days = _.isString(this.model.get('blackout_days')) ? this.model.get('blackout_days').split(',') : [];
      return this.render_blackouts();
    }
  };

  EmployeeForm.prototype.weekday_click = function(e, form) {
    var bo_days, val;
    var _this = this;
    bo_days = [];
    _.each($('#weekdays').find('input[type=checkbox]:checked'), function(item, index) {
      return bo_days.push(item.value);
    });
    val = bo_days.join(',');
    this.blackout_days = bo_days;
    this.model.set('blackout_days', val.toString());
    return this.render_blackouts();
  };

  EmployeeForm.prototype.dateclick = function(date, jsdate, selected, e) {
    var dow;
    dow = $(e.target).attr('data-dow');
    if (_.indexOf(this.blackout_days, dow) >= 0) date = "-" + date;
    if (_.indexOf(this.blackout_dates, date) >= 0) {
      this.blackout_dates = _.without(this.blackout_dates, date);
    } else {
      this.blackout_dates.push(date);
    }
    this.model.set('blackout_dates', this.blackout_dates.join(','));
    return this.render_blackouts();
  };

  EmployeeForm.prototype.render_blackouts = function() {
    var _this = this;
    $('input[name="dow[]"]').attr('checked', false);
    $('#weekday-calendar td').removeClass('blackout');
    _.each(this.blackout_days, function(dow) {
      $('#dow' + dow).attr('checked', true);
      return $('#weekday-calendar .dow' + dow).addClass('blackout');
    });
    return _.each(this.blackout_dates, function(date) {
      if (date.substr(0, 1) === "-") {
        date = date.substr(1, date.length - 1);
        return $('#weekday-calendar td[data-sql=' + date + ']').removeClass('blackout');
      } else {
        return $('#weekday-calendar td[data-sql=' + date + ']').addClass('blackout');
      }
    });
  };

  EmployeeForm.prototype.role_clicked = function(e) {
    var src;
    e.stopPropagation(e);
    src = $(e.target);
    if (src.parent().hasClass('role')) {
      $('#rd-' + src.parent().attr('id')).attr('checked', true);
      e.target = $('#rd-' + src.parent().attr('id'));
      return this.changed(e);
    } else if (src.hasClass('role')) {
      $('#rd-' + src.attr('id')).attr('checked', true);
      e.target = $('#rd-' + src.parent().attr('id'));
      return this.changed(e);
    }
  };

  return EmployeeForm;

})();

views.FormUploader = (function() {

  __extends(FormUploader, Flint.View);

  function FormUploader() {
    FormUploader.__super__.constructor.apply(this, arguments);
  }

  FormUploader.prototype.el = '#app';

  return FormUploader;

})();

views.FormsList = (function() {

  __extends(FormsList, Flint.List);

  function FormsList() {
    this.done = __bind(this.done, this);
    this.update = __bind(this.update, this);
    this.save = __bind(this.save, this);
    this.update_document_name = __bind(this.update_document_name, this);
    this.remove_document = __bind(this.remove_document, this);
    this.add_document = __bind(this.add_document, this);
    this.init_documents = __bind(this.init_documents, this);
    this.after = __bind(this.after, this);
    this.before = __bind(this.before, this);
    FormsList.__super__.constructor.apply(this, arguments);
  }

  FormsList.prototype.el = '#app';

  FormsList.prototype.events = {
    'click .done': 'save',
    'click .cancel': 'done',
    'click .remove-document': 'remove_document',
    'change .docs input': 'update_document_name'
  };

  FormsList.prototype.docs_template = '<li id="{{id}}"><div><input type="text" name="docs[]" value="{{name}}" class="doc" /><span><a class="dl" href="/api/documents/_download/?id={{id}}">{{ext}}</a></span><button class="del remove-document">Delete</buton></div></li>';

  FormsList.prototype.before = function() {
    return this.data = {
      documents: app.user.get('account').documents
    };
  };

  FormsList.prototype.after = function() {
    return this.init_documents();
  };

  FormsList.prototype.init_documents = function() {
    var options;
    var _this = this;
    this.docs = app.user.get('account').documents;
    options = {
      action: '/api/documents/_upload/',
      element: document.getElementById('doc-upload'),
      onProgress: function(id, file, loaded, total) {
        var percent;
        percent = Math.round((loaded / total) * 100);
        if (percent === 100) {
          $('#progress span').text('Processing, this may take a few seconds...');
        } else {
          $('#progress span').text('Uploading ' + percent + '%...');
        }
        $('#progress #bar').css({
          width: percent + '%'
        });
        return $('#progress').css({
          display: 'block'
        });
      },
      onComplete: function(id, file, response) {
        $('#progress').css({
          display: 'none'
        });
        return _this.add_document(response);
      }
    };
    new qq.FileUploader(options);
    return this.update();
  };

  FormsList.prototype.add_document = function(doc) {
    app.notifications.notify('Document uploaded sucessfully!');
    this.docs.push(doc);
    return this.update();
  };

  FormsList.prototype.remove_document = function(e) {
    var id, li;
    var _this = this;
    li = $(e.target).parent().parent();
    id = li.attr('id');
    return _.each(this.docs, function(doc) {
      if (doc.id.toString() === id.toString()) {
        _this.trigger('document:deleted', doc);
        _this.docs = _.without(_this.docs, doc);
        _this.update();
      }
    });
  };

  FormsList.prototype.update_document_name = function(e) {
    var id, li, val;
    var _this = this;
    val = $(e.target).val();
    li = $(e.target).parent().parent();
    id = li.attr('id');
    return _.each(this.docs, function(doc) {
      if (doc.id.toString() === id.toString()) {
        doc.name = val;
        _this.update();
      }
    });
  };

  FormsList.prototype.save = function() {
    return this.trigger('documents:saved');
  };

  FormsList.prototype.update = function() {
    var account, out;
    var _this = this;
    $('#docs').html('');
    out = tmpl_compile(this.docs_template);
    _.each(this.docs, function(doc) {
      var html;
      html = out(doc);
      return $('#docs').append(html);
    });
    account = app.user.get('account');
    account.docs = this.docs;
    return app.user.set('account', account);
  };

  FormsList.prototype.done = function() {
    app.sidebar.select(false);
    window.location.hash = '#done';
    return $('#app').css({
      left: '-540px'
    });
  };

  return FormsList;

})();

views.Helpers = (function() {

  __extends(Helpers, Flint.Helpers);

  function Helpers() {
    this.after_transition = __bind(this.after_transition, this);
    this.load_google_maps_api = __bind(this.load_google_maps_api, this);
    this.get_cookie = __bind(this.get_cookie, this);
    this.cookie = __bind(this.cookie, this);
    this.get_countries_and_states = __bind(this.get_countries_and_states, this);
    this.date_format = __bind(this.date_format, this);
    this.initialize = __bind(this.initialize, this);
    Helpers.__super__.constructor.apply(this, arguments);
  }

  Helpers.prototype.initialize = function() {
    Handlebars.registerHelper('eq', this.eq);
    Handlebars.registerHelper('date_format', this.date_format);
    return Handlebars.registerHelper('break_list', this.break_list);
  };

  Helpers.prototype.date_format = function(date, format) {
    if (!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00') {
      return 'N/A';
    }
    return moment(date).format(format);
  };

  Helpers.prototype.check_role = function(user_or_role, required_roles, options) {
    var has_role, role;
    role = user_or_role && user_or_role.get ? user_or_role.get('role') : user_or_role;
    has_role = required_roles.indexOf(role) >= 0;
    if (has_role) {
      if (options) {
        return options.fn(this);
      } else {
        return true;
      }
    } else {
      if (options) return options.inverse(this);
    }
    return false;
  };

  Helpers.prototype.get_countries_and_states = function(callback) {
    var _this = this;
    if (!app.states) {
      return app.sync.ajax('/api/geography/_countries_and_states', {
        success: function(data) {
          app.states = data.states;
          app.countries = data.countries;
          app.countries_states = data.countries_states;
          return callback();
        }
      });
    } else {
      return callback();
    }
  };

  Helpers.prototype.cookie = function(name, value, expires, path, domain) {
    var cookie, year;
    if (expires == null) expires = '';
    if (path == null) path = '/';
    if (domain == null) domain = '';
    if (_.isUndefined(value)) return this.get_cookie(name);
    cookie = name + '=' + value;
    if (expires === !'') expires = '; expires=' + new Date(expires).toGMTString();
    if (expires === '') {
      year = new Date().getTime() + (60 * 60 * 24 * 365 * 1000);
      expires = '; expires=' + new Date(year).toGMTString();
    }
    path = '; path=' + path;
    if (domain === !'') domain = '; domain' + domain;
    document.cookie = cookie + expires + path + domain;
    return value;
  };

  Helpers.prototype.get_cookie = function(name) {
    var cookie, cookies, locate, value, _i, _len;
    locate = name + '=';
    cookies = document.cookie.split(';');
    value = false;
    for (_i = 0, _len = cookies.length; _i < _len; _i++) {
      cookie = cookies[_i];
      if (cookie.toString().indexOf(locate) >= 0) {
        value = cookie.substring(locate.length + 1, cookie.length);
      }
    }
    return value;
  };

  Helpers.prototype.text_area = function(model, field, attributes) {
    var attrs, value;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    value = model && model.get && model.get(field) ? model.get(field) : '';
    return new Handlebars.SafeString('<textarea name="' + field + '" ' + attrs.join(' ') + '>' + value + '</textarea>');
  };

  Helpers.prototype.eq = function(value, test, options) {
    if (value === test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };

  Helpers.prototype.twenty_four_to_twelve = function(time) {
    var hr, mer, min, parts;
    parts = time.split(':');
    hr = parts[0];
    if (hr.substr(0, 1) === '0') hr = parseInt(hr.substr(1, 1));
    min = parts[1];
    mer = 'am';
    if (hr >= 12) {
      mer = 'pm';
      if (hr > 12) hr -= 12;
    }
    if (hr === '00' || hr === 0) hr = '12';
    return hr + ':' + min + ' ' + mer;
  };

  Helpers.prototype.load_google_maps_api = function(callback_str) {
    var js;
    js = document.createElement('script');
    js.id = 'google-maps';
    js.async = true;
    js.src = '//maps.googleapis.com/maps/api/js?sensor=false&callback=' + callback_str;
    return document.body.appendChild(js);
  };

  Helpers.prototype.load_facebook_sdk = function() {
    var js;
    js = document.createElement('script');
    js.id = 'facebook-jssdk';
    js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';
    return document.body.appendChild(js);
  };

  Helpers.prototype.after_transition = function(element, callback) {
    var events;
    var _this = this;
    events = 'webkitTransitionEnd transitionend oTransitionEnd';
    $(element).unbind(events);
    return $(element).bind(events, function() {
      $(element).unbind(events);
      return callback();
    });
  };

  Helpers.prototype.loader = function(selector) {
    $(selector).html(tmpl['loader']);
    $('.loader').css({
      opacity: 1
    });
    return $(selector);
  };

  Helpers.prototype.select = function(model, field, options, attributes) {
    var attrs, opts, selected;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    selected = model && model.get && model.get(field) ? model.get(field) : false;
    opts = [];
    _.each(options, function(option) {
      var optstr, text, value;
      value = _.isArray(option) ? option[0] : option;
      text = _.isArray(option) ? option[1] : option;
      optstr = '<option ';
      if (value.toString() === selected.toString()) optstr += 'selected ';
      optstr += 'value="' + value + '">' + text + '</option>';
      return opts.push(optstr);
    });
    return new Handlebars.SafeString('<select name="' + field + '" ' + attrs.join(' ') + '>' + opts.join('') + '</select>');
  };

  Helpers.prototype.break_list = function(context, break_at, block) {
    var out;
    out = [];
    _.each(context, function(model, i) {
      context = model.attributes ? model.attributes : model;
      out.push(block.fn(context));
      if ((i + 1) % break_at === 0) return out.push('<br style="clear:both;" />');
    });
    out = out.join('');
    return new Handlebars.SafeString(out);
  };

  Helpers.prototype.list = function(context, zero_length_message, block) {
    var out;
    out = [];
    _.each(context, function(model) {
      context = model.attributes ? model.attributes : model;
      return out.push(block.fn(context));
    });
    out = out.length > 0 ? out.join('') : zero_length_message;
    return new Handlebars.SafeString(out);
  };

  Helpers.prototype.filtered_list = function(context, filter, value, zero_length_message, block) {
    var out, values;
    out = [];
    values = value.split(',');
    _.each(context, function(model) {
      var pass, val;
      val = model.get(filter);
      pass = false;
      _.each(values, function(test) {
        if (val === test) return pass = true;
      });
      if (pass) return out.push(block.fn(model.attributes));
    });
    out = out.length > 0 ? out.join('') : zero_length_message;
    return new Handlebars.SafeString(out);
  };

  return Helpers;

})();

views.LodgeForm = (function() {

  __extends(LodgeForm, flybook.Form);

  function LodgeForm() {
    this.update_rooms = __bind(this.update_rooms, this);
    this.sort_rooms = __bind(this.sort_rooms, this);
    this.remove_room = __bind(this.remove_room, this);
    this.add_room = __bind(this.add_room, this);
    this.after = __bind(this.after, this);
    LodgeForm.__super__.constructor.apply(this, arguments);
  }

  LodgeForm.prototype.__events = {
    'click .add-new-room': 'add_room',
    'click .remove-room': 'remove_room'
  };

  LodgeForm.prototype.price_tmpl = '<li id="{{id}}"><div><span class="long">{{room_type}}<span>{{display_start_month}} {{start_date}}</span><span>{{display_end_month}} {{end_date}}</span><span>${{dollar price}}</span><span>{{sleeps}}</span></div><button class="del remove-price-point">Delete</buton></li>';

  LodgeForm.prototype.after = function() {
    if (this.template === 'lodging/edit') {
      this.rooms = this.model.get('rooms');
      this.update_rooms();
      $('.room-inputs input').val('');
      this.lodge_sortable = $('.sortable').sortable({
        update: this.sort_rooms
      });
      this.upsell = this.model.get('trips');
      this.update_upsells();
      if (app.isOnline) {
        this.setup_photos('lodge', {
          lodge_id: this.model.get('id')
        });
      }
      return this.gmap_callback_method = 'app.lodging.form.setup_map';
    }
  };

  LodgeForm.prototype.add_room = function() {
    var room;
    room = {
      id: Math.random() * 3000,
      sort_order: this.rooms.length + 1
    };
    $('.room-inputs input,.room-inputs select').each(function() {
      var field, val;
      field = $(this).attr('name');
      if (field === 'type') {
        val = $(this).val();
      } else {
        val = $(this).val().toString().replace(/[A-Za-z$-,+]/g, '');
      }
      return room[field] = val;
    });
    if (room.type === '') {
      app.notifications.error('Specify a description of the room to add it.');
      return false;
    }
    $('.room-inputs input').val('');
    this.rooms.push(room);
    return this.update_rooms();
  };

  LodgeForm.prototype.remove_room = function(e) {
    var id, li;
    var _this = this;
    li = $(e.target).parent();
    id = li.attr('id');
    return _.each(this.rooms, function(room) {
      if (room.id.toString() === id.toString()) {
        _this.rooms = _.without(_this.rooms, room);
        _this.update_rooms();
      }
    });
  };

  LodgeForm.prototype.sort_rooms = function(e) {
    var rooms;
    var _this = this;
    rooms = [];
    _.each(this.lodge_sortable.find('li'), function(item, index) {
      var id;
      id = item.getAttribute('id');
      return _.each(_this.rooms, function(room) {
        if (room.id.toString() === id.toString()) {
          room.sort_order = index;
          return rooms.push(room);
        }
      });
    });
    this.rooms = rooms;
    return this.update_rooms();
  };

  LodgeForm.prototype.update_rooms = function() {
    var _this = this;
    $('#rooms').html('');
    _.each(this.rooms, function(room) {
      var html;
      _.each(_this.model.months, function(month) {
        if (room.start_month === month[0]) room.display_start_month = month[1];
        if (room.end_month === month[0]) return room.display_end_month = month[1];
      });
      html = tmpl['lodging_room'](room);
      return $('#rooms').append(html);
    });
    this.model.set('rooms', this.rooms);
    return this.delegateEvents();
  };

  return LodgeForm;

})();

views.LodgeList = (function() {

  __extends(LodgeList, Flint.List);

  function LodgeList() {
    this.serialize_meal = __bind(this.serialize_meal, this);
    this.restore_meal = __bind(this.restore_meal, this);
    this.process_meals_data = __bind(this.process_meals_data, this);
    this.update_meals = __bind(this.update_meals, this);
    this.render_meals = __bind(this.render_meals, this);
    this.before = __bind(this.before, this);
    LodgeList.__super__.constructor.apply(this, arguments);
  }

  LodgeList.prototype.events = {
    'click .update-meals': 'process_meals_data'
  };

  LodgeList.prototype.before = function() {
    app.helpers.loader('#meals');
    return this.data = {
      lodges: this.collection.models,
      model: new Backbone.Model
    };
  };

  LodgeList.prototype.render_meals = function(data) {
    $('#meals').html(tmpl['lodging/meals']({
      model: new Backbone.Model
    }));
    this.update_meals(data);
    return this.delegateEvents();
  };

  LodgeList.prototype.update_meals = function(meals) {
    this.restore_meal(meals, 'breakfast');
    this.restore_meal(meals, 'lunch');
    return this.restore_meal(meals, 'dinner');
  };

  LodgeList.prototype.process_meals_data = function() {
    var serialized;
    serialized = {
      breakfast: this.serialize_meal('breakfast'),
      lunch: this.serialize_meal('lunch'),
      dinner: this.serialize_meal('dinner')
    };
    this.trigger('meals_update', serialized);
    return this.update_meals(serialized);
  };

  LodgeList.prototype.restore_meal = function(data, meal) {
    data = data[meal];
    if (data) {
      return $('.' + meal + ' input').each(function(item) {
        var field, index;
        if ($(this).hasClass('num')) {
          field = $(this).attr('name');
          return $(this).val('$' + app.helpers.dollar(data[field]));
        } else {
          index = $(this).index('.' + meal + ' input');
          if (data.served.indexOf(index) >= 0) {
            return $(this).attr('checked', true);
          }
        }
      });
    }
  };

  LodgeList.prototype.serialize_meal = function(meal) {
    var data;
    data = {
      meal: meal,
      served: []
    };
    $('.' + meal + ' input').each(function(item) {
      var field, val;
      if ($(this).hasClass('num')) {
        field = $(this).attr('name');
        val = $(this).val().replace(/[A-Za-z$-,+]/g, '');
        return data[field] = val;
      } else {
        if ($(this).is(':checked')) {
          return data.served.push($(this).index('.' + meal + ' input'));
        }
      }
    });
    data.served = data.served.join(',');
    return data;
  };

  return LodgeList;

})();

views.Login = (function() {

  __extends(Login, Flint.Form);

  function Login() {
    this.done = __bind(this.done, this);
    Login.__super__.constructor.apply(this, arguments);
  }

  Login.prototype.el = '#app';

  Login.prototype.events = {
    'click .login button': 'login'
  };

  Login.prototype.init = function() {
    this.render();
    return this;
  };

  Login.prototype.render = function() {
    var messages, pick;
    messages = ['Go ahead, sign in. We dare you.', 'Login\'s healthy!', 'Hurray it\'s computer time! Wait...', 'We know... You\'d rather be fishing.'];
    pick = parseInt(Math.random() * messages.length);
    $('#main-nav,#side-nav').html('');
    $('#app').css({
      left: '-500px',
      width: '450px'
    });
    return $(this.el).html(tmpl['users/login']({
      user: this.model,
      login_message: messages[pick]
    }));
  };

  Login.prototype.login = function() {
    var user_data;
    user_data = {
      login: true,
      email: $('form input:eq(0)').val(),
      password: $('form input:eq(1)').val()
    };
    app.login(user_data);
    $('.login').css({
      opacity: 0
    });
    return $('.loader').css({
      opacity: 1
    });
  };

  Login.prototype.failed = function(message) {
    app.notifications.error('Sorry... ' + message);
    $('.login').css({
      opacity: 1
    });
    return $('.loader').css({
      opacity: 0
    });
  };

  Login.prototype.done = function() {
    $('.loader').css({
      opacity: 0
    });
    $(this.el).empty();
    return this;
  };

  return Login;

})();

views.Navigation = (function() {

  __extends(Navigation, Backbone.View);

  function Navigation() {
    this.revert = __bind(this.revert, this);
    this.revert_tip = __bind(this.revert_tip, this);
    this.show_tip = __bind(this.show_tip, this);
    this.select = __bind(this.select, this);
    this.hide_menu = __bind(this.hide_menu, this);
    this.show_user_menu = __bind(this.show_user_menu, this);
    Navigation.__super__.constructor.apply(this, arguments);
  }

  Navigation.prototype.el = '#navigation';

  Navigation.prototype.events = {
    'click .logout': 'logout',
    'click li.a, a.profile, li span': 'show_user_menu',
    'mouseover #main-nav li a': 'show_tip',
    'mouseout #main-nav li a': 'revert_tip'
  };

  Navigation.prototype.initialize = function(app) {
    var _this = this;
    app.on('login', function() {
      return _this.render();
    });
    app.on('refresh', function() {
      if (app.user && app.user.get('authenticated')) return _this.render();
    });
    return app.on('logout', function() {
      return $(_this.el).css({
        top: '-60px'
      }).html('');
    });
  };

  Navigation.prototype.render = function() {
    if (app.user && app.user.get('accounts') && app.user.get('accounts').length === 1) {
      app.user.set('accounts', false);
    }
    $(this.el).html(tmpl.navigation(app.user.attributes)).css({
      top: '0'
    });
    this.revert_tip();
    return this.select(this.selected);
  };

  Navigation.prototype.show_user_menu = function(event) {
    event.stopPropagation();
    $('#user .arrow').parent().css({
      background: 'rgba(255,255,255,0.2)'
    });
    $('#user li ul').css({
      display: 'block'
    });
    return $('html,a.pm').bind('click', this.hide_menu);
  };

  Navigation.prototype.hide_menu = function(event) {
    event.stopPropagation();
    $('#user .arrow').parent().css({
      background: 'transparent'
    });
    return $('#user ul').css({
      display: 'none'
    });
  };

  Navigation.prototype.select = function(selected) {
    this.previous = this.selected;
    this.selected = selected;
    $('#main-nav li').css({
      opacity: 0.5
    });
    $('#main-nav li#tip').css({
      opacity: 1
    });
    if (!this.selected) {
      $('#arrow-ind').css({
        left: '-10px'
      });
      this.tip = '';
    }
    if (this.selected === 'reservation') {
      $('#arrow-ind').css({
        left: '27px'
      });
      this.tip = 'New Reservation';
    }
    if (this.selected === 'dashboard') {
      $('#arrow-ind').css({
        left: '65px'
      });
      this.tip = 'Dashboard';
    }
    if (this.selected === 'calendar') {
      $('#arrow-ind').css({
        left: '108px'
      });
      this.tip = 'Calendar';
    }
    if (this.selected === 'clients') {
      $('#arrow-ind').css({
        left: '156px'
      });
      this.tip = 'Clients';
    }
    if (this.selected === 'reports') {
      $('#arrow-ind').css({
        left: '205px'
      });
      this.tip = 'Reports';
    }
    if (this.selected === 'setup') {
      $('#arrow-ind').css({
        left: '250px'
      });
      this.tip = 'Setup';
    }
    $('#navigation #' + this.selected).css({
      opacity: 1
    });
    this.previous_tip = this.tip;
    return this.revert_tip();
  };

  Navigation.prototype.show_tip = function(e) {
    $(e.target).parent().css({
      opacity: 1
    });
    return $('#navigation #tip').text($(e.target).attr('rel'));
  };

  Navigation.prototype.revert_tip = function(e) {
    if (e && e.target) {
      $(e.target).parent().css({
        opacity: 0.5
      });
    }
    $('#navigation #tip').text(this.tip);
    return $('#navigation #' + this.selected).css({
      opacity: 1
    });
  };

  Navigation.prototype.revert = function() {
    this.select(this.previous);
    return $('#navigation #tip').text(this.previous_tip);
  };

  Navigation.prototype.logout = function() {
    return app.logout();
  };

  return Navigation;

})();

views.NavigationSidebar = (function() {

  __extends(NavigationSidebar, Backbone.View);

  function NavigationSidebar() {
    this.deselect = __bind(this.deselect, this);
    this.select = __bind(this.select, this);
    this.hide = __bind(this.hide, this);
    this.show = __bind(this.show, this);
    this.group_click = __bind(this.group_click, this);
    this.update_selected = __bind(this.update_selected, this);
    this.check_all = __bind(this.check_all, this);
    this.deselect_all = __bind(this.deselect_all, this);
    this.select_all = __bind(this.select_all, this);
    this.all_click = __bind(this.all_click, this);
    this.box_click = __bind(this.box_click, this);
    this.label_click = __bind(this.label_click, this);
    this.clear_search = __bind(this.clear_search, this);
    this.search = __bind(this.search, this);
    this.view_changed = __bind(this.view_changed, this);
    NavigationSidebar.__super__.constructor.apply(this, arguments);
  }

  NavigationSidebar.prototype.el = '#side';

  NavigationSidebar.prototype.events = {
    'keyup #search input': 'search',
    'click #close': 'clear_search',
    'click #toggles .checkbox label': 'label_click',
    'click #toggles .checkbox input': 'box_click',
    'click #toggles h4': 'group_click',
    'click #toggles h4 input': 'all_click'
  };

  NavigationSidebar.prototype.initialize = function(app) {
    app.on('refresh', this.hide);
    app.on('logout', this.hide);
    return this;
  };

  NavigationSidebar.prototype.render = function(data) {
    var group;
    var _this = this;
    this.data = data;
    $(this.el).html(tmpl.navigation_sidebar(this.data));
    $(this.el).css({
      left: '0'
    });
    if (this.data.calendar) {
      this.calendar = new Flint.Calendar('#side-calendar', app.year, app.month);
      this.calendar.set_focus_and_highlight('month');
      group = app.helpers.cookie('group_select');
      this.groups = group ? group.split(',') : [];
      _.each(this.groups, function(group) {
        $('#' + group).css({
          display: 'block'
        });
        return $($('#' + group).prev().children()[0]).attr('class', 'dn');
      });
    }
    return this;
  };

  NavigationSidebar.prototype.view_changed = function(view) {
    return this.calendar.set_focus_and_highlight(view);
  };

  NavigationSidebar.prototype.search = function(e) {
    var _this = this;
    this.term = $(e.target).val();
    if (this.term === '') {
      $('#find').css({
        opacity: 1
      });
      $('#close').css({
        opacity: 0
      });
    } else {
      $('#find').css({
        opacity: 0
      });
      $('#close').css({
        opacity: 1
      });
    }
    window.clearTimeout(app.helpers.timer);
    return app.helpers.delay(250, function() {
      return _this.trigger('search', _this.term);
    });
  };

  NavigationSidebar.prototype.clear_search = function() {
    this.term = '';
    $('#search input').val('');
    this.trigger('search', '');
    $('#find').css({
      opacity: 1
    });
    return $('#close').css({
      opacity: 0
    });
  };

  NavigationSidebar.prototype.label_click = function(e) {
    var box, id;
    e.stopPropagation();
    id = $(e.target).parent().attr('id');
    return box = $('#toggles p#' + id).children('input')[0].click();
  };

  NavigationSidebar.prototype.box_click = function(e) {
    var box, source;
    box = $(e.target);
    source = box.val() + ':' + box.attr('name');
    if (box.is(':checked')) {
      this.trigger('added:eventsource', source);
    } else {
      this.trigger('removed:eventsource', source);
    }
    return this.check_all(box.attr('name'));
  };

  NavigationSidebar.prototype.all_click = function(e) {
    var clicked, group;
    e.stopPropagation();
    clicked = $(e.target);
    group = clicked.attr('name');
    if (clicked.is(':checked')) {
      return this.select_all(group);
    } else {
      return this.deselect_all(group);
    }
  };

  NavigationSidebar.prototype.select_all = function(which) {
    var boxes;
    var _this = this;
    boxes = [];
    $('#' + which + ' input').each(function(item) {
      if (!$(this).is(':checked')) return boxes.push($(this));
    });
    return _.each(boxes, function(box) {
      var source;
      box.attr('checked', true);
      source = box.val() + ':' + box.attr('name');
      return _this.trigger('added:eventsource', source);
    });
  };

  NavigationSidebar.prototype.deselect_all = function(which) {
    var boxes;
    var _this = this;
    boxes = [];
    $('#' + which + ' input').each(function(item) {
      if ($(this).is(':checked')) return boxes.push($(this));
    });
    return _.each(boxes, function(box) {
      var source;
      box.attr('checked', false);
      source = box.val() + ':' + box.attr('name');
      return _this.trigger('removed:eventsource', source);
    });
  };

  NavigationSidebar.prototype.check_all = function(which) {
    var all_deselected, all_selected;
    all_selected = true;
    all_deselected = true;
    $('#' + which + ' input').each(function(item) {
      var checked;
      checked = $(this).is(':checked');
      if (checked) {
        return all_deselected = false;
      } else {
        return all_selected = false;
      }
    });
    if (all_selected) $('h4 input[name=' + which + ']').attr('checked', true);
    if (all_deselected) {
      return $('h4 input[name=' + which + ']').attr('checked', false);
    }
  };

  NavigationSidebar.prototype.update_selected = function() {
    var selected;
    var _this = this;
    selected = app.helpers.cookie('event_sources').toString().split('|');
    _.each(selected, function(src) {
      var sp;
      if (src > '') {
        sp = src.split(':');
        return $('#' + sp[0] + ' input').attr('checked', true);
      }
    });
    this.check_all('trip');
    this.check_all('lodge');
    return this.check_all('staff');
  };

  NavigationSidebar.prototype.group_click = function(e) {
    var arrow, id;
    if (e.target.tagName === 'SPAN') e.target = e.target.parentNode;
    id = $(e.target).next().attr('id');
    arrow = $(e.target).children('span')[0];
    if (arrow.className === 'up') {
      arrow.className = 'dn';
      $(e.target).next().css({
        display: 'block'
      });
      this.groups.push(id);
    } else {
      arrow.className = 'up';
      $(e.target).next().css({
        display: 'none'
      });
      this.groups = _.without(this.groups, id);
    }
    return app.helpers.cookie('group_select', this.groups.join(','));
  };

  NavigationSidebar.prototype.show = function() {
    $(this.el).css({
      width: '230px',
      left: 0
    });
    return this;
  };

  NavigationSidebar.prototype.hide = function() {
    $(this.el).css({
      left: '-230px'
    });
    return this;
  };

  NavigationSidebar.prototype.select = function(li) {
    $('#nav li').removeClass('current');
    $('#nav #_' + li).addClass('current');
    return this;
  };

  NavigationSidebar.prototype.deselect = function() {
    $('#nav li').removeClass('current');
    return this;
  };

  return NavigationSidebar;

})();

views.OrderForm = (function() {

  __extends(OrderForm, flybook.Form);

  function OrderForm() {
    this.cancel_reservation = __bind(this.cancel_reservation, this);
    this.place_reservation_on_hold = __bind(this.place_reservation_on_hold, this);
    this.approve_reservation = __bind(this.approve_reservation, this);
    this.update = __bind(this.update, this);
    this.update_discount = __bind(this.update_discount, this);
    this.remove_guest = __bind(this.remove_guest, this);
    this.remove_product = __bind(this.remove_product, this);
    this.remove_lodge = __bind(this.remove_lodge, this);
    this.remove_trip = __bind(this.remove_trip, this);
    this.payment_refunded = __bind(this.payment_refunded, this);
    this.refund_payment = __bind(this.refund_payment, this);
    this.add_payment = __bind(this.add_payment, this);
    this.process_payment = __bind(this.process_payment, this);
    this.change_pay_method = __bind(this.change_pay_method, this);
    this.capture_submit = __bind(this.capture_submit, this);
    this.capture_card = __bind(this.capture_card, this);
    this.prepare_capture = __bind(this.prepare_capture, this);
    this.lost_focus = __bind(this.lost_focus, this);
    this.add_guest = __bind(this.add_guest, this);
    this.add_promotion_discount = __bind(this.add_promotion_discount, this);
    this.add_product = __bind(this.add_product, this);
    this.create_lodging_reservations = __bind(this.create_lodging_reservations, this);
    this.add_lodge_reservation = __bind(this.add_lodge_reservation, this);
    this.add_trip_reservation = __bind(this.add_trip_reservation, this);
    this.show_lodge_dates = __bind(this.show_lodge_dates, this);
    this.show_trip_dates = __bind(this.show_trip_dates, this);
    this.show_lodge_availability = __bind(this.show_lodge_availability, this);
    this.show_trip_availability = __bind(this.show_trip_availability, this);
    this.show_availability = __bind(this.show_availability, this);
    this.select_product = __bind(this.select_product, this);
    this.update_room_selections = __bind(this.update_room_selections, this);
    this.select_lodge = __bind(this.select_lodge, this);
    this.select_trip = __bind(this.select_trip, this);
    this.select_stay_length = __bind(this.select_stay_length, this);
    this.change_country = __bind(this.change_country, this);
    this.change_discount = __bind(this.change_discount, this);
    this.change_product = __bind(this.change_product, this);
    this.change_room = __bind(this.change_room, this);
    this.change_lodge = __bind(this.change_lodge, this);
    this.change_time = __bind(this.change_time, this);
    this.change_trip = __bind(this.change_trip, this);
    this.change_party = __bind(this.change_party, this);
    this.tabbed = __bind(this.tabbed, this);
    this.after = __bind(this.after, this);
    this.setup = __bind(this.setup, this);
    this.before = __bind(this.before, this);
    OrderForm.__super__.constructor.apply(this, arguments);
  }

  OrderForm.prototype.__events = {
    'change .num-field select': 'change_party',
    'change select.trip': 'change_trip',
    'change select.lodge': 'change_lodge',
    'change select.lodge-rooms': 'change_room',
    'change select.trip-times': 'change_time',
    'change select.product': 'change_product',
    'change select.country': 'change_country',
    'click .trip-list div': 'show_trip_dates',
    'click .remove-trip': 'remove_trip',
    'click .lodge-list div': 'show_lodge_dates',
    'click .remove-lodge': 'remove_lodge',
    'click .remove-product': 'remove_product',
    'click .add-product': 'add_product',
    'click .add-guest': 'add_guest',
    'click .remove-guest': 'remove_guest',
    'change .payments .left select': 'change_pay_method',
    'change .promo-codes': 'add_promotion_discount',
    'change .discount': 'change_discount',
    'click .refund-payment': 'refund_payment',
    'blur .swipe-focus': 'lost_focus',
    'keyup .swipe-focus': 'capture_card',
    'click .enter-payment': 'process_payment',
    'click button.cancel-reservation': 'cancel_reservation',
    'click button.hold': 'place_reservation_on_hold',
    'click button.approve': 'approve_reservation'
  };

  OrderForm.prototype.before = function(callback) {
    var client, sp;
    var _this = this;
    this.tab_index = 0;
    if (this.model.get('id')) {
      this.model.set('setup_complete', '1', {
        silent: true
      });
    }
    this.setup();
    this.head_count = parseInt(this.model.get('adults')) + parseInt(this.model.get('children')) + parseInt(this.model.get('seniors'));
    _.extend(this.data, {
      trips: this.trip_select,
      lodges: this.lodge_select,
      products: this.product_select,
      staff: this.staff_select,
      peoples: this.party_select,
      head_count: this.head_count,
      discounts: this.discounts
    });
    if (this.model.get('arriving_at')) {
      sp = this.model.get('arriving_at').split(':');
      this.model.set('arrive_hr', sp[0]);
      this.model.set('arrive_min', sp[1]);
      sp = this.model.get('departing_at').split(':');
      this.model.set('depart_hr', sp[0]);
      this.model.set('depart_min', sp[1]);
    }
    if (this.model.get('client')) {
      client = this.model.get('client');
      delete client.id;
      _.extend(this.model.attributes, client);
    }
    app.helpers.after_transition('#dropdown', callback);
    app.dropdown.expand();
    this.off('tabbed');
    this.on('tabbed', this.tabbed);
    return this.on('changed', function() {
      return $('#overview').html(tmpl['reservations_overview'](_this.model.attributes));
    });
  };

  OrderForm.prototype.setup = function() {
    var active, package, select, staff, _i, _results;
    var _this = this;
    this.party_select = (function() {
      _results = [];
      for (_i = 0; _i < 50; _i++){ _results.push(_i); }
      return _results;
    }).apply(this);
    select = [[0, 'Select Trip or Activity...']];
    active = app.trips.list.collection.where({
      active: '1'
    });
    package = app.trips.list.collection.where({
      active: '1',
      package: '1'
    });
    _.each(active, function(trip) {
      return select.push([trip.get('id'), app.helpers.truncate(trip.get('name'), 40)]);
    });
    if (package.length > 0) {
      select.push([0, '----------------------']);
      select.push([0, 'Select Package...']);
      _.each(package, function(trip) {
        return select.push([trip.get('id'), app.helpers.truncate(trip.get('name'), 40)]);
      });
    }
    this.trip_select = select.length > 1 ? select : false;
    select = [[0, 'Select Lodge...']];
    _.each(app.lodging.list.collection.models, function(lodge) {
      return select.push([lodge.get('id'), app.helpers.truncate(lodge.get('name'), 40)]);
    });
    this.lodge_select = select.length > 1 ? select : false;
    this.lodges = app.lodging.list.collection.models;
    select = [[0, 'Add Product / Rental...']];
    _.each(app.products.list.collection.models, function(product) {
      return select.push([product.get('id'), app.helpers.truncate(product.get('name'), 30)]);
    });
    this.product_select = select.length > 1 ? select : false;
    staff = [];
    _.each(app.employees.list.collection.models, function(member) {
      return staff.push([member.get('nickname'), member.get('nickname')]);
    });
    this.staff_select = staff;
    this.staff = app.employees.list.collection;
    this.discounts = [[0, 'Apply promotion code...']];
    return _.each(app.user.get('account').promotions, function(promo) {
      return _this.discounts.push([promo.id, promo.code]);
    });
  };

  OrderForm.prototype.after = function() {
    var auto, days, month, token, tokenized, year, _i, _len;
    var _this = this;
    this.trips = [];
    this.stays = [];
    this.purchases = [];
    this.payments = [];
    this.clients = [];
    if (!this.model.get('id')) {
      this.model.set('trip_reservations', [], {
        silent: true
      });
      this.model.set('lodge_reservations', [], {
        silent: true
      });
      this.model.set('purchases', [], {
        silent: true
      });
      this.model.set('payments', [], {
        silent: true
      });
      this.model.set('clients', [], {
        silent: true
      });
    }
    this.trips = this.model.get('trip_reservations');
    this.stays = this.model.get('lodge_reservations');
    this.purchases = this.model.get('purchases');
    this.payments = this.model.get('payments');
    this.clients = this.model.get('clients');
    year = app.year;
    month = app.month;
    if (this.model.get('start_date')) {
      year = moment(this.model.get('start_date')).year();
      month = moment(this.model.get('start_date')).month();
    }
    this.trip_calendar = new Flint.Calendar('#trip-calendar', year, month);
    this.trip_calendar.on('next prev', this.show_availability);
    this.trip_calendar.on('clicked', this.add_trip_reservation);
    this.lodge_calendar = new Flint.Calendar('#lodge-calendar', year, month);
    this.lodge_calendar.on('next prev', this.show_availability);
    this.lodge_calendar.on('clicked', this.add_lodge_reservation);
    if (this.model.get('arriving_on') && this.model.get('arriving_on') > '0000-00-00') {
      year = moment(this.model.get('arriving_on')).year();
      month = moment(this.model.get('arriving_on')).month();
    }
    this.arr_select = new Flint.Calendar('#arrive-cal', year, month);
    this.arr_select.on('clicked', function(sql, date) {
      _this.model.set('arriving_on', sql);
      return _this.update();
    });
    if (this.model.get('departing_on') && this.model.get('departing_on') > '0000-00-00') {
      year = moment(this.model.get('departing_on')).year();
      month = moment(this.model.get('departing_on')).month();
    }
    this.dep_select = new Flint.Calendar('#depart-cal', year, month);
    this.dep_select.on('clicked', function(sql, date) {
      _this.model.set('departing_on', sql);
      return _this.update();
    });
    if (this.model.get('arriving_on') && this.model.get('arriving_on') > '0000-00-00') {
      this.arr_select.set_focus_date(this.model.get('arriving_on'), moment(this.model.get('arriving_on')).toDate());
    }
    if (this.model.get('departing_on') && this.model.get('departing_on') > '0000-00-00') {
      this.dep_select.set_focus_date(this.model.get('departing_on'), moment(this.model.get('departing_on')).toDate());
    }
    if (this.trip_id && !this.model.get('id')) {
      this.select_trip(this.trip_id, function() {
        if (_this.start_date) {
          return $('#trip-calendar td[data-sql=' + _this.start_date + ']').addClass('preselect-date');
        }
      });
    }
    if (this.lodge_id && !this.model.get('id')) {
      this.select_lodge(this.lodge_id, true, function() {
        var end_time, room, start_time, stay_length, _i, _len, _ref;
        if (_this.start_date) {
          $('#lodge-calendar td[data-sql=' + _this.start_date + ']').addClass('preselect-date');
          if (_this.end_date) {
            start_time = app.helpers.sqldate_to_js(_this.start_date).getTime();
            end_time = app.helpers.sqldate_to_js(_this.end_date).getTime() + (60 * 60 * 24 * 1000);
            stay_length = parseInt((end_time - start_time) / (60 * 60 * 24 * 1000));
            _this.select_stay_length(stay_length);
          }
          if (_this.room_id) {
            _ref = _this.lodge.get('rooms');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              room = _ref[_i];
              if (room.id === _this.room_id) {
                _this.room = room;
                _this.update_room_selections();
              }
            }
          }
        }
        return _this.show_lodge_availability();
      });
    }
    auto = this.model.get('auto_collect_balances');
    days = this.model.get('auto_collect_days_prior');
    if (!auto || auto === '0' || auto === 0) {
      $('.no-auto').click();
    } else if (auto === '1' || auto === 1) {
      $('.day-auto').click();
    } else {
      $('.custom-auto').val(auto).click();
      $('.balance-days').val(days);
    }
    if (this.model.get('client')) {
      $('.view-client').css({
        display: 'block'
      });
    } else {
      $('.view-client').css({
        display: 'none'
      });
    }
    tokenized = [];
    _.each(this.payments, function(payment) {
      var token;
      if (payment.token > '') {
        token = {
          last_four: payment.token.substr(payment.token.length - 4, 4),
          name: payment.name,
          card: payment.card.toUpperCase(),
          id: payment.id
        };
        if (_.indexOf(_this.payments, token) < 0) return tokenized.push(token);
      }
    });
    if (tokenized.length > 0) {
      $('#pay-method').append('<option value="0">------------------------</option>');
      for (_i = 0, _len = tokenized.length; _i < _len; _i++) {
        token = tokenized[_i];
        $('#pay-method').append('<option value="token:' + token.id + '">' + token.name + '\'s ' + token.card + ' (' + token.last_four + ')</option>');
      }
    }
    this.change_country();
    this.update();
    return app.dropdown.fluid();
  };

  OrderForm.prototype.tabbed = function(tab) {
    var _this = this;
    window.clearTimeout(app.helpers.timer);
    if (tab.html().indexOf('ayment') > 0) {
      app.helpers.after_transition('.tabshell', this.prepare_capture);
    }
    if (!this.model.get('id')) {
      return $('.done').removeClass('done').addClass('save').removeClass('next-step').bind('click', function() {
        if (_.isUndefined(_this.model.validate(_this.model.attributes))) {
          _this.cancel();
          return app.dropdown.collapse();
        }
      });
    }
  };

  OrderForm.prototype.change_party = function(e) {
    var dropdown;
    dropdown = $(e.target);
    this.model.set(dropdown.attr('name'), dropdown.val(), {
      silent: true
    });
    this.nights = this.model.get('nights', {
      silent: true
    });
    if (this.trip) this.show_trip_availability(false, false);
    if (this.lodge) return this.show_lodge_availability(false, false);
  };

  OrderForm.prototype.change_trip = function(e) {
    this.time = false;
    if ($(e.target).val() > '0') return this.select_trip($(e.target).val());
  };

  OrderForm.prototype.change_time = function(e) {
    var time;
    time = $(e.target).val();
    this.time = time;
    return this.show_trip_availability();
  };

  OrderForm.prototype.change_lodge = function(e) {
    this.room = false;
    if ($(e.target).val() > '0') {
      return this.select_lodge($(e.target).val(), true);
    } else {
      return this.lodge = false;
    }
  };

  OrderForm.prototype.change_room = function(e) {
    var _this = this;
    if ($(e.target).val() === '0') {
      this.room = false;
    } else {
      _.each(this.lodge.get('rooms'), function(room) {
        if (room.id.toString() === $(e.target).val().toString()) {
          return _this.room = room;
        }
      });
    }
    return this.show_lodge_availability();
  };

  OrderForm.prototype.change_product = function(e) {
    if ($(e.target).val() > '0') return this.select_product($(e.target).val());
  };

  OrderForm.prototype.change_discount = function(e) {
    var discount;
    discount = parseFloat($(e.target).val().replace(/[A-Za-z$-,]/g, ''));
    this.model.set('discount', discount, {
      silent: true
    });
    return this.update();
  };

  OrderForm.prototype.change_country = function() {
    var state, val;
    var _this = this;
    val = $('.country').val();
    $('.state option').remove();
    if (this.model.get('state')) {
      state = this.model.get('state');
    } else {
      state = '';
    }
    return _.each(app.countries_states, function(row) {
      var select;
      if (row.country_code === val) {
        select = state === row.state_code ? 'selected' : '';
        return $('.state').append('<option value="' + row.state_code + '" ' + select + '>' + row.state_code + '</option>');
      }
    });
  };

  OrderForm.prototype.select_stay_length = function(length) {
    $('.stay-length option').attr('selected', false).each(function(item) {
      if ($(this).val().toString() === length.toString()) {
        return $(this).attr('selected', true);
      }
    });
    this.nights = length;
    return this.model.set('nights', this.nights, {
      silent: true
    });
  };

  OrderForm.prototype.select_trip = function(id, callback) {
    var auto, check_lodges, days, times;
    var _this = this;
    if (callback == null) callback = false;
    $('.trip option').attr('selected', false).each(function(item) {
      if ($(this).val() === id) return $(this).attr('selected', true);
    });
    $('#trip-calendar td').removeClass('trip-date');
    $('.trip-list div').removeClass('shown');
    this.trip = app.trips.grab(id);
    times = this.trip.get('start_times').split(',');
    if (times.length > 0 && times[0] !== '') {
      this.time = times[0];
      $('.trip-times').css({
        display: 'block'
      });
      $('.trip-times option').remove();
      _.each(times, function(time) {
        var preselect;
        preselect = _this.selected_time === time ? 'selected' : '';
        return $('.trip-times').append('<option value="' + time + '" ' + preselect + '>' + app.helpers.twenty_four_to_twelve(time) + '</option>');
      });
      this.time = this.selected_time ? this.selected_time : times[0];
    } else {
      this.time = false;
      $('.trip-times').css({
        display: 'none'
      });
    }
    if (!this.model.get('id')) {
      $('.confirm-letter').val(this.trip.get('confirmation_letter'));
      this.model.set('confirmation', this.trip.get('confirmation_letter'), {
        silent: true
      });
      auto = this.trip.get('auto_collect_balances');
      days = this.trip.get('auto_collect_days_prior');
      if (!auto || auto === '0' || auto === 0) {
        $('.no-auto').click();
      } else if (auto === '1' || auto === 1) {
        $('.day-auto').click();
      } else {
        $('.custom-auto').val(auto).click();
        $('.balance-days').val(days);
      }
    }
    check_lodges = false;
    if (this.trip.get('lodging_nights') > 0 && this.trip.get('lodge_id') > '1') {
      this.select_lodge(this.trip.get('lodge_id'), true, this.show_trip_availability());
    } else {
      this.show_trip_availability();
    }
    if (callback) return callback();
  };

  OrderForm.prototype.select_lodge = function(id, show_availability, callback) {
    var _this = this;
    if (show_availability == null) show_availability = false;
    $('.lodge option').attr('selected', false).each(function(item) {
      if ($(this).val() === id) return $(this).attr('selected', true);
    });
    $('.lodge-list div').removeClass('shown');
    $('#lodge-calendar td').removeClass('trip-date');
    return app.lodging.get(id, function(lodge) {
      _this.lodge = lodge;
      _this.update_room_selections();
      if (show_availability) _this.show_lodge_availability();
      if (callback) return callback();
    });
  };

  OrderForm.prototype.update_room_selections = function() {
    var _this = this;
    $('.lodge-rooms').css({
      display: 'block'
    });
    $('.lodge-rooms option').remove();
    $('.lodge-rooms').append('<option value="0">All Rooms</option>');
    return _.each(this.lodge.get('rooms'), function(room) {
      var check_end, check_start, end_date, end_month, month, price_end, price_start, selected, start_date, start_month;
      month = (parseInt(_this.lodge_calendar.month) + 1) < 10 ? '0' + (parseInt(_this.lodge_calendar.month) + 1) : parseInt(_this.lodge_calendar.month) + 1;
      check_start = month + '-01';
      check_end = month + '-31';
      start_month = room.start_month < 10 ? '0' + room.start_month : room.start_month;
      start_date = room.start_date < 10 ? '0' + room.start_date : room.start_date;
      end_month = room.end_month < 10 ? '0' + room.end_month : room.end_month;
      end_date = room.end_date < 10 ? '0' + room.end_date : room.end_date;
      price_start = start_month + '-' + start_date;
      price_end = end_month + '-' + end_date;
      if (price_start <= check_start && check_end <= price_end) {
        selected = _this.room && _this.room.id === room.id ? 'selected="true"' : '';
        return $('.lodge-rooms').append('<option value="' + room.id + '" ' + selected + '>' + room.type + '</option>');
      }
    });
  };

  OrderForm.prototype.select_product = function(id) {
    var _this = this;
    return app.products.get(id, function(product) {
      var variations;
      _this.product = product;
      if (product.get('variations') > '') {
        $('.product-variations').css({
          display: 'block'
        });
        $('.product-variations option').remove();
        variations = product.get('variations').split('||');
        return _.each(variations, function(vari) {
          return $('.product-variations').append('<option value="' + vari + '">' + vari + '</option>');
        });
      } else {
        return $('.product-variations').css({
          display: 'none'
        });
      }
    });
  };

  OrderForm.prototype.show_availability = function(cal) {
    this.trip_calendar.render(cal.year, cal.month);
    this.lodge_calendar.render(cal.year, cal.month);
    if (this.trip) this.show_trip_availability();
    if (this.lodge) {
      this.show_lodge_availability();
      return this.update_room_selections();
    }
  };

  OrderForm.prototype.show_trip_availability = function() {
    var availability, people, trip, verify_lodging;
    var _this = this;
    if (!this.trip) return false;
    $('#trip-calendar td').removeClass('start-available').removeClass('trip-date-available');
    people = parseInt(this.model.get('adults')) + parseInt(this.model.get('children')) + parseInt(this.model.get('seniors'));
    availability = this.trip.get_availability_by_month(this.trip_calendar.year, this.trip_calendar.month, people, this.time);
    verify_lodging = false;
    if (this.trip.get('lodge_id') > '0') {
      verify_lodging = this.lodge ? [this.lodge] : this.lodges;
    }
    trip = new models.Trip(this.trip.attributes);
    return _.each(availability, function(available) {
      var available_beds, available_lodges;
      trip.set_all_dates(available.sql);
      if (verify_lodging) {
        available_lodges = [];
        available_beds = 0;
        people = parseInt(_this.model.get('adults')) + parseInt(_this.model.get('seniors'));
        _.each(verify_lodging, function(lodge) {
          var lodge_availability;
          lodge_availability = lodge.is_available(trip.get('start_date_js'), trip.get('end_date_js'), people);
          if (lodge_availability.is_available) {
            available_beds += parseInt(lodge_availability.beds);
            return available_lodges.push({
              lodge: lodge,
              availability: lodge_availability
            });
          }
        });
        if (available_beds >= people) {
          $('#trip-calendar td[data-sql=' + available.sql + ']').addClass('start-available');
          _.each(trip.get('trip_dates'), function(date) {
            return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date-available');
          });
          return _.each(trip.get('nights'), function(date) {
            return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date-available');
          });
        }
      } else {
        $('#trip-calendar td[data-sql=' + available.sql + ']').addClass('start-available');
        _.each(trip.get('trip_dates'), function(date) {
          return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date-available');
        });
        if (trip.get('nights')) {
          return _.each(trip.get('nights'), function(date) {
            return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date-available');
          });
        }
      }
    });
  };

  OrderForm.prototype.show_lodge_availability = function() {
    var available, people;
    var _this = this;
    $('#lodge-calendar td').removeClass('start-available').removeClass('trip-date-available');
    people = parseInt(this.model.get('adults')) + parseInt(this.model.get('seniors'));
    available = this.lodge.get_availability_by_month(this.lodge_calendar.year, this.lodge_calendar.month, people, this.room, this.nights);
    return _.each(available, function(date) {
      if (date.availability.beds >= people) {
        return $('#lodge-calendar td[data-sql=' + date.sql + ']').addClass('start-available');
      }
    });
  };

  OrderForm.prototype.show_trip_dates = function(e) {
    var div, id, target, _trip;
    var _this = this;
    $('#trip-calendar td').removeClass('trip-date');
    _trip = null;
    if (e) {
      target = $(e.target);
      id = target.attr('id');
      while (!id) {
        target = target.parent();
        id = target.attr('id');
      }
      _.each(this.trips, function(res) {
        if (res.id.toString() === id.toString()) {
          _trip = new models.Trip(res.trip);
          return _trip.set_all_dates(res.start_date);
        }
      });
    } else {
      _trip = this.trip;
      id = _trip.get('id');
    }
    if (!_trip) return false;
    div = $('#' + id + ' div:eq(0)');
    if (div.hasClass('shown')) {
      return div.removeClass('shown');
    } else {
      $('.trip-list div').removeClass('shown');
      div.addClass('shown');
      $('#trip-calendar td[data-sql=' + _trip.get('start_date') + ']').addClass('trip-date');
      return _.each(_trip.get('trip_dates'), function(date) {
        return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
      });
    }
  };

  OrderForm.prototype.show_lodge_dates = function(e) {
    var div, id, target, _res;
    var _this = this;
    $('#lodge-calendar td').removeClass('trip-date');
    _res = null;
    if (e) {
      target = $(e.target);
      id = target.attr('id');
      while (!id) {
        target = target.parent();
        id = target.attr('id');
      }
      _.each(this.stays, function(res) {
        if (res.id.toString() === id.toString()) {
          _res = new models.Reservation(res);
          return _res.set_all_dates(res.start_date);
        }
      });
      if (!_res) return false;
      div = $('#' + _res.get('id').toString() + ' div:eq(0)');
      if (div.hasClass('shown')) {
        return div.removeClass('shown');
      } else {
        $('.lodge-list div').removeClass('shown');
        div.addClass('shown');
        return _.each(_res.get('nights'), function(date) {
          return $('#lodge-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
        });
      }
    }
  };

  OrderForm.prototype.add_trip_reservation = function(sql, js, forced) {
    var clicked, costs, highlight, highlight_lodge, people, reservation, reservations;
    var _this = this;
    if (forced == null) forced = false;
    clicked = $('#trip-calendar td[data-sql=' + sql + ']');
    if (!clicked.hasClass('start-available') && (!forced || _.isArray(forced))) {
      return false;
    }
    $('#trip-calendar td').removeClass('trip-date');
    this.trip.set_all_dates(sql);
    delete this.trip.id;
    reservation = {
      id: 'n' + Math.round(Math.random() * 2000),
      adults: this.model.get('adults'),
      children: this.model.get('children'),
      seniors: this.model.get('seniors'),
      start_date: sql,
      end_date: this.trip.get('end_date'),
      start_time: this.time,
      trip_id: this.trip.get('id'),
      trip: this.trip.clone().attributes,
      status: '1',
      order: false,
      created_on: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    if ($('.inc-trip').is(':checked')) {
      reservation.total = 0;
      reservation.deposit = 0;
      reservation.fees = 0;
    } else {
      costs = this.trip.get_cost_breakdown(reservation);
      reservation.total = costs.total;
      reservation.total_fees = costs.fees;
      reservation.deposit = costs.deposit;
    }
    if (!this.model.get('start_date') || sql < this.model.get('start_date')) {
      this.model.set('start_date', sql, {
        silent: true
      });
    }
    if (!this.model.get('end_date') || this.trip.get('end_date') > this.model.get('end_date')) {
      this.model.set('end_date', this.trip.get('end_date'), {
        silent: true
      });
    }
    reservations = [reservation];
    if (this.trip.get('activities_scheduled') !== '1' && this.trip.get('package') === '1') {
      reservations = this.trip.create_activity(reservation, this.time, this.guide_id);
    }
    _.each(reservations, function(__res) {
      _this.trips.push(__res);
      return app.reserved.models.push(new models.Reservation(__res));
    });
    if (this.trip.get('lodge_id') > '0') {
      people = parseInt(reservation.adults) + parseInt(reservation.seniors);
      this.included_nights = this.trip.get('lodging_nights');
      highlight_lodge = this.create_lodging_reservations(this.trip.get('check_in_date'), this.trip.get('check_out_date'), people, true);
      this.select_stay_length(this.trip.get('lodging_nights'));
    }
    highlight = this.trip.get('trip_dates');
    this.update();
    this.show_trip_availability();
    _.each(highlight, function(date) {
      return $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
    });
    return _.each(highlight_lodge, function(date) {
      return $('#lodge-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
    });
  };

  OrderForm.prototype.add_lodge_reservation = function(sql, js, forced) {
    var clicked, end, people, reservation;
    var _this = this;
    if (forced == null) forced = false;
    clicked = $('#lodge-calendar td[data-sql=' + sql + ']');
    if (!clicked.hasClass('start-available')) return false;
    $('#lodge-calendar td').removeClass('trip-date');
    if (!this.nights) this.nights = this.model.get('nights');
    end = new Date(js.getTime() + (60 * 60 * 24 * (this.nights - 1) * 1000));
    people = parseInt(this.model.get('adults')) + parseInt(this.model.get('seniors'));
    reservation = new models.Reservation({
      start_date: sql,
      end_date: app.helpers.jsdate_to_sql(end)
    });
    reservation.set_all_dates();
    _.each(reservation.get('nights'), function(date) {
      return $('#lodge-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
    });
    if (!this.model.get('start_date') || reservation.get('start_date') < this.model.get('start_date')) {
      this.model.set('start_date', reservation.get('start_date'), {
        silent: true
      });
    }
    if (!this.model.get('end_date') || reservation.get('end_date') > this.model.get('end_date')) {
      this.model.set('end_date', reservation.get('end_date'), {
        silent: true
      });
    }
    this.create_lodging_reservations(js, end, people);
    this.show_lodge_availability();
    _.each(reservation.get('nights'), function(date) {
      return $('#lodge-calendar td[data-sql=' + date.sql + ']').addClass('trip-date');
    });
    return this.update();
  };

  OrderForm.prototype.create_lodging_reservations = function(start_js, end_js, people, inclusive) {
    var available_lodges, available_rooms, beds, beds_to_fill, end_sql, highlight, lodges, start_sql, _res;
    var _this = this;
    if (inclusive == null) inclusive = false;
    lodges = this.lodge ? [this.lodge] : this.lodges;
    available_lodges = [];
    start_sql = app.helpers.jsdate_to_sql(start_js);
    end_sql = app.helpers.jsdate_to_sql(end_js);
    highlight = [];
    _res = new models.Reservation({
      start_date: start_sql,
      end_date: end_sql
    });
    _res.set_all_dates();
    available_rooms = [];
    _.each(lodges, function(lodge) {
      var check;
      check = lodge.is_available(start_js, end_js, people, _this.room);
      if (check.is_available) {
        if (!_this.room) {
          return _.each(check.rooms, function(room) {
            if (lodge.room_is_available_between(start_js, end_js, room)) {
              return available_rooms.push({
                room: room,
                lodge: lodge.clone()
              });
            }
          });
        } else {
          return available_rooms.push({
            room: _this.room,
            lodge: _this.lodge.clone()
          });
        }
      }
    });
    beds_to_fill = people;
    while (beds_to_fill > 0) {
      beds = 0;
      _.each(available_rooms, function(available) {
        var nights_priced, reservation, room;
        room = available.room;
        if (parseInt(room.sleeps) < beds_to_fill) {
          beds = room.sleeps;
        } else {
          beds = beds_to_fill;
        }
        if (room && beds_to_fill > 0) {
          reservation = {
            id: Math.round(Math.random() * 20000).toString(),
            lodge: available.lodge.attributes,
            lodge_id: available.lodge.id,
            room_id: room.id,
            room: room,
            adults: beds,
            start_date: start_sql,
            end_date: end_sql,
            status: '1',
            order: false,
            created_on: moment().format('YYYY-MM-DD HH:mm:ss')
          };
          if (inclusive || $('.inc-lodge').is(':checked')) {
            reservation.total = 0;
          } else {
            nights_priced = _res.get('nights').length - _this.included_nights;
            reservation.total = _res.get_lodge_pricing(new models.Lodge(reservation.lodge), nights_priced, reservation.room);
          }
          _this.stays.push(reservation);
          app.reserved.add(new models.Reservation(reservation));
          highlight = _res.get('nights');
          beds_to_fill -= beds;
          if (beds_to_fill <= 0 && inclusive) {
            _this.lodge = available.lodge;
            _this.select_lodge(available.lodge.id, true);
            return false;
          } else {
            return false;
          }
        }
      });
    }
    return highlight;
  };

  OrderForm.prototype.add_product = function() {
    var price, product, rentable;
    product = {
      id: Math.round(Math.random() * 20000).toString(),
      product: this.product,
      name: this.product.get('name')
    };
    rentable = this.product.get('rentable');
    $('.addons select,.addons input').each(function(item) {
      var field, value;
      field = $(this).attr('name');
      value = $(this).val();
      if (field === 'rental') {
        if (rentable === '1') {
          value = $(this).is(':checked');
        } else {
          value = 0;
        }
      }
      if (field === 'quantity') value = value.replace(/[A-Za-z$-,]/g, '');
      return product[field] = value;
    });
    if (product.quantity === '') {
      return app.notifications.error('You need to enter a quantity to add this product.');
    } else {
      price = this.product.get('price');
      if (product.rental) {
        price = this.product.get('rental_price');
      } else if (this.product.get('sale_price') > 0 && this.product.get('sale_price') < price) {
        price = this.product.get('sale_price');
      }
      product.price = price;
      this.purchases.push(product);
      return this.update();
    }
  };

  OrderForm.prototype.add_promotion_discount = function(e) {
    var code;
    code = $(e.target).val();
    if (code > '0') {
      $('#discount-info').html('Validating code...');
      return this.trigger('selected:discount', code);
    }
  };

  OrderForm.prototype.add_guest = function() {
    var guest;
    guest = {
      id: Math.round(Math.random() * 20000).toString(),
      create: true,
      name: $('.guest-name').val(),
      email: $('.guest-email').val()
    };
    if (guest.name === '') {
      return app.notifications.error('You must enter a name for this guest');
    } else {
      this.clients.push(guest);
      this.model.attributes.guests.push(guest);
      $('.guest-name,.guest-email').val('');
      return this.update();
    }
  };

  OrderForm.prototype.lost_focus = function() {
    var _this = this;
    $('form').unbind('submit');
    return $('.swipe-msg').text('click to swipe card').bind('click', function() {
      return _this.prepare_capture();
    });
  };

  OrderForm.prototype.prepare_capture = function() {
    var _this = this;
    window.clearTimeout(app.helpers.timer);
    return app.helpers.delay(300, function() {
      document.getElementById('pay-method').selectedIndex = 0;
      $('.card-info').css({
        display: 'block'
      });
      $('.swipe-focus').focus();
      return $('.swipe-msg').text('swipe the card now');
    });
  };

  OrderForm.prototype.capture_card = function(e) {
    var _this = this;
    e.stopPropagation();
    this.raw_card = $('.swipe-focus').val();
    this.payment = new models.Payment;
    window.clearTimeout(app.helpers.timer);
    app.helpers.delay(300, function() {
      var expires, fields, name, name_parts, number;
      _this.raw_card = _this.raw_card.substr(2, _this.raw_card.length);
      fields = _this.raw_card.split('^');
      number = fields[0];
      name_parts = fields[1].split('/');
      name = name_parts[1] + ' ' + name_parts[0];
      expires = fields[2].substr(2, 2) + '/' + fields[2].substr(0, 2);
      $('.payer-name').val(name);
      $('.card-info input:eq(0)').val(number);
      $('.card-info input:eq(1)').val(expires);
      return $('.swipe-focus').val('');
    });
    return false;
  };

  OrderForm.prototype.capture_submit = function() {
    return false;
  };

  OrderForm.prototype.change_pay_method = function(e) {
    var method;
    method = $(e.target).val();
    this.payment_id = false;
    if (method === 'credit') {
      $('.card-info').css({
        display: 'block'
      });
      return $('.payment fieldset').css({
        display: 'block'
      });
    } else if (method.indexOf('token:') >= 0) {
      this.payment_id = method.replace(/token:/, '');
      $('.add-as-guest').attr('checked', false);
      $('.card-info').css({
        display: 'none'
      });
      return $('.payment fieldset').css({
        display: 'none'
      });
    } else {
      $('.payment fieldset').css({
        display: 'block'
      });
      return $('.card-info').css({
        display: 'none'
      });
    }
  };

  OrderForm.prototype.process_payment = function() {
    var add_as_guest, payment, valid, valid_email;
    if (this.trips.length === 0 && this.stays.length === 0 && this.purchases.length === 0) {
      app.notifications.error('You must add a trip / lodge reservation or product before you enter payments.');
      return false;
    }
    payment = new models.Payment;
    payment.set('order_id', this.model.get('id'), {
      silent: true
    });
    if (this.payment_id) {
      payment.set('id', this.payment_id, {
        silent: true
      });
      payment.set('amount', $('.amount').val().replace(/[A-Za-z$-,]/g, ''));
    } else {
      valid = true;
      $('.payment input,.payment select').each(function(i) {
        var attr, val;
        attr = $(this).attr('name').replace(/_/, '');
        val = $(this).val();
        if (attr === 'paid_by' && val === '') {
          app.notifications.error('Please complete all payment fields and enter a valid amount.');
          return false;
        }
        if (attr === 'amount') val = val.replace(/[A-Za-z$-,]/g, '');
        if (val === '' && attr !== 'swipefocus' && attr !== 'email') valid = false;
        return payment.set(attr, val, {
          silent: true
        });
      });
      add_as_guest = $('.add-as-guest').is(':checked') ? '1' : '0';
      payment.set('add_as_guest', add_as_guest, {
        silent: true
      });
      valid_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (payment.email > '' && !payment.email.match(valid_email)) {
        app.notifications.error('You must use a valid email address or leave it blank.');
        return false;
      } else if ((payment.get('method') === 'credit' && !valid) || payment.get('amount') < 1 || payment.get('name') === '') {
        app.notifications.error('Please enter all payment fields and a valid amount.');
        return false;
      }
    }
    app.notifications.notify('Processing payment...');
    return this.trigger('process:payment', payment);
  };

  OrderForm.prototype.save = function(event, silent) {
    if (silent == null) silent = false;
    if (silent) {
      return this.collection.add(this.model, {
        silent: true
      });
    } else {
      return this.collection.add(this.model);
    }
  };

  OrderForm.prototype.add_payment = function(payment) {
    var client;
    var _this = this;
    if (payment.get('created_order') && !this.model.get('id')) {
      this.model.set('id', payment.get('created_order'), {
        silent: true
      });
      this.save(event, true);
    }
    if (payment.get('client')) {
      client = payment.get('client');
      if (!this.model.get('client_id')) {
        if (client.user_id) {
          this.model.set('user_id', client.user_id, {
            silent: true
          });
        }
        this.model.set('client_id', client.id, {
          silent: true
        });
        this.model.set('name', client.name, {
          silent: true
        });
        this.model.set('email', client.email, {
          silent: true
        });
        _.each(client, function(value, attr) {
          if (value !== '') return $('.' + attr).val(value);
        });
      } else {
        this.clients.push(client);
      }
    }
    app.notifications.notify('Payment of $' + app.helpers.dollar(payment.attributes.amount) + ' has been applied to this reservation.');
    this.payments.push(payment.attributes);
    this.update();
    return $('.payment input').val('');
  };

  OrderForm.prototype.refund_payment = function(e) {
    var id;
    var _this = this;
    id = $(e.target).parent().attr('id');
    return _.each(this.payments, function(payment) {
      if (payment.id.toString() === id.toString()) {
        $('.no-auto').click();
        _this.trigger('refund:payment', payment);
        return app.notifications.notify('Refunding payment...');
      }
    });
  };

  OrderForm.prototype.payment_refunded = function(refund) {
    var _this = this;
    _.each(this.payments, function(payment) {
      if (payment.id.toString() === refund.get('id')) {
        return _this.payments = _.without(_this.payments, payment);
      }
    });
    this.update();
    if (this.payments.length === 0 && this.model.get('id')) {
      return app.notifications.yes_or_no('You have refunded the entire cost of this reservation. Do you want to cancel it?', this.cancel_reservation);
    } else {
      return app.notifications.notify('$' + app.helpers.dollar(refund.get('amount')) + ' has been refunded to ' + refund.get('name'));
    }
  };

  OrderForm.prototype.remove_trip = function(e) {
    var id;
    var _this = this;
    $('#trip-calendar td').removeClass('trip-date');
    id = $(e.target).parent().attr('id');
    _.each(this.trips, function(res) {
      if (res.id.toString() === id.toString()) {
        _this.trips = _.without(_this.trips, res);
        return app.reserved.remove_reservation(res.id);
      }
    });
    this.show_trip_availability();
    return this.update();
  };

  OrderForm.prototype.remove_lodge = function(e) {
    var id;
    var _this = this;
    $('#lodge-calendar td').removeClass('trip-date');
    id = $(e.target).parent().attr('id');
    _.each(this.stays, function(res) {
      if (res.id.toString() === id.toString()) {
        _this.stays = _.without(_this.stays, res);
        return app.reserved.remove_reservation(id);
      }
    });
    this.show_lodge_availability();
    return this.update();
  };

  OrderForm.prototype.remove_product = function(e) {
    var id;
    var _this = this;
    id = $(e.target).parent().attr('id');
    _.each(this.purchases, function(purchase) {
      if (purchase.id.toString() === id.toString()) {
        return _this.purchases = _.without(_this.purchases, purchase);
      }
    });
    return this.update();
  };

  OrderForm.prototype.remove_guest = function(e) {
    var id;
    var _this = this;
    id = $(e.target).parent().attr('id');
    _.each(this.clients, function(guest) {
      if (guest.id.toString() === id.toString()) {
        _this.clients = _.without(_this.clients, guest);
        return _this.model.attributes.guests = _.without(_this.model.attributes.guests, guest);
      }
    });
    return this.update();
  };

  OrderForm.prototype.update_discount = function(discount) {
    var amount_off, percent, total, total_discounts;
    total = this.model.get('total');
    if (discount.percent_discount) {
      percent = discount.percent_discount + '%';
      amount_off = Math.round(total * (discount.percent_discount / 100), 2);
    } else {
      amount_off = discount.flat_discount;
    }
    discount = this.model.get('discount');
    total_discounts = parseFloat(discount) + parseFloat(amount_off);
    this.model.set('discount', total_discounts, {
      silent: true
    });
    this.model.set('promotion_id', discount.id, {
      silent: true
    });
    $('.discount').val('$' + app.helpers.dollar(total_discounts));
    $('#discount-info').html('Promotion code ' + percent + ' discount of $' + app.helpers.dollar(amount_off) + ' applied.');
    return this.update();
  };

  OrderForm.prototype.update = function() {
    var adults, balance, children, coming, deposit, discount, going, guest_html, lodge_html, lodge_total, merged_index, merged_lodging, paid, pay_html, payment_tokens, peeps, primary, prod_html, product_total, seniors, to_pay, total, trip_html, trip_total;
    var _this = this;
    total = 0;
    trip_total = 0;
    lodge_total = 0;
    product_total = 0;
    deposit = 0;
    adults = this.model.get('adults');
    children = this.model.get('children');
    seniors = this.model.get('seniors');
    this.model.set('trip_reservations', this.trips, {
      silent: true
    });
    this.included_nights = 0;
    trip_html = this.trips.length > 0 ? '' : '<li><div><p class="small">No trips have been added to this reservation.</p></div></li>';
    $('.trip-list').html(trip_html);
    _.each(this.trips, function(reservation) {
      var activity, guide, index, jsdate, merge_date, merge_time, merge_trip_id, merged, merged_activities, people, time, trip, _i, _len, _ref, _res, _reservation, _trip;
      _res = reservation;
      delete reservation.trip.id;
      delete reservation.trip.start_date;
      delete reservation.trip.end_date;
      trip = _.extend(reservation, reservation.trip);
      trip.id = reservation.id;
      _trip = new models.Trip(trip);
      _reservation = new models.Reservation(reservation);
      trip.dates = _trip.formatted_dates();
      trip.party = _reservation.party_detail();
      $('.trip-list').append(tmpl['reservations_trip_item'](trip));
      people = parseInt(reservation.adults) + parseInt(reservation.seniors);
      if (_trip.get('lodge_id') > '0') {
        _this.included_nights += _trip.get('nights').length * people;
      } else {
        _this.included_nights = 0;
      }
      total += parseFloat(trip.total);
      trip_total += parseFloat(trip.total);
      deposit += parseFloat(trip.deposit);
      merged_activities = [];
      if (reservation.activities) {
        merge_trip_id = false;
        merge_time = false;
        merged = false;
        merge_date = false;
        index = -1;
        _ref = reservation.activities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          activity = _ref[_i];
          guide = app.employees.list.collection.get(activity.guide_id);
          if (!guide) {
            guide = 'Group ' + activity.group_number;
          } else {
            guide = guide.attributes.nickname;
          }
          jsdate = moment(activity.date);
          if (activity.start_time && activity.start_time !== '00:00:00') {
            time = app.helpers.twenty_four_to_twelve(activity.start_time);
          } else {
            time = false;
          }
          if (merge_trip_id !== activity.trip_id || merge_time !== time || merge_date !== activity.date) {
            merge_time = time;
            merge_trip_id = activity.trip_id;
            merge_date = activity.date;
            merged = {
              time: time,
              date: merge_date,
              guide: guide + ' (' + activity.people + ')'
            };
            merged_activities.push(merged);
            index++;
          } else {
            merged_activities[index].guide += ', ' + guide + ' (' + activity.people + ')';
          }
        }
        return reservation.merged_activities = merged_activities;
      }
    });
    this.model.set('lodge_reservations', this.stays, {
      silent: true
    });
    this.filled_nights = 0;
    merged_lodging = [];
    merged_index = 0;
    lodge_html = this.stays.length > 0 ? '' : '<li><div><p class="small">No lodging nights have been added to this reservation.</p></div></li>';
    $('.lodge-list').html(lodge_html);
    _.each(this.stays, function(reservation) {
      var _reservation;
      _reservation = new models.Reservation(reservation);
      reservation.dates = _reservation.formatted_lodging_dates();
      reservation.check_in = _reservation.get('check_in');
      reservation.check_out = _reservation.get('check_out');
      reservation.party = reservation.adults > 1 ? reservation.adults + ' people' : '1 person';
      $('.lodge-list').append(tmpl['reservations_lodging_item'](reservation));
      total += parseFloat(reservation.total);
      lodge_total += parseFloat(reservation.total);
      deposit += parseInt(reservation.total);
      return _this.filled_nights += _reservation.get('nights').length * parseInt(reservation.adults);
    });
    if (this.included_nights > this.filled_nights) {
      $('.lodge-warn').html('<p class="error-msg"><b>Warning!</b> There are inclusive trips with lodging nights left to be scheduled. You will not be able to save the reservation until the lodging has been added.</p>').css({
        display: 'block'
      });
      this.included_nights = this.included_nights - this.filled_nights;
    } else {
      $('.lodge-warn').empty().css({
        display: 'none'
      });
      this.included_nights = 0;
    }
    this.model.set('included_nights', this.included_nights, {
      silent: true
    });
    prod_html = this.purchases.length > 0 ? '' : '<li><div p class="small">No products or rentals have been added to this reservation.</p></div></li>';
    $('.product-list').html(prod_html);
    _.each(this.purchases, function(product) {
      var cost;
      cost = parseFloat(product.price) * parseFloat(product.quantity);
      $('.product-list').append(tmpl['reservations_purchase_item'](product));
      total += parseFloat(cost);
      product_total += parseFloat(cost);
      return deposit += parseFloat(cost);
    });
    paid = 0;
    pay_html = this.payments.length > 0 ? '' : '<div><span class="data" style="width:80%">No payments have been made on this reservation yet.</span></div></li>';
    payment_tokens = [];
    $('.payment-list').html(pay_html);
    this.model.set('payments', this.payments, {
      silent: true
    });
    _.each(this.payments, function(payment) {
      var img, record;
      if (!payment.refunded || payment.refunded === '0') {
        record = '<li id="' + payment.id + '"><div>';
        record += '<span>$' + app.helpers.dollar(payment.amount) + '</span>';
        record += '<span>' + app.helpers.truncate(payment.name, 16) + '</span>';
        if (payment.method === 'credit') {
          img = '<img src="https://flybook-asset.s3.amazonaws.com/images/payment-types/' + payment.card + '.jpg" /> ';
        } else {
          img = '<img src="https://flybook-asset.s3.amazonaws.com/images/payment-types/' + payment.method + '.jpg" />';
        }
        record += '<span>' + img + '</span>';
        record += '<span>' + app.helpers.sql_to_slash(payment.created_on) + '</span>';
        record += '</div><button class="del refund-payment">Refund</button></li>';
        $('.payment-list').append(record);
        return paid += parseFloat(payment.amount);
      }
    });
    guest_html = this.clients.length > 0 ? '' : '<div><span class="data" style="width:80%">No additional guests have been added to this reservation.</span></div></li>';
    $('.guest-list').html(guest_html);
    this.model.set('clients', this.clients, {
      silent: true
    });
    _.each(this.clients, function(client) {
      var record;
      record = '<li id="' + client.id + '"><div>';
      record += '<span class="data">' + client.name + '</span>';
      record += '</div><button class="del view-guest">View</button><button class="del remove-guest">Remove</button></li>';
      return $('.guest-list').append(record);
    });
    primary = {
      name: this.model.get('name'),
      email: this.model.get('email')
    };
    this.model.set('guests', _.union(primary, this.clients), {
      silent: true
    });
    discount = parseFloat(this.model.get('discount'));
    total -= discount;
    trip_total -= discount;
    lodge_total -= discount;
    product_total -= discount;
    deposit -= discount;
    $('.total').val('$' + app.helpers.dollar(total));
    $('.deposit').val('$' + app.helpers.dollar(deposit));
    $('.discount').val('$' + app.helpers.dollar(discount));
    balance = parseFloat(total) - parseFloat(paid);
    $('.balance').val('$' + app.helpers.dollar(balance));
    to_pay = balance;
    if (deposit < to_pay) to_pay = deposit;
    $('.amount').val(app.helpers.dollar(to_pay));
    this.model.set('total', total, {
      silent: true
    });
    this.model.set('total_trip', trip_total, {
      silent: true
    });
    this.model.set('total_lodge', lodge_total, {
      silent: true
    });
    this.model.set('total_product', product_total, {
      silent: true
    });
    this.model.set('deposit', deposit, {
      silent: true
    });
    this.model.set('discount', discount, {
      slient: true
    });
    this.model.set('balance_due', balance, {
      silent: true
    });
    peeps = parseInt(this.model.get('adults')) + parseInt(this.model.get('children')) + parseInt(this.model.get('seniors'));
    $('.heads').text(peeps);
    if (!this.model.get('arriving_on') || this.model.get('arriving_on') === '0000-00-00') {
      this.model.set('arrival_date', 'No arrival date set', {
        silent: true
      });
    } else {
      coming = moment(this.model.get('arriving_on') + ' ' + this.model.get('arriving_at'), 'YYYY-MM-DD HH:mm:ss');
      this.model.set('arrival_date', coming.format('MMM Do YYYY'));
      if (this.model.get('arriving_at') && this.model.get('arriving_at') !== '00:00:00') {
        this.model.set('arrival_time', coming.format('h:mma'), {
          silent: true
        });
      }
    }
    if (!this.model.get('departing_on') || this.model.get('departing_on') === '0000-00-00') {
      this.model.set('departure_date', 'No departure date set.', {
        silent: true
      });
    } else {
      going = moment(this.model.get('departing_on') + ' ' + this.model.get('departing_at'), 'YYYY-MM-DD HH:mm:ss');
      this.model.set('departure_date', going.format('MMM Do YYYY'));
      if (this.model.get('departing_at') && this.model.get('departing_at') !== '00:00:00') {
        this.model.set('departure_time', going.format('h:mma'), {
          silent: true
        });
      }
    }
    $('#overview').html(tmpl['reservations_overview'](this.model.attributes));
    return app.dropdown.fluid();
  };

  OrderForm.prototype.approve_reservation = function() {
    this.model.set('status', '3', {
      silent: true
    });
    return this.done();
  };

  OrderForm.prototype.place_reservation_on_hold = function() {
    var _this = this;
    return app.notifications.confirm('Are you sure you want to place this reservation on hold? This will NOT free the space.', function() {
      _this.model.set('status', '4', {
        silent: true
      });
      return _this.done();
    });
  };

  OrderForm.prototype.cancel_reservation = function() {
    var _this = this;
    if (this.payments.length > 0) {
      app.notifications.error('This reservation has payments. You must refund them before you can cancel this reservation.');
      return false;
    }
    app.notifications.confirm('Are you sure you want to cancel this reservation? This will delete all reservations and activities permenantly. Client records will remain intact.', function() {
      return _this["delete"]();
    });
    return false;
  };

  return OrderForm;

})();

views.PageForm = (function() {

  __extends(PageForm, flybook.Form);

  function PageForm() {
    this.make_address = __bind(this.make_address, this);
    this.after = __bind(this.after, this);
    PageForm.__super__.constructor.apply(this, arguments);
  }

  PageForm.prototype.__events = {
    'keyup .title': 'make_address'
  };

  PageForm.prototype.after = function() {
    if (this.model.get('id')) {
      if (app.isOnline) {
        return this.setup_photos('page', {
          page_id: this.model.get('id')
        });
      }
    }
  };

  PageForm.prototype.make_address = function(e) {};

  return PageForm;

})();

views.PhotoUploader = (function() {

  __extends(PhotoUploader, Backbone.View);

  function PhotoUploader(element_id, id, url, file_name_pattern, additional_selectors, additional_params, prefix, format) {
    var options;
    var _this = this;
    this.id = id;
    this.url = url;
    this.file_name_pattern = file_name_pattern;
    this.additional_selectors = additional_selectors != null ? additional_selectors : '';
    this.additional_params = additional_params != null ? additional_params : {};
    this.prefix = prefix != null ? prefix : '';
    this.format = format != null ? format : 'jpg';
    if (this.additional_selectors) {
      this.additional_selectors = ',' + this.additional_selectors;
    }
    options = {
      action: this.url,
      params: _.extend({}, {
        photo: this.id,
        format: this.format
      }, this.additional_params),
      element: document.getElementById(element_id),
      onProgress: function(id, file, loaded, total) {
        var percent;
        percent = Math.round((loaded / total) * 100);
        if (percent === 100) {
          $('#progress span').text('Processing, this may take a few seconds...');
        } else {
          $('#progress span').text('Uploading ' + percent + '%...');
        }
        $('#progress #bar').css({
          width: percent + '%'
        });
        return $('#progress').css({
          display: 'block'
        });
      },
      onComplete: function(id, file, response) {
        $('#progress').css({
          display: 'none'
        });
        url = 'https://s3.amazonaws.com/flybook/' + _this.prefix + _this.id + '_' + _this.file_name_pattern + '.' + _this.format + '?' + Math.random() * 1000;
        $('#' + _this.id + ' div:first' + _this.additional_selectors).css({
          'background-image': 'url("' + url + '")'
        });
        return _this.trigger('complete', _this);
      }
    };
    new qq.FileUploader(options);
    this;
  }

  return PhotoUploader;

})();

views.ProductForm = (function() {

  __extends(ProductForm, flybook.Form);

  function ProductForm() {
    this.vars_sorted = __bind(this.vars_sorted, this);
    this.update_variations = __bind(this.update_variations, this);
    this.remove_variation = __bind(this.remove_variation, this);
    this.add_variation = __bind(this.add_variation, this);
    this.after = __bind(this.after, this);
    ProductForm.__super__.constructor.apply(this, arguments);
  }

  ProductForm.prototype.__events = {
    'click .add-var': 'add_variation',
    'click .remove-variation': 'remove_variation'
  };

  ProductForm.prototype.after = function() {
    this.tab_index = 0;
    if (this.template === 'products/edit') {
      this.sortable = $('#variations').sortable({
        update: this.vars_sorted
      });
      this.vars = this.model.get('variations') ? this.model.get('variations').split('||') : [];
      this.update_variations();
      this.upsell = this.model.get('trips');
      this.update_upsells();
      if (app.isOnline) {
        return this.setup_photos('product', {
          product_id: this.model.get('id')
        }, 5);
      }
    }
  };

  ProductForm.prototype.add_variation = function() {
    var val;
    val = $('#variant').val();
    if (val === '') {
      app.notifications.error('Enter a value to create a product variation.');
      return false;
    }
    this.vars.push(val);
    $('#variant').val('');
    return this.update_variations();
  };

  ProductForm.prototype.remove_variation = function(e) {
    var clicked, index;
    clicked = $(e.target).parent().parent();
    index = $('#variations li').index(clicked);
    this.vars.splice(index, 1);
    return this.update_variations();
  };

  ProductForm.prototype.update_variations = function(e) {
    var _this = this;
    $('#variations').html('');
    $('#variant').val('');
    _.each(this.vars, function(v) {
      return $('#variations').append('<li><div><span>' + v + '</span><button class="del remove-variation">Delete</button></div></li>');
    });
    this.model.set('variations', this.vars.join('||'));
    return app.dropdown.fluid();
  };

  ProductForm.prototype.vars_sorted = function() {
    var vars;
    vars = [];
    $('#variations span').each(function(item) {
      return vars.push($(this).html());
    });
    this.vars = vars;
    return this.update_variations();
  };

  return ProductForm;

})();

views.ReservationForm = (function() {

  __extends(ReservationForm, flybook.Form);

  function ReservationForm() {
    this.get_dropdown_values = __bind(this.get_dropdown_values, this);
    this.process_payment = __bind(this.process_payment, this);
    this.lost_focus = __bind(this.lost_focus, this);
    this.remove_discount = __bind(this.remove_discount, this);
    this.change_discount = __bind(this.change_discount, this);
    this.change_pay_method = __bind(this.change_pay_method, this);
    this.update_lodging_list = __bind(this.update_lodging_list, this);
    this.set_room = __bind(this.set_room, this);
    this.lodge_date_clicked = __bind(this.lodge_date_clicked, this);
    this.show_lodge_availability = __bind(this.show_lodge_availability, this);
    this.set_lodge = __bind(this.set_lodge, this);
    this.select_lodge = __bind(this.select_lodge, this);
    this.update_trip_list = __bind(this.update_trip_list, this);
    this.remove_trip = __bind(this.remove_trip, this);
    this.add_trip_lodging_dates = __bind(this.add_trip_lodging_dates, this);
    this.show_trip_dates = __bind(this.show_trip_dates, this);
    this.trip_date_clicked = __bind(this.trip_date_clicked, this);
    this.show_trip_availability = __bind(this.show_trip_availability, this);
    this.set_trip = __bind(this.set_trip, this);
    this.show_availability = __bind(this.show_availability, this);
    this.party_change = __bind(this.party_change, this);
    this.after = __bind(this.after, this);
    this.before = __bind(this.before, this);
    ReservationForm.__super__.constructor.apply(this, arguments);
  }

  ReservationForm.prototype.__events = {
    'change select.trip': 'set_trip',
    'change select.lodge': 'set_lodge',
    'change select.room': 'set_room',
    'change .num-field select': 'party_change',
    'click .remove-trip': 'remove_trip',
    'change #payment .left select': 'change_pay_method',
    'change #payment .right select': 'change_discount',
    'click #remove-discount': 'remove_discount',
    'blur .swipe-focus': 'lost_focus',
    'click .enter-payment': 'process_payment'
  };

  ReservationForm.prototype.before = function(callback) {
    this.tab_index = 0;
    this.get_dropdown_values(this.data.trips, this.data.lodges, this.data.staff);
    _.extend(this.data, {
      trips: this.trips,
      lodges: this.lodges,
      rooms: this.rooms,
      staff: this.staff_select,
      party: this.party,
      discounts: this.discounts
    });
    app.helpers.after_transition('#dropdown', callback);
    return app.dropdown.expand();
  };

  ReservationForm.prototype.after = function() {
    this.trip_calendar = new Flint.Calendar('#trip-calendar', app.year, app.month);
    this.trip_calendar.on('next prev', this.show_availability);
    this.trip_calendar.on('clicked', this.trip_date_clicked);
    this.lodge_calendar = new Flint.Calendar('#lodge-calendar', app.year, app.month);
    this.lodge_calendar.on('next prev', this.show_availability);
    this.lodge_calendar.on('clicked', this.lodge_date_clicked);
    if (!this.nights) this.trips = [];
    if (!this.nights) this.nights = [];
    if (this.trip) this.show_trip_availability();
    if (this.lodge) this.show_lodge_availability();
    if (this.start_date) this.date_clicked(this.start_date);
    return app.dropdown.fluid();
  };

  ReservationForm.prototype.party_change = function(e) {
    var attr, input, val;
    input = $(e.target);
    attr = input.attr('name');
    val = input.val();
    this.trips = [];
    this.nights = [];
    this.update_trip_list();
    this.update_lodging_list();
    this.model.set(attr, val, {
      silent: true
    });
    return this.show_trip_availability();
  };

  ReservationForm.prototype.show_availability = function(cal) {
    this.trip_calendar.render(cal.year, cal.month);
    this.lodge_calendar.render(cal.year, cal.month);
    if (this.trip) this.show_trip_availability();
    if (this.lodge) return this.show_lodge_availability();
  };

  ReservationForm.prototype.set_trip = function(e) {
    var drop;
    var _this = this;
    this.trip_dates = [];
    drop = $(e.target);
    if (drop.val() === '0') return false;
    return app.trips.get(drop.val(), function(trip) {
      _this.trip = trip;
      _this.model.set('trip_id', trip.get('id'));
      _this.show_trip_availability();
      return _this.show_lodge_availability();
    });
  };

  ReservationForm.prototype.show_trip_availability = function() {
    var availability, dates;
    var _this = this;
    $('#trip-calendar td').removeClass('start-available').removeClass('trip-date-available').removeClass('trip-date').removeClass('start');
    this.people = parseInt(this.model.get('adults')) + parseInt(this.model.get('children')) + parseInt(this.model.get('seniors'));
    availability = this.trip.get_availability_by_month(this.trip_calendar.year, this.trip_calendar.month, this.people, this.staff);
    dates = [];
    if (availability.length > 0) {
      _.each(availability, function(date) {
        $('#trip-calendar td[data-sql=' + date.sql + ']').addClass('start-available');
        return dates.push(date.sql);
      });
    }
    return this.show_trip_dates(dates, 'trip-calendar', 'trip-date-available');
  };

  ReservationForm.prototype.trip_date_clicked = function(sql, date) {
    var clicked, end, trip;
    clicked = $('#trip-calendar td[data-sql=' + sql + ']');
    if (clicked.hasClass('start-available')) {
      $('#trip-calendar td').removeClass('start').removeClass('trip-date');
    }
    trip = {
      id: Math.random() * 5000,
      start_date: sql,
      name: this.trip.get('name'),
      formatted: app.helpers.js_to_slash(date)
    };
    if (this.trip.get('duration') < 2) {
      clicked.addClass('start');
    } else {
      end = new Date(date.getTime() + (60 * 60 * 24 * (this.trip.get('duration') - 1) * 1000));
      trip.formatted += ' - ' + app.helpers.js_to_slash(end);
      trip.end_date = this.trip.jsdate_to_sql(end);
      clicked.addClass('start');
      this.show_trip_dates([sql], 'trip-calendar', 'trip-date');
    }
    if (this.trip.get('lodging_nights')) {
      trip.nights = this.add_trip_lodging_dates(date);
    }
    this.trips.push(trip);
    return this.update_trip_list();
  };

  ReservationForm.prototype.show_trip_dates = function(dates, calendar, classname) {
    var duration;
    var _this = this;
    duration = this.trip.get('duration');
    if (duration > 1) {
      return _.each(dates, function(date) {
        var end, jsdate, light, sql, start, _results;
        jsdate = _this.trip.sqldate_to_js(date);
        if (jsdate && duration > 1) {
          start = jsdate.getTime();
          end = new Date(start + (60 * 60 * 24 * (duration - 2) * 1000)).getTime();
          _results = [];
          while (start <= end + (60 * 60 * 25 * 1000)) {
            start += 60 * 60 * 23 * 1000;
            light = new Date(start);
            sql = _this.trip.jsdate_to_sql(light);
            _results.push($('#' + calendar + ' td[data-sql=' + sql + ']').addClass(classname));
          }
          return _results;
        }
      });
    }
  };

  ReservationForm.prototype.add_trip_lodging_dates = function(date) {
    var end, night, sql, start, _nights;
    _nights = [];
    start = date.getTime();
    end = new Date(date.getTime() + (60 * 60 * 24 * (this.trip.get('lodging_nights') - 1) * 1000));
    if (this.trip.get('lodge_id') && this.trip.get('lodge_id') !== '0') {
      if (this.trip.get('lodge_id') !== '1') {
        this.select_lodge(this.trip.get('lodge_id'));
      }
    }
    if (this.trip.get('arrive_night_prior') === '1') {
      start -= 60 * 60 * 24 * 1000;
      end -= 60 * 60 * 24 * 1000;
    }
    while (start <= end) {
      start += 60 * 60 * 23 * 1000;
      date = new Date(start);
      sql = this.trip.jsdate_to_sql(date);
      night = {
        date: sql,
        included: true
      };
      this.nights.push(night);
      _nights.push(night);
    }
    this.update_lodging_list();
    return _nights;
  };

  ReservationForm.prototype.remove_trip = function(e) {
    var id;
    var _this = this;
    id = $(e.target).parent().attr('id');
    _.each(this.trips, function(trip) {
      if (trip.id.toString() === id.toString()) {
        _this.trips = _.without(_this.trips, trip);
        if (trip.nights) {
          _.each(trip.nights, function(night) {
            return _this.nights = _.without(_this.nights, night);
          });
          return _this.update_lodging_list();
        }
      }
    });
    return this.update_trip_list();
  };

  ReservationForm.prototype.update_trip_list = function() {
    var json;
    var _this = this;
    $('#trips').empty();
    if (this.trips.length > 0) {
      _.each(this.trips, function(trip) {
        return $('#trips').append('<li id="' + trip.id + '"><div><span><b>' + trip.formatted + '</b><br />' + trip.name + '<span></div><button class="del remove-trip">X</button></li>');
      });
    }
    json = JSON.stringify(this.trips);
    this.model.set('pending_trips', json, {
      silent: true
    });
    return app.dropdown.fluid();
  };

  ReservationForm.prototype.select_lodge = function(id) {
    var _this = this;
    $('.lodge option').attr('selected', false).each(function(item) {
      if ($(this).val() === id) return $(this).attr('selected', true);
    });
    this.model.set('lodge_id', id);
    return app.lodging.get(id, function(lodge) {
      if (lodge.get('rooms').length > 0) {
        $('.lodge-rooms').css({
          display: 'block'
        });
        $('.lodge-rooms option').remove();
        return _.each(lodge.get('rooms'), function(room) {
          return $('.lodge-rooms').append('<option value="' + room.id + '">' + room.type + '</option>');
        });
      } else {
        return $('.lodge-rooms').css({
          display: 'none'
        });
      }
    });
  };

  ReservationForm.prototype.set_lodge = function() {};

  ReservationForm.prototype.show_lodge_availability = function() {};

  ReservationForm.prototype.lodge_date_clicked = function(sql, date) {};

  ReservationForm.prototype.set_room = function() {};

  ReservationForm.prototype.update_lodging_list = function() {
    var check_in, check_out, date, end, out, sql, start;
    $('#lodge-calendar td').removeClass('trip-date');
    $('#nights').empty();
    if (this.nights.length > 0) {
      this.nights.sort();
      start = this.trip.sqldate_to_js(this.nights[0]);
      end = this.trip.sqldate_to_js(this.nights[this.nights.length - 1]);
      out = new Date(end.getTime() + (60 * 60 * 24 * 1000));
      check_in = app.helpers.js_to_slash(start);
      check_out = app.helpers.js_to_slash(out);
      start = start.getTime();
      end = end.getTime();
      while (start <= end) {
        date = new Date(start);
        sql = app.helpers.jsdate_to_sql(date);
        $('#lodge-calendar td[data-sql="' + sql + '"]').addClass('trip-date');
        start += 60 * 60 * 24 * 1000;
      }
      return $('#nights').html('<p class="small">' + this.nights.length + ' Night Stay:</p></p><p><b>Check in: </b>' + check_in + ' &nbsp; <b>Check Out: </b> ' + check_out + '</p>');
    }
  };

  ReservationForm.prototype.change_pay_method = function() {};

  ReservationForm.prototype.change_discount = function() {};

  ReservationForm.prototype.remove_discount = function() {};

  ReservationForm.prototype.lost_focus = function() {};

  ReservationForm.prototype.process_payment = function() {};

  ReservationForm.prototype.get_dropdown_values = function(trips, lodges, staff) {
    var amount, deposit, order, select, _i, _results;
    var _this = this;
    this.party = (function() {
      _results = [];
      for (_i = 0; _i < 50; _i++){ _results.push(_i); }
      return _results;
    }).apply(this);
    select = [[0, 'Select Trip / Package...']];
    _.each(app.trips.list.collection.models, function(trip) {
      return select.push([trip.get('id'), app.helpers.truncate(trip.get('name'), 30)]);
    });
    this.trips = select;
    select = [[0, 'Select Lodge...']];
    _.each(app.lodging.list.collection.models, function(lodge) {
      return select.push([lodge.get('id'), app.helpers.truncate(lodge.get('name'), 30)]);
    });
    this.lodges = select;
    this.rooms = [[0, 'Select Room (select lodge first)...']];
    staff = [[app.user.get('name'), app.user.get('name')]];
    _.each(app.employees.list.collection.models, function(member) {
      return staff.push([member.get('nickname'), member.get('nickname')]);
    });
    this.staff_select = staff;
    this.staff = app.employees.list.collection;
    if (this.template === 'reservations/edit') {
      order = this.model.get('order');
      this.model.set('total', order.total);
      this.model.set('balance_due', order.balance_due);
      amount = order.deposit < order.balance_due ? order.deposit : order.balance_due;
      deposit = order.deposit < order.balance_due ? order.deposit : 0;
      this.model.set('amount', amount);
      this.model.set('deposit', deposit);
      this.discounts = [[0, 'Select discount to apply...']];
      return _.each(app.user.get('account').promotions, function(promo) {
        return _this.discounts.push([promo.id, promo.code]);
      });
    }
  };

  return ReservationForm;

})();

views.SettingsForm = (function() {

  __extends(SettingsForm, Flint.Form);

  function SettingsForm() {
    this.passchange = __bind(this.passchange, this);
    this.update_codes = __bind(this.update_codes, this);
    this.remove_code = __bind(this.remove_code, this);
    this.add_code = __bind(this.add_code, this);
    this.update_docs = __bind(this.update_docs, this);
    this.update_document_name = __bind(this.update_document_name, this);
    this.remove_document = __bind(this.remove_document, this);
    this.add_document = __bind(this.add_document, this);
    this.doc_uploader = __bind(this.doc_uploader, this);
    this.cancel = __bind(this.cancel, this);
    this.after = __bind(this.after, this);
    SettingsForm.__super__.constructor.apply(this, arguments);
  }

  SettingsForm.prototype.el = '#app';

  SettingsForm.prototype.events = {
    'click .add-code': 'add_code',
    'click .remove-code': 'remove_code',
    'click .remove-document': 'remove_document',
    'change .doc': 'update_document_name',
    'click button.passchange': 'passchange'
  };

  SettingsForm.prototype.code_template = '<li id="{{id}}"><div><span class="long" style="width:120px">{{code}}</span><span >{{#if percent_discount}}{{percent_discount}}%{{else}}N/A{{/if}}</span><span >{{#if flat_discount}}${{dollar flat_discount}}{{else}}N/A{{/if}}</span><span>{{sql_to_slash valid_through}}&nbsp;</span><button class="del remove-code">Delete</buton></div></li>';

  SettingsForm.prototype.docs_template = '<li id="{{id}}"><div><input type="text" name="docs[]" value="{{name}}" class="doc" /><span><a href="/api/documents/_download/?id={{id}}">{{ext}}</a></span><button class="del rdc">Delete</buton></div></li>';

  SettingsForm.prototype.after = function() {
    var url;
    var _this = this;
    if (this.template === 'settings/company_profile') {
      this.logo_upload = new views.PhotoUploader('logo-upload', 'logo', '/api/uploads/_company_profile/', this.model.id, '', {}, '', 'png');
      this.logo_upload.on('complete', function() {
        return _this.model.set('has_logo', '1');
      });
      this.photo_upload = new views.PhotoUploader('photo-upload', 'photo', '/api/uploads/_company_profile/', this.model.id);
      this.photo_upload.on('complete', function() {
        return _this.model.set('has_photo', '1');
      });
      if (this.model.get('has_logo') === '1') {
        url = 'https://s3.amazonaws.com/flybook/logo_' + this.model.get('id') + '.png?' + Math.random() * 1000;
        $('#logo div:first').css({
          'background-image': 'url("' + url + '")'
        });
      }
      if (this.model.get('has_photo') === '1') {
        url = 'https://s3.amazonaws.com/flybook/photo_' + this.model.get('id') + '.jpg?' + Math.random() * 1000;
        $('#photo div:first').css({
          'background-image': 'url("' + url + '")'
        });
      }
    }
    if (this.template === 'settings/promotions') {
      this.promo_codes = this.model.get('promotions');
      this.update_codes();
    }
    if (this.template === 'settings/forms') {
      this.docs = this.model.get('documents');
      this.update_docs();
      this.doc_uploader();
    }
    if (this.template === 'preferences/profile') {
      url = 'https://s3.amazonaws.com/flybook/icon_' + this.model.id + '.jpg?' + Math.random() * 1000;
      return $('#icon div:first,#user li .cover').css({
        'background-image': 'url("' + url + '")'
      });
    }
  };

  SettingsForm.prototype.cancel = function() {
    $('#app').css({
      left: '-540px'
    });
    return window.location.hash = '#noop';
  };

  SettingsForm.prototype.doc_uploader = function() {
    var options;
    var _this = this;
    options = {
      action: '/api/documents/_upload/',
      element: document.getElementById('doc-upload'),
      onProgress: function(id, file, loaded, total) {
        var percent;
        percent = Math.round((loaded / total) * 100);
        if (percent === 100) {
          $('#progress span').text('Processing, this may take a few seconds...');
        } else {
          $('#progress span').text('Uploading ' + percent + '%...');
        }
        $('#progress #bar').css({
          width: percent + '%'
        });
        return $('#progress').css({
          display: 'block'
        });
      },
      onComplete: function(id, file, response) {
        $('#progress').css({
          display: 'none'
        });
        return _this.add_document(response);
      }
    };
    return new qq.FileUploader(options);
  };

  SettingsForm.prototype.add_document = function(doc) {
    app.notifications.notify('Document uploaded sucessfully!');
    this.docs.push(doc);
    return this.update_docs();
  };

  SettingsForm.prototype.remove_document = function(e) {
    var id, li;
    var _this = this;
    li = $(e.target).parent().parent();
    id = li.attr('id');
    return _.each(this.docs, function(doc) {
      if (doc.id.toString() === id.toString()) {
        _this.trigger('deleted:doc', doc);
        _this.docs = _.without(_this.docs, doc);
        _this.update_docs();
      }
    });
  };

  SettingsForm.prototype.update_document_name = function(e) {
    var id, li, val;
    var _this = this;
    val = $(e.target).val();
    li = $(e.target).parent().parent();
    id = li.attr('id');
    return _.each(this.docs, function(doc) {
      if (doc.id.toString() === id.toString()) {
        doc.name = val;
        _this.update_docs();
      }
    });
  };

  SettingsForm.prototype.update_docs = function() {
    var out;
    var _this = this;
    $('#docs').html('');
    out = Handlebars.compile(this.docs_template);
    _.each(this.docs, function(doc) {
      var html;
      html = out(doc);
      return $('#docs').append(html);
    });
    this.model.set('documents', this.docs);
    return this.delegateEvents();
  };

  SettingsForm.prototype.add_code = function() {
    var code_obj;
    code_obj = {
      id: Math.random() * 3000
    };
    $('.code-fields input').each(function() {
      var field, val;
      field = $(this).attr('name');
      if (field === 'code' || field === 'valid_through') {
        val = $(this).val();
      } else {
        val = $(this).val().toString().replace(/[A-Za-z$-,+]/g, '');
      }
      return code_obj[field] = val;
    });
    if (code_obj.code === '' || (code_obj.percent_discount === '' && code_obj.flat_discount === '')) {
      app.notifications.error('You need to specify a code and a discount!');
      return false;
    }
    $('.code-fields input').val('');
    this.promo_codes.push(code_obj);
    return this.update_codes();
  };

  SettingsForm.prototype.remove_code = function(e) {
    var id, li;
    var _this = this;
    li = $(e.target).parent().parent();
    id = li.attr('id');
    return _.each(this.promo_codes, function(code) {
      if (code.id.toString() === id.toString()) {
        _this.promo_codes = _.without(_this.promo_codes, code);
        _this.update_codes();
      }
    });
  };

  SettingsForm.prototype.update_codes = function() {
    var out;
    var _this = this;
    $('#promotion-codes').html('');
    out = tmpl_compile(this.code_template);
    _.each(this.promo_codes, function(code) {
      var html;
      html = out(code);
      return $('#promotion-codes').append(html);
    });
    this.model.set('promotions', this.promo_codes);
    return this.delegateEvents();
  };

  SettingsForm.prototype.passchange = function() {
    if (!this.model.get('new_password') || !this.model.get('old_password')) {
      app.notifications.error('You need to enter your old and a new password to change it!');
      return false;
    }
    if (this.model.get('new_password').toString().length < 6) {
      app.notifications.error('Your pasword needs to be at least six characters!');
      return false;
    }
    if (this.model.get('new_password') !== this.model.get('confirmed')) {
      app.notifications.error('Your password and confirmation do not match!');
      return false;
    }
    this.trigger('changed:password', this.model);
    return false;
  };

  return SettingsForm;

})();

views.StoreForm = (function() {

  __extends(StoreForm, flybook.Form);

  function StoreForm() {
    this.values_sorted = __bind(this.values_sorted, this);
    this.update_values = __bind(this.update_values, this);
    this.remove_value = __bind(this.remove_value, this);
    this.add_value = __bind(this.add_value, this);
    this.render_preview = __bind(this.render_preview, this);
    this.update_question = __bind(this.update_question, this);
    this.type_changed = __bind(this.type_changed, this);
    this.after = __bind(this.after, this);
    StoreForm.__super__.constructor.apply(this, arguments);
  }

  StoreForm.prototype.__events = {
    'click .add-value': 'add_value',
    'click .remove-value': 'remove_value',
    'change #types': 'type_changed',
    'keyup #quest': 'update_question'
  };

  StoreForm.prototype.after = function() {
    var type;
    if (this.template = 'forms/edit') {
      this.sortable = $('#responses').sortable({
        update: this.values_sorted
      });
      this.values = this.model.get('responses') ? this.model.get('responses').split('||') : [];
      this.update_values();
      this.render_preview();
      type = this.model.get('type');
      if (type === 'dropdown' || type === 'radio' || type === 'checkbox') {
        return $('#value-specs').css({
          display: 'block'
        });
      } else {
        return $('#value-specs').css({
          display: 'none'
        });
      }
    }
  };

  StoreForm.prototype.type_changed = function(e) {
    var val;
    val = $(e.target).val();
    if (val === 'dropdown' || val === 'radio' || val === 'checkbox') {
      $('#value-specs').css({
        display: 'block'
      });
    } else {
      $('#value-specs').css({
        display: 'none'
      });
    }
    this.model.set('type', val, {
      silent: true
    });
    return this.render_preview();
  };

  StoreForm.prototype.update_question = function(e) {
    var val;
    val = $(e.target).val();
    this.model.set('field', val, {
      silent: true
    });
    return this.render_preview();
  };

  StoreForm.prototype.render_preview = function() {
    var answers, data;
    var _this = this;
    answers = [];
    _.each(this.values, function(val) {
      return answers.push({
        val: val
      });
    });
    this.model.set('name', $('#quest').val());
    data = this.model.attributes;
    data.copy = this.model.clone();
    data.answers = answers;
    $('#preview').html(tmpl['forms_preview'](data));
    return delete this.model.attributes.model;
  };

  StoreForm.prototype.add_value = function() {
    var val;
    val = $('#response').val();
    if (val === '') {
      app.notifications.error('Enter a value to create an answer option.');
      return false;
    }
    this.values.push(val);
    $('#response').val('');
    this.update_values();
    return app.dropdown.fluid();
  };

  StoreForm.prototype.remove_value = function(e) {
    var clicked, index;
    clicked = $(e.target).parent();
    index = $('#responses li').index(clicked);
    this.values.splice(index, 1);
    return this.update_values();
  };

  StoreForm.prototype.update_values = function(e) {
    var _this = this;
    $('#responses').html('');
    _.each(this.values, function(v) {
      return $('#responses').append('<li><div><span>' + v + '</span></div><button class="del remove-value">Delete</button></li>');
    });
    this.model.set('responses', this.values.join('||'));
    return this.render_preview();
  };

  StoreForm.prototype.values_sorted = function() {
    var vals;
    vals = [];
    $('#responses span').each(function(item) {
      return vals.push($(this).html());
    });
    this.values = vals;
    this.model.set('responses', this.values.join('||'));
    return this.render_preview();
  };

  return StoreForm;

})();

views.TripDaily = (function() {

  __extends(TripDaily, flybook.Form);

  function TripDaily() {
    this.sorted = __bind(this.sorted, this);
    this.after = __bind(this.after, this);
    this.before = __bind(this.before, this);
    TripDaily.__super__.constructor.apply(this, arguments);
  }

  TripDaily.prototype.before = function(callback) {
    console.log(this.data);
    app.helpers.after_transition('#dropdown', callback);
    return app.dropdown.expand();
  };

  TripDaily.prototype.after = function() {
    this.sortable = $('.list').sortable({
      connectWith: '.list',
      cancel: '.guide'
    });
    return app.dropdown.fluid();
  };

  TripDaily.prototype.sorted = function() {};

  return TripDaily;

})();

views.TripForm = (function() {

  __extends(TripForm, flybook.Form);

  function TripForm() {
    this.guides_sorted = __bind(this.guides_sorted, this);
    this.update_staff_assignments = __bind(this.update_staff_assignments, this);
    this.show_staff_assignments = __bind(this.show_staff_assignments, this);
    this.remove_start_time = __bind(this.remove_start_time, this);
    this.add_start_time = __bind(this.add_start_time, this);
    this.remove_fee = __bind(this.remove_fee, this);
    this.add_fee = __bind(this.add_fee, this);
    this.after = __bind(this.after, this);
    TripForm.__super__.constructor.apply(this, arguments);
  }

  TripForm.prototype.__events = {
    'click .newtime': 'add_start_time',
    'click p span': 'remove_start_time',
    'click #guides input,#assistants input': 'update_staff_assignments',
    'click .add-fee': 'add_fee',
    'click .remove-fee': 'remove_fee'
  };

  TripForm.prototype.deposit_tmpl = '<li id="{{id}}"><div><span>{{days_prior}}</span><span>{{percent_due}}%</span></div><button class="del remove-deposit-rule">Delete</buton></li>';

  TripForm.prototype.fee_tmpl = '<li id="{{id}}"><div><span class="long">{{name}}</span><span class="short">{{#if percent}}{{percent}}%{{else}}N/A{{/if}}</span><span>{{#if flat}}${{dollar flat}}%{{else}}N/A{{/if}}</span></div><button class="del remove-fee">Delete</buton></li>';

  TripForm.prototype.after = function() {
    var auto, end_month, month, sp, start_month, year;
    var _this = this;
    this.valid_changes = false;
    this.gmap_callback_method = 'app.trips.form.setup_map';
    if (this.template === 'trips/edit' || this.template === 'trips/schedule') {
      this.price_points = this.model.get('pricing');
      this.update_prices();
      this.deposit_rules = this.model.get('deposit_rules');
      this.update_deposits();
      this.fees = this.model.get('fees');
      this.update_fees();
      this.trip_sortable = $('#guides').sortable({
        update: this.guides_sorted
      });
      this.show_staff_assignments();
    }
    if (this.template === 'trips/edit') {
      this.pre_check_docs();
      if (app.isOnline) {
        this.setup_photos('trip', {
          trip_id: this.model.get('id')
        });
      }
      this.start_dates = _.isString(this.model.get('start_dates')) ? this.model.get('start_dates').split(',') : [];
      this.start_days = _.isString(this.model.get('start_days')) ? this.model.get('start_days').split(',') : [];
      year = app.year;
      end_month = this.model.get('season_end_month');
      start_month = this.model.get('season_start_month');
      if (parseInt(app.month) > parseInt(end_month)) {
        month = parseInt(end_month) - 1;
        year++;
      } else if (parseInt(app.month) < parseInt(start_month)) {
        month = parseInt(start_month) - 1;
      } else {
        month = app.month;
      }
      this.calendar = new Flint.Calendar('#weekday-calendar', year, month);
      this.calendar.on('clicked', this.dateclick);
      this.calendar.on('next prev', this.render_starts);
      this.render_starts();
      this.times = _.isString(this.model.get('start_times')) && this.model.get('start_times') !== '' ? this.model.get('start_times').split(',') : [];
      this.update_start_times();
      auto = this.model.get('auto_collect_balances');
      if (!auto || auto === '0' || auto === 0) {
        $('.no-auto').click();
      } else if (auto === '1' || auto === 1) {
        $('.day-auto').click();
      } else {
        $('.custom-auto').val(auto).click();
        $('.balance-days').val(this.model.get('auto_collect_days_prior'));
      }
    }
    if (this.template === 'trips/schedule') {
      sp = this.model.get('start_date').split('-');
      this.start_select = new Flint.Calendar('#start-cal', sp[0], sp[1] - 1);
      this.start_select.set_focus_date(this.model.get('start_date'), this.model.get('js_start'));
      this.start_select.on('clicked', function(sql, date) {
        return _this.model.set('start_date', sql);
      });
      sp = this.model.get('end_date').split('-');
      this.end_select = new Flint.Calendar('#end-cal', sp[0], sp[1] - 1);
      this.end_select.set_focus_date(this.model.get('end_date'), this.model.get('js_end'));
      this.end_select.on('clicked', function(sql, date) {
        return _this.model.set('end_date', sql);
      });
    }
    return app.dropdown.fluid();
  };

  TripForm.prototype.add_fee = function() {
    var fee;
    fee = {
      id: Math.random() * 3000
    };
    $('.add-fees input').each(function() {
      var field, val;
      field = $(this).attr('name');
      val = $(this).val();
      if (field !== 'fee_name') {
        val = val.toString().replace(/[A-Za-z$-,]/g, '');
      } else {
        field = 'name';
      }
      return fee[field] = val;
    });
    if (fee.name === '') {
      app.notifications.error('You must enter a name and flat or percentage based rate to add a fee or tax.');
      return false;
    }
    if (fee.name.toLowerCase().indexOf('book') >= 0 || fee.name.toLowerCase().indexOf('permit') >= 0) {
      app.notifications.error('Sorry, we have to assume that fee name is against our policy to the right...');
      return false;
    }
    if (fee.percent === '' && fee.flat === '') {
      app.notifications.error('You must enter a name and flat or percentage based rate to add a fee or tax.');
      return false;
    }
    this.model.set('fees_changed', true);
    this.fees.push(fee);
    return this.update_fees();
  };

  TripForm.prototype.remove_fee = function(e) {
    var id, li;
    var _this = this;
    this.model.set('fees_changed', true);
    li = $(e.target).parent();
    id = li.attr('id');
    return _.each(this.fees, function(fee) {
      if (fee.id.toString() === id.toString()) {
        _this.fees = _.without(_this.fees, fee);
        _this.update_fees();
      }
    });
  };

  TripForm.prototype.update_fees = function() {
    var out;
    var _this = this;
    $('#fees').html('');
    $('.add-fees input').val('');
    out = tmpl_compile(this.fee_tmpl);
    _.each(this.fees, function(fee) {
      var html;
      html = out(fee);
      return $('#fees').append(html);
    });
    this.model.set('fees', this.fees);
    return this.delegateEvents();
  };

  TripForm.prototype.add_start_time = function() {
    var hrs, mins, time;
    var _this = this;
    if (!this.times) this.times = [];
    hrs = $('.hrs').val();
    mins = $('.mins').val();
    time = hrs + ':' + mins;
    this.times.push(time);
    this.times = _.sortBy(this.times, function(val) {
      return val;
    });
    this.model.set('start_times', _.uniq(this.times).join(','), {
      silent: true
    });
    return this.update_start_times();
  };

  TripForm.prototype.remove_start_time = function(e) {
    var index, node;
    node = e.target;
    index = $('#start-times p span').index(node);
    this.times = _.without(this.times, this.times[index]);
    this.model.set('start_times', this.times.join(','), {
      silent: true
    });
    return this.update_start_times();
  };

  TripForm.prototype.update_start_times = function() {
    var _this = this;
    $('#start-times p').html('');
    return _.each(this.times, function(time) {
      time = app.helpers.twenty_four_to_twelve(time);
      return $('#start-times p').append('<span>' + time + '<em>X</em></span>');
    });
  };

  TripForm.prototype.show_staff_assignments = function() {
    var booked_guides;
    booked_guides = _.isString(this.model.get('guides_assigned')) ? this.model.get('guides_assigned') : '';
    return $('#guides input').each(function(item) {
      var val;
      val = $(this).attr('name');
      if (booked_guides.indexOf(val) >= 0) return $(this).attr('checked', true);
    });
  };

  TripForm.prototype.update_staff_assignments = function() {
    var assistants, guides;
    guides = [];
    assistants = [];
    $('#guides input').each(function(item) {
      if ($(this).is(':checked')) return guides.push($(this).attr('name'));
    });
    $('#assistants input').each(function(item) {
      if ($(this).is(':checked')) return assistants.push($(this).attr('name'));
    });
    this.model.set('guides_assigned', guides.join(','));
    return this.model.set('assistants_assigned', assistants.join(','));
  };

  TripForm.prototype.guides_sorted = function() {
    var guides, ids, order;
    var _this = this;
    ids = [];
    guides = [];
    order = 0;
    _.each(this.trip_sortable.find('li'), function(item, index) {
      var id;
      id = item.getAttribute('id');
      return ids.push(id);
    });
    return this.update_staff_assignments();
  };

  return TripForm;

})();

