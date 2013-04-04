
var format = require('util').format;

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * POST uploads.
 */

exports.upload = function(req, res, next){
	
	req.form.on('progress', function(bytesReceived, bytesExpected) {
        console.log(((bytesReceived / bytesExpected)*100) + "% uploaded");
    });

    req.form.on('end', function() {
        console.log(req.files);
        // res.send("well done");
        res.send(format('\nuploaded %s (%d Kb) to %s as %s'
			, req.files.file.name
			, req.files.file.size / 1024 | 0 
			, req.files.file.path
			, req.body.title));

    });

};
