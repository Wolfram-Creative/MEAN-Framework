var app = angular.module("app", ['ngRoute', function() {
	'use strict';	
}]);

app.run(['$rootScope', '_$local', function ($rootScope, _$local) {
	'use strict';
    //Set the App title and User
    var user = _$local.get('user');
    $rootScope.appTitle = "MEAN";

    if (angular.isObject(user) && Object.keys(user).length) {
        $rootScope.user = user;
        $rootScope.logged_in = true;
    }
}]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    'use strict';

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
app.controller("HeaderController", ['$scope', '$rootScope', '$location', 'AuthenticationService','apiCall', '_$local', function($scope, $rootScope, $location, AuthenticationService, apiCall, _$local) {
	'use strict';
	$scope.root = $rootScope;
	$scope.logOut = function() {
		_$local.remove('user');
		$rootScope.user = {};
		$rootScope.logged_in = false;
	};
}]); 



app.controller("HomeController", ['$scope', '$rootScope', '$location', 'AuthenticationService','apiCall', function($scope, $rootScope, $location, AuthenticationService, apiCall) {
	'use strict';
	$scope.root = $rootScope;
	$rootScope.title = 'Welcome';
}]);
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
app.directive('ngHeader', function () {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/header.ng',
		controller: 'HeaderController'
	};
});

app.factory('apiCall', ['$http', function($http) {
	'use strict';
    return {
        createUser: function(obj) {
            return $http.post('/api/users/create/', obj);
        },
        logIn: function(obj) {
            return $http.post('/api/users/log_in/', obj);
        }
    };
}]);
app.factory("AuthenticationService", ['$location', function($location) {
  'use strict';
  return {
    login: function(credentials) {
      if (credentials.username !== "ralph" || credentials.password !== "wiggum") {
        alert("Username must be 'ralph', password must be 'wiggum'");
      } else {
        $location.path('/');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
}]);

app.factory('_$local', [function() {
    'use strict';
    //Handles Local Storage
    return {
        set : function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
            return obj;
        },
        get : function (key) {
            var obj = {};
            if (localStorage.getItem(key) !== 'undefined') {
                obj = JSON.parse(localStorage.getItem(key));
            }
            return obj;
        },
        clear : function () {
            localStorage.clear();
            return this;
        },
        remove : function (key) {
            localStorage.removeItem(key);
            return this;
        }
    };
}]);