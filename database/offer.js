
var mongoose = require('mongoose');

var offer = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    idoffer: Number,
    iduser: Number,
    idchat: Number,
    status: Boolean,
    time: String,
    IP: String,
    geo: {
        x: String,
        Y: String
    },
    price: {
        min: Number,
        max: Number
    }
});

var Offer = mongoose.model('offer', offer);

module.exports = Offer;
