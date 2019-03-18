'use strict'

async function routes (fastify,  options) {

  var Clients = require('../../database/client');

  fastify.get('/clients', async (request, reply) => {
    const result = collection.find().toArray(function(err, results){
      if (results === null) {
        throw new Error('Invalid value')
      }
    console.log(results)
    reply.send(results);
  }
)})


fastify.get('/clients/:id', async (request, reply) => {
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
     number: { type: 'string' },
     login: { type: 'string' },
     password: { type: 'string' },
     isActive: { type: 'boolean' },
     IsOnline: { type: 'boolean' },
     email: { type: 'string' },
     date: { type: 'number' },
     rating: { type: 'number' },
     avatar: { type: 'string' },
     adress: { type: 'string' },
     account: { type: 'number' },
     orderAmount: { type: 'number' },
    },
   
  }
});


fastify.post('/clients', {schema} , async (request, reply) => {
  let client = await collection.insertOne(request.body);
  reply.send(client);
});

}

export default routes

