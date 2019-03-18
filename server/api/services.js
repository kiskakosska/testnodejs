'use strict'

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('service')

  
  fastify.get('/service', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/service/:id', async (request, reply) => {
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
     name: { type: 'string' },
     price: { type: 'number' },
     description: { type: 'string' },
     comment: { type: 'string' }
    },
    required: ['name'],
    required: ['description']
  }
});


fastify.post('/service', {schema} , async (request, reply) => {
  let service = await collection.insertOne(request.body);
  reply.send(service);
});

}



  

module.exports = routes

