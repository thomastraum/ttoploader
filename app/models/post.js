
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
	, Imager = require('imager')
	, env = process.env.NODE_ENV || 'development'
	, config = require('../../config/config')[env]
	, imagerConfig = require(config.root + '/config/imager.js')
	, Schema = mongoose.Schema

/**
 * Post Schema
 */

var PostSchema = new Schema({
	// title: {type : String, default : '', trim : true},
	body: {type : String, default : '', trim : true},
	// user: {type : Schema.ObjectId, ref : 'User'},
	// tags: {type: [], get: getTags, set: setTags},
	image: {
		cdnUri: String,
		files: []
	},
	createdAt  : {type : Date, default : Date.now}
})

/**
 * Pre-remove hook
 */

PostSchema.pre('remove', function (next) {
	var imager = new Imager(imagerConfig, 'S3')
	var files = this.image.files

	// if there are files associated with the item, remove from the cloud too
	imager.remove(files, function (err) {
		if (err) return next(err)
	}, 'post')

	next()
})

/**
 * Methods
 */

PostSchema.methods = {

	/**
	 * Save post and upload image
	 *
	 * @param {Object} images
	 * @param {Function} cb
	 * @api public
	 */

	uploadAndSave: function (image, cb) {

		var imager = new Imager(imagerConfig, 'S3')
		var self = this

		imager.upload([image], function (err, cdnUri, files) {
			if (err) return cb(err)
			if (files.length) {
				self.image = { cdnUri : cdnUri, files : files }
			}
			console.log( err, cdnUri, files );
			self.save(cb)
		}, 'post')
	}

}

/**
 * Statics
 */

PostSchema.statics = {

	/**
	 * Find post by id
	 *
	 * @param {ObjectId} id
	 * @param {Function} cb
	 * @api public
	 */

	load: function (id, cb) {
		this.findOne({ _id : id })
			// .populate('user', 'name')
			// .populate('comments.user')
			.exec(cb)
	},

	/**
	 * List posts
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 * @api public
	 */

	list: function (options, cb) {
		var criteria = options.criteria || {}

		this.find(criteria)
			// .populate('user', 'name')
			.sort('-createdAt') // sort by date
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb)
	}

}

mongoose.model('Post', PostSchema)
