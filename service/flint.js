Flint = {}

__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
__hasProp = {}.hasOwnProperty,
__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Flint.Model = (function() {

  Model.prototype.key = 'id';

  Model.prototype.attributes = {};

  function Model(responder, callback) {
    var _this = this;
    this.responder = responder;
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
    if (this.defaults) this.attributes = this.defaults;
    if (this.responder.database && this.responder.database.isSql) {
      this.responder.database.describe(this.store, function(fields) {
        _this.storable_fields = fields;
        return callback(_this);
      });
    } else {
      callback(this);
    }
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
    var validated;
    if (props) this.attributes = this.extend(this.attributes, props);
    delete this.attributes.id;
    if (props && props.silent) {
      validated = this.validate ? this.validate() : void 0;
      if (!validated) {
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
      } else {
        _this.set(res);
        if (callback) return callback(_this.attributes);
      }
    });
  };

  Model.prototype._save = function(props, callback) {
    var validated;
    if (props) this.attributes = this.extend(this.attributes, props);
    if (props && props.silent) {
      validated = this.validate ? this.validate() : void 0;
      if (!validated) {
        return this.__save(callback);
      } else if (callback) {
        return callback(null, validated);
      }
    } else {
      return this.__save(callback);
    }
  };

  Model.prototype.__save = function(callback) {
    var _this = this;
    if (this.get('id')) {
      return this.responder.database.update(this.clean(), this.store, function(res, err) {
        if (err && callback) {
          return callback(null, err);
        } else if (callback) {
          return callback(_this);
        }
      });
    } else {
      return this.responder.database.insert(this.clean(), this.store, function(res, err) {
        if (err && callback) {
          return callback(null, err);
        } else if (callback) {
          _this.set('id', res.id);
          return callback(_this);
        }
      });
    }
  };

  Model.prototype._destroy = function(id, callback) {
    if (!id) id = this.get('id');
    if (id) {
      return this.responder.database.destroy(id, this.store, function(res, err) {
        if (err && callback) {
          return callback(null, err);
        } else if (callback) {
          return callback(this);
        }
      });
    } else if (callback) {
      return callback(null, 'Trying to destroy ' + this.store + ' record without ID');
    }
  };

  Model.prototype.clean = function() {
    var cleaned, prop, val, _ref;
    if (!this.storable_fields) return this.attributes;
    cleaned = {};
    _ref = this.attributes;
    for (prop in _ref) {
      val = _ref[prop];
      if (this.storable_fields.indexOf(prop.toString()) >= 0) cleaned[prop] = val;
    }
    return cleaned;
  };

  Model.prototype.extend = function(obj, source) {
    var prop, value;
    for (prop in source) {
      value = source[prop];
      obj[prop] = value;
    }
    return obj;
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
      if (options.where instanceof String) {
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
      }
      query += ' WHERE ' + conditions.join(' AND ');
    }
    if (options.order) query += ' ORDER BY ' + options.order;
    if (options.limit) query += ' LIMIT ' + options.limit;
    return this.connection.query(query, function(err, rows, fields) {
      var results, row, _i, _len;
      if (err && callback) {
        return callback(null, err);
      } else {
        results = [];
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          results.push(row);
        }
        if (callback) return callback(results);
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
    console.log('inserting.');
    return this.connection.query('INSERT INTO ' + store + ' SET ?', object, function(err, res) {
      if (callback) {
        res.id = object.id;
        return callback(res, err);
      }
    });
  };

  Mysql.prototype.update = function(object, store, callback) {
    var id;
    console.log('updating.');
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
          valid.push(row.Field);
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
    this.after = __bind(this.after, this);
    this.before = __bind(this.before, this);
    if (this.config.db) {
      if (this.config.db.engine === 'mysql') {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection(this.config.db);
        this.connection.connect();
        if (this.connection && !this.config.quiet && this.config.debug) {
          console.log('Established database connection.');
        } else if (!this.connection) {
          throw new Error('Unable to establish mysql database connection!');
        }
        this.connection.query('USE ' + this.config.db.database);
        this.database = new Flint.Mysql(this.connection);
        this.database.isSql = true;
      }
    }
    this;
  }

  Responder.prototype.before = function() {};

  Responder.prototype.after = function() {};

  Responder.prototype.finish = function() {
    return this.database.close_connection();
  };

  return Responder;

})();

exports.Flint = Flint
