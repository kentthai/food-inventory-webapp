var food = require("../data.json");

exports.addFood = function(request, response) {

	console.log("test");

	var name = request.query.name;
	// var description = request.query.description;

	console.log("name = " + name);

  var imageURL = "images/food/" + name + ".png";

	var food = {
    "id": "1",
		"imageName": name,
		"imageURL": imageURL
	};

  console.log("food = " + food);

	food.foodItems.push(food);

	response.render('index', food);
}