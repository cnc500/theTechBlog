const router = require("express").Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    const serializedUser = userData.map((user) => user.get({ plain: true }));
    console.log(serializedUser);
    res.render("homepage", {
      serializedUser,
    });
  } catch (err) {
    res.status(404).json("Error");
  }
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
