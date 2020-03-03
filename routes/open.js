exports.view = function(request, response){
	request.session.destroy();
	response.render('landing', {});
};
