'use strict';

const transactionValidators = require('../_validators/transaction');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/transaction', async (request, reply) => {
    const result = await models.Transaction.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/transaction/:id', async (request, reply) => {
    const result = await models.Transaction.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/transaction', { schema: transactionValidators.addSchema }, async (request, reply) => {
    let transaction = await models.Transaction.create(request.body);
    reply.send(transaction);
  });

  fastify.put('/transaction/:id', { schema: transactionValidators.addSchema }, async (request, reply) => {
    let transaction = await models.Transaction.findByIdAndUpdate(request.body);
    reply.send(transaction);
  });

  fastify.delete('/transaction/:id', { schema: transactionValidators.addSchema }, async (request, reply) => {
    let transaction = await models.Transaction.remove(request.body);
    reply.send(transaction);
  });

}

module.exports = routes;