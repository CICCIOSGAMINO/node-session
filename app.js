// simple session testing 
var express = require('express');
var middleware = require('./middleware');

var app = express();

// pass the app throuth the middleware 
middleware(app);

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
