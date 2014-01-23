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