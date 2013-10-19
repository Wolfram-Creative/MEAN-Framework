var app = angular.module("app", []);


function localConstructor() {
    this.write = function (key, obj) {
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