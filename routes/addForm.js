var data = require('../data.json');

exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	console.log(data);

	data["viewAlt"] = false;
	// console.log(request);

	// console.log(response);

	response.render('addForm', data);
};

exports.viewAlt = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	console.log(data);

	data["viewAlt"] = true;

	// console.log(request);

	// console.log(response);

	response.render('addForm', data);
};
