app.controller("LoginController", ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  }
}]);