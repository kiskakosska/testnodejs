'use strict';

const offerValidators = require('../_validators/offer');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/offer', async (request, reply) => {
    const result = models.Offer.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/offer/:id', async (request, reply) => {
    const result = await module.Offer.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/offer', { schema: offerValidators.addSchema }, async (request, reply) => {
    let offer = await collection.insertOne(request.body);
    reply.send(offer);
  });

  fastify.put('/offer/:id', { schema: offerValidators.addSchema }, async (request, reply) => {
    let offer = await collection.insertOne(request.body);
    reply.send(offer);
  });
}

module.exports = routes;