'use strict';

const orderValidators = require('../_validators/order');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/order', async (request, reply) => {
    const result = models.Order.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/order/:id', async (request, reply) => {
    const result = await module.Order.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/order', { schema: orderValidators.addSchema }, async (request, reply) => {
    let order = await collection.insertOne(request.body);
    reply.send(order);
  });

  fastify.put('/order/:id', { schema: orderValidators.addSchema }, async (request, reply) => {
    let order = await collection.insertOne(request.body);
    reply.send(order);
  });
}

module.exports = routes;