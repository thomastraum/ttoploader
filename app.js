
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , connect = require('connect')
  , flash = require('connect-flash')
  , join = require('path').join;

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));

	app.use(express.bodyParser());

	// app.use(connect.bodyParser({
	// 		uploadDir: "./public/uploads",
	// 		defer: true        
	// 	}));
	app.use(express.methodOverride());
    
    // connect flash for flash messages
    app.use(flash());
	app.use(app.router);
	app.use(express.static(join(__dirname + '/public')));
	app.use(express.static(join(__dirname, '/build')));

	app.use(function(err, req, res, next){
		console.error(err.stack);
		// error page
		res.status(500).render('500', { error: err.stack });
	});

});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
	require(models_path+'/'+file);
})

// Bootstrap routes
require('./config/routes')(app)


http.createServer(app).listen(app.get('port'), function(){  
  console.log("Express server listening on port " + app.get('port'));
});
