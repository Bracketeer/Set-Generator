var myApp = angular.module('myApp',["xeditable"]);
myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

myApp.controller('EditableRowCtrl', function($scope, $filter, $http) {

  var refresh = function(){
    $http.get('/client').success(function(response){
    console.log(response);
    $scope.vyraldatabase = response;
  });
  };
console.log(refresh);
  $scope.users = refresh;

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('/user').success(function(data) {
        $scope.groups = data;
      });
    };

  $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('/user').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.post('/user', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  });
