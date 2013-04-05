
/**
 * Module dependencies.
 */
var Dropload = require('dropload');
var $ = require('jquery');


/**
 * App.
 */

var drop = Dropload(document.getElementById('drop'));

drop.on('error', function(err){
	console.error(err.message);
});

drop.on('upload', function(upload){
	
	console.log('uploading %s', upload.file.name);

	upload.on('progress', function(e){
		console.log( e );
	});

    upload.on('end', function(res){
		assert(200 == res.status, '200 response');
		done();
    });

});

drop.on('text', function(str){
	console.log('text "%s"', str);
});

drop.on('url', function(str){
	console.log('url "%s"', str);
});

drop.on('html', function(str){
	console.log('html "%s"', str);
});


$(function() {

	console.log("ready!");
});
