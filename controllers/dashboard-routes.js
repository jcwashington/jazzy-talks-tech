const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

//if loggedIn go User's to dashboard, find all their posts and render the user-all-posts page
router.get('/', withAuth, async (req, res) => {
    try {
        const postsData = await Post.findAll({
            where: { userId: req.session.userId },
        });
        // get all their post and make an array
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.render('user-all-posts', {
            layout: 'dashboard', posts
        });
    } catch (err) {
        res.redirect('login')
    }
});

// creating new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// editing posts
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard', post,
            });
        } else {
            res.status(404).end();
        }
    } catch(err) {
        res.redirect('login');
    }
});

module.exports = router;