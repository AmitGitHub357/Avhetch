const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { addNewUser, deleteNewUser, updateNewUser, getNewUserById, getNewUser} = require('../controller/newUserController')
router.get("/", getNewUser)
router.get("/:id", getNewUserById)
router.delete("/:id", deleteNewUser)
router.put("/:id", updateNewUser)
router.post('/add',addNewUser)

module.exports = router
