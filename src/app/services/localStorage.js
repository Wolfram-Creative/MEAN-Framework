app.factory('_$local', ['$http', function($http) {
    //Handles Local Storage
   return {
        set : function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },
        get : function (key) {
            var obj = JSON.parse(localStorage.getItem(key));
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
   }
}]);