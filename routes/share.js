var foods = require('../data.json');

var group = require('../group.json');

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