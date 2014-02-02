var app = angular.module("app", ['ngRoute', function() {
	'use strict';	
}]);

//Use _Object.keys instead of Object.keys because it's new for ES5+ Older browsers will not recognize Object.keys()
function __Object() {
	this.keys = function (obj) {
		var key_list = [];
		if (typeof obj !== 'undefined' && obj !== null && typeof obj === 'object') {
			if (typeof obj.length === 'undefined') {
				for (var key in obj) {
					key_list.push(key);
				}
			} else if (typeof obj.length === 'number') {
				key_list = obj.slice();
			}
		}
		if (typeof obj !== 'object') {
			console.warn(obj + ' Is not an object, it is a ' + typeof obj);
		}
		return key_list;
	};
}
var _Object = new __Object();

app.run(['$rootScope', '$http', 'apiCall', '_$local', function ($rootScope, $http, apiCall, _$local) {
	'use strict';

	//Set the App title and User
	var user = _$local.get('user');

	$rootScope.appTitle = "MEAN";
	$rootScope
		.$on('$locationChangeStart', function(ev, next, current) {
			$('html').scrollTop(0);
		});

    if (angular.isObject(user) && _Object.keys(user).length) {
        $rootScope.user = user;
        $rootScope.logged_in = true;
    }

}]);
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
app.controller("FooterController", ['$scope', '$rootScope', '$location', 'AuthenticationService', 'apiCall', '_$local', function($scope, $rootScope, $location, AuthenticationService, apiCall, _$local) {
	'use strict';
	$scope.root = $rootScope;
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
app.controller("LoginController", ['$rootScope', '$routeParams', '$scope', '$location', 'apiCall', '_$local', function($rootScope, $routeParams, $scope, $location, apiCall, _$local) {
	'use strict';
	$rootScope.title = 'Log In';
	$scope.root = $rootScope;
	if ($rootScope.logged_in) {
		$location.path('/');
	}

	$scope.loginUser = function() {
		apiCall.logIn($scope.credentials).then(function (response) {
			var data = response.data;
			if (data.success) {
				var user = data.body;
				_$local.set('user', user);
				$rootScope.user = user;
				$rootScope.logged_in = true;
				$location.path('/');
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
				$location.path('/');
			}
		});
	};
}]);
app.directive('ngFooter', function () {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/footer.ng',
		controller: 'FooterController'
	};
});
app.directive('integer', function() {
    var INTEGER_REGEXP = /^\-?\d+$/;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
 
app.directive('smartFloat', function() {
    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});
app.directive('ngHeader', function () {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: '/src/app/views/header.ng',
		controller: 'HeaderController'
	};
});
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

app.factory('apiCall', ['$http', function($http) {
	'use strict';
    return {
        createUser: function(obj) {
            return $http.post('/api/users/create/', obj);
        },
        logIn: function(obj) {
            console.log(obj);
            return $http.post('/api/users/log_in/', obj);
        },
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