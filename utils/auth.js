const withAuth = (req, res, next) => {
    // if not logged in, then redirect to login
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;