app.controller("HomeController", ['$scope', '$rootScope', '$location', 'AuthenticationService','apiCall', function($scope, $rootScope, $location, AuthenticationService, apiCall) {
	'use strict';
	$scope.root = $rootScope;
	$rootScope.title = 'Welcome';
}]);