var mysql = require('mysql');

exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.render('landing', {})
		return
	}

	// Set the home_id in the session based on the value passed in the request body
	if (request.body.home_id) {
		request.session.home_id = request.body.home_id
	}

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
	})

	console.log("index.js request.session.home_id = " + request.session.home_id)

	if (!request.session.home_id) {
		console.log("User has not selected a home")

		// Get the list of houses that a user is in
		const housesQuery = "SELECT * FROM Homes, Habitations WHERE Homes.home_id=Habitations.home_id AND Habitations.user_id=\"" + request.session.user_id + "\""
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

			connection.end();
			response.render('open', homes);
			return;
		})
	}

	var data = {"foodItems": []};
	data["viewAlt"] = false;

	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_id = request.session.home_id
	console.log("userid = " + request.session.user_id)
	console.log("homeid = " + request.session.home_id)

  const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Foods.user_id=\"" + user_id + "\" AND Foods.home_id=\"" + home_id + "\""
  connection.query(queryString, function (err, rows, fields) {
    if (err) {
      console.log("Failed to query for foods: " + err)
      res.send("Failed to query for foods")
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

};

exports.viewAlt = function(request, response){

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

			connection.end();
			response.render('open', homes);
			return;
		})
	}

	var data = {"foodItems": []};
	data["viewAlt"] = true;

	console.log("INDEX SESSION ID")
	console.log(request.sessionID)
	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_id = request.session.home_id

  const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Foods.user_id=\"" + user_id + "\" AND Foods.home_id=\"" + home_id + "\""
  connection.query(queryString, function (err, rows, fields) {
    if (err) {
      console.log("Failed to query for foods: " + err)
      res.send("Failed to query for foods")
      return
    }

		console.log("Food query callback")
		console.log(rows)

		var i;
		for (i = 0; i < rows.length; i++) {
			var food_id = rows[i].food_id
			var foodName = rows[i].food_name
			data.foodItems.push({"id": food_id, "imageName": foodName, "imageURL": "images/food/"+foodName+".png"})
		}

		if (rows.length == 0) {
			data["empty"] = true
		}

		console.log(data)

		connection.end();

		response.render('index', data);
	})
};
