/*
  - deleteManufacters:
  Este script borrará la colección Manufacters
*/

const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('manufacturers').drop((err, results) => {
    console.log('\nMANUFACTURERS HA SIDO BORRADA')
    if (err) throw err;
    database.close();
  });
});