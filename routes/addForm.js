var data = require('../data.json');

exports.view = function(request, response){
	console.log(data);

	// console.log(request);

	// console.log(response);

	response.render('addForm', data);
};
