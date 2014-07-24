// middleware section
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app){
	
	// be careful to the initializing sequence 
	// initialize the cookieParser - ALWAYS before expressSession
	app.use(cookieParser());
	// initialize the session & connect to db 
	app.use(session({
		secret : 'cicciosgamino',
	}));
	// initialize the bodyParser 
	app.use(bodyParser());
}

	