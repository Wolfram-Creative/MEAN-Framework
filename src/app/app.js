'use strict';

var app = angular.module("app", ['ngRoute']);


function localConstructor() {
    this.set = function (key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
        return this;
    };
    this.get = function (key) {
        var obj = JSON.parse(localStorage.getItem(key));
        return obj;
    };
    this.clear = function () {
        localStorage.clear();
        return this;
    };
    this.remove = function (key) {
        localStorage.removeItem(key);
        return this;
    };
};

var local = new localConstructor();

//Set the App title and
app.run(['$rootScope', function ($rootScope) {
    $rootScope.appTitle = "MEAN";
    if (local.get('user') !== null){
        $rootScope.user = local.get('user');
        $rootScope.logged_in = true;
    }
}]);