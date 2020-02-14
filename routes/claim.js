var foods = require('../data.json');

var group = require('../group.json');

exports.foodInfo = function(request, response) {
	var groupFoodID = request.params.id;
  groupFoodID = parseInt(groupFoodID);

  console.log("personal:");
  console.log(foods["foodItems"]);

  console.log("group: ");
  console.log(group["foodItems"]);

  // Generate id
	var set = [];
	var i;
	for (i = 0; i < group.foodItems.length; i += 1) {
		if (group.foodItems[i] != null) {
			set.push(parseInt(group.foodItems[i]["id"]));
		}
	}
	console.log(set);

	var id = 1;
	while (set.indexOf(id) >= 0) {
		id += 1;
	}

  //var latestId = foods["foodItems"].length+1;

  var groupFood = group["foodItems"][id]; // of by one, our first project has index 0

  groupFood["id"] = latestId.toString();

  foods.foodItems.push(groupFood);

  delete group["foodItems"][groupFoodID-1];

  delete require.cache[require.resolve('../group.json')]

  console.log("group: ");
  console.log(group["foodItems"]);

  response.json(groupFood);
	//response.render('index', foods["foodItems"]);
}