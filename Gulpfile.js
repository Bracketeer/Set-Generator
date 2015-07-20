var gulp = require('gulp');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/clientlist');
  var mongojs = require('mongojs');
  var db = mongojs('clientlist', ['clientlist']);
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/Public'));

// Request the client list
  app.get('/clientlist', function(req, res){
    db.clientlist.find(function (err, docs){
      console.log(docs);
      res.json(docs);
    });
  });

// Post to client list
  app.post('/clientlist', function (req, res){
    var id = req.params.id;
    console.log(req.body);
    db.clientlist.insert(req.body, function(err, doc){
      res.json(doc);
    });
  });

//Delete from client list
  app.delete('/clientlist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.clientlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    });
  });

//Edit client list
  app.get('/clientlist/:id', function (req, res){
    var id = req.params.id;
    console.log(id);
    db.clientlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    });
  });

//Update client list
  app.put('/clientlist/:id', function (req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.clientlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address}},
    new: true}, function (err, doc){
    res.json(doc);
    });
  });

  app.listen(4000);
});

gulp.task('default', ['express'], function() {

});
