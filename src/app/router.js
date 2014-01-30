app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: '/src/app/views/home.ng',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: '/src/app/views/login.ng',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: '/src/app/views/register.ng',
            controller: 'LoginController'
        })


    $routeProvider.otherwise({ redirectTo: '/' });
}]);