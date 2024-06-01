const express = require("express");
const router = express.Router();

const hotelsController = require("../controllers/hotels.js");
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// GET Requests
router.get("/", hotelsController.getAll);
router.get("/:id", hotelsController.getSingle);

// POST or create Request
router.post('/', isAuthenticated, validation.saveHotel, hotelsController.createHotel);

// PUT or update Request
router.put('/:id', isAuthenticated, validation.saveHotel, hotelsController.updateHotel);

// DELETE Request
router.delete('/:id', isAuthenticated, hotelsController.deleteHotel);

module.exports = router;
