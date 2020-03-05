var mysql = require('mysql');

exports.view = function(request, response){

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

	if (!request.session.home_id) {
		console.log("User has not selected a home")

		// Get the list of houses that a user is in
		const housesQuery = "SELECT * FROM Homes, Habitations WHERE Homes.home_id=Habitations.home_id AND Habitations.user_id=\"" + request.session.user_id + "\""
		connection.query(housesQuery, function (err, rows, fields) {
			if (err) {
				console.log("Failed to query for homes: " + err)
				response.send("Failed to query for homes")
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

			connection.end();
			response.render('open', homes);
			return;
		})
	} else {
		connection.end();
	}

	var data = {"foodItems": []};
	data["viewAlt"] = false;

	response.render('addForm', data);
};

exports.viewAlt = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	var data = {"foodItems": []};
	data["viewAlt"] = true;

	response.render('addForm', data);
};
