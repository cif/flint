
class Widgets extends Flint.Controller
  
  routes:
    'widgets' : 'main'
  
  collection: 'Widgets'
  model: 'Widget'
  list: 'WidgetList'
  form: 'WidgetForm'
  
  sortable: true
  sorted_url  : '/widgets/sort'
  
  main: ->

    @fetch (todos) =>
      @list.render 'widgets/list', todos.models
      @form.render 'widgets/form'