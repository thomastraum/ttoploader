
var mongoose = require('mongoose')
	, Post = mongoose.model('Post')
	, async = require('async')

module.exports = function (app) {


	// upload routes
	var uploads = require('../app/controllers/uploads')
	// app.post('/upload', uploads.upload );

	// post routes
	var posts = require('../app/controllers/posts')
	app.get('/posts', posts.index)
	// app.get('/posts/new', posts.new)
	// app.post('/posts', posts.create)
	app.post('/upload', posts.create );

	// app.get('/posts/:id', posts.show)
	// app.get('/posts/:id/edit', posts.edit)
	// app.put('/posts/:id', posts.update)
	// app.del('/posts/:id', posts.destroy)

	// app.param('id', posts.post)

	// home route
	app.get('/', posts.index)

}
