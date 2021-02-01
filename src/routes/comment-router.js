'use strict';
const express = require('express');

const CommentController = require('../controllers/comment-controller');
const { authentication } = require('../middlewares/auth-mw');

const commentRouter = express.Router();

commentRouter.get('/', CommentController.showComments);
commentRouter.get('/:id', CommentController.getComment);

commentRouter.use(authentication);
commentRouter.post('/', CommentController.addComment);
commentRouter.delete('/:id', CommentController.deleteComment);

module.exports = commentRouter;
