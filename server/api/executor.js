'use strict';

const executorValidators = require('../_validators/executor');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/executor', async (request, reply) => {
    const result = await models.Executor.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/executor/:id', async (request, reply) => {
    const result = await models.Executor.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/executor', { schema: executorValidators.addSchema }, async (request, reply) => {
    let executor = await models.Executor.create(request.body);
    reply.send(executor);
  });

  fastify.put('/executor/:id', { schema: executorValidators.addSchema }, async (request, reply) => {
    let executor = await models.Executor.findByIdAndUpdate(request.body);
    reply.send(executor);
  });

  fastify.delete('/executor/:id', { schema: executorValidators.addSchema }, async (request, reply) => {
    let executor = await models.Executor.remove(request.body);
    reply.send(executor);
  });

}

module.exports = routes;