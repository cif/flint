

class Objects extends Flint.Responder
  
  api: true
  
  mail_testing: (data, credentials, callback) =>

  	options =
      to: 'Ben Ipsen <email@benipsen.com>'
      subject: 'Testing Notifications'
      field: 'HELLO'
      value: 'WORLD'
	
    @notify 'test.html', options, callback

  
  xml_testing: (data, cookies, callback) =>

    callback null, xml: 'test.xml' , book_title: 'HELLO' 

  testing_patterns: (data, cookies, callback) =>
  
    console.log data
    callback null, 'hello!'
      
  less_than_two: (data, credentials, callback) =>
    
    test = new models.Object @
    
    query =
      where: 
        type:
          '<':'2'
     
     test.find query, callback