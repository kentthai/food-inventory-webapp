var food = require("../data.json");

exports.add = function(request, response) {

	var name = request.query.name;
	// var description = request.query.description;

  var imageURL = "images/food/" + name + ".png";

	var food = {
    "id": "1",
		"imageName": name,
		"imageURL": imageURL
	};

  console.log("food = " + food);

	food.foodItems.push(food);

	response.render('index', data);
}