var foods = require("../data.json");

exports.addFood = function(request, response) {

	var name = request.params.name.toString();
	// var description = request.query.description;

	console.log("name = " + name);

  var imageURL = "images/food/" + name + ".png";

	// Generate id
	var set = new Set();
	for (let i = 0; i < foods.foodItems.length; i += 1) {
		set.add(parseInt(foods.foodItems[i]["id"]));
	}

	console.log(set);

	var id = 1;
	while (set.has(id)) {
		id += 1;
	}

	var food = {
    "id": id.toString(),
		"imageName": name,
		"imageURL": imageURL
	};

	console.log("food:");
	console.log(food);

	foods.foodItems.push(food);

	response.render('index', foods);
}
