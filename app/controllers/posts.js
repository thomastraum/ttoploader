var mongoose = require('mongoose')
  , Imager = require('imager')
  , async = require('async')
  , Post = mongoose.model('Post')
  , _ = require('underscore')

/**
 * New article
 */

exports.new = function(req, res){
	res.render('posts/new', {
		title: 'New Post',
		post: new Post({})
	})
}

/**
 * Create an post
 */

exports.create = function (req, res) {

	var post = new Post( {body:req.files.file.name} ); //req.body)

	post.uploadAndSave(req.files.file, function (err) {
		
		if (err) {
			res.render('500', {
				title: "500",
				error: err
			})
		}
		else {
			res.json({
				post:post
			}); // '/posts/'+post._id'
		}

	});
}

/**
 * List of Posts
 */

exports.index = function(req, res){
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 40
	var options = {
		perPage: perPage,
		page: page,
	}

	Post.list(options, function(err, posts) {
		if (err) return res.render('500')
		Post.count().exec(function (err, count) {

			// console.log( posts );

			res.render('posts/index', {
				title: 'List of Posts',
				posts: posts,
				page: page,
				pages: count / perPage
			})
		})
	})
}