'use strict';

const log = require('./server/logger');

// Ошибки среды node.js, чтобы приложение никогда не падало
process.on('unhandledRejection', (reason, promise) => {
  log.error({ reason, promise }, 'серверный процесс unhandledRejection')
})
process.on('uncaughtException', err => {
  log.error({ err }, 'серверный процесс uncaughtException')
})