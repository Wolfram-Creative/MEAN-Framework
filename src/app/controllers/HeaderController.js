app.controller("HeaderController", ['$scope', '$rootScope', '$location', 'AuthenticationService','apiCall', '_$local', function($scope, $rootScope, $location, AuthenticationService, apiCall, _$local) {
	'use strict';
	$scope.root = $rootScope;
	$scope.logOut = function() {
		_$local.remove('user');
		$rootScope.user = {};
		$rootScope.logged_in = false;
	};
}]); 


