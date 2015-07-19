var app = angular.module('app',["xeditable"]);
app.controller('clientInfo', ['$scope', '$http', function($scope, $http){

//Xeditable controller code
$scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
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
    return $http.post('/saveUser', data);
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
  //


//Load Clientlist into DOM
// $scope.clients = [];
// $scope.loadClients = function(){
//   return $scope.clients.length ? null : $http.get('/clientlist').success(function(data) {
//       $scope.clients = data;
//       console.log('This is the scope client data:' + data);
//     });
// };
// $scope.loadClients();
// console.log('This is the scope client data:' + $scope.clients);
//

// Working Clientlist load script

  var refresh = function(){
    $http.get('/clientlist').success(function(data){
    console.log(data);
    $scope.clientlist = data;
  });
};
refresh();



  // $scope.addClient = function(){
  //   console.log($scope.client);
  //   $http.post('/clientlist', $scope.client).success(function(data){
  //     console.log(data);
  //     $scope.client = "";
  //     refresh();
  //     // $scope.loadClients();
  //   });
  // };

  // //Remove Client Script
  // $scope.remove = function(index) {
  //   console.log(index);
  //   $scope.client.splice( $scope.client.indexOf(client), 1 );
  //   // $http.delete('/clientlist/' + id).success(function(data){
  //   //   console.log($scope.remove);
  //   // });
  // };

  // Working Remove Client Script

  $scope.remove = function(id) {
    console.log(id);
    $scope.show = false;
    $http.delete('/clientlist/' + id).success(function(data){
      $scope.client = "";
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $scope.show = true;
    $http.get('/clientlist/' + id).success(function (response){
      $scope.client = response;
      console.log(data);
    });
  };

  $scope.update = function(data, id) {
    angular.extend(data, {id: id});
    return $http.post('/clientlist/', data);
    console.log(data, id);
    };

    $scope.show = function(id) {
      console.log(id);
      $scope.show = true;
      $http.get('/clientlist/' + id).success(function (response){
        $scope.client = response;
        console.log(data);
      });
    };
    // $http.put('/clientlist/' + $scope.client._id, $scope.client).success(function(response){
    //   $scope.client = "";

    // });
  //};

  $scope.addClient = function() {
    $scope.inserted = {
      id: $scope.clientlist.length+1,
      name: '',
      email: '',
      phone: '',
      address: ''
    };
    $scope.clientlist.push($scope.inserted);
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
