'use strict'

const pino = require('pino'),
  isProd = false; //require('../public/isProd') //тут ошибка при отсутствии файла

let logOptions = isProd
  ? {
    level: 'warn', // уровень логирования
    timestamp: () => {
      return ',"time":"' + new Date() + '"'
    }
  }
  : {
    level: 'warn',
    prettifier: require('pino-pretty'),
    prettyPrint: {
      levelFirst: true,
      translateTime: true
    }
  }
let dest = isProd ? pino.destination('./logs/errors.log') : pino.destination(1)
let log = pino(logOptions, dest)

module.exports = log