'use strict';
const express = require('express');

const authRouter = require('./routes/auth-router');
const commentRouter = require('./routes/comment-router');
const postsRouter = require('./routes/posts-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentRouter);

module.exports = router;
