const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Provider', providerSchema);
