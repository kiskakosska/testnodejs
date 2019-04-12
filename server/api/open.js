'use strict'

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('currency')

  
  fastify.get('/currency', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/currency/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})




fastify.post('/currency', {schema} , async (request, reply) => {
  let currency = await collection.insertOne(request.body);
  reply.send(currency);
});

}

async function routes (fastify, options) {
    const database = fastify.mongo.db('db')
    const collection = database.collection('review')
  
    
    fastify.get('/review', async (request, reply) => {
      const result = collection.find().toArray(function(err, results){
        if (results === null) {
          throw new Error('Invalid value')
        }
      console.log(results)
      reply.send(results);
    }
  )})
  
  
  fastify.get('/review/:id', async (request, reply) => {
      const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
        if (doc === null) {
          throw new Error('Invalid value')
        }
        console.log(doc)
        reply.send(doc);
      }
        
        )
  })
  
  
  
  
  fastify.post('/review', {schema} , async (request, reply) => {
    let review = await collection.insertOne(request.body);
    reply.send(review);
  });
  
  }

  
  async function routes (fastify, options) {
    const database = fastify.mongo.db('db')
    const collection = database.collection('tarifs')
  
    
    fastify.get('/tarifs', async (request, reply) => {
      const result = collection.find().toArray(function(err, results){
        if (results === null) {
          throw new Error('Invalid value')
        }
      console.log(results)
      reply.send(results);
    }
  )})
  
  
  fastify.get('/tarifs/:id', async (request, reply) => {
      const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
        if (doc === null) {
          throw new Error('Invalid value')
        }
        console.log(doc)
        reply.send(doc);
      }
        
        )
  })
  
  
  fastify.post('/tarifs', {schema} , async (request, reply) => {
    let tarifs = await collection.insertOne(request.body);
    reply.send(tarifs);
  });
  
  }

module.exports = routes

