Express - Session - MongoDB 
=================

### Intro 
Simple app for testing the session managment by connect-mongo module for mongodb 
connection driver, native Node.js session is not for production mode, you can use the 
basic session only for dev mode, for production mode consider to connect session with mongodb 
with the rigth drivers, or through redis another famous NoSQL database. Connect the session storage 
with a db engine permit to store large amout of data for session managment. 

### Install Packages 

+ express 4.* 		(no middleware inside)
+ connect-mongo 	(MongoStore) 
+ express-session  	(session)

### Session in Express
There are two broad ways of implementing sessions in Express – using cookies and using a session
store at the backend. Both of them add a new object in the request object named session, which contains the session variables.

No matter which method you use, Express provides a consistent interface for working with the session data.

### Session Store-based Session 
A session store is a provision for storing session data in the backend. Sessions based on session stores can store a large amount of data that is well hidden from the user.

The session middleware provides a way for creating sessions using session stores. Like cookieSession, the session middleware is dependent on the cookieParser middleware for creating a signed HttpOnly cookie.

Initializing the session middlware is a lot like initializing cookieSession – we first load cookieParser with a secret, and load the session middleware, before the router middleware.

	app.use(express.cookieParser('S3CRE7'))
	app.use(express.session());
	// session() before the router use 
	app.use(app.router)

The session middleware accepts an options object which can be used for defining the options of the middleware. The following are the supported options.

>Option	Description
>-----------------------------------------------------------------------------------------------------------------
> + **key**: Name of the cookie. Defaults to connect.sid.
> + **store**: Instance of a session store. Defaults to MemoryStore. The session store may supports options of its own.
> + **secret**: Secret for signing session cookie. Required if not passed to cookieParser().
> + **cookie**: Session cookie settings. Regular cookie defaults apply.
> + **proxy**: To trust the reverse proxy or not. Defaults to false.
>-----------------------------------------------------------------------------------------------------------------

Example of session initializing : 

	app.use(express.session({
  		key: 'app.sess',
  		store: new RedisStore,
  		secret: 'SEKR37'
	}));

The interface for accessing and working with the session variables remain the same – req.session – except now the session values reside on the backend.

Let’s explore the popular session stores for Express.

### MongoStore 
Is one of the most popular session stores for Express, we can use all MongoDB powert to host our backend session. Install 
the package connect-mongo to start with MongoStore : 

	> npm install connect-mongo --save 
	
Start a mongodb process on localhost:27017 (default port for mongodb)

	> sudo mongod --fork --logpath /data/db/mongo_session.log --dbpath /data/db/ --port 27017

Load the MongoStore module in the app and set an instance of it as the session store for the session middleware : 

	var express = require('express')
	var session = require(express-session)
	var MongoStore = require('connect-mongo')(express);

	// initialize the session & connect to db 
	app.use(express.session({
		store: new MongoStore({db:'session_app',host:'127.0.0.1',port:27017})
	}));

With that, session data will now be stored in MongoDB, but the session interface remains the same – the req.session object.
You can read more about MongoStore at [github - repo][1]


### Session Variables

Session variables are those variables, which you associate with a user session. These variables are independently set for each user and can be accessed on the session property of the request object – req.session.

While it might look like we are dealing a JavaScript object, it is not completely true; the session variables actually reside in the data store of the session and the JavaScript object only works as a proxy for those values.
Operations on session variables are is basically working with JavaScript objects. The states of these objects are then updated on the session store.

**Set a session variable** 

	req.session.name = 'Napoleon';
	req.session['illegal chars'] = 'Dancing under the stars ';

**Read a session variable** 

	// undefined is returned in case of undefined property 
	var name = req.session.name; 
	var primary = req.session['illegal chars'];

**Updating session variable** 

	req.session.skills.push('Baking');
	req.session.name = 'Ciccio';

** Deleting session variable 

	delete req.session.name
	delete req.session['illegal chars']


### Deleting session 
Session store-based sessions do not interpret a missing session object on the request object as the end of a session. If we delete the session object from the request object, it will be recreated from the session store, because the session store decides the state of the session, not JavaScript variables. This also the reason why these sessions are intact even after the app restarts.

Session store-based sessions has a method called destroy(), which is used for destroying sessions from the session store – the proper way of tearing down a session store-based session.

	req.session.destroy(function(){
		res.send('Session deleted !! ')
		});




 [1]: https://github.com/kcbanner/connect-mongo.









