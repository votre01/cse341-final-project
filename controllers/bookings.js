const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  // GET Request
  //#swagger.tags=['Bookings']
  const result = await mongodb.getDatabase().db().collection('bookings').find();
  result.toArray().then((bookings) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(bookings);
  });
};

const getSingle = async (req, res) => { // GET Request
  //#swagger.tags=['Bookings']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must have a valid booking id to get a single booking');
  }
  const bookingId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('bookings').find({ _id: bookingId });
  result.toArray().then((bookings) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(bookings);
  });
};

const createBooking = async (req, res) => { // POST Request
  //#swagger.tags=['Bookings']
  const booking = {
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    roomType: req.body.roomType,
    roomNumber : req.body.roomNumber,
    numOfGuests: req.body.numOfGuests,
    totalPrice: req.body.totalPrice,
    bookingDate : req.body.bookingDate
  };
  const response = await mongodb.getDatabase().db().collection('bookings').insertOne(booking);
  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the booking.');
  }
};

const updateBooking = async (req, res) => { // PUT Request
  //#swagger.tags=['Bookings']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid booking id to update a booking');
  }
  const bookingId = new ObjectId(req.params.id);
  const booking = {
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    roomType: req.body.roomType,
    roomNumber : req.body.roomNumber,
    numOfGuests: req.body.numOfGuests,
    totalPrice: req.body.totalPrice,
    bookingDate : req.body.bookingDate
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('bookings')
    .replaceOne({ _id: bookingId }, booking);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the booking.');
  }
};

const deleteBooking = async (req, res) => { // DELETE Request
  //#swagger.tags=['Bookings']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid booking id to delete a booking');
  }
  const bookingId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('bookings')
    .deleteOne({ _id: bookingId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the booking.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBooking,
  updateBooking,
  deleteBooking
};
