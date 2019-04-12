'use strict';

const clientValidators = require('../_validators/client');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/clients', async (request, reply) => {
    const result = models.Client.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });


  fastify.get('/clients/:id', async (request, reply) => {
    const result = await module.Client.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/clients', { schema: clientValidators.addSchema }, async (request, reply) => {
    let client = await collection.insertOne(request.body);
    reply.send(client);
  });

  fastify.put('/clients/:id', { schema: clientValidators.addSchema }, async (request, reply) => {
    let client = await collection.insertOne(request.body);
    reply.send(client);
  });
}

module.exports = routes;