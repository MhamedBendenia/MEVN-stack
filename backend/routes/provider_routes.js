/**
*  @swagger
*   components:
*     schemas:
*       Provider:
*         type: object
*         required:
*           - name
*         properties:
*           _id:
*             type: string
*             description: The auto-generated id of the provider.
*           name:
*             type: string
*             description: The name of the provider.
*/

const express = require('express');
const router = express.Router();
const API = require("../controllers/provider_api");

// defining routes
router.get("", API.fetchAllProviders);
router.get("/:id", API.fetchProviderById);
router.post("/", API.addProvider);
router.patch("/:id", API.updateProvider);
router.delete("/:id", API.deleteProvider);

module.exports = router;