const fastifyPlugin = require('fastify-plugin')
async function client (fastify, options) {
var client = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
            fname: String,
        lname: String,
        name: String
    },
    number: Number,
    login: String,
    password: String,
    isActive: Boolean,
    IsOnline: Boolean,
    email: String,
    date: Date,
    rating:  Number,
    avatar: String,
    adress: String,
    account: String,
    orderAmount:  Number
});
fastify.decorate('mongoose', client)
}

module.exports = fastifyPlugin(client)