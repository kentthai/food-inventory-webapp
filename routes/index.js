var mysql = require('mysql');

exports.view = function(request, response){

	if (!request.session.user_id) {
		console.log("User tried to skip login")

		response.redirect('/')
		//response.render('landing', {})
		return
	}

	console.log("index.js view()");

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
      response.send("Failed to query for foods")
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
