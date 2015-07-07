var gulp = require('gulp');

gulp.task('express', function() {

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('templatelist', ['templatelist']);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/Public'));
});
