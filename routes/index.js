// Get all of our friend data
//var data = require('../data.json');

//var data = {"foodItems": []};


var mysql = require('mysql');

exports.view = function(request, response){
	var data = {"foodItems": []};
	console.log(data);
	data["viewAlt"] = false;

	console.log("INDEX SESSION ID")
	console.log(request.sessionID)
	const session_id = request.sessionID

	console.log("Testing session info: ")
	console.log("userid = " + request.session.user_id)
	console.log("homeid = " + request.session.home_id)

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Users.session_id=\"" + session_id + "\""
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

		connection.end();

		response.render('index', data);
	})

};

exports.viewAlt = function(request, response){
	var data = {"foodItems": []};
	console.log(data);
	data["viewAlt"] = true;

	console.log("INDEX SESSION ID")
	console.log(request.sessionID)
	const session_id = request.sessionID

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Foods, Users WHERE Foods.user_id=Users.user_id AND sharing=false AND Users.session_id=\"" + session_id + "\""
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
};
