Flint = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Flint.Helpers = (function() {

  function Helpers(handlebars) {
    this.handlebars = handlebars;
    this.include = __bind(this.include, this);
    this.handlebars.registerHelper('include', this.include);
    this.handlebars.registerHelper('cache_buster', this.cache_buster);
    this.handlebars.registerHelper('eq', this.eq);
  }

  Helpers.prototype.cache_buster = function() {
    return Math.ceil(Math.random() * 10000);
  };

  Helpers.prototype.eq = function(value, test, options) {
    if (value === test) {
      return options.fn(this);
    } else if (options.inverse) {
      return options.inverse(this);
    }
  };

  Helpers.prototype.include = function(file, data) {
    var content, decoded, ent, fs, hbs, path, template;
    fs = require('fs');
    path = require('path');
    ent = require(path.resolve(this.config.flint_path + '/../node_modules/ent'));
    hbs = require(path.resolve(this.config.flint_path + '/../node_modules/hbs'));
    content = fs.readFileSync(path.resolve(this.config.base + 'app/views/' + file), 'utf8');
    if (data) {
      template = hbs.handlebars.compile(content);
      content = template(data);
    }
    decoded = ent.decode(content);
    return new hbs.handlebars.SafeString(decoded);
  };

  return Helpers;

})();

Flint.Model = (function() {

  Model.prototype.key = 'id';

  Model.prototype.attributes = {};

  function Model(responder, options, callback) {
    this.responder = responder;
    if (options == null) options = {};
    this.datetime = __bind(this.datetime, this);
    this.validate = __bind(this.validate, this);
    this._clean = __bind(this._clean, this);
    this.clean = __bind(this.clean, this);
    this._destroy = __bind(this._destroy, this);
    this.__save = __bind(this.__save, this);
    this._save = __bind(this._save, this);
    this._read = __bind(this._read, this);
    this._find = __bind(this._find, this);
    this._create = __bind(this._create, this);
    this.destroy = __bind(this.destroy, this);
    this.save = __bind(this.save, this);
    this.read = __bind(this.read, this);
    this.find = __bind(this.find, this);
    this.create = __bind(this.create, this);
    this.set = __bind(this.set, this);
    this.get = __bind(this.get, this);
    if (options.store) this.store = options.store;
    this.set(options);
    if (!this.store) {
      callback(false, 'A store property was not specified for a Flint.Model instance');
    }
    if (this.defaults) this.attributes = this.defaults;
    this;
  }

  Model.prototype.get = function(prop) {
    return this.attributes[prop];
  };

  Model.prototype.set = function(prop, value) {
    var i, k;
    if (prop instanceof Object) {
      for (k in prop) {
        i = prop[k];
        this.attributes[k] = i;
      }
    } else {
      this.attributes[prop] = value;
    }
    return this.attributes;
  };

  Model.prototype.create = function(props, callback) {
    if (!props.created_on) props.created_on = this.datetime();
    return this._create(props, callback);
  };

  Model.prototype.find = function(options, callback) {
    return this._find(options, callback);
  };

  Model.prototype.read = function(id, callback) {
    return this._read(id, callback);
  };

  Model.prototype.save = function(props, callback) {
    return this._save(props, callback);
  };

  Model.prototype.destroy = function(id, callback) {
    return this._destroy(id, callback);
  };

  Model.prototype._create = function(props, callback) {
    var validate;
    if (props) this.attributes = this.extend(this.attributes, props);
    delete this.attributes.id;
    if (!props || !props.silent) {
      validate = this.validate(props);
      if (typeof validate === 'undefined') {
        return this.__save(callback);
      } else if (callback) {
        return callback(null, validated);
      }
    } else {
      return this.__save(callback);
    }
  };

  Model.prototype._find = function(options, callback) {
    return this.responder.database.find(options, this.store, callback);
  };

  Model.prototype._read = function(id, callback) {
    var _this = this;
    return this.responder.database.get(id, this.store, function(res, err) {
      if (err && callback) {
        return callback(null, err);
      } else if (res) {
        _this.set(res);
        if (callback) return callback(_this.attributes);
      } else {
        return callback(false);
      }
    });
  };

  Model.prototype._save = function(props, callback) {
    var validate;
    if (props) this.attributes = this.extend(this.attributes, props);
    if (!props || !props.silent) {
      validate = this.validate(props);
      if (typeof validate === 'undefined') {
        return this.__save(callback);
      } else if (callback) {
        return callback(null, validate);
      }
    } else {
      return this.__save(callback);
    }
  };

  Model.prototype.__save = function(callback) {
    var _this = this;
    if (this.get('id')) {
      return this.clean(function(cleaned) {
        return _this.responder.database.update(cleaned, _this.store, function(res, err) {
          if (err && callback) {
            return callback(null, err);
          } else if (callback) {
            return callback(_this.attributes);
          }
        });
      });
    } else {
      return this.clean(function(cleaned) {
        return _this.responder.database.insert(cleaned, _this.store, function(res, err) {
          if (err && callback) {
            return callback(null, err);
          } else if (callback) {
            _this.set('id', res.id);
            return callback(_this.attributes);
          }
        });
      });
    }
  };

  Model.prototype._destroy = function(id, callback) {
    if (!callback) {
      throw new Error('Missing callback function on Flint.Model._destroy');
    }
    if (!id) id = this.get('id');
    if (id) {
      return this.responder.database.destroy(id, this.store, function(res, err) {
        if (err && callback) {
          return callback(null, err);
        } else if (callback) {
          return callback(this.attributes);
        }
      });
    } else if (callback) {
      return callback(null, 'Trying to destroy ' + this.store + ' record without an id attribute present');
    }
  };

  Model.prototype.clean = function(callback) {
    var _this = this;
    if (!this.fields && this.responder.database && this.responder.database.isSql) {
      return this.responder.database.describe(this.store, function(fields, err) {
        if (err) {
          throw new Error('[flint] Database storage object ' + _this.store + ' does not exist!');
        } else {
          _this.fields = fields;
          return _this._clean(callback);
        }
      });
    } else {
      return this._clean(callback);
    }
  };

  Model.prototype._clean = function(callback) {
    var cleaned, column, prop, val, _i, _len, _ref, _ref2;
    if (this.fields) {
      cleaned = {};
      _ref = this.attributes;
      for (prop in _ref) {
        val = _ref[prop];
        _ref2 = this.fields;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          column = _ref2[_i];
          if (prop.toString() === column.name) {
            cleaned[prop] = val;
            break;
          }
        }
      }
      return callback(cleaned);
    } else {
      return callback(this.attributes);
    }
  };

  Model.prototype.validate = function() {};

  Model.prototype.extend = function(obj, source) {
    var prop, value;
    for (prop in source) {
      value = source[prop];
      obj[prop] = value;
    }
    return obj;
  };

  Model.prototype.datetime = function() {
    var now, sql;
    now = new Date();
    sql = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
    sql += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return sql;
  };

  return Model;

})();

