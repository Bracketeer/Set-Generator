var app = angular.module('app',["xeditable"]);
app.controller('clientInfo', ['$scope', '$filter', '$http', function($scope, $filter, $http){

// Load or refresh the database into the DOM on page initiation
  var refresh = function(){
    $http.get('/clientlist').success(function(data){
    $scope.clientlist = data;
    console.log('Database loaded! :)');
    console.table(data);
  });
};
refresh();
// Remove Client from Database
  $scope.remove = function(id) {
    $scope.show = false;
    $http.delete('/clientlist/' + id).success(function(data){
      refresh();
    });
  };

// Update Client Variables
// TO DO: Whenever a a client profile is updated, it doesn't overwrite the current profile, it makes an entire new one and, therefore, keeps the old data as well.
$scope.update = function(data, id) {
  angular.extend(data, {id: id});
  console.log(data);
  return $http.post('/clientlist/', data);
  };

// Add empty input fields to be filled when a new row is added
//TO DO: There is a bug where when a row is added and cancel is hit, the row remains until page refresh. hitting delete on that row wont work until the page is refreshed, too.
  $scope.addClient = function(id) {
    $scope.inserted = {
      name: '',
      email: '',
      phone: '',
      address: ''
    };
    $scope.clientlist.push($scope.inserted);
  };

}]);
