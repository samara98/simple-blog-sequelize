const AWS = require('aws-sdk');
const multer = require('multer');
const s3Storage = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// const diskStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'public/images');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const postfix =
//       file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
//         ? '.jpg'
//         : file.mimetype === 'image/png'
//         ? '.png'
//         : '';
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${postfix}`);
//   },
// });
const bucketStorage = s3Storage({
  s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  acl: 'public-read',
  contentType: s3Storage.AUTO_CONTENT_TYPE,
  metadata(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: bucketStorage,
  fileFilter(req, file, cb) {
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

module.exports = upload;
