const isProd = require('./public/isProd'),
  fs = require('fs'),
  log = require('./server/logger'),
  path = require('path')

// Ошибки среды node.js, чтобы приложение никогда не падало
process.on('unhandledRejection', (reason, promise) => {
  log.error({ reason, promise }, 'серверный процесс unhandledRejection')
})
process.on('uncaughtException', err => {
  log.error({ err }, 'серверный процесс uncaughtException')
})

// Redirect server from http port 80 to https 443
const fastifyHttp = require('fastify')({
  logger: log,
  ignoreTrailingSlash: true
})
fastifyHttp.listen(80, '::', (err, address) => {
  if (err) {
    log.error({ err, address }, 'Ошибка при запуске HTTP сервера')
  } else {
    log.warn('Http cервер запущен')
  }
})
// Let's Encrypt challenge
fastifyHttp.get('/.well-known/acme-challenge/:file', (req, res) => {
  let stream = fs.createReadStream(
    path.join(__dirname + '/ssl/.well-known/acme-challenge/' + req.params.file)
  )
  res.type('text/html').send(stream)
})
fastifyHttp.get('/*', (req, res) => {
  res.redirect(301, 'https://' + req.headers.host + req.raw.url)
})
fastifyHttp.get('/', (req, res) => {
  res.redirect(301, 'https://' + req.headers.host + req.raw.url)
})

// Сервер
let fastifyOptions = {
  logger: log,
  ignoreTrailingSlash: true,
  http2: true
}
fastifyOptions.https = isProd
  ? {
      allowHTTP1: true,
      key: fs.readFileSync('./ssl/localhost/key.txt'),
      cert: fs.readFileSync('./ssl/localhost/crt.txt')
    }
  : {
      allowHTTP1: true,
      key: fs.readFileSync('./ssl/localhost/cert.key'),
      cert: fs.readFileSync('./ssl/localhost/cert.pem')
    }

const fastify = require('fastify')(fastifyOptions)
fastify.register(require('fastify-cors'))
fastify.listen(443, '::', (err, address) => {
  if (err) {
    log.error({ err, address }, 'Ошибка при запуске сервера')
  } else {
    log.warn(
      `Сервер  запущен в ${
        isProd ? 'продакшен' : 'режиме разработки'
      }`
    )
  }
})

// Валидатор
const Ajv = require('ajv')
const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true
})
fastify.setSchemaCompiler(function (schema) {
  return ajv.compile(schema)
})

//MongoDB подключение форсится без отключения монги
fastify.register(require('./db'), {
  url: 'mongodb+srv://vadimw:Djkrdjkr16@cluster0-gakmc.mongodb.net/test?retryWrites=true'
})

fastify.register(require('./server/api/client'))
//fastify.register(require('./server/api/open'))


// Ошибки fastify
fastify.setErrorHandler((err, req, res) => {
  console.log(res)
  log.error({ err, req }, 'fastify errorHandler')
   
//Ошибка валидации данных запроса
  if (err.validation) {
    return res.send({
      error: 'Ошибка валидации данных запроса'
    })
  } else {
    return res.send({
      error:
        'Ошибка errorHandler'
    })
  }
})

// Статические файлы
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './public')
})

// Куки
fastify.register(require('fastify-cookie'), err => {
  if (err) log.error({ err }, 'fastify-cookie')
})

fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html')
})



fastify.register(
  async openRoutes => {
    // Пути доступные всем
    openRoutes.register(require('./server/api/client'))

   
  },
  { prefix: '/api' } // префикс всех путей
)