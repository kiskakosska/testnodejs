
var mongoose = require('mongoose');

var order = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    idoffer: Number,
    iduser: Number,
    status: Boolean,
    idtarif: Number,
    time: String,
    IP: String,
    geo: {
        x: String,
        Y: String
    },
    idreview: Number,
    price: Number
});

var Order = mongoose.model('order', order);

module.exports = Order;
