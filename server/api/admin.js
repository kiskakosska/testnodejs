'use strict'

async function routes (fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('admin')

  
  fastify.get('/admin', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
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

const schema = ({
  body: {
    type: 'object',
    properties: {
     name: { type: 'string' },
     fname: { type: 'string' },
     lname: { type: 'string' },
     number: { type: 'number' },
     login: { type: 'string' },
     password: { type: 'string' },
     isActive: { type: 'boolean' },
     IsOnline: { type: 'boolean' },
     email: { type: 'string' },
     rules: { type: 'string' },
     date: { type: 'number' }
    
    },
    required: ['name'],
    required: ['fname'],
    required: ['lname'],
    required: ['number'],
    required: ['login'],
    required: ['email']
  }
});


fastify.post('/admin', {schema} , async (request, reply) => {
  let admin = await collection.insertOne(request.body);
  reply.send(admin);
});

}



  

module.exports = routes

