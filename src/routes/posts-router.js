const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const s3Storage = require('multer-s3');

const PostsController = require('../controllers/post-controller');
const { authentication } = require('../middlewares/auth-mw');

const postsRouter = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const upload = multer({
  storage: s3Storage({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: s3Storage.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

postsRouter.get('/', PostsController.showPosts);
postsRouter.get('/:id', PostsController.getPost);

postsRouter.use(authentication);
postsRouter.post('/', upload.single('image'), PostsController.createPost);
postsRouter.delete('/:id', PostsController.deletePost);

module.exports = postsRouter;
