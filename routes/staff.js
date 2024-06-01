const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.js");
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// GET Requests
router.get("/", staffController.getAll);
router.get("/:id", staffController.getSingle);

// POST or create Request
router.post('/', isAuthenticated, validation.saveStaff, staffController.createStaff);

// PUT or update Request
router.put('/:id', isAuthenticated, validation.saveStaff, staffController.updateStaff);

// DELETE Request
router.delete('/:id', isAuthenticated, staffController.deleteStaff);

module.exports = router;
