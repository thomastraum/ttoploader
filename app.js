
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , connect = require('connect')
  , join = require('path').join;


var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(connect.bodyParser({
			uploadDir: "./public/uploads",
			defer: true        
		}));
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(join(__dirname + '/public')));
	app.use(express.static(join(__dirname, '/build')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/upload', routes.upload );

http.createServer(app).listen(app.get('port'), function(){  
  console.log("Express server listening on port " + app.get('port'));
});
