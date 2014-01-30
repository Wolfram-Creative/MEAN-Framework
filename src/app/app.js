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