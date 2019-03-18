'use strict';

const addSchema = {
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
    }
  }
};

module.exports = { addSchema };