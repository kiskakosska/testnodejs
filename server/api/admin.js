'use strict';

const adminValidators = require('../_validators/admin');



async function routes(fastify, options) {

  let models = require('../../database');

  fastify.get('/admin', async (request, reply) => {
    const result = await models.Admin.find();
    // if (!result) {
    //   throw new Error('Invalid value')
    // }
   return result
  });


  fastify.get('/admin/:id', async (request, reply) => {
    const result = await models.Admin.findOne({ _id: request.params.id }, function (err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    });
  });


  fastify.post('/admin', { schema: adminValidators.addSchema }, async (request, reply) => {
    let admin = await models.Admin.create(request.body);
    reply.send(admin);
  });

  fastify.put('/admin/:id', { schema: adminValidators.addSchema }, async (request, reply) => {
    let admin = await models.Admin.findByIdAndUpdate(request.body);
    reply.send(admin);
  });

  fastify.delete('/admin/:id', { schema: adminValidators.addSchema }, async (request, reply) => {
    let admin = await models.Admin.remove(request.body);
    reply.send(admin);
  });

}

module.exports = routes;