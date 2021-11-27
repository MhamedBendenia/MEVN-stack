/**
*  @swagger
*   components:
*     schemas:
*       Client:
*         type: object
*         required:
*           - name
*           - email
*           - phone
*         properties:
*           _id:
*             type: string
*             description: The auto-generated id of the client.
*           name:
*             type: string
*             description: The name of the client.
*           email:
*             type: string
*             description: The client email address.
*           phone:
*             type: string
*             description: The client phone number.
*           providers:
*             type: Objects list.
*             description: The client providers.
*/

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