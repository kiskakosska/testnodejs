'use strict'

const executorValidators = require('../_validators/executor');

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('executor')

  
  fastify.get('/executor', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/executor/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})

fastify.post('/executor', { schema: executorValidators.addSchema } , async (request, reply) => {
  let executor = await collection.insertOne(request.body);
  reply.send(executor);
});

fastify.put('/executor/:id', { schema: executorValidators.addSchema } , async (request, reply) => {
  let executor = await collection.insertOne(request.body);
  reply.send(executor);
});
}



  

module.exports = routes

