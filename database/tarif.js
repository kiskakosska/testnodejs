var mongoose = require('mongoose');

var tarif = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    comission: Number,
    click: Number
});

var Tarif = mongoose.model('tarif', tarif);

module.exports = Tarif;