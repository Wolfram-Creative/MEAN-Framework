function mergeObjects (to, from) {
	for (key in from) {
		val = from[key];
		if (typeof to[key] !== 'undefined') {
			if (typeof to[key] === 'string' && typeof from[key] === 'string') {
				// is a string
				to[key] = val;
			}
			if (typeof to[key] === 'number' && typeof from[key] === 'number') {
				// is a number
				to[key] = val;
			}
			if ( (typeof to[key] === 'object' && typeof to[key].length === 'undefined') && 
				(typeof from[key === 'object'] && typeof from[key].length === 'undefined') ) {
				// is object
				mergeObjects(to[key], from[key]);
			}
			if ( (typeof to[key] === 'object' && typeof to[key].length !== 'undefined') && 
				(typeof from[key === 'object'] && typeof from[key].length !== 'undefined') ) {
				// is array;
				to[key] = from[key].slice();
			}
		}
	}
}

exports.user = function (user_obj, callback) {
	var model = {
			username: "required",
			first_name: 'required',
			last_name: 'required',
			avatar: '',
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

	mergeObjects(model, user_obj);
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