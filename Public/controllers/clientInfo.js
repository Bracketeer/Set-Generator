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

}]);
