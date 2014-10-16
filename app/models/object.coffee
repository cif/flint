
class Object extends Flint.Model
  
  store: 'objects'
  
  fields: [
    { 
      name: 'name'
      type:'varchar(255)' 
    }
    { 
      name: 'type'
      type:'int(1)' 
    }
  ] 