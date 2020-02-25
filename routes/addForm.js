var data = require('../data.json');

exports.view = function(request, response){
	console.log(data);

	data["viewAlt"] = false;
	// console.log(request);

	// console.log(response);

	response.render('addForm', data);
};

exports.viewAlt = function(request, response){
	console.log(data);

	data["viewAlt"] = true;

	// console.log(request);

	// console.log(response);

	response.render('addForm', data);
};
