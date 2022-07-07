const config = require('./modules/config');
const express = require('express');
const { response } = require('express');
const router = express.Router();
const hostName = config.HOST;
const port = config.PORT;

const app = express();

app.use('/quiz', express.static('public/quiz'));

app.use('/home', router);

router.use('/', (req, res, next) => {
  console.log('Endpoint inicial');
  res.status(200).end();
  next();
});

router.use('/contacto', (req, res, next) => {
  console.log('Estamos en la página de contacto');
  res.status(200).end();
  next();
});

router.use('/info', (req, res) => {
  console.log('Estamos en la página de info');
  res.status(200).end();
});

router.use('/error', (req, res, next) => {
  const err = "Ha habido un error del sistema";
  next(err);
});

router.use((err, req, res, next) => {
  console.log(`Error: ${err}`);
  res.status(500).end();
  next();
});

router.use((req, res, next) => {
  console.log('Endpoint final');
  res.status(200).end();
});

app.listen(port, hostName, () => {
  console.log(`Servidor lanzado en http://${hostName}:${port}`)
})