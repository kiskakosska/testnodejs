'use strict';

const tarifValidators = require('../_validators/tarif');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/tarif', async (request, reply) => {
    const result = await models.Tarif.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/tarif/:id', async (request, reply) => {
    const result = await models.Tarif.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/tarif', { schema: tarifValidators.addSchema }, async (request, reply) => {
    let tarif = await models.Tarif.create(request.body);
    reply.send(tarif);
  });

  fastify.put('/tarif/:id', { schema: tarifValidators.addSchema }, async (request, reply) => {
    let tarif = await models.Tarif.findByIdAndUpdate(request.body);
    reply.send(tarif);
  });

  fastify.delete('/tarif/:id', { schema: tarifValidators.addSchema }, async (request, reply) => {
    let tarif = await models.Tarif.remove(request.body);
    reply.send(tarif);
  });

}

module.exports = routes;