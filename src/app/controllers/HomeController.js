app.controller("HomeController", ['$scope', '$location', 'AuthenticationService','apiCall',	 function($scope, $location, AuthenticationService, apiCall) {
	scope = $scope;
	$scope.search_results = [];
	$scope.logout = function() {
		AuthenticationService.logout();
	};

	$scope.goToEvent = function (e) {
		var event_url = $(e.target).attr('id') || $(e.target).closest('.search_result').attr('id')
		console.log(event_url);
		$location.path('/' + event_url);
	}

	$scope.search = function () {
		var search_obj = {}
		search_obj.event_name = $scope.event_name;
		apiCall.findEvent(search_obj).success(function (s) {
			console.log('success', s);
			$scope.search_results = s;
		}).error(function (e) {
			console.log('error', e)
		})
	}
	
}]); 











