var myApp = angular.module('myApp',[]);
myApp.controller('clientInfo', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/contactlist').success(function(response){
    console.log('I got the data I requested');
    $scope.contactlist = response;
  });
};
refresh();
  $scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function(response){
      console.log(response);
      $scope.contact = "";
      refresh();
    });
  };
  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/contactlist/' + id).success(function(response){
      $scope.contact = "";
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/contactlist/' + id).success(function (response){
      $scope.contact = response;
    });
  };
  $scope.update = function() {
    console.log($scope.contact._id);
    $scope.show = false;
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
      $scope.contact = "";
      refresh();
    });
  };

  $scope.scrape = function(){
url = $scope.contact.url;

    console.log($scope.contact.url);
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
