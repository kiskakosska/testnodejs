var mongoose = require('mongoose');

var admin = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    admin: {
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
    root: 
    {
       root: Number
    }
});

var Admin = mongoose.model('admins', admin);

module.exports = Admin;