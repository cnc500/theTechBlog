const router = require('express').Router();
const res = require('express/lib/response');
const Post = require('../models');

// const apiRoutes = require('./api');
const { Post, Comment } = require('../models');
// const homeRoutes = require('./homeRoutes');

router.get('/post', (req, res) => {
    console.log('GET POST');
});

router.get('/post', async (req, res) => {
	try {
        console.log('GET POST');
		const allPost = await Post.findAll();
		const serializedPost = allPost.map((post) =>
			post.get({ plain: true })
		);
		console.log(serializedPost);
		res.render('home', { serializedPost });
	} catch (err) {
		res.status(404).json('');
	}
});

module.exports = router;