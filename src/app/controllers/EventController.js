app.controller("EventController", ['$scope', '$location', '$http', 'apiCall', function($scope, $location, $http, apiCall) {
	var chart_element = document.getElementById("myChart").getContext("2d"),
		$chart = $('#myChart'),
		$event_info = $('#event_info'),
  		event_name = $location.path().replace('/', ''); 
  	$scope.event_url = event_name;
	scope = $scope;
	genderChart = new Chart(chart_element);


	options = {
		segmentShowStroke : true,
		segmentStrokeColor : "#fff",
		segmentStrokeWidth : 5,
		animation : true,
		animationSteps : 100,
		// animationEasing : "easeOutQuart",
		animateRotate : true,
		animateScale : true,
		onAnimationComplete : null
	};
	$scope.getEvent = function () {
	  	apiCall.getEvent(event_name).then(function(result) {
	  		angular.extend($scope, result.data[0]);
	  		if (local.get('user')){
	  			var user_id = local.get('user').user_id;
	  			if ($scope.voted_users.indexOf(user_id) > -1) {
	  				$scope.voted = true;
	  			} else {
	  				console.log(false)
	  			}
	  		}
	  		$chart.css({"max-height": (window.innerHeight - 40)+"px", "max-width": (window.innerHeight - 40)+"px"});
	  		if ($scope.boy_votes_length === 0 && $scope.girl_votes_length === 0) {
	  			$scope.chart_data = [
		  			{
		  				value: 1,
		  				color: "rgb(156, 206, 255)"
		  			},
		  			{
		  				value: 1,
		  				color: "rgb(255, 190, 190)"
		  			},
		  		];
	  		} else {
		  		$scope.chart_data = [
		  			{
		  				value: $scope.boy_votes_length,
		  				color: "rgb(156, 206, 255)"
		  			},
		  			{
		  				value: $scope.girl_votes_length,
		  				color: "rgb(255, 190, 190)"
		  			},
		  		];
	  		}
	  		if ($scope.chart_type === 'Doughnut') {
		  		genderChart.Doughnut($scope.chart_data, options);
	  		} else if ($scope.chart_type === "Pie") {
	  			genderChart.Pie($scope.chart_data, options);
	  		}
	  		setTimeout(function() {
	  			if (window.innerWidth > 767) {
			  		$event_info.animate({"top": ((window.innerHeight - 40)- $event_info.outerHeight())/2 + 'px'});
			  	}
	  		},20)
		});
	}
	$scope.getEvent();
	$scope.vote = function (e, gender) {
		var $this = $(e.target);
		$scope.voted = true;
		var user_id = FB.getUserID()
		if (user_id.length === 0) {
			FB.login(function (response) {
				if (response.status === 'connected') {
					var obj = {};
					obj.access_token = response.authResponse.accessToken;
					obj.user_id = response.authResponse.userID;
					FB.api('/me', function(user) {
						obj.first_name = user.first_name;
						obj.last_name = user.last_name;
						obj.user_id = user.id;
						obj.email = user.email;
						obj.gender = user.gender;
						obj.birthday = user.birthday;
						local.write('user', obj);
						$scope.$apply(function() {
							apiCall.createUser(obj)
								.success(function (s) {
									var vote_obj = {};
									vote_obj.event_id = $scope._id;
									vote_obj.first_name = local.get('user').first_name;
									vote_obj.user_id = local.get('user').user_id;
									apiCall.vote(vote_obj, gender)
										.then(function () {
											$scope.getEvent();
											FB.ui({
											  method: 'feed',
											  picture: 'http://www.losangelesweddingphotography.org/wp-content/uploads/2013/10/itsa' + gender + '.jpg',
											  link: 'http://www.guessthesex.co/' + $scope.name,
											  title: 'Guess the sex of the ' + $scope.mothers_last_name + ' baby.',
											  caption: 'I guessed baby ' + $scope.mothers_last_name + ' will be a ' + gender + '! Guess with me, or create your own gender guessing event.',
											}, function(response){
												console.log('posted link');
											});
										});
								})
								.error(function (e) {
									console.log('error', e);
								});
						});
					});
				} else {
					$scope.voted = false;
					$scope.$apply();
				}
			}, {scope:'email, user_likes, user_checkins, user_birthday'});
		} else {
			var vote_obj = {};
			vote_obj.event_id = $scope._id;
			if (local.get('user')){
				vote_obj.first_name = local.get('user').first_name;
				vote_obj.user_id = local.get('user').user_id;
				apiCall.vote(vote_obj, gender).then(function () {
					$scope.getEvent();
					FB.ui({
					  method: 'feed',
					  picture: 'http://www.losangelesweddingphotography.org/wp-content/uploads/2013/10/itsa' + gender + '.jpg',
					  link: 'http://www.guessthesex.co/' + $scope.name,
					  title: 'Guess the sex of the ' + $scope.mothers_last_name + ' baby.',
					  caption: 'I guessed baby ' + $scope.mothers_last_name + ' will be a ' + gender + '! Guess with me, or create your own gender guessing event.',
					}, function(response){
						console.log('posted link');
					});
				});
			} else {
				FB.api('/me', function(user) {
					var obj = {}
					obj.first_name = user.first_name;
					obj.last_name = user.last_name;
					obj.user_id = user.id;
					obj.email = user.email;
					obj.gender = user.gender;
					obj.birthday = user.birthday;
					local.write('user', obj);
					vote_obj.first_name = local.get('user').first_name;
					vote_obj.user_id = local.get('user').user_id;
					apiCall.vote(vote_obj, gender).then(function () {
						$scope.getEvent();
						FB.ui({
						  method: 'feed',
						  picture: 'http://www.losangelesweddingphotography.org/wp-content/uploads/2013/10/itsa' + gender + '.jpg',
						  link: 'http://www.guessthesex.co/' + $scope.name,
						  title: 'Guess the sex of the ' + $scope.mothers_last_name + ' baby.',
						  caption: 'I guessed baby ' + $scope.mothers_last_name + ' will be a ' + gender + '! Guess with me, or create your own gender guessing event.',
						}, function(response){
							console.log('posted link');
						});
					});
				});
			}
		}
	};
	$(window).resize(function () {
		if (window.innerWidth >767) {
			$event_info.css({"margin-top": ((window.innerHeight - 40)- $event_info.outerHeight())/2 + 'px'});
		} else {
			$event_info.css({"margin-top": '0'});
		}
		$chart.css({"max-height": (window.innerHeight - 40)+"px", "max-width": (window.innerHeight - 40)+"px"});
	})
}]);    