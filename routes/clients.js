const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/clients.js");
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// GET Requests
router.get("/", clientsController.getAll);
router.get("/:id", clientsController.getSingle);

// POST or create Request
router.post('/', isAuthenticated, validation.saveClient, clientsController.createClient);

// PUT or update Request
router.put('/:id', isAuthenticated, validation.saveClient, clientsController.updateClient);

// DELETE Request
router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;
