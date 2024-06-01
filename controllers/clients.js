const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  // GET Request
  //#swagger.tags=['Clients']
  const result = await mongodb.getDatabase().db().collection('clients').find();
  result.toArray().then((clients) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(clients);
  });
};

const getSingle = async (req, res) => { // GET Request
  //#swagger.tags=['Clients']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must have a valid client id to get a single client');
  }
  const clientId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientId });
  result.toArray().then((clients) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(clients);
  });
};

const createClient = async (req, res) => { // POST Request
  //#swagger.tags=['Clients']
  const client = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    birthdate: req.body.birthdate,
    email: req.body.email,
    membershipStatus: req.body.membershipStatus,
    membershipTier: req.body.membershipTier
  };
  const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the client.');
  }
};

const updateClient = async (req, res) => { // PUT Request
  //#swagger.tags=['Clients']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid client id to update a client');
  }
  const clientId = new ObjectId(req.params.id);
  const client = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    birthdate: req.body.birthdate,
    email: req.body.email,
    membershipStatus: req.body.membershipStatus,
    membershipTier: req.body.membershipTier
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('clients')
    .replaceOne({ _id: clientId }, client);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the client.');
  }
};

const deleteClient = async (req, res) => { // DELETE Request
  //#swagger.tags=['Clients']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid client id to delete a client');
  }
  const clientId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('clients')
    .deleteOne({ _id: clientId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the client.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createClient,
  updateClient,
  deleteClient
};
