'use strict';

const servicesValidators = require('../_validators/services');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/services', async (request, reply) => {
    const result = await models.Services.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/services/:id', async (request, reply) => {
    const result = await models.Services.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/services', { schema: servicesValidators.addSchema }, async (request, reply) => {
    let services = await models.Services.create(request.body);
    reply.send(services);
  });

  fastify.put('/services/:id', { schema: servicesValidators.addSchema }, async (request, reply) => {
    let services = await models.Services.findByIdAndUpdate(request.body);
    reply.send(services);
  });

  fastify.delete('/services/:id', { schema: servicesValidators.addSchema }, async (request, reply) => {
    let services = await models.Services.remove(request.body);
    reply.send(services);
  });

}

module.exports = routes;