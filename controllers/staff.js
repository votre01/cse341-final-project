const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  // GET Request
  //#swagger.tags=['Staff']
  const result = await mongodb.getDatabase().db().collection('staff').find();
  result.toArray().then((staff) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(staff);
  });
};

const getSingle = async (req, res) => { // GET Request
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must have a valid staff id to get a single staff member');
  }
  const staffId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('staff').find({ _id: staffId });
  result.toArray().then((staff) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(staff);
  });
};

const createStaff = async (req, res) => { // POST Request
  //#swagger.tags=['Staff']
  const staffMember = {
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    email: req.body.email,
    phone: req.body.phone,
    hireDate: req.body.hireDate,
    salary: req.body.salary
  };
  const response = await mongodb.getDatabase().db().collection('staff').insertOne(staffMember);
  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the staff member.');
  }
};

const updateStaff = async (req, res) => { // PUT Request
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid staff id to update a staff member');
  }
  const staffId = new ObjectId(req.params.id);
  const staffMember = {
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    email: req.body.email,
    phone: req.body.phone,
    hireDate: req.body.hireDate,
    salary: req.body.salary
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('staff')
    .replaceOne({ _id: staffId }, staffMember);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the staff member.');
  }
};

const deleteStaff = async (req, res) => { // DELETE Request
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid staff id to delete a staff member');
  }
  const staffId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('staff')
    .deleteOne({ _id: staffId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the staff member.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff
};
