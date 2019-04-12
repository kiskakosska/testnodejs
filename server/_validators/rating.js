'use strict';

const addSchema = {
    body: {
        type: 'object',
        properties: {
ratings: [
    {
        summary: { type: 'string' },
        detail: { type: 'string' },
        numberOfStars: { type: 'number' },
    }
],
}
    }
};

module.exports = { addSchema };