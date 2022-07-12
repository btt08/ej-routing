const config = require('./modules/config');
const express = require('express');
const router = require('./routes');
const hostName = config.HOST;
const port = config.PORT;

const app = express();

app.use(express.static('public'));

app.use('/home', router);

app.listen(port, hostName, () => {
  console.log(`Servidor lanzado en http://${hostName}:${port}`)
})