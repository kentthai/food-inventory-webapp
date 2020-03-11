exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	var data = {"foodItems": []};
	data["viewAlt"] = false;

	response.render('addForm', data);
};

exports.viewAlt = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	var data = {"foodItems": []};
	data["viewAlt"] = true;

	response.render('addForm', data);
};
