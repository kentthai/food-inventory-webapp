// Get all of our friend data
var data = require('../data.json');

exports.view = function(request, response){
	console.log(data);
	// data.viewAlt = False;


	response.render('index', data);
};

exports.viewAlt = function(request, response){
	console.log(data);
	// data.viewAlt = True;


	response.render('index', data);
};
