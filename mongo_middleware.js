var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var MongoStore = require('connect-mongo')(session);

module.exports = function(app){
	// initialize the middleware 
	// initialize the cookieParser - ALWAYS before expressSession
	app.use(cookieParser());
	// initialize the session & connect to db for store the session info 
	app.use(session({
		secret : 'cicciosgamino',
		store : new MongoStore({db:'session_app',host:'127.0.0.1',port:27017})
	}));
	// initialize the bodyParser 
	app.use(bodyParser());

}