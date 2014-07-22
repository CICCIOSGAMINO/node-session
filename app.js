// simple session - mongodb testing 
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var MongoStore = require('connect-mongo')(express);
var app = express();

// initialize the cookieParser - ALWAYS before expressSession
app.use(cookieParser());
// initialize the session & connect to db 
app.use(expressSession({
	secret : 'cicciosgamino',
	dudee: 0
	// ,store : new MongoStore({db:'session_app',host:'127.0.0.1',port:27017})
}));
// initialize the bodyParser 
app.use(bodyParser());

app.get('/', function(req, res){
	req.session.name = "IP>125.125.125.3";
	res.send("user : " + req.session.dudee);
	
});

app.listen(3000);
