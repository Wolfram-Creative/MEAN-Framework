app.directive('ngFooter', function () {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/footer.ng',
		controller: 'FooterController'
	};
});