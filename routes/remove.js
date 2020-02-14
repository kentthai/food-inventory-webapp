var personal = require('../data.json');
var group = require('../group.json');

exports.personal = function(request, response) {
	var foodID = request.params.id;
  foodID = parseInt(foodID);

  console.log("personal:");
  console.log(personal["foodItems"]);

  delete personal["foodItems"][foodID-1];

  delete require.cache[require.resolve('../data.json')]

  console.log("personal:");
  console.log(personal["foodItems"]);

  //response.json(personal);
	response.render('index', personal);
}

exports.group = function(request, response) {
	var groupFoodID = request.params.id;
  groupFoodID = parseInt(groupFoodID);

  console.log("group: ");
  console.log(group["foodItems"]);

  delete group["foodItems"][groupFoodID-1];

  delete require.cache[require.resolve('../group.json')]

  console.log("group: ");
  console.log(group["foodItems"]);

  //response.json(groupFood);
	response.render('index', group);
}