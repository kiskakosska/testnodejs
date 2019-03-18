'use strict'

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


const schema = ({
  body: {
    type: 'object',
    properties: {
     name: { type: 'string' },
     fname: { type: 'string' },
     lname: { type: 'string' },
     type: { type: 'string'},
     number: { type: 'number' },
     login: { type: 'string' },
     password: { type: 'string' },
     isActive: { type: 'number' },
     IsOnline: { type: 'number' },
     email: { type: 'string' },
     date: { type: 'number' },
     rating: { type: 'number' },
     avatar: { type: 'string' },
     adress: { type: 'string' },
     account: { type: 'number' },
     orderAmount: { type: 'number' }
    },
    required: ['name'],
    required: ['fname'],
    required: ['lname'],
    required: ['number'],
    required: ['login'],
    required: ['email'],
    required: ['adress'],
    required: ['type']
  }
});


fastify.post('/anketa', {schema} , async (request, reply) => {
  let anketa = await collection.insertOne(request.body);
  reply.send(anketa);
});

}



  

module.exports = routes

