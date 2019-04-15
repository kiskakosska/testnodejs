'use strict';

const logValidators = require('../_validators/log');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/log', async (request, reply) => {
    const result = await models.Log.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/log/:id', async (request, reply) => {
    const result = await models.Log.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/log', { schema: logValidators.addSchema }, async (request, reply) => {
    let log = await models.Log.create(request.body);
    reply.send(log);
  });

  fastify.put('/log/:id', { schema: logValidators.addSchema }, async (request, reply) => {
    let log = await models.Log.findByIdAndUpdate(request.body);
    reply.send(log);
  });

  fastify.delete('/log/:id', { schema: logValidators.addSchema }, async (request, reply) => {
    let log = await models.Log.remove(request.body);
    reply.send(log);
  });

}

module.exports = routes;