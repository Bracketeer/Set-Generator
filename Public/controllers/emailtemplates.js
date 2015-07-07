var myApp = angular.module('myApp',[]);
myApp.controller('emailtemplates', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/emailtemplates.html').success(function(response){
    console.log('Content refreshing works');
    $scope.templatelist = response;
    });
  };
  refresh();

  $scope.addTemplate = function(){



    console.log($scope.template);
    $http.post('/templates', $scope.template).success(function(response){
      console.log(response);
      refresh();
    });
  };
  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/vyraldb/' + id).success(function(response){
      $scope.template = "";
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/vyraldb/' + id).success(function (response){
      $scope.template = response;
    });
  };
  $scope.update = function() {
    console.log($scope.template._id);
    $scope.show = false;
    $http.put('/vyraldb/' + $scope.template._id, $scope.template).success(function(response){
      $scope.template = "";
      refresh();
    });
  };

}]);
