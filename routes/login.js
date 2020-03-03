var mysql = require('mysql');

exports.view = function(request, response){

  console.log("request.body: ")
  console.log(request.body)
  const name = request.body.name;

  const session_id = request.sessionID;
  console.log("FOUND SESSION ID: " + session_id);

  console.log("Setting session's userid and homeid")
  //request.session.user_id = 2
  request.session.home_id = 2

	const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'be8a60e252cf4b',
    password: 'fac5d6aa',
    database: 'heroku_b3b87a6bb243c0c'
  })

  const queryString = "SELECT * FROM Users WHERE user_name=\"" + name + "\""
  connection.query(queryString, function (err, rows, fields) {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.send("Failed to query for users")
      return
    }

		console.log("User query callback")
    console.log(rows)

    // Case where user already exists, so update the session_id
    if (rows.length > 0) {
      console.log("user_id = " + rows[0].user_id)

      const updateQuery = "UPDATE Users SET session_id=\"" + session_id + "\" WHERE user_name=\"" + name + "\""
      connection.query(updateQuery, function (err, rows, fields) {
        if (err) {
          console.log("Failed to update users: " + err)
          res.send("Failed to update users")
          return
        }

        console.log("User update callback")
        console.log(rows)

      })
    }

    // New user
    else {
      console.log("inserting user to database")

      const insertQuery = "INSERT INTO Users (user_name, session_id) VALUES (\"" + name + "\", \"" + session_id+ "\")"
      connection.query(insertQuery, function (err, rows, fields) {
        if (err) {
          console.log("Failed to insert user: " + err)
          res.send("Failed to insert user")
          return
        }

        console.log("User insert callback")
        console.log(rows)

      })
    }

    //response.json(rows)

    // Query the name again to set the user_id in the session
    connection.query(queryString, function (err, rows, fields) {
      if (err || rows.length <= 0) {
        console.log("Failed to query for users: " + err)
        res.send("Failed to query for users")
        return
      }

      console.log("Setting session user id to " + rows[0].user_id)
      request.session.user_id = rows[0].user_id;

      connection.end();

      response.render('open', {});
    })
  })
};