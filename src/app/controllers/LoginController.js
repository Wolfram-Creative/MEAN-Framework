app.controller("LoginController", ['$rootScope', '$scope', '$location', 'apiCall', '_$local', function($rootScope, $scope, $location, apiCall, _$local) {
	$rootScope.title = 'Log In';
	$scope.root = $rootScope;
	$scope.login = function() {
		apiCall.login($scope.credentials).then(function (response) {
			console.log(response);
			if (response.success) {
				console.log('success');
				$rootScope.user = response.body;
				$rootScope.logged_in = true;
			}
		});
	}
	$scope.createUser = function() {
		apiCall.createUser($scope.new_user).then(function (response) {
			var data = response.data;
			if (data.success) {
				_$local.set('user', user);
				var user = data.body[0];
				$rootScope.user = user;
				$rootScope.logged_in = true;
				history.back();
			}
		});
	}
}]);