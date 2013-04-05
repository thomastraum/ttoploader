
var format = require('util').format
	, fs = require('fs')
	, path = require('path');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'TToploader' });
};

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

			var newPath = path.resolve( __dirname, "../" , "public/media/images/", req.files.file.name);
			fs.writeFile(newPath, data, function (err) {

				if (err) res.send(err);
				else {

					// save to db
					// include imager in db save

					res.send(format('\nuploaded %s (%d Kb) to %s as %s'
						, req.files.file.name
						, req.files.file.size / 1024 | 0 
						, req.files.file.path
						, req.body.title));
				}

			});
		});
	});
};
