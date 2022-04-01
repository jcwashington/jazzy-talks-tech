const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// let logged in users make comments on posts

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.comment_content,
        userId: req.session.userId,
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;