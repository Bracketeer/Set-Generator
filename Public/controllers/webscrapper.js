    var app = angular.module('emailScrape', ['ngRoute']);
myApp.controller('webscrapper', ['$scope', '$http', function($scope, $http){

  var scrape = function(){
    $http.get('/webscrapper').success(function(response){
    console.log('I got the data I requested');
    $scope.scrape = response;
  });
};
refresh();
});
//Web Scrapping function that I might get working someday

//   $scope.scrape = function(){
// url = $scope.client.url;
//
//     console.log($scope.client.url);
//     request(url, function(error, response, html){
//
//   		if(!error){
//
//   			var title, name, link;
//   			var json = { title : "", name : "", link : ""};
//
//   			$('.headline').filter(function(){
//   		        var data = $(this);
//   		        title = data.text();
//   		        json.title = title;
//               })
//
//   			$('.container').filter(function(){
//   		        var data = $(this);
//   		        name = data.find().last().text();
//   		        json.name = name;
//   		        json.link = link;
//   	        })
//   		}
//
//   		fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
//           	console.log('File successfully written! - Check your project directory for the output.json file');
//           	console.log(title);
//           	console.log(name);
//           	console.log(url);
//           })
//
//           res.send('<a href="'+ url +'">'+ title +'</a><br /><br />');
//           fs.appendFile('emaillist.txt','<a href="'+ url +' target="_blank">'+ title +'</a>', function(err){});
//
//   	});
// };
