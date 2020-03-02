// Get all of our friend data
var data = require('../data.json');
var mysql = require('mysql');


exports.view = function(request, response){
	console.log(data);
	data["viewAlt"] = false;

	/*
	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Foods WHERE user_id="
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for foods: " + err)
      res.send("Failed to query for foods")
      return
    }

    console.log("Food query callback")
    res.json(rows)
	})
	*/

	response.render('index', data);
};

exports.viewAlt = function(request, response){
	console.log(data);
	data["viewAlt"] = true;

	response.render('index', data);
};
