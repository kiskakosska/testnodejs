'use strict';

const anketaValidators = require('../_validators/anketa');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/anketa', async (request, reply) => {
    const result = await models.Anketa.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/anketa/:id', async (request, reply) => {
    const result = await models.Anketa.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/anketa', { schema: anketaValidators.addSchema }, async (request, reply) => {
    let anketa = await models.Anketa.create(request.body);
    reply.send(anketa);
  });

  fastify.put('/anketa/:id', { schema: anketaValidators.addSchema }, async (request, reply) => {
    let anketa = await models.Anketa.findByIdAndUpdate(request.body);
    reply.send(anketa);
  });

  fastify.delete('/anketa/:id', { schema: anketaValidators.addSchema }, async (request, reply) => {
    let anketa = await models.Anketa.remove(request.body);
    reply.send(anketa);
  });

}

module.exports = routes;