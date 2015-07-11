var myApp = angular.module('myApp',[]);
myApp.controller('clientInfo', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/vyraldatabase').success(function(response){
    console.log(response);
    $scope.clients = response;
  });
};
refresh();

  $scope.addClient = function(){
    console.log($scope.user);
    $http.post('/clients', $scope.user).success(function(response){
      console.log(response);
      $scope.clients = "";
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/clients/' + id).success(function(response){
      $scope.clients = "";
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/clients/' + id).success(function (response){
      $scope.clients = response;
    });
  };
  $scope.update = function() {
    console.log($scope.user._id);
    $scope.show = false;
    $http.put('/clients/' + $scope.user._id, $scope.user).success(function(response){
      $scope.clients = "";
      refresh();
    });
  };

  $scope.scrape = function(){
url = $scope.clients.url;

    console.log($scope.clients.url);
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

  	});
};
}]);
