import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'tuto-bucket',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

export default upload;
