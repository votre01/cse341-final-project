const express = require("express");
const router = express.Router();

const bookingsController = require("../controllers/bookings.js");
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// GET Requests
router.get("/", bookingsController.getAll);
router.get("/:id", bookingsController.getSingle);

// POST or create Request
router.post('/', isAuthenticated, validation.saveBooking, bookingsController.createBooking);

// PUT or update Request
router.put('/:id', isAuthenticated, validation.saveBooking, bookingsController.updateBooking);

// DELETE Request
router.delete('/:id', isAuthenticated, bookingsController.deleteBooking);

module.exports = router;
