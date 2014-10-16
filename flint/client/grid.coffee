
# Flint.Grid - similar to Flint.List 
#
#   * Handles common CRUD related events and triggers them (create,read,update,delete)
#
#   * Implements a quicksort routine for tables fired by th.sortable DOM elements

class Grid extends Backbone.View
  
  _events:
    
    # common UI events
    'click tr td,.edit' : 'edit'
    'click th.sortable' : 'sort'
    'click .delete' : 'delete'
    'click .create' : 'create'
    'click .view' : 'read'
  
  
  #
  #  initialize just extends the events automatically, careful to do this if you extend this class method!
  #
  initialize: (options) ->
    @events = _.extend({}, @_events, @events)
    this
  
  
  render: (template, data, headings) ->
    
    @template = template if template
    @headings = headings if headings
    @data = data if data
    
    @before()
     
    # default data is simply the collection models as template variable 'items'. 
    # if the collection needs to be marshaled more than once (particuarly sorted) 
    # you should do so in a custom before() method 
    if !@data
      @data = 
        items: @collection.models
    
    @data.headings = @headings  
    if @template
      $(@el).html tmpl[@template](@data)
    else if console and console.log
      console.log('WARNING Flint.Grid: @template is undefined, unable to render view.')
    
    @trigger 'rendered', @
    @after()
    this  
    
  #
  #  pre, post render
  #  
  before: ->  
  after: ->
  
  #
  #  crud, cred in this case ;-)
  #    
  create: ->
    @trigger 'create'
  
  read: (e) ->
    # bubble up the target parents until we find an id
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
      
    @trigger 'read', id
      
  edit: (e) ->
    # bubble up the target parents until we find an id
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
      
    @trigger 'edit', id
    
  delete: (e) ->
    # bubble up the target parents until we find an id
    e.stopPropagation()
    target = $(e.target)
    id = target.attr 'id'
    while _.isUndefined id
      target = target.parent()
      id = target.attr 'id'
     
    model = @collection.get(id)
    @collection.remove(model)
    false
      
  # grid view sorting by sortable columns.  
  # sorting is done via simple quicksort
  sort: (e) =>
    
    # get the table we are sorting
    table_root = e.target
    while table_root.tagName != 'TABLE'
      table_root = table_root.parentNode
      
    # determine the direction and column to sort on   
    index = $('tr th').index(e.target)
    heading = e.target
    @sort_data_type = $(e.target).attr('data-type')
    if !@sorting_dir 
      @sorting_dir = 1

    if heading is @heading
      @sorting_dir *= -1

    @heading = e.target
    $('tr th').css 'font-weight','300'
    $('tr th span').remove()
    arrow = if @sorting_dir is -1 then '<span>&uarr;&nbsp;</span>' else '<span>&darr;&nbsp;</span>'
    $(e.target).css 'font-weight','bold'
    $(e.target).html arrow + $(e.target).html()
    
    @sort_index = index
    
    # read all the table rows into an array
    trs = table_root.getElementsByTagName('tr')
    items = []
    tr = 1
    while tr < trs.length
      items.push trs[tr]
      tr++
    
    # quicksort rows based on @sort_index
    for tr in items
      $(tr).remove()
    @quicksort(items, 0, items.length)
    for tr in items
      $(table_root).append(tr)
    
    
  partition: (items, begin, end, pivot) =>
    pivot_val = items[pivot]
    @swap(items, pivot, end-1)
    store = begin
    for i in [begin...(end-1)]
        if @compare(items[i],pivot_val)
          @swap(items, store, i)
          store++
    @swap(items, end-1, store)
    store      
          
  compare: (a, b, type = false) =>
      
      a = $(a.getElementsByTagName('td')[@sort_index]).html() 
      b = $(b.getElementsByTagName('td')[@sort_index]).html()
      
      if @sort_data_type
        if @sort_data_type is 'date'
          
          if a.indexOf('-') > 0
            a = a.substring(0, a.indexOf(' -'))
          if b.indexOf('-') > 0
            b = b.substring(0, b.indexOf(' -'))  
          
          a = moment(a)
          b = moment(b)
          if isNaN(a.toDate().getTime())
            a = moment(0)
          if isNaN(b.toDate().getTime())
            b = moment(0)
            
        if @sort_data_type is 'number'
          a = parseFloat a.replace(/[A-Za-z$,]/g, '')
          b = parseFloat b.replace(/[A-Za-z$,]/g, '')
          if isNaN(a)
            a = 0
          if isNaN(b)
            b = 0
          
      if @sorting_dir is 1
        return a < b 
      else
        return a > b
  
  swap: (array, a, b) =>
    tmp = array[a]
    array[a] = array[b]
    array[b] = tmp
    return array
  
  quicksort: (items, begin, end) =>
    if (end-1) > begin
      pivot = begin + Math.floor(Math.random()*(end-begin))
      pivot = @partition(items, begin, end, pivot)
      @quicksort(items, begin, pivot)
      @quicksort(items, pivot+1, end)
    
  