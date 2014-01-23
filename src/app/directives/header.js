app.directive('ngHeader', function () {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/header.ng',
		controller: 'HeaderController'
	};
});