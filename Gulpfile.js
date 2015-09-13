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
  app.get('/scrape', function(req, res){

var url =
  [
    'http://p0.vresp.com/Zk7hjz',
'http://p0.vresp.com/x988DV',
'http://p0.vresp.com/Od6Z7J',
'http://p0.vresp.com/R6dajN',
'http://p0.vresp.com/VAITEZ',
'http://p0.vresp.com/jAlEMv',
'http://p0.vresp.com/mHYrVV',
'http://p0.vresp.com/rN0TF5',
'http://p0.vresp.com/CQ0O0H',
'http://p0.vresp.com/aNjK0r',
'http://p0.vresp.com/wSJ5zj',
'http://p0.vresp.com/YwBiou',
'http://p0.vresp.com/PSd5mv',
'http://p0.vresp.com/OQzcmd',
'http://p0.vresp.com/uEvb7P',
'http://p0.vresp.com/W9kiBN',
'http://p0.vresp.com/QfvR0o',
'http://p0.vresp.com/e2LM6R',
'http://p0.vresp.com/G5oclY',
'http://p0.vresp.com/jorgcK',
'http://p0.vresp.com/lluG7o',
'http://p0.vresp.com/r5Dm10',
'http://p0.vresp.com/iExXvl',
'http://p0.vresp.com/EnNyRH',
'http://p0.vresp.com/sybXlX',
'http://p0.vresp.com/uPSoMe',
'http://p0.vresp.com/UTIgPv',
'http://p0.vresp.com/sz8Bxu',
'http://p0.vresp.com/KmkKvm',
'http://p0.vresp.com/tyk0Ge',
'http://p0.vresp.com/1pKu3D',
'http://p0.vresp.com/5bzClq',
'http://p0.vresp.com/TNjsrX',
'http://p0.vresp.com/WIyEF5',
'http://p0.vresp.com/pGhKui',
'http://p0.vresp.com/Nm4TA3',
'http://p0.vresp.com/2Sck4s',
'http://p0.vresp.com/XsVlov'];


url.forEach(runScrapper);

function runScrapper(url){

  request(url, function(error, response, html){

// console.log(url);
console.log(html.length);

   var $ = cheerio.load(html);
    if(!error){
      var title, name, link;
      var json = { title : "", name : "", link : ""};

      $('#title').filter(function(){
            var data = $(this);
            title = data.text();

            json.title = title;
          })

      $('#client-name').filter(function(){
            var data = $(this);
            name = data.text();
            json.name = name;
          })
          json.link = url;
    }

    fs.appendFile('Public/emaillist.html', name +' - <a href="'+ url +'" target="_blank">"'+ title +'"</a><br><br>' + '\n', function(err){});

    fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
          console.log(title);
          console.log(name);
          console.log(url);
        })

      });
    };
})
  exports = module.exports = app;
  //end of scrapper
  app.listen(4000);

});

gulp.task('default', ['express'], function() {

});
