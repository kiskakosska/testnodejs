var mongoose = require('mongoose');

var review = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    idorder: Number,
    dscr: String,
    photo: {
        id: Number,
        url: Buffer
    },
    time: Date,
    ip: String
});

var Review = mongoose.model('review', review);

module.exports = Review;