// simple session + mongodb testing 
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var MongoStore = require('connect-mongo')(express);
var app = express();

// initialize the cookieParser - ALWAYS before expressSession
app.use(cookieParser());
// initialize the session & connect to db 
app.use(session({
	secret : 'cicciosgamino',
	,store : new MongoStore({db:'session_app',host:'127.0.0.1',port:27017})
}));
// initialize the bodyParser 
app.use(bodyParser());

app.get('/', function(req, res){
	req.session.name = "cicciosgamino";
	req.session.code = "SDHFhfdHGFhGFHGF64gf46gf";
	req.session.hash = "fogkdogkd";
	res.send('App - HUB ');
	
});

app.get('/session', function(req, res){
	res.send('Session Obj >> ' + JSON.stringify(req.session));
})

app.listen(3000);
