'use strict';

const servicesValidators = require('../_validators/services');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/services', async (request, reply) => {
    const result = models.Services.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/services/:id', async (request, reply) => {
    const result = await module.Services.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/services', { schema: servicesValidators.addSchema }, async (request, reply) => {
    let services = await collection.insertOne(request.body);
    reply.send(services);
  });

  fastify.put('/services/:id', { schema: servicesValidators.addSchema }, async (request, reply) => {
    let services = await collection.insertOne(request.body);
    reply.send(services);
  });
}

module.exports = routes;