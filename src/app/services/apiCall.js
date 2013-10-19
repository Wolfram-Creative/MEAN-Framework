app.factory('apiCall', ['$http', function($http) {
   return {
        getEvent: function (event_name) {
            return $http.get('/api/events/get_event/' + event_name)
        },
        findEvent: function (search_params) {
        	return $http.post('/api/events/find_event/', search_params);
        },
        vote: function (event_info, gender) {
        	if (gender === 'boy') {
        		return $http.get('/api/events/vote_no/' + event_info.event_id + '/' + event_info.first_name +'/' + event_info.user_id);
        	} else if (gender ===  'girl') {
        		return $http.get('/api/events/vote_yes/' + event_info.event_id + '/' + event_info.first_name +'/' + event_info.user_id);
        	}
        },
        createUser: function(obj) {
        	return $http.post('/api/users/create/', obj);
        },
        getUser : function (user_id) {
        	return $http.get('/api/users/get_user/' + user_id)
        }
   }
}]);