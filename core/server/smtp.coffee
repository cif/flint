
# contains a single method notify that sends notifications via SMTP

class Smtp extends Flint.Responder
  
  notify: (data, file, callback) =>
    
    # setup smtp from config
    smtp = @require 'emailjs'
    
    server = smtp.server.connect 
      host: data.config.mail_host
      user: data.config.mail_username
      password: data.config.mail_password
      port: data.config.mail_port
      ssl: data.config.mail_ssl
      
    # require the notification template 
    fs = require 'fs'
    path = require 'path'
    ent = @require 'ent'
    hbs = @require 'hbs'
    
    content = fs.readFileSync(path.resolve(data.config.base + 'app/views/' + file), 'utf8')
    template = hbs.handlebars.compile(content)
    content = template(data)
    decoded = ent.decode(content)
    
    
    
      
  
  
  
  