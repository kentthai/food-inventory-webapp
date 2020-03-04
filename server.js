/**
 * Introduction to Human-Computer Interaction
 * Lab 1
 * --------------
 * Created by: Michael Bernstein
 * Last updated: December 2013
 */
var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');

var mysql = require('mysql');

// Route
var index = require('./routes/index');
var settings = require('./routes/settings');
var group = require('./routes/group');
var camera = require('./routes/camera');
var addForm = require('./routes/addForm')

// Login routes
var login = require('./routes/login');
var open = require('./routes/open');

var share = require('./routes/share');
var claim = require('./routes/claim');

var remove = require('./routes/remove');

var add = require('./routes/add');

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
//app.use(express.static(__dirname + '/static'));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: ''}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', open.view);
app.get('/newHome', open.newHome);
app.post('/newHome', open.newHomePost);
app.get('/joinHome', open.joinHome);
app.post('/joinHome', open.joinHomePost);
app.get('/login', open.login);
app.post('/login', login.view);

app.post('/home', index.view);

app.get('/home', index.view);
app.get('/home_b', index.viewAlt);
app.get('/settings', settings.view);
app.get('/settings_b', settings.viewAlt);
app.get('/group', group.view);
app.get('/group_b', group.viewAlt);
app.get('/camera', camera.view);
app.get('/addForm', addForm.view);
app.get('/addForm_b', addForm.viewAlt);

app.post('/share', share.view);
app.post('/claim', claim.view);

app.post('/add', add.addPersonal)
app.post('/add_b', add.addPersonalAlt)

app.post('/removePersonal', remove.personal)
app.post('/removeGroup', remove.group)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});


*/
