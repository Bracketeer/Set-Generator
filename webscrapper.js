var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path	= require('path');
var app     = express();
var npres



app.get('/webscrapper', function(req, res){

 url = $scope.scrape;


	request(url, function(error, response, html){

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
		        json.link = link;

	        })

		}

		fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        	console.log(title);
        	console.log(name);
        	console.log(url);
        })

        res.send('<a href="'+ url +'">'+ title +'</a><br /><br />');
        fs.appendFile('emaillist.txt','<a href="'+ url +' target="_blank">'+ title +'</a>', function(err){});

	})

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
