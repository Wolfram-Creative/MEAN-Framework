exports.user = function (user_obj, callback) {
	var model = {
			username: "required",
			name: 'required',
			avatar: ''
			email: "required",
			phone: "required",
			address: {
				street_1: '',
				street_2: '',
				city: '',
				State: '',
				Zip: ''
			},
			user_level: 0
		},
		err = null,
		missing_fields = [],
		key,
		val,
		i;

	for (key in user_obj) {
		val = user_obj[key];
		if (typeof model[key] !== 'undefined') {
			if (typeof model[key] === 'string') {
				model[key] = val;
			}
			if (typeof model[key] === 'obj')
		}
	}
	for (key in model) {
		val = model[key];
		if (val === "required") {
			missing_fields.push(key);
		}
	}
	if (missing_fields.length) {
		err = "Could not create user without the following fields: "
		for (i = 0; i < missing_fields.length; i++) {
			err += missing_fields[i];
		}
		model = null;
	}
	callback(err, model);
}