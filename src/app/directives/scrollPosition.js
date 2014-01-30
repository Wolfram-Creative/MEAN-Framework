app.directive('scrollPosition', ['$window', function ($window) {
    return {
        scope: {
            scroll: '=scrollPosition'
        },
        link: function (scope, element, attrs) {
            var $window_element = angular.element($window);
            var handler = function () {
                scope.scroll = $window_element.scrollTop();
            };
            $window_element.on('scroll', scope.$apply.bind(scope, handler));
            handler();
        }
    }; 
}]);