const router = require('express').Router();
const { json } = require('express/lib/response');
const { User } = require('../../models');

router.post('/sign-up', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			password: req.body.password,
		});

		res.status(200).json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // if they do match, return success message
    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/sign-up', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			password: req.body.password,
		});

		res.status(200).json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy;
  }
});


module.exports = router;