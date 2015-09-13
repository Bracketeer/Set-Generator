var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path	= require('path');
var app     = express();
var mongojs = require('mongojs');
var db = mongoj



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

url = 'http://p0.vresp.com/CgSoyP';

// {'http://p0.vresp.com/QDrEhK',
// 'http://p0.vresp.com/StxOiT',
// 'http://p0.vresp.com/S6GWpc',
// 'http://p0.vresp.com/wyzw3V',
// 'http://p0.vresp.com/7iKmoB',
// 'http://p0.vresp.com/cS9fdu',
// 'http://p0.vresp.com/algKnq',
// 'http://p0.vresp.com/AAE3fc',
// 'http://p0.vresp.com/TuSne9',
// 'http://p0.vresp.com/KPTglD',
// 'http://p0.vresp.com/rbuhmc',
// 'http://p0.vresp.com/F1KZ3c',
// 'http://p0.vresp.com/5wYGwE',
// 'http://p0.vresp.com/EYLBJf',
// 'http://p0.vresp.com/aMaLaN',
// 'http://p0.vresp.com/PibwYP',
// 'http://p0.vresp.com/x9ilhB',
// 'http://p0.vresp.com/0tfWcX',
// 'http://p0.vresp.com/f63dxZ',
// 'http://p0.vresp.com/urCKWn',
// 'http://p0.vresp.com/H3Tn6Y',
// 'http://p0.vresp.com/INaoZV',
// 'http://p0.vresp.com/Yx1GD9',
// 'http://p0.vresp.com/zggwYq',
// 'http://p0.vresp.com/0Vyz7A',
// 'http://p0.vresp.com/5U4LiP',
// 'http://p0.vresp.com/RQPyLJ',
// 'http://p0.vresp.com/x6PAi0',
// 'http://p0.vresp.com/ig0LaF',
// 'http://p0.vresp.com/StxOiT',
// 'http://p0.vresp.com/2l1VXh',
// 'http://p0.vresp.com/QKAzaN',
// 'http://p0.vresp.com/kv3sZJ',
// 'http://p0.vresp.com/WEH4gb',
// 'http://p0.vresp.com/ah94zQ',
// 'http://p0.vresp.com/peApTw',
// 'http://p0.vresp.com/fs8xmE',
// 'http://p0.vresp.com/WShLlJ',
// 'http://p0.vresp.com/Oi7v0T',
// 'http://p0.vresp.com/4iiTug',
// 'http://p0.vresp.com/c5HSRs',
// 'http://p0.vresp.com/PJnREh',
// 'http://p0.vresp.com/CgSoyP'};

exports.request(url, function(error, response, html){

(url).forEach(console.log(url));
request(url, function(error, response, html){

var $ = cheerio.load(url);

  if(!error){


    var title, name, link;
    var json = { title : "", name : "", link : ""};

    $('#title').filter(function(){
          var data = $(this);
          title = data.find().last().text();

          json.title = title;

        })

    $('.container').filter(function(){
          var data = $(this);
          name = data.find().last().text();

          json.name = name;
          json.link = url;

        })
        WriteDoc();
  }
})

function WriteDoc{
fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
      console.log(title);
      console.log(name);
      console.log(url);
    })

    res.send('<a href="'+ url +'">'+ title +'</a><br /><br />');
    fs.appendFile('emaillist.txt','<a href="'+ url +' target="_blank">'+ title +'</a>', function(err){});
  }
})
})
exports = module.exports = app;
//end of scrapper
