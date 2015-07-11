var gulp = require('gulp');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  var mongojs = require('mongojs');
  var db = mongojs('templatelist', ['templatelist']);
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/Public'));

app.get('/', function(req, res){
  db.templatelist.find(function (err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.listen(4000);
});

gulp.task('default', ['express'], function() {

});
