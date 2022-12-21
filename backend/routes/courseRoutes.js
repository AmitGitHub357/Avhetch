const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { addCourse, deleteCourse, updateCourse,getStudentCourseDetail, getCourseById, getCourse, getStudentCourse } = require('../controller/courseController')
router.get("/studentCourse", getStudentCourse)
router.get("/studentCourseDetail", getStudentCourseDetail)
router.get("/", getCourse)
router.get("/:id", getCourseById)
router.delete("/:id", deleteCourse)
router.put("/:id", updateCourse)
router.post('/add',authenticate,addCourse)

module.exports = router
