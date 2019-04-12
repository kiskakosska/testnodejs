'use strict';

const reviewValidators = require('../_validators/review');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/review', async (request, reply) => {
    const result = models.Review.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/review/:id', async (request, reply) => {
    const result = await module.Review.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/review', { schema: reviewValidators.addSchema }, async (request, reply) => {
    let review = await collection.insertOne(request.body);
    reply.send(review);
  });

  fastify.put('/review/:id', { schema: reviewValidators.addSchema }, async (request, reply) => {
    let review = await collection.insertOne(request.body);
    reply.send(review);
  });
}

module.exports = routes;