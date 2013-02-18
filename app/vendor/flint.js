var Flint = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Flint.Calendar = (function() {

  __extends(Calendar, Backbone.View);

  Calendar.prototype._events = {
    'click button.next': 'next_month',
    'click button.previous': 'previous_month',
    'click td.day': 'date_clicked'
  };

  Calendar.prototype.selected_dates = [];

  Calendar.prototype.focus_date = false;

  Calendar.prototype.higlight = 'day';

  Calendar.prototype.day_labels = [
    {
      day: 'S'
    }, {
      day: 'M'
    }, {
      day: 'T'
    }, {
      day: 'W'
    }, {
      day: 'T'
    }, {
      day: 'F'
    }, {
      day: 'S'
    }
  ];

  Calendar.prototype.month_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function Calendar(el, year, month) {
    this.el = el != null ? el : '#calendar';
    this.year = year;
    this.month = month;
    this.set_focus_and_highlight = __bind(this.set_focus_and_highlight, this);
    this.set_focus_date = __bind(this.set_focus_date, this);
    this.events = _.extend({}, this._events, this.events);
    this.$el = $(this.el);
    this.initialize(this.year, this.month);
    this.delegateEvents();
    this;
  }

  Calendar.prototype.initialize = function(year, month) {
    var fd, fm;
    this.year = year;
    this.month = month;
    this.date = new Date;
    if (!this.month) this.month = this.date.getMonth();
    if (!this.year) this.year = this.date.getFullYear();
    this.date = this.date.getDate();
    fm = (this.month + 1) < 10 ? '0' + (this.month + 1) : this.month + 1;
    fd = this.date < 10 ? '0' + this.date : this.date;
    this.focus_date = this.year + '-' + fm + '-' + fd;
    this.render();
    return $('#' + this.focus_date).addClass('fb-today');
  };

  Calendar.prototype.render = function(year, month) {
    var data;
    if (year == null) year = false;
    if (month == null) month = false;
    if (year || year === 0 || year === '0') this.year = year;
    if (month || month === 0 || month === '0') this.month = month;
    data = {
      month_name: this.month_labels[this.month],
      day_labels: this.day_labels,
      month: this.month,
      year: this.year
    };
    return $(this.el).html(Handlebars.templates.month(data));
  };

  Calendar.prototype.set_focus_date = function(focus_date, date) {
    this.focus_date = focus_date;
    if (date) this.date = date;
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.render();
    return this.set_focus_and_highlight();
  };

  Calendar.prototype.set_focus_and_highlight = function(which) {
    var focus_month, focus_parts, id, td_focused;
    if (which == null) which = false;
    id = $(this.el).attr('id');
    $('#' + id + ' td').removeClass('fb-highlight').removeClass('fb-focus');
    td_focused = $('#' + id + ' td[data-sql=' + this.focus_date + ']');
    focus_parts = this.focus_date.split('-');
    focus_month = focus_parts[1];
    if (which) this.highlight = which;
    switch (this.highlight) {
      case 'week':
        td_focused.parent().children('td').addClass('fb-highlight');
        break;
      case 'month':
        if (focus_month - 1 === this.month) {
          $('#' + id + ' td').addClass('fb-highlight');
        }
    }
    return td_focused.removeClass('fb-highlight').addClass('fb-focus');
  };

  Calendar.prototype.next_month = function() {
    if ((parseInt(this.month) + 1) === 12) {
      this.year++;
      this.month = 0;
    } else {
      this.month++;
    }
    this.render(this.year, this.month);
    this.set_focus_and_highlight();
    return this.trigger('next', this);
  };

  Calendar.prototype.previous_month = function() {
    if (parseInt(this.month) === 0) {
      this.year--;
      this.month = 11;
    } else {
      this.month--;
    }
    this.render(this.year, this.month);
    this.set_focus_and_highlight();
    return this.trigger('prev', this);
  };

  Calendar.prototype.date_clicked = function(e) {
    var date, split, sql_date, td;
    td = $(e.target);
    sql_date = td.attr('data-sql');
    split = sql_date.split('-');
    date = new Date(split[0], split[1] - 1, split[2]);
    this.trigger('clicked', sql_date, date, this.selected_dates, e);
    if (_.indexOf(this.selected_dates, date) >= 0) {
      this.selected_dates = _.without(this.selected_dates, date);
      this.trigger('deselect', sql_date, date, this.selected_dates, e);
    } else {
      this.selected_dates.push(date);
      this.trigger('select', sql_date, date, this.selected_dates, e);
    }
    this.focus_date = sql_date;
    return this.set_focus_and_highlight();
  };

  return Calendar;

})();

Flint.Collection = (function() {

  __extends(Collection, Backbone.Collection);

  function Collection() {
    Collection.__super__.constructor.apply(this, arguments);
  }

  Collection.prototype.comparator = function(model) {
    return +model.get('sort_order');
  };

  return Collection;

})();

