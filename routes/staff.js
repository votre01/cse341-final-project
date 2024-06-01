const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.js");
const validation = require('../middleware/validate.js');

// GET Requests
router.get("/", staffController.getAll);
router.get("/:id", staffController.getSingle);

// POST or create Request
router.post('/', validation.saveStaff, staffController.createStaff);

// PUT or update Request
router.put('/:id', validation.saveStaff, staffController.updateStaff);

// DELETE Request
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
