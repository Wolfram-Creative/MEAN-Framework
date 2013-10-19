app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: '/src/app/views/home.ng',
    controller: 'HomeController'
  });
 
  $routeProvider.when('/login', {
    templateUrl: '/src/app/views/login.ng',
    controller: 'LoginController'
  }); 

  $routeProvider.when('/:event', {
    templateUrl: '/src/app/views/event.ng',
    controller: 'EventController'
  });  
 
  $routeProvider.otherwise({ redirectTo: '/' });
}]);