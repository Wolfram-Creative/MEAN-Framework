'use strict';

var app = angular.module("app", ['ngRoute']);

app.run(['$rootScope', '_$local', function ($rootScope, _$local) {
    //Set the App title and User
    var user = _$local.get('user');
    $rootScope.appTitle = "MEAN";

    if (typeof user === 'object' && Object.keys(user).length) {
        $rootScope.user = user;
        $rootScope.logged_in = true;
    }
}]);