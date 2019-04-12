var mongoose = require('mongoose');

var executors = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    executors: {
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
    public: Boolean,
    schet: 
    {
        numbersch: Number,
        nBtc: Number,
        nCard: Number,
        nWM: Number
    },
    blocked: Boolean,
    timeblock: Date,
    timeblocknow: Date,
    orderAmount: Number,
    timeout: Date,
    services: 
    [{
        id: Number,
        name: String
    }],
    tarifid: Number,
    freeclick: Number,
    price: Number
    
});

var Executors = mongoose.model('executors', executors);

module.exports = Executors;