Flint.Controller = (function() {

  __extends(Controller, Backbone.Router);

  function Controller() {
    this.undelegate = __bind(this.undelegate, this);
    this.delegate = __bind(this.delegate, this);
    this.undo_sort_order = __bind(this.undo_sort_order, this);
    this.sorted = __bind(this.sorted, this);
    this.error = __bind(this.error, this);
    this.update = __bind(this.update, this);
    this.destroy = __bind(this.destroy, this);
    this.undo_delete = __bind(this.undo_delete, this);
    this.deleted = __bind(this.deleted, this);
    this.saved = __bind(this.saved, this);
    this.changed = __bind(this.changed, this);
    this.edit = __bind(this.edit, this);
    this.added = __bind(this.added, this);
    this.create = __bind(this.create, this);
    this.fresh = __bind(this.fresh, this);
    this.grab = __bind(this.grab, this);
    this.__get = __bind(this.__get, this);
    this.get = __bind(this.get, this);
    this.refresh = __bind(this.refresh, this);
    this.fetch = __bind(this.fetch, this);
    this._unbind = __bind(this._unbind, this);
    this.unbind = __bind(this.unbind, this);
    this._bind = __bind(this._bind, this);
    this.bind = __bind(this.bind, this);
    this.init = __bind(this.init, this);
    Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.template_create = 'default/create';

  Controller.prototype.template_edit = 'default/edit';

  Controller.prototype.template_view = 'default/view';

  Controller.prototype.template_list = 'default/list';

  Controller.prototype.collection = false;

  Controller.prototype.model = false;

  Controller.prototype.list = 'List';

  Controller.prototype.list_el = '#app';

  Controller.prototype.sortable = false;

  Controller.prototype.sorted_url = false;

  Controller.prototype.sort_handle = false;

  Controller.prototype.form = 'Form';

  Controller.prototype.form_el = '#app';

  Controller.prototype.valid_changes = true;

  Controller.prototype._messages = {
    created: '{{name}} has been created.',
    saved: 'Changes to {{name}} have been saved.',
    delete_warn: 'You are about to delete {{name}}, proceed?',
    navigate_warn: 'Did you want to save the changes you just made?',
    sorted: 'You have changed the sort order.'
  };

  Controller.prototype.initialize = function(app) {
    var form, list;
    var _this = this;
    if (!this.messages) this.messages = {};
    _.map(this._messages, function(val, key) {
      if (_.isUndefined(_this.messages[key])) return _this.messages[key] = val;
    });
    list = views[this.list] ? views[this.list] : Flint[this.list];
    if (!list) throw new Error('List class "' + this.list + '" does not exists');
    this.list = new list({
      el: this.list_el
    }, this.sortable);
    this.list.sort_handle = this.sort_handle;
    this.list.template = this.template_list;
    if (this.template_help) this.list.template_help = this.template_help;
    this.list.collection = this.collection ? new collections[this.collection] : new Backbone.Collection;
    this.list.collection.model = this.model ? models[this.model] : Backbone.Model;
    form = views[this.form] ? views[this.form] : Flint[this.form];
    if (!form) throw new Error('Form class "' + this.form + '" does not exists');
    this.form = new form({
      el: this.form_el
    });
    this.form.model = new this.list.collection.model;
    this.form.collection = this.list.collection;
    this.form.valid_changes = this.valid_changes;
    this.list.undelegateEvents();
    this.form.undelegateEvents();
    app.register(this);
    this.app = app;
    this.init.apply(this, arguments);
    return this;
  };

  Controller.prototype.init = function() {};

  Controller.prototype.bind = function() {};

  Controller.prototype._bind = function() {
    var _this = this;
    this.bind();
    this.list.on('create', this.create);
    this.list.on('edit', this.edit);
    this.list.on('sort', this.sorted);
    this.list.collection.on('add', this.added);
    this.list.collection.on('remove', this.deleted);
    this.list.collection.on('change', this.changed);
    this.list.collection.on('error', this.error);
    this.form.on('delete', this.deleted);
    this.form.on('saved', this.saved);
    this.form.on('canceled', function() {
      return _this.modelChanged = false;
    });
    this.form.model.on('error', this.error);
    return this.on('saved deleted sorted destroyed delete_undone sort_undone destroy_error', this.update);
  };

  Controller.prototype.unbind = function() {};

  Controller.prototype._unbind = function() {
    this.unbind();
    this.list.off('create edit sort');
    this.list.collection.off('add remove change error');
    this.form.off('delete saved canceled');
    this.form.model.off('error');
    return this.off('saved deleted sorted destroyed delete_undone sort_undone destroy_error');
  };

  Controller.prototype.fetch = function(callback, refresh) {
    var _this = this;
    if (refresh == null) refresh = false;
    if (this.list.collection.length > 0 && !refresh) {
      return callback(this.list.collection);
    } else {
      return this.list.collection.fetch({
        silent: true,
        success: function() {
          if (_this.list.collection.length === 0) return callback(false);
          return callback(_this.list.collection);
        }
      });
    }
  };

  Controller.prototype.refresh = function(callback) {
    return this.fetch(callback, true);
  };

  Controller.prototype.get = function(id, callback, options) {
    var _this = this;
    if (options == null) options = {};
    if (this.list.collection.length === 0) {
      return this.fetch(function() {
        return _this.__get(id, callback, options);
      });
    } else {
      return this.__get(id, callback, options);
    }
  };

  Controller.prototype.__get = function(id, callback, options) {
    var model;
    var _this = this;
    model = this.list.collection.get(id);
    if (!model) {
      if (callback) return callback(false);
    } else {
      return model.fetch({
        silent: true,
        success: function(result) {
          if (callback) return callback(model);
        }
      });
    }
  };

  Controller.prototype.grab = function(id) {
    return this.list.collection.get(id);
  };

  Controller.prototype.fresh = function(id, callback) {
    var model;
    var _this = this;
    model = this.grab(id);
    if (!model) {
      callback(false);
      return;
    }
    model.fetch({
      silent: true
    });
    return {
      success: function(result) {
        if (callback) return callback(model);
      }
    };
  };

  Controller.prototype.create = function() {
    this.form.model = new this.list.collection.model({
      sort_order: this.list.collection.length
    });
    this.form.render(this.template_create, {}, this.form.model);
    return this.trigger('create', this);
  };

  Controller.prototype.added = function(model) {
    var _this = this;
    this.trigger('added', model);
    if (!!this.app.notifications) this.app.notifications.notify('Saving...');
    return model.save(model, {
      success: function() {
        var message, _tmpl;
        _tmpl = tmpl_compile(_this.messages.created);
        message = _tmpl(model.attributes);
        if (!(!_this.app.notifications || !_this.messages.created)) {
          _this.app.notifications.notify(message);
        }
        _this.edit(model.id);
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

  Controller.prototype.edit = function(id) {
    var model;
    model = this.list.collection.get(id);
    return this.form.render(this.template_edit, {}, model);
  };

  Controller.prototype.changed = function(model) {
    if (!!this.app.sync) this.app.sync.changed(model);
    return this.trigger('changed', model);
  };

  Controller.prototype.saved = function(model) {
    var _this = this;
    this.trigger('saved', model);
    if (!!this.app.notifications) this.app.notifications.notify('Saving...');
    return model.save(null, {
      success: function() {
        var message, _tmpl;
        _tmpl = tmpl_compile(_this.messages.saved);
        message = _tmpl(model.attributes);
        if (!(!_this.app.notifications || !_this.messages.saved)) {
          _this.app.notifications.notify(message);
        }
        return _this.trigger('returned', model);
      }
    });
  };

  Controller.prototype.deleted = function(model, collection, options) {
    var Deletable, message, _tmpl;
    this.trigger('deleted', model);
    if (this.to_delete) this.destroy();
    Deletable = Backbone.Model.extend({
      url: this.list.collection.url
    });
    this.to_delete = new Deletable(model.attributes);
    if (this.app.notifications) {
      _tmpl = tmpl_compile(this.messages.delete_warn);
      message = _tmpl(model.attributes);
      return this.app.notifications.notify(message, this.undo_delete, this.destroy);
    } else {
      return this.destroy();
    }
  };

  Controller.prototype.undo_delete = function() {
    this.list.collection.add(new this.list.collection.model(this.to_delete.attributes), {
      silent: true
    });
    this.to_delete = null;
    return this.trigger('delete_undone', this.to_delete);
  };

  Controller.prototype.destroy = function() {
    var _this = this;
    return this.to_delete.destroy({
      success: function(data, response) {
        if (response && response.error) {
          if (!!_this.app.notifications) {
            _this.app.notifications.error(response.error);
          }
          _this.list.collection.add(_this.to_delete, {
            silent: true
          });
          _this.trigger('destroyed', _this.to_delete);
          return _this.update();
        } else {
          return _this.trigger('destroy_error', _this.to_delete);
        }
      }
    });
  };

  Controller.prototype.update = function() {
    return this.list.render();
  };

  Controller.prototype.error = function(object, error) {
    if (console && console.log) {
      console.log('NOTICE: error triggered on Flint.Controller: ' + error);
    }
    if (!_.isString(error)) error = error.responseText;
    if (error.indexOf('401') > 0) {
      if (!!this.app.update) return this.app.update();
    } else {
      if (!!this.app.notifications) return this.app.notifications.error(error);
    }
  };

  Controller.prototype.sorted = function(serialized) {
    var _this = this;
    this.trigger('sorted');
    return this.app.notifications.notify(this.messages.sorted, this.undo_sort_order, function() {
      return _this.app.sync.ajax(_this.sorted_url, {
        type: 'POST',
        data: {
          json: JSON.stringify(serialized)
        }
      });
    });
  };

  Controller.prototype.undo_sort_order = function() {
    _.each(this.list.collection.models, function(model) {
      return model.set('sort_order', model.get('order_before_sort'), {
        silent: true
      });
    });
    this.list.collection.sort();
    return this.trigger('sort_undone');
  };

  Controller.prototype.delegate = function() {
    this.undelegate();
    this._bind();
    this.form.delegateEvents();
    this.list.delegateEvents();
    return this.app.controller = this;
  };

  Controller.prototype.undelegate = function() {
    this._unbind();
    this.form.undelegateEvents();
    return this.list.undelegateEvents();
  };

  return Controller;

})();

Flint.Form = (function() {

  __extends(Form, Backbone.View);

  function Form() {
    this["delete"] = __bind(this["delete"], this);
    this.cancel = __bind(this.cancel, this);
    this.done = __bind(this.done, this);
    this.init = __bind(this.init, this);
    Form.__super__.constructor.apply(this, arguments);
  }

  Form.prototype._events = {
    'change input,textarea,select': 'changed',
    'click .done': 'done',
    'click .save': 'save',
    'click .delete': 'delete',
    'click .cancel': 'cancel',
    'click label': 'label_click',
    'submit form': 'nosubmit'
  };

  Form.prototype.initialize = function() {
    this.events = _.extend({}, this._events, this.events);
    this.init.apply(this, arguments);
    return this;
  };

  Form.prototype.init = function() {};

  Form.prototype.render = function(template, data, model) {
    var _this = this;
    this.template = template;
    this.data = data != null ? data : {};
    if (model == null) model = false;
    if (model) {
      this.model = model;
      this.data.model = this.model;
      this.data = _.extend({}, this.data, this.model.attributes);
    }
    this.before(function() {
      $(_this.el).html(tmpl[_this.template](_this.data));
      return _this.after();
    });
    return this;
  };

  Form.prototype.before = function(callback) {
    return callback();
  };

  Form.prototype.after = function() {};

  Form.prototype.changed = function(e) {
    var attribute, input, value;
    e.stopPropagation();
    input = $(e.target);
    value = input.val();
    if (input.attr('type') === 'checkbox') {
      if (input.is(':checked')) {
        value = input.val();
      } else {
        value = 0;
      }
    }
    if (input.hasClass('num')) {
      value = value.toString().replace(/[A-Za-z$-,]/g, '');
    }
    if (!_.isUndefined(value && !_.isUndefined(this.model))) {
      attribute = input.attr('name');
      this.model.set(attribute, value.toString(), {
        silent: !this.valid_changes
      });
      this.trigger('changed', this.model, attribute, value);
      return this.trigger('changed:' + attribute, this.model, value);
    }
  };

  Form.prototype.save = function() {
    return this.collection.add(this.model);
  };

  Form.prototype.done = function(silent) {
    if (silent == null) silent = false;
    if (!(silent && !_.isObject(silent))) this.trigger('saved', this.model);
    return this.cancel();
  };

  Form.prototype.cancel = function(silent) {
    if (silent == null) silent = false;
    if (!(silent && !_.isObject(silent))) this.trigger('canceled', this.model);
    return $(this.el).empty();
  };

  Form.prototype["delete"] = function() {
    this.done(true);
    return this.collection.remove(this.model);
  };

  Form.prototype.label_click = function(e) {
    var input;
    input = $(e.target);
    input.next().click();
    return input.prev().click();
  };

  Form.prototype.nosubmit = function() {
    return false;
  };

  return Form;

})();

Flint.Grid = (function() {

  __extends(Grid, Backbone.View);

  function Grid() {
    this.quicksort = __bind(this.quicksort, this);
    this.swap = __bind(this.swap, this);
    this.compare = __bind(this.compare, this);
    this.partition = __bind(this.partition, this);
    this.sort = __bind(this.sort, this);
    Grid.__super__.constructor.apply(this, arguments);
  }

  Grid.prototype._events = {
    'click tr td,.edit': 'edit',
    'click th.sortable': 'sort',
    'click .delete': 'delete',
    'click .create': 'create',
    'click .view': 'read'
  };

  Grid.prototype.initialize = function(options) {
    this.events = _.extend({}, this._events, this.events);
    return this;
  };

  Grid.prototype.render = function(template, data, headings) {
    if (template) this.template = template;
    if (headings) this.headings = headings;
    if (data) this.data = data;
    this.before();
    if (!this.data) {
      this.data = {
        items: this.collection.models
      };
    }
    this.data.headings = this.headings;
    if (this.template) {
      $(this.el).html(tmpl[this.template](this.data));
    } else if (console && console.log) {
      console.log('WARNING Flint.Grid: @template is undefined, unable to render view.');
    }
    this.trigger('rendered', this);
    this.after();
    return this;
  };

  Grid.prototype.before = function() {};

  Grid.prototype.after = function() {};

  Grid.prototype.create = function() {
    return this.trigger('create');
  };

  Grid.prototype.read = function(e) {
    var id, target;
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    return this.trigger('read', id);
  };

  Grid.prototype.edit = function(e) {
    var id, target;
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    return this.trigger('edit', id);
  };

  Grid.prototype["delete"] = function(e) {
    var id, model, target;
    e.stopPropagation();
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    model = this.collection.get(id);
    this.collection.remove(model);
    return false;
  };

  Grid.prototype.sort = function(e) {
    var arrow, heading, index, items, table_root, tr, trs, _i, _j, _len, _len2, _results;
    table_root = e.target;
    while (table_root.tagName !== 'TABLE') {
      table_root = table_root.parentNode;
    }
    index = $('tr th').index(e.target);
    heading = e.target;
    this.sort_data_type = $(e.target).attr('data-type');
    if (!this.sorting_dir) this.sorting_dir = 1;
    if (heading === this.heading) this.sorting_dir *= -1;
    this.heading = e.target;
    $('tr th').css('font-weight', '300');
    $('tr th span').remove();
    arrow = this.sorting_dir === -1 ? '<span>&uarr;&nbsp;</span>' : '<span>&darr;&nbsp;</span>';
    $(e.target).css('font-weight', 'bold');
    $(e.target).html(arrow + $(e.target).html());
    this.sort_index = index;
    trs = table_root.getElementsByTagName('tr');
    items = [];
    tr = 1;
    while (tr < trs.length) {
      items.push(trs[tr]);
      tr++;
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      tr = items[_i];
      $(tr).remove();
    }
    this.quicksort(items, 0, items.length);
    _results = [];
    for (_j = 0, _len2 = items.length; _j < _len2; _j++) {
      tr = items[_j];
      _results.push($(table_root).append(tr));
    }
    return _results;
  };

  Grid.prototype.partition = function(items, begin, end, pivot) {
    var i, pivot_val, store, _ref;
    pivot_val = items[pivot];
    this.swap(items, pivot, end - 1);
    store = begin;
    for (i = begin, _ref = end - 1; begin <= _ref ? i < _ref : i > _ref; begin <= _ref ? i++ : i--) {
      if (this.compare(items[i], pivot_val)) {
        this.swap(items, store, i);
        store++;
      }
    }
    this.swap(items, end - 1, store);
    return store;
  };

  Grid.prototype.compare = function(a, b, type) {
    if (type == null) type = false;
    a = $(a.getElementsByTagName('td')[this.sort_index]).html();
    b = $(b.getElementsByTagName('td')[this.sort_index]).html();
    if (this.sort_data_type) {
      if (this.sort_data_type === 'date') {
        if (a.indexOf('-') > 0) a = a.substring(0, a.indexOf(' -'));
        if (b.indexOf('-') > 0) b = b.substring(0, b.indexOf(' -'));
        a = moment(a);
        b = moment(b);
        if (isNaN(a.toDate().getTime())) {
          a = moment(0);
          console.log(a);
        }
        if (isNaN(b.toDate().getTime())) b = moment(0);
      }
      if (this.sort_data_type === 'number') {
        a = parseFloat(a.replace(/[A-Za-z$,]/g, ''));
        b = parseFloat(b.replace(/[A-Za-z$,]/g, ''));
        if (isNaN(a)) a = 0;
        if (isNaN(b)) b = 0;
      }
    }
    if (this.sorting_dir === 1) {
      return a < b;
    } else {
      return a > b;
    }
  };

  Grid.prototype.swap = function(array, a, b) {
    var tmp;
    tmp = array[a];
    array[a] = array[b];
    array[b] = tmp;
    return array;
  };

  Grid.prototype.quicksort = function(items, begin, end) {
    var pivot;
    if ((end - 1) > begin) {
      pivot = begin + Math.floor(Math.random() * (end - begin));
      pivot = this.partition(items, begin, end, pivot);
      this.quicksort(items, begin, pivot);
      return this.quicksort(items, pivot + 1, end);
    }
  };

  return Grid;

})();

Flint.Helpers = (function() {

  function Helpers() {
    this.js_to_slash = __bind(this.js_to_slash, this);
    this.sql_to_slash = __bind(this.sql_to_slash, this);
    this.date_format = __bind(this.date_format, this);
    this._get_cookie = __bind(this._get_cookie, this);
    this.cookie = __bind(this.cookie, this);
    this.delay = __bind(this.delay, this);
    this.initialize = __bind(this.initialize, this);    Handlebars.registerHelper('eq', this.eq);
    Handlebars.registerHelper('check_role', this.check_role);
    Handlebars.registerHelper('link', this.link);
    Handlebars.registerHelper('link_nohref', this.link_nohref);
    Handlebars.registerHelper('list', this.list);
    Handlebars.registerHelper('filtered_list', this.filtered_list);
    Handlebars.registerHelper('input', this.input);
    Handlebars.registerHelper('text_field', this.text_field);
    Handlebars.registerHelper('password', this.password);
    Handlebars.registerHelper('select', this.select);
    Handlebars.registerHelper('select_range', this.select_range);
    Handlebars.registerHelper('radio', this.radio);
    Handlebars.registerHelper('checkbox', this.checkbox);
    Handlebars.registerHelper('text_area', this.text_area);
    Handlebars.registerHelper('month_grid', this.month_grid);
    Handlebars.registerHelper('date_today', this.date_today);
    Handlebars.registerHelper('sql_to_slash', this.sql_to_slash);
    Handlebars.registerHelper('date_format', this.date_format);
    Handlebars.registerHelper('twenty_four_to_twelve', this.twenty_four_to_twelve);
    Handlebars.registerHelper('dollar', this.dollar);
    Handlebars.registerHelper('random', this.random);
    Handlebars.registerHelper('sum', this.sum);
    Handlebars.registerHelper('truncate', this.truncate);
    Handlebars.registerHelper('repeater', this.repeater);
    this.initialize();
    this;
  }

  Helpers.prototype.initialize = function() {};

  Helpers.prototype.delay = function(ms, func) {
    this.timer = setTimeout(func, ms);
    return this.timer;
  };

  Helpers.prototype.loader = function(selector) {
    $(selector).html('<p class="loader"><em class="one">&nbsp;</em><em class="two">&nbsp;</em><em class="three">&nbsp;</em><em class="four">&nbsp;</em></p>');
    $('.loader').css({
      opacity: 1
    });
    return $(selector);
  };

  Helpers.prototype.eq = function(value, test, options) {
    if (value === test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };

  Helpers.prototype.link = function(href, text, attributes) {
    var attrs;
    attrs = [];
    _.map(attributes.hash, function(value, key) {
      return attrs.push(key + '="' + value + '"');
    });
    return new Handlebars.SafeString('<a href="' + href + '" ' + attrs.join(' ') + '>' + text + '</a>');
  };

  Helpers.prototype.link_nohref = function(text, attributes) {
    var attrs;
    attrs = [];
    _.map(attributes.hash, function(value, key) {
      return attrs.push(key + '="' + value + '"');
    });
    return new Handlebars.SafeString('<a href="javascript:void(0)" ' + attrs.join(' ') + '>' + text + '</a>');
  };

  Helpers.prototype.list = function(context, zero_length_message, block) {
    var out;
    out = [];
    _.each(context, function(model) {
      context = model.attributes ? model.attributes : model;
      return out.push(block(context));
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
      if (pass) return out.push(block(model.attributes));
    });
    out = out.length > 0 ? out.join('') : zero_length_message;
    return new Handlebars.SafeString(out);
  };

  Helpers.prototype.text_field = function(model, field, attributes) {
    var attrs, value;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    value = model && model.get && model.get(field) ? model.get(field) : '';
    return new Handlebars.SafeString('<input type="text" name="' + field + '" value="' + value.replace(/"/g, '&quot;') + '" ' + attrs.join(' ') + '/>');
  };

  Helpers.prototype.input = function(model, field, attributes) {
    var attrs, value;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    value = model && model.get && model.get(field) ? model.get(field) : '';
    return new Handlebars.SafeString('<input name="' + field + '" value="' + value.replace(/"/g, '&quot;') + '" ' + attrs.join(' ') + '/>');
  };

  Helpers.prototype.password = function(model, field, attributes) {
    var attrs, password;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    password = '<input type="password" name="' + field + '" value="" ' + attrs.join(' ') + '/>';
    return new Handlebars.SafeString(password);
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
    if (model && model[field]) selected = model[field];
    opts = [];
    _.each(options, function(option) {
      var optstr, text, value;
      value = _.isArray(option) ? option[0] : option;
      text = _.isArray(option) ? option[1] : option;
      optstr = '<option ';
      if (value && selected && value.toString() === selected.toString()) {
        optstr += 'selected ';
      }
      optstr += 'value="' + value + '">' + text + '</option>';
      return opts.push(optstr);
    });
    return new Handlebars.SafeString('<select name="' + field + '" ' + attrs.join(' ') + '>' + opts.join('') + '</select>');
  };

  Helpers.prototype.select_range = function(model, min, max, field, attributes) {
    var attrs, opts, optstr, selected, value, _ref;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    selected = model.get(field);
    opts = [];
    for (value = min, _ref = max + 1; min <= _ref ? value < _ref : value > _ref; min <= _ref ? value++ : value--) {
      optstr = '<option ';
      if (value === selected) optstr += 'selected ';
      optstr += 'value="' + value + '">' + value + '</option>';
      opts.push(optstr);
    }
    return new Handlebars.SafeString('<select name="' + field + '" ' + attrs.join(' ') + '>' + opts.join('') + '</select>');
  };

  Helpers.prototype.radio_group = function(model, field, options) {
    var opts, selected;
    selected = model.get(field);
    opts = [];
    _.each(options, function(option) {
      var optstr, text, value;
      value = _.isArray(option) ? option[0] : option;
      text = _.isArray(option) ? option[1] : option;
      optstr = '<p class="radio"><input type="radio" name="' + field + '" value="' + value + '"';
      if (value === selected) optstr += ' checked="true"';
      optstr += ' /><label>' + text + '</label></p>';
      return opts.push(optstr);
    });
    return new Handlebars.SafeString('<div class="radios">' + opts.join('') + '</div>');
  };

  Helpers.prototype.checkbox = function(model, field, attributes) {
    var attrs, checked;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    checked = model && model.get && model.get(field) > 0 ? 'checked="true" ' : '';
    return new Handlebars.SafeString('<input type="checkbox" name="' + field + '" value="1" ' + checked + attrs.join(' ') + '/>');
  };

  Helpers.prototype.text_area = function(model, field, attributes) {
    var attrs, value;
    attrs = [];
    if (attributes) {
      _.map(attributes.hash, function(value, key) {
        return attrs.push(key + '="' + value + '"');
      });
    }
    value = model && model.get ? model.get(field) : '';
    return new Handlebars.SafeString('<textarea name="' + field + '" ' + attrs.join(' ') + '>' + value + '</textarea>');
  };

  Helpers.prototype.cookie = function(name, value, expires, path, domain) {
    var cookie, year;
    if (expires == null) expires = '';
    if (path == null) path = '/';
    if (domain == null) domain = '';
    if (_.isUndefined(value)) return this._get_cookie(name);
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

  Helpers.prototype._get_cookie = function(name) {
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

  Helpers.prototype.month_grid = function(month, year) {
    var date, day, days_in_month, html, i, id_day, id_month, index, j, length, off_month, out, starts, _month, _year;
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    length = days_in_month[month];
    starts = new Date(year, month, 1).getDay();
    if (month === 1) {
      if (!((year % 4 === 0 && year % 100 === !0) || year % 400 === 0)) {
        length = 29;
      }
    }
    html = '';
    index = 1 - starts;
    for (i = 0; i <= 5; i++) {
      html += '<tr>';
      for (j = 0; j <= 6; j++) {
        date = new Date(year, month, index);
        day = date.getDate();
        _month = date.getMonth();
        _year = date.getFullYear();
        off_month = index < 1 || index > length ? ' off-month' : '';
        id_day = day < 10 ? '0' + day : day;
        id_month = (_month + 1) < 10 ? '0' + (_month + 1) : _month + 1;
        html += '<td data-dow="' + j + '" class="day dow' + j + off_month + '" data-sql="' + _year + '-' + id_month + '-' + id_day + '">';
        out = date.getDate();
        html += date.getDate() + '</td>';
        index++;
      }
      html += '</tr>';
    }
    html += '</tr></table>';
    return new Handlebars.SafeString(html);
  };

  Helpers.prototype.date_today = function() {
    return new Date().getDate();
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
    return hr + ':' + min + ' ' + mer;
  };

  Helpers.prototype.jsdate_to_sql = function(date) {
    var day, month;
    month = date.getMonth() + 1;
    day = date.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return date.getFullYear() + '-' + month + '-' + day;
  };

  Helpers.prototype.sqldate_to_js = function(sql) {
    var sp;
    if (!sql) return false;
    sp = sql.split('-');
    if (!sp[1] || !sp[2]) return false;
    if (sp[2].indexOf(' ') >= 0) sp[2] = sp[2].substr(0, sp[2].indexOf(' '));
    return new Date(sp[0], sp[1] - 1, sp[2]);
  };

  Helpers.prototype.date_format = function(date, format) {
    if (!date || date === '' || date === '0000-00-00' || date === '0000-00-00 00:00:00') {
      return 'N/A';
    }
    return moment(date).format(format);
  };

  Helpers.prototype.sql_to_slash = function(sql) {
    var d, js, m, y;
    if (!sql || sql === '0000-00-00' || sql === '') return '';
    if (sql.indexOf('/') > 0) return sql;
    js = this.sqldate_to_js(sql);
    if (!js) return '';
    m = js.getMonth() + 1;
    d = js.getDate();
    y = js.getFullYear();
    return m + '/' + d + '/' + y;
  };

  Helpers.prototype.js_to_slash = function(js) {
    var d, m, y;
    m = js.getMonth() + 1;
    d = js.getDate();
    y = js.getFullYear();
    return m + '/' + d + '/' + y;
  };

  Helpers.prototype.dollar = function(n, decimals, decimal_separator, thousands_separator, show_decimals) {
    var c, i, j, sign, x, y, z;
    if (decimals == null) decimals = 2;
    if (decimal_separator == null) decimal_separator = ".";
    if (thousands_separator == null) thousands_separator = ",";
    if (show_decimals == null) show_decimals = true;
    c = isNaN(decimals) ? 2 : Math.abs(decimals);
    sign = n < 0 ? "-" : "";
    i = parseInt(n = Math.abs(n).toFixed(c)) + '';
    j = (j = i.length) > 3 ? j % 3 : 0;
    x = j ? i.substr(0, j) + thousands_separator : '';
    y = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_separator);
    z = c && show_decimals ? decimal_separator + Math.abs(n - i).toFixed(c).slice(2) : '';
    return sign + x + y + z;
  };

  Helpers.prototype.repeater = function(x, y, block) {
    var max, min, num, out;
    min = parseInt(x);
    max = parseInt(y) + 1;
    out = [];
    for (num = min; min <= max ? num < max : num > max; min <= max ? num++ : num--) {
      this.num = num;
      out.push(block.fn(this));
    }
    return new Handlebars.SafeString(out.join(''));
  };

  Helpers.prototype.sum = function() {
    var sum;
    var _this = this;
    sum = 0;
    _.each(arguments, function(arg) {
      return sum += parseFloat(arg);
    });
    return sum;
  };

  Helpers.prototype.truncate = function(str, length) {
    if (str && str.length > length) {
      return str.substr(0, length) + '...';
    } else {
      return str;
    }
  };

  Helpers.prototype.random = function() {
    return Math.random() * 1000;
  };

  return Helpers;

})();

Flint.Grid = (function() {

  __extends(Grid, Backbone.View);

  function Grid() {
    this.close_help = __bind(this.close_help, this);
    this.help = __bind(this.help, this);
    this.sorted = __bind(this.sorted, this);
    Grid.__super__.constructor.apply(this, arguments);
  }

  Grid.prototype._events = {
    'click .edit': 'edit',
    'click .delete': 'delete',
    'click .create': 'create',
    'click .view': 'read',
    'click .help': 'help',
    'click .close': 'close_help'
  };

  Grid.prototype.initialize = function(options, sortable) {
    this.sortable = sortable;
    this.events = _.extend({}, this._events, this.events);
    return this;
  };

  Grid.prototype.render = function(template, data) {
    var config;
    if (template) this.template = template;
    if (data) this.data = data;
    this.before();
    if (!this.data) {
      this.data = {
        items: this.collection.models
      };
    }
    if (this.template) {
      $(this.el).html(tmpl[this.template](this.data));
    } else if (console && console.log) {
      console.log('WARNING Flint.List: @template is undefined, unable to render view.');
    }
    if (this.sortable) {
      config = {
        update: this.sorted
      };
      if (this.sort_handle) config.handle = this.sort_handle;
      this.sortable = $('.sortable').sortable(config);
    }
    this.trigger('rendered', this);
    this.after();
    return this;
  };

  Grid.prototype.before = function() {};

  Grid.prototype.after = function() {};

  Grid.prototype.create = function() {
    return this.trigger('create');
  };

  Grid.prototype.read = function(e) {
    var id, target;
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    return this.trigger('read', id);
  };

  Grid.prototype.edit = function(e) {
    var id, target;
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    return this.trigger('edit', id);
  };

  Grid.prototype["delete"] = function(e) {
    var id, model, target;
    e.stopPropagation();
    target = $(e.target);
    id = target.attr('id');
    while (_.isUndefined(id)) {
      target = target.parent();
      id = target.attr('id');
    }
    model = this.collection.get(id);
    this.collection.remove(model);
    return false;
  };

  Grid.prototype.update = function(model, field, selector) {
    if (selector == null) selector = 'span';
    return $('#' + model.get('id') + ' ' + selector).html(model.get(field));
  };

  Grid.prototype.sorted = function() {
    var order;
    var _this = this;
    this.serialized = [];
    order = 0;
    _.each(this.sortable.find('li'), function(item, index) {
      var id, last_order, model;
      id = item.getAttribute('id');
      model = _this.collection.get(id);
      if (model) {
        last_order = model.get('sort_order');
        _this.collection.get(id).set('sort_order', index, {
          silent: true
        });
        _this.collection.get(id).set('order_before_sort', last_order, {
          silent: true
        });
        return _this.serialized.push({
          id: id,
          sort_order: index
        });
      }
    });
    this.collection.sort();
    this.data = {
      items: this.collection.models
    };
    return this.trigger('sort', this.serialized);
  };

  Grid.prototype.help = function(help) {
    if (help == null) help = true;
    this.before();
    if (!this.data) this.data = {};
    this.data.help = help;
    if (this.template_help) {
      return $(this.el).html(tmpl[this.template_help](this.data));
    }
  };

  Grid.prototype.close_help = function() {
    return this.render();
  };

  return Grid;

})();

Flint.Model = (function() {

  __extends(Model, Backbone.Model);

  function Model() {
    Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})();

Flint.Notifications = (function() {

  __extends(Notifications, Backbone.View);

  function Notifications() {
    this.undo = __bind(this.undo, this);
    this.dismiss = __bind(this.dismiss, this);
    Notifications.__super__.constructor.apply(this, arguments);
  }

  Notifications.prototype.el = '#message';

  Notifications.prototype.events = {
    'click button.close': 'dismiss',
    'click button.undo': 'undo'
  };

  Notifications.prototype.render = function(message, undo, dismiss, undo_text) {
    var undo_callback;
    if (undo == null) undo = false;
    if (dismiss == null) dismiss = 'Close';
    if (undo_text == null) undo_text = 'Undo';
    undo_callback = _.isFunction(undo);
    $(this.el).html(tmpl.notification({
      message: message,
      undo_callback: undo_callback,
      dismiss: dismiss,
      undo_text: undo_text
    }));
    return this;
  };

  Notifications.prototype.error = function(message, undo, callback) {
    if (undo == null) undo = false;
    if (callback == null) callback = false;
    $(this.el).attr('class', 'error').css({
      top: 0
    });
    this.render(message, undo);
    return this.callback = callback;
  };

  Notifications.prototype.notify = function(message, undo, callback) {
    if (undo == null) undo = false;
    if (callback == null) callback = false;
    $(this.el).attr('class', 'notice').css({
      top: 0
    });
    this.render(message, undo, 'OK');
    this.callback = callback;
    return this.undo = undo;
  };

  Notifications.prototype.prompt_save = function(message, save) {
    $(this.el).attr('class', 'notice').css({
      top: 0
    });
    this.render(message, save, 'Save', 'Discard');
    this.callback = save;
    return this.undo = function() {};
  };

  Notifications.prototype.confirm = function(message, save) {
    $(this.el).attr('class', 'notice').css({
      top: 0
    });
    this.render(message, save, 'OK', 'Cancel');
    this.callback = save;
    return this.undo = function() {};
  };

  Notifications.prototype.warning = function(message, save) {
    $(this.el).attr('class', 'error').css({
      top: 0
    });
    this.render(message, save, 'OK', 'Cancel');
    this.callback = save;
    return this.undo = function() {};
  };

  Notifications.prototype.yes_or_no = function(message, save, cancel) {
    if (cancel == null) cancel = false;
    $(this.el).attr('class', 'notice').css({
      top: 0
    });
    this.render(message, save, 'Yes', 'No');
    this.callback = save;
    return this.undo = cancel;
  };

  Notifications.prototype.warn_and_resolve = function(message, save, cancel) {
    if (cancel == null) cancel = false;
    $(this.el).attr('class', 'error').css({
      top: 0
    });
    this.render(message, save, 'Yes', 'No');
    this.callback = save;
    return this.undo = cancel;
  };

  Notifications.prototype.dismiss = function(undo) {
    $(this.el).css({
      top: '-100px'
    }).html('');
    if (this.callback && !_.isUndefined(undo)) return this.callback();
  };

  Notifications.prototype.undo = function() {
    this.dismiss();
    if (this.undo) return this.undo(true);
  };

  return Notifications;

})();

Flint.Sync = (function() {

  function Sync() {
    this.ajax = __bind(this.ajax, this);
    this.changed = __bind(this.changed, this);
    this.backbone = __bind(this.backbone, this);    Backbone.sync = this.backbone;
    this;
  }

  Sync.prototype.backbone = function(method, model, options) {
    model.url = _.isFunction(model.url) ? model.url() : model.url;
    if (!options) options = {};
    if (!model.collection) model.collection = {};
    if (!options.url && !model.url && !model.localstore && !options.localstore && !model.collection.localstore) {
      throw new Error('A url or localstore property must be defined to use Storage.sync!');
    }
    if (model.url || options.url && app.isOnline) {
      return this.server(method, model, options);
    } else {
      return this.local(method, model(options));
    }
  };

  Sync.prototype.local = function(method, model, options) {
    switch (method) {
      case 'read':
        return app.log('read shit!');
      case 'create':
        return app.log('create shit!');
      case 'delete':
        return app.log('update shit!');
      case 'delete':
        return app.log('delete shit!');
    }
  };

  Sync.prototype.server = function(method, model, options) {
    var methodMap, params, type;
    methodMap = {
      'create': 'POST',
      'update': 'PUT',
      'delete': 'DELETE',
      'read': 'GET'
    };
    type = methodMap[method];
    if (!options) options = {};
    params = {
      type: type,
      dataType: 'json'
    };
    params.url = options.url ? options.url : model.url;
    if (!options.data && model && (method === 'create' || method === 'update' || method === 'delete')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data_method = type;
        params.type = 'POST';
        params.beforeSend(function(xhr) {
          return xhr.sendRequestHeader('X-HTTP-Method-Override', type);
        });
      }
    }
    if (params.type !== 'GET' && !Backbone.emulateJSON) params.processData = false;
    $.ajax(_.extend(params, options));
    return this;
  };

  Sync.prototype.changed = function(model) {};

  Sync.prototype.ajax = function(url, params) {
    params.url = url;
    $.ajax(_.extend(params));
    return this;
  };

  return Sync;

})();

Flint.View = (function() {

  __extends(View, Backbone.View);

  function View() {
    View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.render = function(template, data) {
    var _this = this;
    this.template = template;
    this.data = data != null ? data : {};
    this.before(function() {
      return $(_this.el).html(tmpl[_this.template](_this.data));
    });
    return this.after();
  };

  View.prototype.before = function(callback) {
    return callback();
  };

  View.prototype.after = function() {};

  return View;

})();

