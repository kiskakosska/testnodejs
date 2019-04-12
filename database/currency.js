
var mongoose = require('mongoose');

var currency = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    params: String,
    Params2: String
});

var Currency = mongoose.model('currency', currency);

module.exports = Currency;
