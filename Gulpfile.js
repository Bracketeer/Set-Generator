var gulp = require('gulp');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  var mongojs = require('mongojs');
  var db = mongojs('contactlist', ['contactlist']);
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/Public'));

// Request the contact list
  app.get('/contactlist', function(req, res){
    db.contactlist.find(function (err, docs){
      console.log(docs);
      res.json(docs);
    });
  });

// Post to contact list
  app.post('/contactlist', function (req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
      res.json(doc);
    });
  });

//Delete from contact list
  app.delete('/contactlist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    });
  });

//Edit contact list
  app.get('/contactlist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    });
  });

//Update contact list
  app.put('/contactlist/:id', function (req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc){
    res.json(doc);
    });
  });

  app.listen(4000);
});

gulp.task('default', ['express'], function() {

});
