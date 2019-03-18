'use strict';

module.exports = (fastify) => {
  // Валидатор
  const Ajv = require('ajv')
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
  });
  fastify.setSchemaCompiler((schema) => { return ajv.compile(schema) });
};