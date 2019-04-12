'use strict';

const addSchema = {
  body: {
    type: 'object',
    properties: {
     admin: {
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
      orderAmount: { type: 'number' }
    },
  }
};

module.exports = { addSchema };