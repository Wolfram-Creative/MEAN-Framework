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