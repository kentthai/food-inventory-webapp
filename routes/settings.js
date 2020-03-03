var data = require('../houses.json');

exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	console.log(data);

	// console.log(request);

	// console.log(response);

	response.render('settings', data);
};
