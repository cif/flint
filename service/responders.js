Flint = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Flint.Model = (function() {

  function Model() {
    this.destroy = __bind(this.destroy, this);
    this.put = __bind(this.put, this);
    this.get = __bind(this.get, this);
    this.post = __bind(this.post, this);
  }

  Model.prototype.post = function() {};

  Model.prototype.get = function() {};

  Model.prototype.put = function() {};

  Model.prototype.destroy = function() {};

  return Model;

})();

Flint.Mongo = (function() {

  function Mongo() {}

  return Mongo;

})();

Flint.MySql = (function() {

  function MySql() {}

  return MySql;

})();

Flint.Responder = (function() {

  function Responder(adapter) {}

  return Responder;

})();

exports.Flint = Flint

models = {}
controllers = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

controllers.Widgets = (function() {

  __extends(Widgets, Flint.Responder);

  function Widgets() {
    this.some_other_method = __bind(this.some_other_method, this);
    this.get = __bind(this.get, this);
    Widgets.__super__.constructor.apply(this, arguments);
  }

  Widgets.prototype.get = function(data, credentials) {
    var response;
    response = {
      test: 'fuck yeah',
      word: 'bird'
    };
    return response;
  };

  Widgets.prototype.some_other_method = function(data, credentials) {
    var response;
    response = {
      test: 'fuck yeah RIGHT!',
      word: 'bird.........',
      rad: 'holy shit ben!'
    };
    return response;
  };

  return Widgets;

})();

exports.models = models
exports.controllers = controllers
