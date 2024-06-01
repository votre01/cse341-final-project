const express = require("express");
const router = express.Router();

const bookingsController = require("../controllers/bookings.js");
const validation = require('../middleware/validate.js');

// GET Requests
router.get("/", bookingsController.getAll);
router.get("/:id", bookingsController.getSingle);

// POST or create Request
router.post('/', validation.saveBooking, bookingsController.createBooking);

// PUT or update Request
router.put('/:id', validation.saveBooking, bookingsController.updateBooking);

// DELETE Request
router.delete('/:id', bookingsController.deleteBooking);

module.exports = router;
