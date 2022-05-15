const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comment.json');

const injectData = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(userData);

    for (const post of postData) {
		await Post.create({
			...post,
			user_id: Math.floor(Math.random() * userData.length+1),
		});
	}

	for (const comment of commentData) {
		await Comment.create({
			...comment,
			user_id: Math.floor(Math.random() * userData.length+1),
            post_id: Math.floor(Math.random() * postData.length+1),
		});
	}


	process.exit(0);
};

injectData();
