// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Swagger config
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const specs = swaggerJsdoc(require('./swagger.json'));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err.message));

// routes prefix
app.use("/api/client", require('./routes/client_routes'));
app.use("/api/provider", require('./routes/provider_routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// start the server
app.listen(port, () => console.log("Server running on http://localhost:" + port));

module.exports = app;