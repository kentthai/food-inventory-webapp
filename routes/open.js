var mysql = require('mysql');

exports.view = function(request, response){
	request.session.destroy();
	response.render('landing', {});
};

exports.newHome = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	response.render('newHome', {});
};

exports.joinHome = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	response.render('joinHome', {});
};

exports.login = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}


	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
	})

	// Get the list of houses that a user is in
	housesQuery = "SELECT * FROM Homes, Habitations WHERE Homes.home_id=Habitations.home_id AND Habitations.user_id=\"" + request.session.user_id + "\""
	connection.query(housesQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to query for homes: " + err)
			res.send("Failed to query for homes")
			return
		}

		homes = {"houses": []}
		var i;
		for (i = 0; i < rows.length; i++) {
			var home_id = rows[i].home_id
			var home_name = rows[i].home_name
			homes.houses.push({"id": home_id, "name": home_name})
		}

		if (rows.length == 0) {
			homes["housesExist"] = false;
		} else {
			homes["housesExist"] = true;
		}

		console.log(homes)

		connection.end();

		response.render('open', homes);
	})
};