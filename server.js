app.get('/contactlist', function(req, res){

  console.log("I recieved a GET request");

  person1 = {
    name: 'Tim',
    email: 'tim@getvyral.com',
    number:'(402)111-6766'
  };
  person2 = {
    name: 'Tom',
    email: 'tom@getvyral.com',
    number:'(402)222-6766'
  };
  person3 = {
    name: 'Tiff',
    email: 'tiff@getvyral.com',
    number:'(402)333-6766'
  };

  var contactlist = [person1, person2, person3];
  res.json(contactlist);
});
