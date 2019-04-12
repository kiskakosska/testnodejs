
var mongoose = require('mongoose');

var anketa = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    type: String,
    photo:[{
        id: Number,
        url: Buffer
    }],
    video:[{
        id: Number,
        url: Buffer
    }],
    services: 
    [{
        id: Number,
        name: String
    }],
    about: String,
    age: Number,
    params: [{
        id: Number,
        name: String
    }],
    status: String
});

var Anketa = mongoose.model('anketa', anketa);

module.exports = Anketa;
