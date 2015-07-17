var app = angular.module('app',["xeditable"]);
app.controller('clientInfo', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/clientlist').success(function(response){
    console.log(response);
    $scope.clientlist = response;
  });
};
refresh();

  $scope.addClient = function(){
    console.log($scope.client);
    $http.post('/clientlist', $scope.client).success(function(response){
      console.log(response);
      $scope.client = "";
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/clientlist/' + id).success(function(response){
      $scope.client = "";
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/clientlist/' + id).success(function (response){
      $scope.client = response;
      console.log(response);
    });
  };
  $scope.update = function() {
    console.log($scope.client._id);
    $scope.show = false;
    $http.put('/clientlist/' + $scope.client._id, $scope.client).success(function(response){
      $scope.client = "";
      refresh();
    });
  };

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
}]);
