var foods = require('../data.json');

var group = require('../group.json');

exports.foodInfo = function(request, response) {
	var groupFoodID = request.params.id;
  groupFoodID = parseInt(groupFoodID);

  console.log("personal:");
  console.log(foods["foodItems"]);

  console.log("group: ");
  console.log(group["foodItems"]);

  var latestId = foods["foodItems"].length+1;

  var groupFood = group["foodItems"][groupFoodID-1]; // of by one, our first project has index 0
  groupFood["id"] = latestId.toString();

  foods.foodItems.push(groupFood);

  delete group["foodItems"][groupFoodID-1];

  delete require.cache[require.resolve('../group.json')]

  console.log("group: ");
  console.log(group["foodItems"]);

  response.json(groupFood);
	//response.render('index', foods["foodItems"]);
}