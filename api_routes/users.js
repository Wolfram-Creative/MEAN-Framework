

exports.create = function (req, res) {
	var user_obj = req.body;
	model.user(user_obj, function(err, user) {
		if (!err) {
			username = user.username;
			db.users.find({username: username}, function (error, response) {
				if (!error) {
					if (response.length) {
						db.users.insert(user_obj, function (error, response) {
							if (error) {
								res.json({
									403 : {
										error: "Could Not Create User" 
									}
								})
							} else {
								console.log('success')
								res.send(response);
							}
						});
					} else {
						res.send(response);
					}
				} else {
					res.json({
						400 : {
							error: "Database could not connect." 
						}
					})
				}
			});
		} else {
			res.json({
				403 : {
					error: err
				}
			})
		}
	});
}

exports.getUser = function (req, res) {
	var user_id = req.params.user_id;
	db.users.find({user_id: user_id}, function (error, response) {
		if (error) {
			res.json({
				400 : {
					error: "User Not Found" 
				}
			})
		} else {
			res.send(response);
		}
	});
}

exports.get_users = function (req, res) {

	if(req.user) {
		db.users.findOne({$or[
			{'username':req.body.username},
			{'_id':req.body.user_id}]}, function(err, results){
				if(!err) {
					res.send(results.users);
				} else {
					res.send(err)
				}
			});
	} else {
		
	}

};

exports.login = function (req, res) {
	console.log('logging in');
	console.log(req.headers);
	res.json({'user': 'Brian Noah'})
}