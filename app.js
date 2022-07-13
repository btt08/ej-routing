const config = require('./modules/config');
const express = require('express');
const router = require('./routes');
const routerApi = require('./routes/api');
const hostName = config.HOST;
const port = config.PORT;

const app = express();

app.use(express.static('public'));

app.use('/home', router);

app.use('/api', routerApi);

app.listen(port, hostName, () => {
  console.log(`Servidor lanzado en http://${hostName}:${port}`)
});