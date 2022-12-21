const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { addCompany, deleteCompany, updateCompany, getCompanyById, getCompany} = require('../controller/companyController')
router.get("/", getCompany)
router.get("/:id", getCompanyById)
router.delete("/:id", deleteCompany)
router.put("/:id", updateCompany)
router.post('/add',addCompany)

module.exports = router
