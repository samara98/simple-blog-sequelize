const express = require('express');

const ProjectController = require('../controllers/projects-controller');
const upload = require('../helpers/upload-helper');
const { authentication } = require('../middlewares/auth-mw');

const projectsRouter = express.Router();

projectsRouter.get('/', ProjectController.showProjects);
// projectsRouter.get('/:id', ProjectController.getPost);

// projectsRouter.use(authentication);
// projectsRouter.post('/', upload.single('image'), ProjectController.createPost);
// projectsRouter.delete('/:id', ProjectController.deletePost);

module.exports = projectsRouter;
