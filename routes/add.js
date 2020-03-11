var mysql = require('mysql');

exports.addPersonal = function(request, response) {

	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_id = request.session.home_id

	const food_name = request.body.food_name;
	const amount = request.body.amount;
	const expiration = request.body.expiration;

	const connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'be8a60e252cf4b',
		password: 'fac5d6aa',
		database: 'heroku_b3b87a6bb243c0c'
	})

	const insertQuery = "INSERT INTO Foods (food_name, user_id, home_id, amount, expiration) VALUES (\"" + food_name + "\", \"" + user_id + " \", \"" + home_id + "\", \"" + amount+ "\", \"" + expiration+ "\")"
	connection.query(insertQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to insert into foods: " + err)
			response.send("Failed to insert into foods")
			return
		}

		console.log("Food insert callback")
		console.log(rows)

		connection.end();
		response.redirect('/home')

		/*
		var data = {"foodItems": []};
		data["viewAlt"] = false;

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
		*/


	})
}


exports.addPersonalAlt = function(request, response) {

	const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_id = request.session.home_id

	const food_name = request.body.food_name;
	const amount = request.body.amount;
	const expiration = request.body.expiration;

	const connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'be8a60e252cf4b',
		password: 'fac5d6aa',
		database: 'heroku_b3b87a6bb243c0c'
	})

	const insertQuery = "INSERT INTO Foods (food_name, user_id, home_id, amount, expiration) VALUES (\"" + food_name + "\", \"" + user_id + " \", \"" + home_id + "\", \"" + amount+ "\", \"" + expiration+ "\")"
	connection.query(insertQuery, function (err, rows, fields) {
		if (err) {
			console.log("Failed to insert into foods: " + err)
			response.send("Failed to insert into foods")
			return
		}

		console.log("Food insert callback")
		console.log(rows)

		connection.end();
		response.redirect('/home_b')

		/*
		var data = {"foodItems": []};
		data["viewAlt"] = true;

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
		*/

	})
}