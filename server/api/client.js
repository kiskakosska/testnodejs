'use strict';

const clientValidators = require('../_validators/client');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/clients', async (request, reply) => {
    const result = await models.Client.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/clients/:id', async (request, reply) => {
    const result = await models.Client.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/clients', { schema: clientValidators.addSchema }, async (request, reply) => {
    let clients = await models.Client.create(request.body);
    reply.send(clients);
  });

  fastify.put('/clients/:id', { schema: clientValidators.addSchema }, async (request, reply) => {
    let clients = await models.Client.findByIdAndUpdate(request.body);
    reply.send(clients);
  });

  fastify.delete('/clients/:id', { schema: clientValidators.addSchema }, async (request, reply) => {
    let clients = await models.Client.remove(request.body);
    reply.send(clients);
  });

}

module.exports = routes;