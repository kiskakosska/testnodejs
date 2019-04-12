'use strict';

const tarifValidators = require('../_validators/tarif');

async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/tarif', async (request, reply) => {
    const result = models.Tarif.find(function (err, results) {
      if (results === null) {
        throw new Error('Invalid value')
      }
      console.log(results)
      reply.send(results);
    });
  });

  fastify.get('/tarif/:id', async (request, reply) => {
    const result = await module.Tarif.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/tarif', { schema: tarifValidators.addSchema }, async (request, reply) => {
    let tarif = await collection.insertOne(request.body);
    reply.send(tarif);
  });

  fastify.put('/tarif/:id', { schema: tarifValidators.addSchema }, async (request, reply) => {
    let tarif = await collection.insertOne(request.body);
    reply.send(tarif);
  });
}

module.exports = routes;