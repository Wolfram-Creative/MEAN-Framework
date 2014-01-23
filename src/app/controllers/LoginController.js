app.controller("LoginController", ['$rootScope', '$scope', '$location', 'apiCall', '_$local', function($rootScope, $scope, $location, apiCall, _$local) {
	'use strict';
	$rootScope.title = 'Log In';
	$scope.root = $rootScope;
	$scope.logIn = function() {
		apiCall.login($scope.credentials).then(function (response) {
			console.log(response);
			if (response.success) {
				console.log('success');
				$rootScope.user = response.body;
				$rootScope.logged_in = true;
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
				history.back();
			}
		});
	};
}]);