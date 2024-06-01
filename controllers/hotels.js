const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  // GET Request
  //#swagger.tags=['Hotels']
  const result = await mongodb.getDatabase().db().collection('hotels').find();
  result.toArray().then((hotels) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(hotels);
  });
};

const getSingle = async (req, res) => { // GET Request
  //#swagger.tags=['Hotels']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must have a valid hotel id to get a single hotel');
  }
  const hotelId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('hotels').find({ _id: hotelId });
  result.toArray().then((hotels) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(hotels);
  });
};

const createHotel = async (req, res) => { // POST Request
  //#swagger.tags=['Hotels']
  const hotel = {
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
    roomsAvailable: req.body.roomsAvailable,
    amenities: req.body.amenities,
    pricePerNight: req.body.pricePerNight,
    contactEmail: req.body.contactEmail
  };
  const response = await mongodb.getDatabase().db().collection('hotels').insertOne(hotel);
  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the hotel.');
  }
};

const updateHotel = async (req, res) => { // PUT Request
  //#swagger.tags=['Hotels']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid hotel id to update a hotel');
  }
  const hotelId = new ObjectId(req.params.id);
  const hotel = {
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
    roomsAvailable: req.body.roomsAvailable,
    amenities: req.body.amenities,
    pricePerNight: req.body.pricePerNight,
    contactEmail: req.body.contactEmail
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('hotels')
    .replaceOne({ _id: hotelId }, hotel);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the hotel.');
  }
};

const deleteHotel = async (req, res) => { // DELETE Request
  //#swagger.tags=['Hotels']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid hotel id to delete a hotel');
  }
  const hotelId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('hotels')
    .deleteOne({ _id: hotelId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the hotel.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createHotel,
  updateHotel,
  deleteHotel
};
