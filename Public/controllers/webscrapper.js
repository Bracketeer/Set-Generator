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
