var databaseUrl = "",
    collections = ["users", "events"],
    db = require("mongojs").connect(databaseUrl, collections);


exports.createEvent = function (req, res) {
	var new_event_obj = req.body;
	new_event_obj.voted_users=[];
	new_event_obj.no_votes=[];
	new_event_obj.yes_votes=[];
	db.events.insert(new_event_obj, function (error, response) {
		if (error) {
			res.json({
				400 : {
					error: "Could Not Create Event" 
				}
			});
		} else {
			console.log('success');
			res.send(response);
		}
	});
};

// Search by parents names
exports.findEvent = function (req, res) {
	var search_terms = req.body;
	db.events.find(search_terms).limit(20, function (error, response) {

		if (error) {
			res.json({
				400 : {
					error: "Search Not Found" 
				}
			});
		} else {
			res.send(response);
		}
	});
};

// Have event_url_name
exports.getEvent = function (req, res) {
	var name = req.params.name;
	db.events.find({name: name}, function (error, response) {

		if (error) {
			res.json({
				400 : {
					error: "Search Not Found" 
				}
			});
		} else {
			response[0].no_votes_length = response[0].no_votes.length;
			response[0].yes_votes_length = response[0].yes_votes.length;
			res.send(response);
		}
	});
};
