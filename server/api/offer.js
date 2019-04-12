'use strict'

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('offers')

  
  fastify.get('/offers', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/offers/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})



fastify.post('/offers', {schema} , async (request, reply) => {
  let offers = await collection.insertOne(request.body);
  reply.send(offers);
});

}

module.exports = routes

