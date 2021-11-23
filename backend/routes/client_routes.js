const express = require('express');
const router = express.Router();
const API = require("../controllers/client_api");

// defining routes
router.get("", API.fetchAllClients);
router.get("/:id", API.fetchClientById);
router.post("/", API.addClient);
router.patch("/:id", API.updateClient);
router.delete("/:id", API.deleteClient);
router.post("/attach", API.attachProviderToClient);
router.post("/detach", API.detachProviderFromClient);


module.exports = router;