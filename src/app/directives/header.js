app.directive('ngHeader', function () {
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/header.ng',
		controller: 'HeaderController'
	};
});