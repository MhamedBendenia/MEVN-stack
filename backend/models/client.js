const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }],
});

module.exports = mongoose.model('Client', clientSchema);
