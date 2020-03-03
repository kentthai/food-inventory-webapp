var mysql = require('mysql');

exports.view = function(request, response){
	var data = {"foodItems": []};
	console.log("group.js view()");
	data["viewAlt"] = false;

	console.log("INDEX SESSION ID")
	console.log(request.sessionID)
	const session_id = request.sessionID

	console.log("Testing session info: ")
	const user_id = request.session.user_id
	const home_id = request.session.home_id
	console.log("userid = " + request.session.user_id)
	console.log("homeid = " + request.session.home_id)

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Foods WHERE home_id=" + home_id + " AND sharing=true"
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

		response.render('group', data);
	})

};


exports.viewAlt = function(request, response){

	var data = {"foodItems": []};
	console.log("group.js viewAlt()");
	data["viewAlt"] = true;

	console.log("INDEX SESSION ID")
	console.log(request.sessionID)
	const session_id = request.sessionID

	console.log("Testing session info: ")
	const user_id = request.session.user_id
	const home_id = request.session.home_id
	console.log("userid = " + request.session.user_id)
	console.log("homeid = " + request.session.home_id)

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Foods WHERE home_id=" + home_id + " AND sharing=true"
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

		response.render('group', data);
	})
};
