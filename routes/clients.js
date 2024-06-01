const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/clients.js");
const validation = require('../middleware/validate.js');

// GET Requests
router.get("/", clientsController.getAll);
router.get("/:id", clientsController.getSingle);

// POST or create Request
router.post('/', validation.saveClient, clientsController.createClient);

// PUT or update Request
router.put('/:id', validation.saveClient, clientsController.updateClient);

// DELETE Request
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
