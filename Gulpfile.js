var gulp = require('gulp');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  var fs = require('fs');
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/clientlist');
  var mongojs = require('mongojs');
  var db = mongojs('clientlist', ['clientlist']);
  var bodyParser = require('body-parser');
  var request = require('request');
  var cheerio = require('cheerio');
  var path	= require('path');

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

//webscrapper
// app.post('/clientlist', function (req, res){
//   var url = req.params.url;
//   console.log(req.body);
//   db.clientlist.insert(req.body, function(err, doc){
//     res.json(doc);
//   });
// });
// app.get('/clientlist', function(req, res){
// url = req.params.url;
// db.clientlist.insert(req.body, function(err, doc){
//   res.json(doc);
// });
app.get('/scrape', function(req, res){

url = [{'url':'http://p0.vresp.com/QDrEhK'},
'http://p0.vresp.com/StxOiT',
'http://p0.vresp.com/S6GWpc',
'http://p0.vresp.com/wyzw3V',
'http://p0.vresp.com/7iKmoB',
'http://p0.vresp.com/cS9fdu',
'http://p0.vresp.com/algKnq',
'http://p0.vresp.com/AAE3fc',
'http://p0.vresp.com/TuSne9',
'http://p0.vresp.com/KPTglD',
'http://p0.vresp.com/rbuhmc',
'http://p0.vresp.com/F1KZ3c',
'http://p0.vresp.com/5wYGwE',
'http://p0.vresp.com/EYLBJf',
'http://p0.vresp.com/aMaLaN',
'http://p0.vresp.com/PibwYP',
'http://p0.vresp.com/x9ilhB',
'http://p0.vresp.com/0tfWcX',
'http://p0.vresp.com/f63dxZ',
'http://p0.vresp.com/urCKWn',
'http://p0.vresp.com/H3Tn6Y',
'http://p0.vresp.com/INaoZV',
'http://p0.vresp.com/Yx1GD9',
'http://p0.vresp.com/zggwYq',
'http://p0.vresp.com/0Vyz7A',
'http://p0.vresp.com/5U4LiP',
'http://p0.vresp.com/RQPyLJ',
'http://p0.vresp.com/x6PAi0',
'http://p0.vresp.com/ig0LaF',
'http://p0.vresp.com/StxOiT',
'http://p0.vresp.com/2l1VXh',
'http://p0.vresp.com/QKAzaN',
'http://p0.vresp.com/kv3sZJ',
'http://p0.vresp.com/WEH4gb',
'http://p0.vresp.com/ah94zQ',
'http://p0.vresp.com/peApTw',
'http://p0.vresp.com/fs8xmE',
'http://p0.vresp.com/WShLlJ',
'http://p0.vresp.com/Oi7v0T',
'http://p0.vresp.com/4iiTug',
'http://p0.vresp.com/c5HSRs',
'http://p0.vresp.com/PJnREh'];


for (var i = 0; i < url.length; i++) {

request(url[i], function(error, response, html){

  if(!error){


    var title, name, link;
    var json = { title : "", name : "", link : ""};

    $('.headline').filter(function(){
          var data = $(this);
          title = data.text();

          json.title = title;

        })

    $('.container').filter(function(){
          var data = $(this);
          name = data.find().last().text();

          json.name = name;
          json.link = url[i];

        })

  }

  fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
        console.log(title);
        console.log(name);
        console.log(url[i]);
      })

      res.send('<a href="'+ url[i] +'">'+ title +'</a><br /><br />');
      fs.appendFile('emaillist.txt','<a href="'+ url[i] +' target="_blank">'+ title +'</a>', function(err){});

})
};
})
exports = module.exports = app;
//end of scrapper
  app.listen(4000);

});

gulp.task('default', ['express'], function() {

});
