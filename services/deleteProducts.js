/*
  - deleteProducts:
  Borraremos el primer producto de la colección que sea azul
  Borraremos todos aquellos productos que sean rojos
*/

const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').deleteOne({ 'color': 'blue' }, (err, results) => {
    console.log('\nBORRADO PRIMER COCHE AZUL')
    if (err) throw err;
    database.close();
  });
});

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').deleteMany({ 'color': 'red' }, (err, results) => {
    console.log('\nBORRADOS TODOS LOS COCHES ROJOS')
    if (err) throw err;
    database.close();
  });
});