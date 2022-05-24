const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
// Redirects user to login page if not logged in  
    res.redirect("/login");
  } else {
// User is allowed access if logged in
    next();
  }
};

module.exports = withAuth;


