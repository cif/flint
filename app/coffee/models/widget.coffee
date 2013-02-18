
class Widget extends Flint.Model
  
  store: 'widgets'
  
  defaults:
    color: 'red'
    size: 'large'
    in_stock: 1
    price: 5.50
    
  methods: =>
    console.log 'not working?'  
     