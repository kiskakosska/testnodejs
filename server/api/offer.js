'use strict';

const offerValidators = require('../_validators/offer');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/offer', async (request, reply) => {
    const result = await models.Offer.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/offer/:id', async (request, reply) => {
    const result = await models.Offer.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/offer', { schema: offerValidators.addSchema }, async (request, reply) => {
    let offer = await models.Offer.create(request.body);
    reply.send(offer);
  });

  fastify.put('/offer/:id', { schema: offerValidators.addSchema }, async (request, reply) => {
    let offer = await models.Offer.findByIdAndUpdate(request.body);
    reply.send(offer);
  });

  fastify.delete('/offer/:id', { schema: offerValidators.addSchema }, async (request, reply) => {
    let offer = await models.Offer.remove(request.body);
    reply.send(offer);
  });

}

module.exports = routes;