'use strict';

var app = angular.module("app", ['ngRoute']);

//Set the App title and User
app.run(['$rootScope', '_$local', function ($rootScope, _$local) {
    $rootScope.appTitle = "MEAN";
    if (_$local.get('user') !== null){
        $rootScope.user = _$local.get('user');
        $rootScope.logged_in = true;
    }
}]);