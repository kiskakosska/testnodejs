
var mongoose = require('mongoose');

var transaction = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    idorder: Number,
    comission: Number,
    params: String,
    time: Date,
    IP: String,
    type: String,
    in: String,
    out: String
});

var Transaction = mongoose.model('transaction', transaction);

module.exports = Transaction;
