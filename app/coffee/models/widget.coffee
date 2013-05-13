
class Widget extends Flint.Model
  
  url:'/widgets'
  store: 'widgets'
  has_many: 
    objects:
      order: 'sort_order ASC'
    animals: null
    
  belongs_to: 'owner'
  has_mutual: 'features'
  
  
  fields:
    'color':
      type:'varchar(255)'
      valid:'not_empty'
    'size': null
    'in_stock': null
    'owner_id':
      type: 'varchar(36)'