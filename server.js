const isProd = false, // require('./public/isProd'), //тут ошибка при отсутствии файла
  fs = require('fs'),
  log = require('./server/logger'),
  path = require('path');

require('./errorHandlers');


const fastify = require('fastify')();
fastify.register(require('fastify-cors'));
fastify.listen(443, '::', (err, address) => {
  if (err) {
    log.error({ err, address }, 'Ошибка при запуске сервера');
  } else {
    log.warn(`Сервер  запущен в ${isProd ? 'продакшен' : 'режиме разработки'}`);
  }
})

require('./config/validator')(fastify);

//MongoDB подключение форсится без отключения монги
const mongoose = require('mongoose');

//!! mongoose не нуждается в регистрации как плагин
mongoose.connect('mongodb+srv://vadimw:Djkrdjkr16@cluster0-gakmc.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err) => {
  console.log(JSON.stringify(`Error connect: ${err}`, null, 2));
});


// Статические файлы
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './public')
});

//!! вторая ошибка. не регистрируются куки. ps: это не ошибка, у него нет callback-функции, второй параметр - опшены
// Куки
fastify.register(require('fastify-cookie'));

fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html')
});


fastify.register(
  async openRoutes => {
    // Пути доступные всем
    openRoutes.register(require('./server/api/client'))
  },
  { prefix: '/api' } // префикс всех путей
);