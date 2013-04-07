
/**
 * Module dependencies.
 */
var Dropload = require('dropload')
	, $ = require('jquery')
	, ejs = require('ejs')
	, dialog = require('dialog');

 /* Dropload
--------------------------------------------------------------------------------------------------*/
var drop = Dropload(document.getElementById('drop'));

drop.on('error', function(err){
	console.error(err.message);
});

drop.on('upload', function(upload){
	
	console.log('uploading %s', upload.file.name);

	var uploadDialog = dialog("uploading...").modal().show();

	upload.on('progress', function(e){
		console.log( e );
	});

    upload.on('end', function(res){
    	uploadDialog.hide();

    	var resJson = $.parseJSON( res.responseText );
    	POSTS.appendPost(resJson.post);
    	POSTS.scrollToLastPost();
    });

    upload.on('load', function () {
    });

	upload.to('/upload');

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



 /* POSTS
--------------------------------------------------------------------------------------------------*/
POSTS = {

	init: function (postsData) {
		POSTS.renderPosts(postsData);
	},

	getElement: function () {
		return $('div#posts');
	},

	appendPost: function(postData) {
		ejs.render('/templates/postTemplate', postData, function(err, html) {
		    POSTS.getElement().append( html );
		});
	},

	renderPosts: function(postsData) {
		postsData.forEach( function (post) {
			POSTS.appendPost( post );
		});
	},

	scrollToLastPost : function (post) {
		// if ( $(getLastElement()).offset().top > $(window).scrollTop() ) {
			// console.log($('.post').last());

			$('html, body').animate({scrollTop: $('.post').last().offset().top + $('.post').last().height() }, 100);
		// }
	}
}


 /* window on load
--------------------------------------------------------------------------------------------------*/
$(function() {

	POSTS.init( postsDataInit );
	console.log("ready!");

});
