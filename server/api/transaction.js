'use strict';

const transactionValidators = require('../_validators/transaction');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/transaction', async (request, reply) => {
    const result = models.Transaction.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/transaction/:id', async (request, reply) => {
    const result = await module.Transaction.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/transaction', { schema: transactionValidators.addSchema }, async (request, reply) => {
    let transaction = await collection.insertOne(request.body);
    reply.send(transaction);
  });

  fastify.put('/transaction/:id', { schema: transactionValidators.addSchema }, async (request, reply) => {
    let transaction = await collection.insertOne(request.body);
    reply.send(transaction);
  });
}

module.exports = routes;