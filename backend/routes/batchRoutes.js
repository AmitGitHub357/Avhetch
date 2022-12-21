const express = require("express");
const router = express.Router();
const { authenticate } = require('../middleware/authenticate')
const { addBatch, deleteBatch, updateBatch, getBatchById, getBatch} = require('../controller/batchController')
router.get("/", getBatch)
router.get("/:id", getBatchById)
router.delete("/:id", deleteBatch)
router.put("/:id", updateBatch)
router.post('/add',addBatch)

module.exports = router
