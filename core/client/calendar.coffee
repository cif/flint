class Calendar extends Backbone.View
  
  _events:
    'click button.next' : 'next_month'
    'click button.previous' : 'previous_month'
    'click td.day' : 'date_clicked'
    'click .month h3' : 'show_jumpers'
    'change .month select' : 'make_jump'
  
  selected_dates:[]
  focus_date: false
  higlight: 'day'
  
  day_labels:[
    {day:'S'}, 
    {day:'M'}, 
    {day:'T'}, 
    {day:'W'}, 
    {day:'T'}, 
    {day:'F'}, 
    {day:'S'}
  ]
  
  month_labels:[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  
  constructor: (@el='#calendar', @year, @month, @jumpable = true) ->
    @events = _.extend({}, @_events, @events)
    @$el = $(@el)
    @initialize(@year, @month)
    @delegateEvents()
    this
  
  initialize: (@year, @month) ->      
    @date = new Date
    @month = @date.getMonth() unless @month
    @year = @date.getFullYear() unless @year
    @date = @date.getDate()
    
    # set focus date to today
    fm = if (@month+1) < 10 then '0' + (@month+1) else (@month+1)
    fd = if @date < 10 then '0' + @date else @date
    @focus_date = @year + '-' + fm + '-' + fd
    
    @render()
    
    # add  class to today
    $('#' + @focus_date).addClass('fb-today')
  
  #
  # renders using the month() template
  #
  render: (year=false, month=false)  ->
    @year = year if year or year is 0 or year is '0'
    @month = month if month or month is 0 or month is '0'
    data =
      month_name: @month_labels[@month]
      day_labels: @day_labels  
      month: @month
      year: @year 
    
    $(@el).html Handlebars.templates.month(data)
  
  #
  #  set the focus date
  #
  set_focus_date: (@focus_date, date) =>    
    if date
      @date = date
    @month = @date.getMonth()
    @year = @date.getFullYear()
    @render()
    @set_focus_and_highlight()
  
  #
  # sets a focus class for month, week and day views.  
  #
  set_focus_and_highlight: (which = false) =>
    id = $(@el).attr('id')
    $('#'+ id + ' td').removeClass('fb-highlight')
                          .removeClass('fb-focus')
    td_focused = $('#' + id + ' td[data-sql=' + @focus_date + ']')
    focus_parts = @focus_date.split('-')
    focus_month = focus_parts[1]
    @highlight = which if which 
    switch @highlight
      when 'week' then td_focused.parent().children('td').addClass('fb-highlight')
      when 'month' then $('#'+id+' td').addClass('fb-highlight') if focus_month-1 is @month
    
    td_focused.removeClass('fb-highlight')
              .addClass('fb-focus')
  
  #
  #  renders the next month
  #  
  next_month: ->
    if (parseInt(@month) + 1) is 12
      @year++
      @month = 0
    else
      @month++ 
    @render(@year, @month)
    @set_focus_and_highlight()
    @trigger('next', @)
  
  #
  # renders the previous month
  #    
  previous_month: ->  
    if parseInt(@month) is 0
      @year--
      @month = 11
    else
      @month--
    @render(@year, @month)
    @set_focus_and_highlight()
    @trigger('prev', @)
  
  #
  #  renders select menus for jumping
  #
  show_jumpers: =>
    years = [Number(@year)-10...Number(@year)+10]
    html = '<select class="jump-month">'
    for m in [0...11]
      html += '<option value="'+m+'"'
      html += ' selected' if m is Number(@month)
      html += '>' + @month_labels[m] + '</option>'
      
    html += '</select><select class="jump-year">'
    for y in years
      html += '<option value="'+y+'"'
      html += ' selected' if y is Number(@year)
      html += '>' + y + '</option>'
    html += '</select>'  
    $(@el + ' .month h3').html html
    
  #
  #  makes the jump on dropdown changes
  #
  make_jump: =>
    @render $(@el + ' .jump-year').val(), $(@el + ' .jump-month').val() 
    @set_focus_and_highlight()
    @trigger('next', @)
    
  #
  #  handles date click. adds date to selection and triggers select/deslect events
  #  
  date_clicked: (e) ->
    td = $ e.target
    sql_date = td.attr 'data-sql'
    split = sql_date.split '-'
    date = new Date(split[0], (split[1] - 1), split[2])
    @trigger 'clicked', sql_date, date, @selected_dates, e
    if _.indexOf(@selected_dates, date) >= 0
      @selected_dates = _.without(@selected_dates, date)
      @trigger 'deselect', sql_date, date, @selected_dates, e
    else
      @selected_dates.push(date)
      @trigger 'select', sql_date, date, @selected_dates, e
    
    @focus_date = sql_date
    @set_focus_and_highlight()
  