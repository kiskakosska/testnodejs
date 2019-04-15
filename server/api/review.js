'use strict';

const reviewValidators = require('../_validators/review');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/review', async (request, reply) => {
    const result = await models.Review.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/review/:id', async (request, reply) => {
    const result = await models.Review.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/review', { schema: reviewValidators.addSchema }, async (request, reply) => {
    let review = await models.Review.create(request.body);
    reply.send(review);
  });

  fastify.put('/review/:id', { schema: reviewValidators.addSchema }, async (request, reply) => {
    let review = await models.Review.findByIdAndUpdate(request.body);
    reply.send(review);
  });

  fastify.delete('/review/:id', { schema: reviewValidators.addSchema }, async (request, reply) => {
    let review = await models.Review.remove(request.body);
    reply.send(review);
  });

}

module.exports = routes;