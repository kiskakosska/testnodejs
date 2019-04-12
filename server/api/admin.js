'use strict'

const adminValidators = require('../_validators/admin');

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('admin')

  
  fastify.get('/admin', async (request, reply) => {
    const result = collection.find(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/admin/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})

fastify.post('/admin', { schema: adminValidators.addSchema } , async (request, reply) => {
  let admin = await collection.insertOne(request.body);
  reply.send(admin);
});

fastify.put('/admin/:id', { schema: adminValidators.addSchema } , async (request, reply) => {
  let admin = await collection.insertOne(request.body);
  reply.send(admin);
});

}

module.exports = routes

