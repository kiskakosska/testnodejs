'use strict';

const addSchema = {
  body: {
    type: 'object',
    properties: {
      executors: {
          dname: { type: 'string' },
          fname: { type: 'string' },
          lname: { type: 'string' },
          number: { type: 'number' },
          adress: { type: 'string' },
      },
      login: { type: 'string' },
      password: { type: 'string' },
      isActive: { type: 'boolean' },
      IsOnline: { type: 'boolean' },
      email: { type: 'string' },
      schet: 
      {
          numbersch: { type: 'number' },
          nBtc: { type: 'number' },
          nCard: { type: 'number' },
          nWM: { type: 'number' }
      },
      public: { type: 'boolean' },
      blocked: { type: 'boolean' },
      orderAmount: { type: 'number' },
      tarifid: { type: 'number' },
    freeclick: { type: 'number' },
    price: { type: 'number' }
    },
  }
};

module.exports = { addSchema };