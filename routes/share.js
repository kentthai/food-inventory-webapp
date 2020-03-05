var mysql = require('mysql');

exports.view = function(request, response) {
  var food_id = request.body.food_id
  console.log("Sharing food_id: " + food_id)

  const session_id = request.sessionID
	const user_id = request.session.user_id
	const home_id = request.session.home_id

	const connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'be8a60e252cf4b',
		password: 'fac5d6aa',
		database: 'heroku_b3b87a6bb243c0c'
	})

	const checkExists = "SELECT * FROM Foods WHERE food_id=\"" + food_id + "\" and user_id=\"" + user_id + "\" and sharing=false"
  connection.query(checkExists, function (err, rows, fields) {
    if (err) {
      console.log("Failed to query for foods: " + err)
      response.send("Failed to query for foods")
      return
    }

		console.log("Food query callback")
    console.log(rows)

    // Case where food already exists, so update the sharing boolean
    if (rows.length > 0) {
      console.log("user_id = " + rows[0].user_id)

      const updateQuery = "UPDATE Foods SET sharing=" + true + " WHERE food_id=" + food_id
      connection.query(updateQuery, function (err, rows, fields) {
        if (err) {
          console.log("Failed to update foods: " + err)
          response.send("Failed to update foods")
          return
        }

        console.log("Food update callback")
        console.log(rows)
      })
    }

    // Food doesn't exist
    else {
      console.log("ERROR: Trying to share a food item that doesn't exist. ID may be incorrect")
    }

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