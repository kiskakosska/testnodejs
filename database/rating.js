var mongoose = require('mongoose');

var rating = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
ratings: [
    {
        summary: String,
        detail: String,
        numberOfStars: Number,
        created: { 
            type: Date,
            default: Date.now
        }
    }
],
});

var Rating = mongoose.model('rating',rating);

module.exports = Rating;