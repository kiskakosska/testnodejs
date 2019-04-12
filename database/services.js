var mongoose = require('mongoose');

var services = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    price: Number,
    descr: String,
    comm: String
});

var Services = mongoose.model('services', services);

module.exports = Services;