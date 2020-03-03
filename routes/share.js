var foods = require('../data.json');

var group = require('../group.json');

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
      res.send("Failed to query for foods")
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
          res.send("Failed to update foods")
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
  })
}

exports.foodInfo = function(request, response) {
	var foodID = request.params.id;
  foodID = parseInt(foodID);

  console.log("personal:");
  console.log(foods["foodItems"]);

  console.log("group: ");
  console.log(group["foodItems"]);

  var latestId = group["foodItems"].length+1;

  var food = foods["foodItems"][foodID-1]; // of by one, our first project has index 0
  food["id"] = latestId.toString();

  group.foodItems.push(food);

  //foods["foodItems"].splice( foods["foodItems"].indexOf('foo'), 1 );

  delete foods["foodItems"][foodID-1];

  delete require.cache[require.resolve('../data.json')]

  console.log("personal:");
  console.log(foods["foodItems"]);

  response.json(foods);

  //response.render('index', foods);

	//response.render('index', foods["foodItems"]);
}