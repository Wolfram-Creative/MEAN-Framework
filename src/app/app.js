'use strict';

var app = angular.module("app", ['ngRoute']);

//Set the App title and User
app.run(['$rootScope', '_$local', function ($rootScope, _$local) {
    var user = _$local.get('user');
    $rootScope.appTitle = "MEAN";
    console.log(typeof user, user);
    if (typeof user === 'object' && Object.keys(user).length) {
        $rootScope.user = user;
        $rootScope.logged_in = true;
    }
}]);