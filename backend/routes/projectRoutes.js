const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authenticate } = require("../middleware/authenticate");
const {
  addProject,
  deleteProject,
  updateProject,
  getProjectByCompanyName,
  listByStatus,
  getProjectById,
  getProject,
} = require("../controller/ProjectController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "." + Date.now());
  },
});

const upload = multer({ storage: storage });
router.get("/filterList", listByStatus);
router.get("/", getProject);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.route("/add").post(upload.fields([{ name: "images" }]), addProject);
module.exports = router;