Flint.Mysql = (function() {

  function Mysql(connection) {
    this.close_connection = __bind(this.close_connection, this);
    this.uuid = __bind(this.uuid, this);
    this.s4 = __bind(this.s4, this);
    this.describe = __bind(this.describe, this);
    this.query = __bind(this.query, this);
    this.destroy = __bind(this.destroy, this);
    this.update = __bind(this.update, this);
    this.insert = __bind(this.insert, this);
    this.get = __bind(this.get, this);
    this.find = __bind(this.find, this);    this.connection = connection;
  }

  Mysql.prototype.find = function(options, store, callback) {
    var conditions, field, fields, operand, query, val, value, _ref;
    fields = options.fields ? options.fields : '*';
    query = 'SELECT ' + fields + ' FROM ' + store;
    if (options.where) {
      if (typeof options.where === 'string') {
        query += ' WHERE ' + options.where;
      } else {
        conditions = [];
        _ref = options.where;
        for (field in _ref) {
          value = _ref[field];
          if (value instanceof Object) {
            for (operand in value) {
              val = value[operand];
              conditions.push(field + ' ' + operand + ' ' + this.connection.escape(val));
            }
          } else {
            conditions.push(field + '=' + this.connection.escape(value));
          }
        }
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    if (options.order) query += ' ORDER BY ' + options.order;
    if (options.limit) query += ' LIMIT ' + options.limit;
    console.log(callback);
    console.log(query);
    return this.connection.query(query, function(err, rows, fields) {
      var results, row, _i, _len;
      if (err && callback) {
        return callback(null, err);
      } else {
        results = [];
        if (rows.length === 0) {
          return callback(false);
        } else {
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            results.push(row);
          }
          if (callback) return callback(results);
        }
      }
    });
  };

  Mysql.prototype.get = function(id, store, callback) {
    return this.connection.query('SELECT * FROM ' + store + ' WHERE id = ' + this.connection.escape(id), function(err, rows, fields) {
      if (err && callback) {
        return callback(null, err);
      } else if (callback) {
        return callback(rows[0]);
      }
    });
  };

  Mysql.prototype.insert = function(object, store, callback) {
    object.id = this.uuid();
    return this.connection.query('INSERT INTO ' + store + ' SET ?', object, function(err, res) {
      if (err) {
        return callback(null, err);
      } else if (callback) {
        res.id = object.id;
        return callback(res, err);
      }
    });
  };

  Mysql.prototype.update = function(object, store, callback) {
    var id;
    id = object.id;
    delete object.id;
    return this.connection.query('UPDATE ' + store + ' SET ? WHERE id = ' + this.connection.escape(id), object, function(err, res) {
      if (callback) return callback(res, err);
    });
  };

  Mysql.prototype.destroy = function(id, store, callback) {
    return this.connection.query('DELETE FROM ' + store + ' WHERE id = ' + this.connection.escape(id), function(err, res) {
      if (callback) return callback(res, err);
    });
  };

  Mysql.prototype.query = function(query, callback) {
    var results;
    results = [];
    return this.connection.query(this.connection.escape(query), function(err, rows, fields) {
      var row, _i, _len;
      if (err) {
        return callback(null, err);
      } else {
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          results.push(row.Field);
        }
        return callback(results);
      }
    });
  };

  Mysql.prototype.describe = function(store, callback) {
    var valid;
    valid = [];
    return this.connection.query('DESC ' + store, function(err, rows, fields) {
      var row, _i, _len;
      if (err) {
        return callback(null, err);
      } else {
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          valid.push({
            name: row.Field,
            type: row.Type
          });
        }
        if (callback) return callback(valid);
      }
    });
  };

  Mysql.prototype.s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
  };

  Mysql.prototype.uuid = function() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  };

  Mysql.prototype.close_connection = function() {
    return this.connection.end();
  };

  return Mysql;

})();

