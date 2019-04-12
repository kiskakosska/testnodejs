const isProd = require('./public/isProd'),
  fs = require('fs'),
  log = require('./server/logger'),
  path = require('path')

  require('./errorHandlers');

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


require('./config/validator')(fastify);

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://katya1995:katya1995@cluster0-tzvo3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err) => {
  console.log(JSON.stringify(`Error connect: ${err}`, null, 2));
});


fastify.register(require('./server/api/client'))


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