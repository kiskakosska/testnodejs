var mongoose = require('mongoose');

var client = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    client: {
        dname: String,
        fname: String,
        lname: String,
        number: Number,
        profilePicture: Buffer,
        adress: String,
    },
    login: String,
    password: String,
    isActive: Boolean,
    IsOnline: Boolean,
    email: String,
    created: { 
        type: Date,
        default: Date.now
    },
    schet: 
    {
        numbersch: Number,
        nBtc: Number,
        nCard: Number,
        nWM: Number
    },
    public: Boolean,
    blocked: Boolean,
    timeblock: Date,
    timeblocknow: Date,
    orderAmount: Number,
    timeout: Date,
    diapazon: 
    {
        amountmin: Number,
        amountmax: Number
    }
});

var Client = mongoose.model('clients', client);

module.exports = Client;