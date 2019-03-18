const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose');

async function dbConnector (fastify, options) {
  const url = options.url
  delete options.url

  const db = await mongoose.connect(url, options)
  fastify.decorate('mongoose', db)
}

module.exports = fastifyPlugin(dbConnector)
