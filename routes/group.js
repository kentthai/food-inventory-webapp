var data = require('../group.json');

exports.view = function(request, response){
	console.log(data);

	// console.log(request);

	// console.log(response);

	response.render('group', data);
};

exports.viewAlt = function(request, response){
	console.log(data);
	// data.viewAlt = True;


	response.render('index', data);
};
