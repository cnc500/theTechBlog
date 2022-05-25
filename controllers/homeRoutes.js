const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes:['id', 'title'],
    include:[{
      model: Comment,
      attributes:['id', 'thought']
    },
    {model: User, attributes:['username']}
  ]
  })
  .then(data => {
    const posts = data.map(post =>post.get({plain: true}))
    res.render('homepage',{posts});

  })
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    pageDescription: "The Tech Blog",
  });
});

router.get("/dashboard", async (req, res) => {
  // Redirect to login if the user is not logged in
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  try {
    posts = [];
    if (req.session.loggedIn) {
      const postData = await Post.findAll({
        where: {
          creator_id: req.session.loggedIn,
        },
      });
      posts = postData.map((post) => post.get({ plain: true }));
    }
    res.render("dashboard", {
      posts: posts,
      pageDescription: "My Dashboard",
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(404).json("Error");
  }
});

router.get("/newPost", async (req, res) => {
  res.render("newPost", {
    pageDescription: "My Dashboard",
    loggedIn: req.session.loggedIn,
  });
});

router.get("/newPost/:id", async (req, res) => {
  try {
    const onePost = await Post.findOne({
      include: [
        {
          model: Comment,
          include: {
            model: User,
          },
        },
        { model: User },
      ],
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(404).json("Error");
  }
});

module.exports = router;
