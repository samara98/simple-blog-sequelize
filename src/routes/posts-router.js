const express = require('express');

const PostsController = require('../controllers/post-controller');
const upload = require('../helpers/upload-helper');
const { authentication } = require('../middlewares/auth-mw');

const postsRouter = express.Router();

postsRouter.get('/', PostsController.showPosts);
postsRouter.get('/:id', PostsController.getPost);

postsRouter.use(authentication);
postsRouter.post('/', upload.single('image'), PostsController.createPost);
postsRouter.delete('/:id', PostsController.deletePost);

module.exports = postsRouter;
