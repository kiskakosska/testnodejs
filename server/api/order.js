'use strict';

const orderValidators = require('../_validators/order');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/order', async (request, reply) => {
    const result = await models.Order.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/order/:id', async (request, reply) => {
    const result = await models.Order.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/order', { schema: orderValidators.addSchema }, async (request, reply) => {
    let order = await models.Order.create(request.body);
    reply.send(order);
  });

  fastify.put('/order/:id', { schema: orderValidators.addSchema }, async (request, reply) => {
    let order = await models.Order.findByIdAndUpdate(request.body);
    reply.send(order);
  });

  fastify.delete('/order/:id', { schema: orderValidators.addSchema }, async (request, reply) => {
    let order = await models.Order.remove(request.body);
    reply.send(order);
  });

}

module.exports = routes;