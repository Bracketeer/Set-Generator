var myApp = angular.module('myApp',[]);
myApp.controller('emailtemplates', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/templatelist').success(function(response){
    console.log('Content refreshing works');
    $scope.templatelist = response;
    });
  };
  refresh();

  $scope.addTemplate = function(){

    console.log($scope.template);
    $http.post('/templateslist', $scope.template).success(function(response){
      console.log(response);
      refresh();
    });
  };
  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/templatelist/' + id).success(function(response){
      $scope.template = "";
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/templatelist/' + id).success(function (response){
      $scope.template = response;
    });
  };
  $scope.update = function() {
    console.log($scope.template._id);
    $scope.show = false;
    $http.put('/templatelist/' + $scope.template._id, $scope.template).success(function(response){
      $scope.template = "";
      refresh();
    });
  };

}]);
