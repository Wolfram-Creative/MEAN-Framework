app.controller("LoginController", ['$rootScope', '$routeParams', '$scope', '$location', 'apiCall', '_$local', function($rootScope, $routeParams, $scope, $location, apiCall, _$local) {
	'use strict';
	$rootScope.title = 'Log In';
	$scope.root = $rootScope;
	if ($rootScope.logged_in) {
		$location.path('/');
	}

	$scope.loginUser = function() {
		apiCall.logIn($scope.credentials).then(function (response) {
			var data = response.data;
			if (data.success) {
				var user = data.body;
				_$local.set('user', user);
				$rootScope.user = user;
				$rootScope.logged_in = true;
				$location.path('/');
			}
		});
	};
	$scope.createUser = function() {
		apiCall.createUser($scope.new_user).then(function (response) {
			var data = response.data;
			if (data.success) {
				var user = data.body;
				_$local.set('user', user);
				$rootScope.user = user;
				$rootScope.logged_in = true;
				$location.path('/');
			}
		});
	};
}]);