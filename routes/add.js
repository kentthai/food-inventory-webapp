var foods = require("../data.json");
var group = require("../group.json");

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
			res.send("Failed to insert into foods")
			return
		}

		console.log("Food insert callback")
		console.log(rows)

		var data = {"foodItems": []};

		const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND Users.session_id=\"" + session_id + "\""
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
				var foodName = rows[i].food_name
				data.foodItems.push({"id": i, "imageName": foodName, "imageURL": "images/food/"+foodName+".png"})
			}

			connection.end();

			response.render('index', data);
		})

	})
}