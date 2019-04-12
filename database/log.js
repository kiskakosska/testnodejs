var mongoose = require('mongoose');

var log = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    iduser: Number,
    name: String,
    time: Date,
    ip: String,
    comment: String
});

var Log = mongoose.model('log', log);

module.exports = Log;