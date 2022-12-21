const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
  getFileList,
  deleteFile,
  addFile,
  downloadFile,
} = require("../controller/awsController");
const dotenv = require("dotenv").config();
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");

aws.config.update({
  region: process.env.REGION,
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
});

const s3 = new aws.S3();
const BUCKET = process.env.BUCKET;
const upload = multer({
  storage: multerS3({
    bucket: BUCKET,
    s3: s3,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.get("/list", getFileList);
router.get("/download/:filename", downloadFile);
router.delete("/delete/:filename", deleteFile);
router.post(
  "/add", 
  authenticate,
  upload.single('file'),
  addFile
);

module.exports = router;