Flint = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Flint.Helpers = (function() {

  function Helpers(handlebars) {
    this.handlebars = handlebars;
    this.require = __bind(this.require, this);
    this.include = __bind(this.include, this);
    this.handlebars.registerHelper('include', this.include);
    this.handlebars.registerHelper('cache_buster', this.cache_buster);
    this.handlebars.registerHelper('eq', this.eq);
    this.handlebars.registerHelper('json', this.json);
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

  Helpers.prototype.json = function(object) {
    return JSON.stringify(object);
  };

  Helpers.prototype.include = function(file, data) {
    var content, decoded, ent, fs, hbs, template;
    fs = require('fs');
    ent = this.require('ent');
    hbs = this.require('hbs');
    content = fs.readFileSync(path.resolve(this.config.base + 'app/views/' + file), 'utf8');
    if (data) {
      template = hbs.handlebars.compile(content);
      content = template(data);
    }
    decoded = ent.decode(content);
    return new hbs.handlebars.SafeString(decoded);
  };

  Helpers.prototype.require = function(module) {
    return require(path.resolve(this.config.flint_path + '/../node_modules/' + module));
  };

  return Helpers;

})();

Flint.Model = (function() {

  Model.prototype.key = 'id';

  Model.prototype.attributes = {};

  function Model(responder, options) {
    this.responder = responder;
    if (options == null) options = {};
    this.datetime = __bind(this.datetime, this);
    this.find_related = __bind(this.find_related, this);
    this.parse_relations = __bind(this.parse_relations, this);
    this.find_related_models = __bind(this.find_related_models, this);
    this.bump = __bind(this.bump, this);
    this.decrement = __bind(this.decrement, this);
    this.increment = __bind(this.increment, this);
    this._clean = __bind(this._clean, this);
    this.clean = __bind(this.clean, this);
    this.validate = __bind(this.validate, this);
    this._destroy = __bind(this._destroy, this);
    this.__save = __bind(this.__save, this);
    this._save = __bind(this._save, this);
    this._read = __bind(this._read, this);
    this._find = __bind(this._find, this);
    this._create = __bind(this._create, this);
    this.destroy = __bind(this.destroy, this);
    this.save = __bind(this.save, this);
    this.read_only = __bind(this.read_only, this);
    this.read = __bind(this.read, this);
    this.first = __bind(this.first, this);
    this.find_only = __bind(this.find_only, this);
    this.find = __bind(this.find, this);
    this.create = __bind(this.create, this);
    this.set = __bind(this.set, this);
    this.get = __bind(this.get, this);
    if (options.store) this.store = options.store;
    if (!this.store) {
      throw new Error('A store property was not specified for a Flint.Model instance');
    }
    this.attributes = {};
    if (this.defaults) this.attributes = this.defaults;
    this.set(options);
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
    return this._create(props, callback);
  };

  Model.prototype.find = function(options, callback) {
    return this._find(options, callback);
  };

  Model.prototype.find_only = function(options, callback) {
    options.only = true;
    return this._find(options, callback);
  };

  Model.prototype.first = function(options, callback) {
    var _this = this;
    return this._find(options, function(err, res) {
      if (err) {
        return callback(err);
      } else if (res) {
        _this.set(res[0]);
        return callback(null, res[0]);
      } else {
        return callback(null, false);
      }
    });
  };

  Model.prototype.read = function(id, callback) {
    return this._read(id, false, callback);
  };

  Model.prototype.read_only = function(id, callback) {
    return this._read(id, true, callback);
  };

  Model.prototype.save = function(props, callback) {
    return this._save(props, callback);
  };

  Model.prototype.destroy = function(id, callback) {
    return this._destroy(id, callback);
  };

  Model.prototype._create = function(props, callback) {
    var validate;
    if (props) {
      this.attributes = {};
      this.attributes = this.extend(this.attributes, props);
    }
    delete this.attributes[this.key];
    if (!props || !props.silent) {
      validate = this.validate(props);
      if (typeof validate === 'undefined') {
        return this.__save(callback);
      } else if (callback) {
        return callback(new Error('Unable to save model: ' + validate));
      }
    } else {
      return this.__save(callback);
    }
  };

  Model.prototype._find = function(options, callback) {
    var _this = this;
    return this.responder.database.find(options, this.store, function(err, res) {
      if (err) {
        return callback(err);
      } else if (!options.only) {
        return _this.find_related_models(res, callback);
      } else {
        return callback(null, res);
      }
    });
  };

  Model.prototype._read = function(id, only, callback) {
    var _this = this;
    return this.responder.database.get(id, this.key, this.store, function(err, res) {
      if (err) {
        return callback(err);
      } else if (res) {
        _this.set(res);
        if (!only) {
          return _this.find_related_models(res, callback);
        } else {
          return callback(null, _this.attributes);
        }
      } else {
        return callback(null, false);
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
        return callback(new Error('Unable to save model: ' + validate));
      }
    } else {
      return this.__save(callback);
    }
  };

  Model.prototype.__save = function(callback) {
    var _this = this;
    return this.clean(function(err, cleaned) {
      if (err) callback(err);
      if (_this.get(_this.key)) {
        if (!cleaned.updated_on && _this.stamp_update) {
          cleaned.updated_on = _this.datetime();
        }
        return _this.responder.database.update(cleaned, _this.key, _this.store, function(err, res) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, cleaned);
          }
        });
      } else {
        if (!cleaned.created_on && _this.stamp_create) {
          cleaned.created_on = _this.datetime();
        }
        return _this.responder.database.insert(cleaned, _this.key, _this.store, function(err, res) {
          if (err && callback) {
            return callback(err);
          } else if (callback) {
            _this.set('id', res.id);
            return callback(null, cleaned);
          }
        });
      }
    });
  };

  Model.prototype._destroy = function(id, callback) {
    var _this = this;
    return this.responder.database.destroy(id, this.key, this.store, function(err, res) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, _this.attributes);
      }
    });
  };

  Model.prototype.validate = function(attrs) {
    if (this.fields) return this.validate_fields(attrs);
  };

  Model.prototype.validate_fields = function(attrs) {
    var field, key, options, rule, valid_email, value, _ref;
    _ref = this.fields;
    for (field in _ref) {
      options = _ref[field];
      if (options && options.valid) {
        rule = options.valid;
        for (key in attrs) {
          value = attrs[key];
          if (field === key) {
            if (rule === 'not_empty' && value === '') {
              return field + ' must not have an empty value.';
            }
            if (rule === 'valid_email') {
              valid_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!value.match(valid_email)) {
                return field + ' must be a valid email address.';
              }
            }
          }
        }
      }
    }
  };

  Model.prototype.clean = function(callback) {
    var _this = this;
    if (!this.fields && this.responder.database && this.responder.database.isSql) {
      return this.responder.database.describe(this.store, function(err, fields) {
        if (err) {
          throw new Error('database storage object ' + _this.store + ' does not exist!');
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
    var cleaned, column, options, prop, val, _ref, _ref2;
    if (this.fields) {
      cleaned = {};
      _ref = this.attributes;
      for (prop in _ref) {
        val = _ref[prop];
        _ref2 = this.fields;
        for (column in _ref2) {
          options = _ref2[column];
          if (options && options.name) column = options.name;
          if (column && prop.toString() === column) {
            cleaned[prop] = val;
            break;
          }
        }
      }
      return callback(null, cleaned);
    } else {
      return callback(null, this.attributes);
    }
  };

  Model.prototype.increment = function(field, callback) {
    return this.responder.database.bump(this.store, field, 1, this.key, this.attributes[this.key], callback);
  };

  Model.prototype.decrement = function(field, callback) {
    return this.responder.database.bump(this.store, field, -1, this.key, this.attributes[this.key], callback);
  };

  Model.prototype.bump = function(field, value, callback) {
    return this.responder.database.bump(this.store, field, value, this.key, this.attributes[this.key], callback);
  };

  Model.prototype.find_related_models = function(results, callback) {
    var calls;
    var _this = this;
    this.async = this.responder.require('async');
    calls = [];
    calls.push(function(callback) {
      return callback(null, results);
    });
    if (results && this.has_one) {
      calls.push(function(results, callback) {
        return _this.find_related(results, _this.parse_relations(_this.has_one), true, callback);
      });
    }
    if (results && this.has_many) {
      calls.push(function(results, callback) {
        return _this.find_related(results, _this.parse_relations(_this.has_many), false, callback);
      });
    }
    if (this.belongs_to) {
      calls.push(function(results, callback) {
        return _this.find_related(results, _this.parse_relations(_this.belongs_to, true), true, callback);
      });
    }
    if (this.has_mutual) {
      calls.push(function(results, callback) {
        return _this.find_related(results, _this.parse_relations(_this.has_mutual, false, true), false, callback);
      });
    }
    return this.async.waterfall(calls, callback);
  };

  Model.prototype.parse_relations = function(related, belongs, joined) {
    var foreign, linking, local, obj, plural, prop, relations, relationships, ship, singular, value, _i, _len;
    relationships = [];
    if (typeof related === 'string') {
      relations = related.split(',');
    } else if (typeof related === 'object') {
      relations = [];
      for (prop in related) {
        value = related[prop];
        obj = {};
        obj[prop] = value;
        relations.push(obj);
      }
    } else {
      relations = related;
    }
    for (_i = 0, _len = relations.length; _i < _len; _i++) {
      ship = relations[_i];
      if (typeof ship === 'object') {
        linking = ship;
        ship = Object.keys(ship)[0];
        linking = linking[ship] || {};
      } else {
        linking = {};
      }
      singular = this.store.singularize().toLowerCase();
      plural = ship.pluralize().toLowerCase();
      if (joined) {
        foreign = ship.singularize().toLowerCase() + '_' + this.key;
        local = this.key;
        if (!linking.link_table) {
          linking.link_table = this.store + '_' + ship.pluralize().toLowerCase();
        }
        linking.local_link = singular + '_' + this.key;
      } else {
        local = belongs ? ship.singularize().toLowerCase() + '_' + this.key : this.key;
        foreign = belongs ? this.key : singular + '_' + this.key;
      }
      if (!linking.link) linking.link = ship;
      if (!linking.model) linking.model = ship.singularize().camelize();
      if (!linking.table) linking.table = ship.pluralize();
      if (!linking.local_key) linking.local_key = local;
      if (!linking.foreign_key) linking.foreign_key = foreign;
      relationships.push(linking);
    }
    return relationships;
  };

  Model.prototype.find_related = function(results, relations, first, callback) {
    var find_related;
    var _this = this;
    find_related = function(related, cb) {
      var keys, model, query, res, _i, _len;
      if (models[related.model]) {
        model = new models[related.model](_this.responder, {
          store: related.table
        });
      } else {
        model = new Flint.Model(_this.responder, {
          store: related.table
        });
      }
      if (results.length && results.length > 0) {
        keys = [];
        for (_i = 0, _len = results.length; _i < _len; _i++) {
          res = results[_i];
          keys.push(res[related.local_key]);
        }
      } else {
        keys = [results[related.local_key]];
      }
      if (related.link_table) {
        query = {
          where: related.link_table + '.' + related.local_link + ' IN("' + keys.join('","') + '")',
          join: {
            table: related.link_table,
            on: related.table + '.' + model.key + '=' + related.link_table + '.' + related.foreign_key
          }
        };
      } else {
        query = {
          where: related.foreign_key + ' IN("' + keys.join('","') + '")'
        };
      }
      if (related.fields) query.fields = related.fields;
      if (related.order) query.order = related.order;
      if (related.limit) query.limit = related.limit;
      return model.find(query, function(err, orm) {
        return cb(null, {
          results: orm,
          related: related
        });
      });
    };
    return this.async.map(relations, find_related, function(err, mapped) {
      var map, orm, res, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref;
      for (_i = 0, _len = mapped.length; _i < _len; _i++) {
        map = mapped[_i];
        if (!map) continue;
        if (map.results) {
          if (map.related.link_table) {
            map.related.foreign_key = map.related.local_link;
          }
          if (results.length && results.length > 0) {
            for (_j = 0, _len2 = results.length; _j < _len2; _j++) {
              res = results[_j];
              if (!first) res[map.related.link] = [];
              _ref = map.results;
              for (_k = 0, _len3 = _ref.length; _k < _len3; _k++) {
                orm = _ref[_k];
                if (orm[map.related.foreign_key] === res[map.related.local_key]) {
                  if (!first) {
                    res[map.related.link].push(orm);
                  } else {
                    res[map.related.link] = orm;
                  }
                }
              }
              if (!res[map.related.link] || res[map.related.link].length === 0) {
                res[map.related.link] = false;
              }
            }
          } else {
            results[map.related.link] = map.results;
          }
        } else {
          for (_l = 0, _len4 = results.length; _l < _len4; _l++) {
            res = results[_l];
            res[map.related.link] = false;
          }
        }
      }
      return callback(null, results);
    });
  };

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
    this.objectify = __bind(this.objectify, this);
    this.stringify = __bind(this.stringify, this);
    this.query = __bind(this.query, this);
    this.bump = __bind(this.bump, this);
    this.destroy = __bind(this.destroy, this);
    this.update = __bind(this.update, this);
    this.insert = __bind(this.insert, this);
    this.get = __bind(this.get, this);
    this.find = __bind(this.find, this);    this.connection = connection;
  }

  Mysql.prototype.find = function(options, store, callback) {
    var conditions, direction, field, fields, operand, query, val, value, _ref;
    var _this = this;
    fields = options.fields ? options.fields : '*';
    query = 'SELECT ' + fields + ' FROM ' + store;
    if (options.join) {
      direction = options.join.direction || 'LEFT';
      query += ' ' + direction + ' JOIN (' + options.join.table + ') ';
      query += 'ON ' + options.join.on;
    }
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
    return this.connection.query(query, function(err, rows, fields) {
      var prop, results, row, value, _i, _len;
      if (err && callback) {
        return callback(err);
      } else {
        results = [];
        if (rows.length === 0) {
          return callback(null, false);
        } else {
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            for (prop in row) {
              value = row[prop];
              row[prop] = value;
            }
            results.push(row);
          }
          if (callback) return callback(null, results);
        }
      }
    });
  };

  Mysql.prototype.get = function(id, key, store, callback) {
    var _this = this;
    return this.connection.query('SELECT * FROM ' + store + ' WHERE ' + key + ' = ' + this.connection.escape(id), function(err, rows, fields) {
      var prop, res, value;
      if (err) callback(err);
      if (rows && rows.length > 0) {
        res = rows[0];
        for (prop in res) {
          value = res[prop];
          res[prop] = value;
        }
        return callback(null, res);
      } else {
        return callback(null, false);
      }
    });
  };

  Mysql.prototype.insert = function(object, key, store, callback) {
    object[key] = this.uuid();
    return this.connection.query('INSERT INTO ' + store + ' SET ?', object, function(err, res) {
      if (err) {
        return callback(err);
      } else if (callback) {
        res.id = object.id;
        return callback(null, res);
      }
    });
  };

  Mysql.prototype.update = function(object, key, store, callback) {
    var id;
    id = object[key];
    delete object[key];
    return this.connection.query('UPDATE ' + store + ' SET ? WHERE ' + key + ' = ' + this.connection.escape(id), object, callback);
  };

  Mysql.prototype.destroy = function(id, key, store, callback) {
    return this.connection.query('DELETE FROM ' + store + ' WHERE ' + key + ' = ' + this.connection.escape(id), callback);
  };

  Mysql.prototype.bump = function(store, field, value, key, id, callback) {
    return this.connection.query('UPDATE ' + store + ' SET ' + field + '=' + field + '+' + value + ' WHERE ' + key + ' = ' + this.connection.escape(id), callback);
  };

  Mysql.prototype.query = function(query, callback) {
    var results;
    results = [];
    return this.connection.query(query, function(err, rows, fields) {
      var prop, row, value, _i, _len;
      if (err) {
        return callback(err);
      } else {
        if (rows.length === 0) {
          return callback(false);
        } else {
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            for (prop in row) {
              value = row[prop];
              row[prop] = this.objectify(value);
            }
            results.push(row);
          }
          if (callback) return callback(null, results);
        }
      }
    });
  };

  Mysql.prototype.stringify = function(object) {
    var prop, value;
    for (prop in object) {
      value = object[prop];
      if (typeof value !== 'string') object[prop] = JSON.stringify(value);
    }
    return object;
  };

  Mysql.prototype.objectify = function(string_or_object) {
    if (typeof string_or_object !== 'string') return string_or_object;
    if (/^[\],:{}\s]*$/.test(string_or_object.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      string_or_object = JSON.parse(string_or_object);
    }
    return string_or_object;
  };

  Mysql.prototype.describe = function(store, callback) {
    return this.connection.query('DESC ' + store, function(err, rows, fields) {
      var row, valid, _i, _len;
      if (err) {
        return callback(err);
      } else {
        valid = [];
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          valid.push({
            name: row.Field,
            type: row.Type
          });
        }
        if (callback) return callback(null, valid);
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
    var mysql;
    this.config = config;
    this.require = __bind(this.require, this);
    this.finish = __bind(this.finish, this);
    this.notify = __bind(this.notify, this);
    this["delete"] = __bind(this["delete"], this);
    this.put = __bind(this.put, this);
    this.post = __bind(this.post, this);
    this.get = __bind(this.get, this);
    if (this.config.db) {
      if (this.config.db.engine === 'mysql') {
        mysql = this.require('mysql');
        this.connection = mysql.createConnection(this.config.db);
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

  Responder.prototype.after = function(response, data, credentials) {
    return response;
  };

  Responder.prototype.get = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    if (data.id) {
      return model.read(data.id, function(err, res) {
        if (err) {
          return callback(err);
        } else {
          delete res.store;
          return callback(null, res);
        }
      });
    } else {
      return model.find(false, callback);
    }
  };

  Responder.prototype.post = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    return model.create(data, function(err, res) {
      if (err) {
        return callback(err);
      } else {
        res = {};
        res.emit = {
          event: 'created:' + model.store,
          data: model.attributes
        };
        return callback(null, res);
      }
    });
  };

  Responder.prototype.put = function(data, credentials, callback) {
    var Instance, model;
    Instance = this.__get_model_instance();
    model = new Instance(this, {
      store: this.default_store
    });
    return model.save(data, function(err, res) {
      if (err) {
        return callback(err);
      } else {
        res = {};
        res.emit = {
          event: 'modified:' + model.store,
          data: model.attributes
        };
        return callback(null, res);
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

  Responder.prototype.notify = function(file, message, callback) {
    var content, ent, fs, hbs, mailer, template, transport;
    var _this = this;
    if (!message.from) message.from = this.config.mail_default_from;
    if (!message.text) {
      message.text = 'This is an HTML email. Please enable HTML in your mail client';
    }
    if (!message.to && !message.from) {
      callback(new Error('Both to: and from: address must be specified in message argument.'));
    }
    fs = require('fs');
    hbs = this.require('hbs');
    ent = this.require('ent');
    content = fs.readFileSync(path.resolve(this.config.base + 'app/views/' + file), 'utf8');
    template = hbs.handlebars.compile(content);
    content = template(message);
    message.html = ent.decode(content);
    mailer = this.require('nodemailer');
    transport = mailer.createTransport('SMTP', {
      service: this.config.mail_service,
      auth: {
        user: this.config.mail_username,
        pass: this.config.mail_password
      }
    });
    return transport.sendMail(message, function(err, res) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, res);
      }
    });
  };

  Responder.prototype.finish = function() {
    return this.database.close_connection();
  };

  Responder.prototype.require = function(module) {
    return require(path.resolve(this.config.flint_path + '/../node_modules/' + module));
  };

  Responder.prototype.__get_model_instance = function() {
    var Instance;
    if (!this.model && this.default_store) {
      this.model = this.default_store.singularize().camelize();
    }
    Instance = this.model && models[this.model] ? models[this.model] : Flint.Model;
    if (!Instance) {
      throw new Error('Flint.Model class ' + this.model + ' does not exist!');
    }
    return Instance;
  };

  return Responder;

})();

exports.Flint = Flint
