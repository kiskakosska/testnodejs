'use strict'

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('transaction')

  
  fastify.get('/transaction', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/transaction/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id } , function(err, doc) {
      if (doc === null) {
        throw new Error('Invalid value')
      }
      console.log(doc)
      reply.send(doc);
    }
      
      )
})

const schema = ({
  body: {
    type: 'object',
    properties: {
     comission: { type: 'string' },
     parametres: { type: 'string' },
     time: { type: 'number' },
     ip: { type: 'number' },
     type: { type: 'string' },
     in: { type: 'string' },
     out: { type: 'string' }
    },
  }
});


fastify.post('/transaction', {schema} , async (request, reply) => {
  let transaction = await collection.insertOne(request.body);
  reply.send(transaction);
});

}

module.exports = routes

