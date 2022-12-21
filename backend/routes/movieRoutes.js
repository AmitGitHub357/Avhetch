const multer = require("multer");
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authenticate");
const path = require('path')

const {
    removeById,
    addedMoviesList,
    createMovieList,
    getByUserId,
    getByTitle,
    sendEmail

} = require("../controller/movieController");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
// const upload = multer({ storage: storage });
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
router.get("/search/:movieName",getByTitle)
router.get("/:id", getByUserId)
router.route('/').post(authenticate,upload.fields([{   //authenticate,
  name : 'previewImage'
}]) ,createMovieList)
router.get("/", addedMoviesList)
router.post("/sendEmail",sendEmail)
// router.post("/",upload.fields([{ name: "images" }]), createMovieList);
router.delete("/:id", removeById)
module.exports = router; 
