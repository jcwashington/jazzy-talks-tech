const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//get all posts and render page
router.get('/', async (req, res) => {
    try{
        const postsData = await Post.findAll({
            include: [ User ]
        });

        //serialize data for template
        const posts = postsData.map((post) => post.get({ plain:true }));
        res.render('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [ User, 
                {
                    model: Comment,
                    include: [ User ] //need to know what user made comment
                },
            ],
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('one-post', { post });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(500).json(err);
    }
})

// render login unless already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

// render signup unless already logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
})

module.exports = router;