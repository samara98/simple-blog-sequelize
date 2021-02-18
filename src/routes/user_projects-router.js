const express = require('express');

const UserProjectsController = require('../controllers/user_projects-controller');
const upload = require('../helpers/upload-helper');
const { authentication } = require('../middlewares/auth-mw');

const userProjectsRouter = express.Router();

userProjectsRouter.get('/', UserProjectsController.showUserProjects);
// userProjectsRouter.get('/:id', UserProjectsController.getPost);

// userProjectsRouter.use(authentication);
// userProjectsRouter.post('/', upload.single('image'), UserProjectsController.createPost);
// userProjectsRouter.delete('/:id', UserProjectsController.deletePost);

module.exports = userProjectsRouter;
