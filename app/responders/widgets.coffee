
class Widgets extends Flint.Responder
  
  get: (data, credentials) =>
    
    response =
      test : 'fuck yeah'
      word : 'bird'  
    response
    
  some_other_method: (data, credentials) =>
    
    response =
      test : 'fuck yeah RIGHT!'
      word : 'bird.........'
      rad: 'holy shit ben!'  
    response
        