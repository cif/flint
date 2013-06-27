/*
  
  test suite for Flint.Model class

*/

var assert = require('assert');
var lib = require('../service/flint');
var config = require('../flint').config;

// responder and model instance variable
var Responder = new Flint.Responder(config);
var Test;
  
describe('Model', function(){
  
  
  // constructor tests
  describe('constructor', function(){
    
    var attributes = {
        store: 'tests',
        name: 'Good',
        other: 'Value'
    };
    
    it('should throw an error if no store property is specified', function(){
      assert.throws(function(){
          Test = new Flint.Model(Responder);
        }, 
        Error
      );
      
    });
      
    it('should have the attributes passed to the constructor', function(){
      
      Test = new Flint.Model(Responder, attributes);
      assert.equal(Test.get('name'),'Good');
      assert.equal(Test.get('other'),'Value');
      
    })
    
    
    it('should be devoid of old attributes after reconstruction', function(){
      
      Test = new Flint.Model(Responder, {store:'tests'});
      assert.equal(Test.get('name'), undefined);
      
      
    });
    
  });
  
  describe('manipulation and storage', function(){  
    
    var attributes = {
        store: 'tests',
        name: 'Good',
        other: 'Value'
    };
    
    // set method
    it('should have the attributes passed to set for object or other', function(){
      
      Test = new Flint.Model(Responder, {store:'tests'});
      Test.set(attributes);
      assert.equal(Test.get('name'),'Good');
      assert.equal(Test.get('other'),'Value');
      
      Test.set('other','Changed');
      assert.equal(Test.get('other'),'Changed');
      
    })
    
    // database crud operations
    it('should save the model attributes to the database record', function(done){
      
      Test = new Flint.Model(Responder, {store:'tests'});
      Test.set('optional','test value');
      Test.save(attributes, function(err, res){
        
        assert.equal(Test.get('name'), 'Good');
        assert.ok(Test.get('id'));
        done();
        
      });
      
    });
    
    it('should read the model back from database', function(done){
      
      Test.read(Test.get('id'), function(err, res){
        
        assert.equal(Test.get('name'), 'Good');
        assert.equal(Test.get('other'), 'Value');
        done();
        
      });
      
    });
    
    it('should delete the model from the database', function(done){
      
      assert.doesNotThrow(function(){
        Test.destroy(Test.get('id'), function(err, res){
            done();
        });
        
      }, Error);
      
    });
    
  });
  
  
})

