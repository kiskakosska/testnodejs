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


const schema = ({
  body: {
    type: 'object',
    properties: {
     name: { type: 'string' },
     params_1: { type: 'string' },
     params_2: { type: 'string' }
    },
    required: ['name']
  }
});


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
  
  
  const schema = ({
    body: {
      type: 'object',
      properties: {
       description: { type: 'string' },
       photo: { type: 'string' },
       time: { type: 'number' },
       ip: { type: 'number' }
      },
      required: ['description']
    }
  });
  
  
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
         date: { type: 'number' },
         rules: { type: 'number' }
        },
        required: ['name'],
        required: ['fname'],
        required: ['lname'],
        required: ['number'],
        required: ['login'],
        required: ['email']
    }
  });
  
  
  fastify.post('/tarifs', {schema} , async (request, reply) => {
    let tarifs = await collection.insertOne(request.body);
    reply.send(tarifs);
  });
  
  }

module.exports = routes

