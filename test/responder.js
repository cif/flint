/*
  
  test suite for Flint.Responder class

*/

var assert = require('assert');
var lib = require('../service/responders');
var config = require('../flint').config;
var inflector = require('../node/inflector');

// responder and model instance variable

describe('Responder', function(){
  
  var Test, Posted;
  Test = new Flint.Responder(config);
  Test.default_store = 'tests';
      
  // constructor tests
  describe('constructor', function(){
    
    it('should have a database object instance', function(){
        
        assert.notEqual(Test.database, 'undefined');
    
    });
    
  });
  
  describe('api methods', function(){
    
    it('GET / should return a list of test models', function(done){
        
        Test.get({}, false, function(err, res){
          if(err) throw err;
          assert(res.length > 0);
          assert(res[0].name, 'TESTING');
          done();
        
        });
        
    });
    
    it('GET /id should return a test model instance', function(done){
        
        
        Test.get({id:'unique_test_case'}, false, function(err, res){
          if(err) throw err;
          assert(res.name, 'TESTING');
          done();
        
        });
        
    
    });
    
    it('POST should save and return a test model instance', function(done){
        
        // in this case, we're testing two faux POSTs 
        // ... value persitence issues express' issue (?) the world may never know
        
        Test.post({name:'TEST POST ONE',other:'TEST VALUE'}, false, function(err, res){
          if(err) throw err;
          Posted = res.emit.data;
          assert(res.emit.data.id);
          
        });
        
        Test.post({name:'TEST POST TWO'}, false, function(err, res){
          if(err) throw err;
          assert(res.emit.data.id);
          assert.notEqual(res.emit.data.other, 'TEST VALUE');
          
        
        });
        
        done();
        
    });
    
    it('PUT should save data passed to the database', function(done){
        
        
        Test.put({id:'unique_test_case', other:'updated value'}, false, function(err, res){
          if(err) throw err;
          assert(res.emit.data.other, 'updated value');
          done();
        
        });
        
    
    });
    
    it('DELETE should destroy the first record posted to database', function(done){
        
        //assert.doesNotThrow(function(){
          
          Test.delete(Posted, false, function(err, res){
            if(err) throw err;
            done();
        
          });
          
        //},Error);
        
    
    });
    
    
    
  });
  
});