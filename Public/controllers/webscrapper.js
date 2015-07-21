angular.module('scrape', ['ngRoute', 'ngCsvImport']);

app.controller('MainCtrl', function ($scope) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
  });

app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();

				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

app.controller('webscrapper', ['$scope', '$http', function($scope, $http){

$scope.scrape = function(url) {
  console.log("Found scrape");
  $http.post('clientlist/', url).success(function(data){
    $scope.url = data;
    console.log("pushed url to list" + data);
  });

    $http.get('/scrape').success(function(data){
      $scope.clientlist = scrape;
      console.log("IT WORKED");
      console.log(data);
    })

    };
}

]);
