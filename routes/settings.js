var mysql = require('mysql');

exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

	const user_id = request.session.user_id

	homes = {"houses": []}
	homes["viewAlt"] = false;

	// Get the list of houses that a user is in
	housesQuery = "SELECT * FROM Homes, Habitations WHERE Homes.home_id=Habitations.home_id AND Habitations.user_id=\"" + user_id + "\""
	connection.query(housesQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to query for homes: " + err)
			response.send("Failed to query for homes")
			return
		}

		var i;
		for (i = 0; i < rows.length; i++) {
			var home_id = rows[i].home_id
			var home_name = rows[i].home_name
			homes.houses.push({"id": home_id, "name": home_name})

			// Check if current house
			if (home_id == request.session.home_id) {
				homes["currentHouseName"] = rows[i].home_name
				homes["currentHouseCode"] = rows[i].home_code
			}
		}

		if (rows.length == 0) {
			homes["housesExist"] = false;
		} else {
			homes["housesExist"] = true;
		}

		console.log(homes)

		connection.end();

		response.render('settings', homes);
	})

};

exports.viewAlt = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
	})

	const user_id = request.session.user_id
	const home_id = request.session.home_id

	homes = {"houses": []}
	homes["viewAlt"] = true;

	// Get the list of houses that a user is in
	housesQuery = "SELECT * FROM Homes, Habitations WHERE Homes.home_id=Habitations.home_id AND Habitations.user_id=\"" + user_id + "\""
	connection.query(housesQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to query for homes: " + err)
			response.send("Failed to query for homes")
			return
		}

		var i;
		for (i = 0; i < rows.length; i++) {
			var home_id = rows[i].home_id
			var home_name = rows[i].home_name
			homes.houses.push({"id": home_id, "name": home_name})

			// Check if current house
			if (home_id == request.session.home_id) {
				homes["currentHouseName"] = rows[i].home_name
				homes["currentHouseCode"] = rows[i].home_code
			}
		}

		if (rows.length == 0) {
			homes["housesExist"] = false;
		} else {
			homes["housesExist"] = true;
		}

		console.log(homes)

		connection.end();

		response.render('settings', homes);
	})
};
