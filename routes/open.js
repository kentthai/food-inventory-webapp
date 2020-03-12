var mysql = require('mysql');

exports.view = function(request, response){
	request.session.destroy();
	response.render('landing', {});
};

exports.newHome = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	response.render('newHome', {});
};

exports.newHomePost = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_name = request.body.home_name

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
	})

	// Get the list of home codes to find an unused code
	const homeCodeQuery = "SELECT home_code FROM Homes"
	connection.query(homeCodeQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to query for home codes: " + err)
			response.send("Failed to query for home codes")
			return
		}

		codes = {}
		var i;
		for (i = 0; i < rows.length; i++) {
			var home_code = rows[i].home_code
			codes[home_code] = true;
		}

		// Generate home codes until we find an unused code
		home_code = "00-00-00"
		do {
			home_code = Math.floor(Math.random()*1000000).toString()

			if (home_code.length != 6) {
				var prepend = ""
				var i
				for (i = 0; i < 6-home_code.length; i++) {
					prepend += "0"
				}

				home_code = prepend + home_code
			}

			home_code = home_code.slice(0,2) + "-" + home_code.slice(2,4) + "-" + home_code.slice(4)
			console.log("Generated home code: "+ home_code)
		} while (home_code in codes);

		// Insert new home into database
		const homeInsert = "INSERT INTO Homes (home_name, home_code) VALUES (\"" + home_name + "\", \"" + home_code+ "\")"
		connection.query(homeInsert, function (err, rows, fields) {
			if (err) {
				console.log("Failed to insert into homes: " + err)
				response.send("Failed to insert into homes")
				return
			}

			console.log("Home insert callback")
      console.log(rows)

			// Query for home_id
			console.log("Searching for home_id for home_code: " + home_code)
			const homeIdQuery = "SELECT home_id from Homes where home_code=\"" + home_code + "\""
			connection.query(homeIdQuery, function (err, rows, fields) {
				if (err) {
					console.log("Failed to query homes: " + err)
					response.send("Failed to query homes")
					return
				}

				console.log("Home query callback")
				console.log(rows)

				const home_id = rows[0].home_id

				// Insert user_id, home_id into Habitations table
				const habitationInsert = "INSERT INTO Habitations (user_id, home_id) VALUES (\"" + user_id + "\", \"" + home_id+ "\")"
				connection.query(habitationInsert, function (err, rows, fields) {
					if (err) {
						console.log("Failed to insert into homes: " + err)
						response.send("Failed to insert into homes")
						return
					}

					console.log("Home insert callback")
					console.log(rows)

					// Set the home_id in the session based on the value passed in the request body
					request.session.home_id = home_id

					// Load the foods for the home page
					var data = {"foodItems": []};
					const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Foods.user_id=\"" + user_id + "\" AND Foods.home_id=\"" + home_id + "\""
					connection.query(queryString, function (err, rows, fields) {
						if (err) {
							console.log("Failed to query for foods: " + err)
							response.send("Failed to query for foods")
							return
						}

						console.log("Food query callback")
						console.log(rows)

						var i;
						for (i = 0; i < rows.length; i++) {
							var food_id = rows[i].food_id
							var food_name = rows[i].food_name
							data.foodItems.push({"id": food_id, "imageName": food_name, "imageURL": "images/food/"+food_name+".png"})
						}

						if (rows.length == 0) {
							data["empty"] = true
						}

						connection.end();

						response.render('index', data);
					})
				})
			})
		})
	})
};

exports.joinHome = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	response.render('joinHome', {});
};

exports.joinHomePost = function(request, response){
	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_code = request.body.home_code

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
	})

	// Get the list of home codes to see if match
	const homeCodeQuery = "SELECT * FROM Homes WHERE home_code=\""+home_code+"\""
	connection.query(homeCodeQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to query for home code: " + err)
			response.send("Failed to query for home code")
			return
		}

		// Invalid home code
		if (rows.length <= 0) {
			connection.end();
			response.render('joinHome', {"error": "Invalid home code"});
		}

		// Valid home code, add user to Habitation
		else {

			const home_id = rows[0].home_id
			const query_home_name = rows[0].home_name

			const habitationInsert = "INSERT INTO Habitations (user_id, home_id) VALUES (\"" + user_id + "\", \"" + home_id+ "\")"
			connection.query(habitationInsert, function (err, rows, fields) {
				if (err) {

					if (err.code == "ER_DUP_ENTRY") {
						connection.end();
						response.render('joinHome', {"error": "You've already joined \"" + query_home_name + "\""});
						return;
					}

					console.log("Failed to insert into habitations: " + err)
					response.send("Failed to insert into habitations")
					return
				}

				console.log("Habitations insert callback")
				console.log(rows)

				// Set the home_id in the session based on the value passed in the request body
				request.session.home_id = home_id

				var data = {"foodItems": []};

				const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Foods.user_id=\"" + user_id + "\" AND Foods.home_id=\"" + home_id + "\""
				connection.query(queryString, function (err, rows, fields) {
					if (err) {
						console.log("Failed to query for foods: " + err)
						response.send("Failed to query for foods")
						return
					}

					console.log("Food query callback")
					console.log(rows)

					var i;
					for (i = 0; i < rows.length; i++) {
						var food_id = rows[i].food_id
						var food_name = rows[i].food_name
						data.foodItems.push({"id": food_id, "imageName": food_name, "imageURL": "images/food/"+food_name+".png"})
					}

					if (rows.length == 0) {
						data["empty"] = true
					}

					connection.end();

					response.render('index', data);
				})
			})
		}
	})
};

exports.login = function(request, response){
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

		console.log(homes)

		connection.end();

		response.render('open', homes);
	})
};