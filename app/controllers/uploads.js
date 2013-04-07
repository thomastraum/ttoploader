var format = require('util').format
	, fs = require('fs')
	, path = require('path')
	, env = process.env.NODE_ENV || 'development'
	, config = require('../../config/config')[env]
	, postcontroller = require('./posts.js')
/*
 * POST uploads.
 */

exports.upload = function(req, res, next){
	
	req.form.on('progress', function(bytesReceived, bytesExpected) {
		var percent = ((bytesReceived / bytesExpected)*100);
		console.log( percent + "% uploaded");
	});

	req.form.on('end', function() {

		fs.readFile(req.files.file.path, function (err, data) {

			var newPath = path.resolve( config.root , "public/media/images/", req.files.file.name);
			fs.writeFile(newPath, data, function (err) {


				postcontroller.create( req, res );

				// if (err) {
				// 	res.send(500, { error: err });
				// } 
				// else {
				// 	res.send(format('\nuploaded %s (%d Kb) to %s as %s'
				// 		, req.files.file.name
				// 		, req.files.file.size / 1024 | 0 
				// 		, req.files.file.path
				// 		, req.body.title));
				// }

			});
		});
	});
};
