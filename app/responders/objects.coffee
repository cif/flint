

class Objects extends Flint.Responder
  
  
  less_than_two: (data, credentials, callback) =>
    
    test = new models.Object @
    
    query =
      where: 
        type:
          '<':'2'
     
     test.find query, callback