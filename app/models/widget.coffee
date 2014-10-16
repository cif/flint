
class Widget extends Flint.Model
  
  url:'/widgets'
  store: 'widgets'
  
  has_many: 
    objects:
      order: 'sort_order ASC'
        
  belongs_to: 'owner'
  has_mutual: 'features'
  
  
  fields:
    'color':
      type: 'varchar(255)'
      valid:'not_empty'
    'size': 
      type:'varchar(255)'
      valid:
        not_empty: true
        values: ['small','medium','large']
        
    'in_stock': null
    'owner_id':
      type: 'varchar(36)'
    'description':  
      valid:
        not_empty: true
        not: 'bad'
        message: 'Custom description validation message'