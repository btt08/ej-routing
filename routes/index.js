const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Endpoint inicial');
  res.status(200).redirect('/home/home.html');
  next();
});

router.get('/contacto', (req, res, next) => {
  console.log('Estamos en la página de contacto');
  res.status(200).redirect('/home/contacto.html');
  next();
});

router.get('/info', (req, res) => {
  console.log('Estamos en la página de info');
  res.status(200).redirect('/home/info.html');
});

router.use('/error', (req, res, next) => {
  const err = "Ha habido un error del sistema";
  next(err);
});

router.use((err, req, res, next) => {
  console.log(`Error: ${err}`);
  next();
});

router.use((req, res) => {
  console.log('Endpoint final');
});

module.exports = router;