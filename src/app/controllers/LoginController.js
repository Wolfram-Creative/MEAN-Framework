app.controller("LoginController", ['$scope', '$location', 'apiCall', function($scope, $location, apiCall) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    apiCall.login($scope.credentials);
  }
  $scope.createUser = function() {
    apiCall.createUser($scope.credentials);
  }
}]);