Flint.Responder = (function() {

  function Responder(config) {
    this.config = config;
    this.finish = __bind(this.finish, this);
    this["delete"] = __bind(this["delete"], this);
    this.put = __bind(this.put, this);
    this.post = __bind(this.post, this);
    this.get = __bind(this.get, this);
    if (this.config.db) {
      if (this.config.db.engine === 'mysql') {
        this.mysql = require(path.resolve(this.config.flint_path + '/../node_modules/mysql'));
        this.connection = this.mysql.createConnection(this.config.db);
        this.connection.connect();
        if (!this.connection) {
          throw new Error('Unable to establish mysql database connection!');
        }
        this.connection.query('USE ' + this.config.db.database);
        this.database = new Flint.Mysql(this.connection);
        this.database.isSql = true;
      }
    }
    this;
  }

  Responder.prototype.before = function() {
    return true;
  };

  Responder.prototype.after = function() {
    return true;
  };

  Responder.prototype.get = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    if (data.id) {
      return model.read(data.id, function(result) {
        delete result.store;
        return callback(result);
      });
    } else {
      console.log('calling find?');
      return model.find(false, callback);
    }
  };

  Responder.prototype.post = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    return model.create(data, function(res, err) {
      if (err) {
        return callback(null, err);
      } else {
        res = {};
        res.emit = {
          event: 'created:' + model.store,
          data: model.attributes
        };
        return callback(res);
      }
    });
  };

  Responder.prototype.put = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    return model.save(data, function(res, err) {
      if (err) {
        return callback(null, err);
      } else {
        res = {};
        res.emit = {
          event: 'modified:' + model.store,
          data: model.attributes
        };
        return callback(res);
      }
    });
  };

  Responder.prototype["delete"] = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    return model.destory(data.id, callback);
  };

  Responder.prototype.finish = function() {
    return this.database.close_connection();
  };

  Responder.prototype.__get_model_instance = function() {
    var Instance;
    Instance = this.model ? models[this.model] : Flint.Model;
    if (!Instance) {
      throw new Error('Flint.Model class ' + this.model + ' does not exist!');
    }
    return Instance;
  };

  return Responder;

})();

exports.Flint = Flint
