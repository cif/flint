
class Helpers
  
  constructor: ->
    
    # register class methods with handlebars
    Handlebars.registerHelper('eq', @eq)
    Handlebars.registerHelper('check_role', @check_role)
          
    Handlebars.registerHelper('link', @link)
    Handlebars.registerHelper('link_nohref', @link_nohref)
    Handlebars.registerHelper('list', @list)
    Handlebars.registerHelper('filtered_list', @filtered_list)
      
    Handlebars.registerHelper('input', @input)
    Handlebars.registerHelper('text_field', @text_field)
    Handlebars.registerHelper('password', @password)
    Handlebars.registerHelper('select', @select)
    Handlebars.registerHelper('select_range', @select_range)
    Handlebars.registerHelper('radio', @radio)
    Handlebars.registerHelper('checkbox', @checkbox)
    Handlebars.registerHelper('text_area', @text_area)
    
    
    Handlebars.registerHelper('month_grid', @month_grid)
    Handlebars.registerHelper('date_today', @date_today)
    Handlebars.registerHelper('sql_to_slash', @sql_to_slash)
    
    Handlebars.registerHelper('dollar', @dollar)
    Handlebars.registerHelper('random', @random)
    Handlebars.registerHelper('sum', @sum)
    Handlebars.registerHelper('truncate', @truncate)
    Handlebars.registerHelper('repeater', @repeater)
    
    @initialize()
    
    this
  
  # overriden by super, usually.
  initialize: =>
      
  delay: (ms, func) =>
    @timer = setTimeout func, ms
    @timer
    
  loader: (selector) ->
    $(selector).html('<p class="loader"><em class="one">&nbsp;</em><em class="two">&nbsp;</em><em class="three">&nbsp;</em><em class="four">&nbsp;</em></p>')
    $('.loader').css({opacity:1})
    $(selector)
              
  
  # ___________ view helpers registered with handlebars ___________  
  
  eq: (value, test, options) ->
    if value is test
      return options.fn(this)
    else
      return options.inverse(this)
  
  check_role: (user_or_role, required_roles, options) ->
    role = if user_or_role.get then user_or_role.get('role') else user_or_role
    has_role = required_roles.indexOf(role) >= 0
    if has_role
      if options
        return options.fn(this)
      else
        return true
    else
      if options
        return options.inverse(this)
    false
  
  # form helpers
  link: (href, text, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    )
    new Handlebars.SafeString('<a href="'+href+'" ' + attrs.join(' ') + '>' + text + '</a>')
    
  link_nohref: (text, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    )
    new Handlebars.SafeString('<a href="javascript:void(0)" ' + attrs.join(' ') + '>' + text + '</a>')
  
  list: (context, zero_length_message, block) ->
    out = []
    _.each(context, (model) ->
      context = if model.attributes then model.attributes else model
      out.push(block(context))
    )
    out = if out.length > 0 then out.join('') else zero_length_message
    new Handlebars.SafeString(out) 
  
  filtered_list: (context, filter, value, zero_length_message, block) ->
    out = []
    values = value.split(',')

    _.each(context, (model) ->
      val = model.get(filter)
      pass = false
      _.each(values, (test) ->
          if val is test
            pass = true
      )
      out.push(block(model.attributes)) if pass
    )
    out = if out.length > 0 then out.join('') else zero_length_message
    new Handlebars.SafeString(out) 
  
  # ___________ form field helpers ___________
  text_field: (model, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    value = if model and model.get and model.get(field) then model.get(field) else ''
    new Handlebars.SafeString('<input type="text" name="'+field+'" value="'+value+'" ' + attrs.join(' ') + '/>')
    
  input: (model, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    value = if model and model.get and model.get(field) then model.get(field) else ''
    new Handlebars.SafeString('<input name="'+field+'" value="'+value+'" ' + attrs.join(' ') + '/>')
  
  password: (model, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    password = '<input type="password" name="'+field+'" value="" ' + attrs.join(' ') + '/>'
    new Handlebars.SafeString(password)
    
  select: (model, field, options, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes

    selected = if model and model.get and model.get(field) then model.get(field) else false
    opts = []
    _.each(options, (option) -> 
      value = if _.isArray(option) then option[0]  else option
      text = if _.isArray(option) then option[1] else option
      optstr = '<option '
      if value is selected
        optstr += 'selected '
      optstr += 'value="'+value+'">' + text + '</option>'  
      opts.push(optstr)  
    )
    new Handlebars.SafeString('<select name="'+field+'" ' + attrs.join(' ') + '>' + opts.join('') + '</select>')
  
  select_range: (model, min, max, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    
    selected = model.get(field)
    opts = []
    for value in [min...max+1]
      optstr = '<option '
      if value is selected
        optstr += 'selected '
      optstr += 'value="'+value+'">' + value + '</option>'  
      opts.push(optstr)  
    new Handlebars.SafeString('<select name="'+field+'" ' + attrs.join(' ') + '>' + opts.join('') + '</select>')
          
  radio_group: (model, field, options) ->  
    selected = model.get(field)
    opts = []
    _.each(options, (option) -> 
      value = if _.isArray(option) then option[0]  else option
      text = if _.isArray(option) then option[1] else option
      optstr = '<p class="radio"><input type="radio" name="'+field+'" value="'+value+'"'
      if value is selected
        optstr += ' checked="true"'
      optstr += ' /><label>' + text + '</label></p>'  
      opts.push(optstr)  
    )
    new Handlebars.SafeString('<div class="radios">' + opts.join('') + '</div>')
  
  checkbox: (model, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    checked = if model and model.get and model.get(field) > 0 then 'checked="true" ' else ''
    new Handlebars.SafeString('<input type="checkbox" name="'+field+'" value="1" ' + checked + attrs.join(' ') + '/>')
  
  text_area: (model, field, attributes) ->
    attrs = []
    _.map(attributes.hash, (value, key) -> 
      attrs.push key + '="' + value + '"'
    ) if attributes
    value = if model and model.get then model.get(field) else ''
    new Handlebars.SafeString('<textarea name="'+field+'" ' + attrs.join(' ') + '>'+value+'</textarea>')
  
  
  # ___________ cookie function ___________
  
 
	  

    
    
  # ___________ date helpers ___________
  month_grid: (month, year) ->
        
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    length = days_in_month[month]
    starts = new Date(year, month, 1).getDay()
      
    #leap year
    if month is 1
      length = 29 unless (year % 4 is 0 and year % 100 is not 0) or year % 400 is 0
      
    html = ''
    index = 1 - starts
    for i in [0..5]
      html += '<tr>'
      for j in [0..6]
        
        date = new Date(year, month, index)
        day = date.getDate()
        _month = date.getMonth()
        _year = date.getFullYear()
        off_month = if index < 1 or index > length then ' off-month' else ''
        id_day = if day < 10 then '0' + day else day 
        id_month = if (_month+1) < 10 then '0' + (_month+1) else (_month+1) 
        html += '<td data-dow="'+j+'" class="day dow'+j+off_month+'" data-sql="'+_year+'-'+id_month+'-'+id_day+'">'
        
        out = date.getDate()  
        html += date.getDate() + '</td>'
        index++
      html += '</tr>'
    html += '</tr></table>'
    new Handlebars.SafeString(html)
    
  
  date_today: ->
    new Date().getDate()
  
  twenty_four_to_twelve: (time) ->
    parts = time.split(':')
    hr = parts[0]
    if hr.substr(0,1) is '0'
      hr = parseInt(hr.substr(1,1))
    min = parts[1]
    mer = 'am'
    if hr >= 12
      mer = 'pm'
      if hr > 12
        hr -= 12
    hr + ':' + min + ' ' + mer
    
  jsdate_to_sql: (date) ->
    month = date.getMonth()+1
    day = date.getDate()
    if month < 10
      month = '0' + month
    if day < 10
      day = '0' + day 
      
    date.getFullYear() + '-' + month + '-' + day
    
  sqldate_to_js: (sql) ->
    if !sql
      return false
    sp = sql.split('-')
    if !sp[1] or !sp[2]
      return false
    if sp[2].indexOf(' ') >= 0
      sp[2] = sp[2].substr(0, sp[2].indexOf(' '))
    new Date(sp[0], sp[1]-1, sp[2])
  
  sql_to_slash: (sql) =>
    if !sql or sql is '0000-00-00' or sql is '' 
      return ''
    if sql.indexOf('/') > 0
      return sql  
    js = @sqldate_to_js(sql)
    if !js
      return ''
    m = (js.getMonth() + 1)
    d = js.getDate()
    y = js.getFullYear()
    m + '/' + d + '/' + y
  
  # ___________ miscelaneous formatting helpers ___________
  
  dollar: (n, decimals = 2, decimal_separator = ".", thousands_separator = ",", show_decimals=true) ->
    c = if isNaN(decimals) then 2 else Math.abs decimals
    sign = if n < 0 then "-" else ""
    i = parseInt(n = Math.abs(n).toFixed(c)) + ''
    j = if (j = i.length) > 3 then j % 3 else 0
    x = if j then i.substr(0, j) + thousands_separator else ''
    y = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_separator)
    z = if c and show_decimals then decimal_separator + Math.abs(n - i).toFixed(c).slice(2) else ''
    sign + x + y + z
  
  repeater: (x, y, block) ->
    min = parseInt(x)
    max = parseInt(y) + 1
    out = []
    for num in [min...max]
      this.num = num
      out.push block.fn(this)
    new Handlebars.SafeString(out.join(''))
  
  sum: ->
    sum = 0
    _.each arguments, (arg) =>
      sum += parseFloat arg
    sum  
  
  truncate: (str, length) ->
    if str.length > length
      return str.substr(0, length) + '...'
    else
      return str
  
  random: ->
    Math.random() * 1000
  