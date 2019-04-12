'use strict'

const anketaValidators = require('../_validators/anketa');

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('anketa')

  
  fastify.get('/anketa', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/anketa/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})


fastify.post('/anketa', { schema: anketaValidators.addSchema } , async (request, reply) => {
  let anketa = await collection.insertOne(request.body);
  reply.send(anketa);
});

fastify.put('/anketa/:id', { schema: anketaValidators.addSchema } , async (request, reply) => {
  let anketa = await collection.insertOne(request.body);
  reply.send(anketa);
});
}



  

module.exports = routes

