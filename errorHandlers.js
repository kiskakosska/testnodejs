'use strict';

const log = require('./server/logger');

module.exports = (fastify) => {
  // Ошибки среды node.js, чтобы приложение никогда не падало
  process.on('unhandledRejection', (reason, promise) => {
    log.error({ reason, promise }, 'серверный процесс unhandledRejection')
  });
  process.on('uncaughtException', err => {
    log.error({ err }, 'серверный процесс uncaughtException')
  });

  // Ошибки fastify
  fastify.setErrorHandler((err, req, res) => {
    log.error({ err }, 'fastify errorHandler')

    //Ошибка валидации данных запроса
    if (err.validation) {
      return res.send({ error: 'Ошибка валидации данных запроса' });
    } else {
      return res.send({ error: 'Ошибка errorHandler' });
    }
  });
};