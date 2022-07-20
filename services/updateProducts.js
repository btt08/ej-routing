/*
  - updateProducts:
  Modificaremos aquel producto que fuera azul y con precio 53500 para que pase a ser rojo y cueste 70000
  Modificaremos todos aquellos coches que sean BMW (Q60174112) para que pasen a costar todos 33000
*/

const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').updateOne({ 'color': 'blue', 'price': 53500 }, { $set: { 'color': 'red', 'price': 70000 } }, (err, results) => {
    console.log('\nCOLOR A ROJO Y PRECIO A 70000')
    if (err) throw err;
    database.close();
  });
});

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').updateMany({ 'manufacter': 'Q60174112' }, { $set: { 'price': 33000 } }, (err, results) => {
    console.log('\nTODOS LOS BMW A 33000')
    if (err) throw err;
    database.close();
  });
});