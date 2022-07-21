const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');
const products = require('../modules/products');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('products').drop((err, results) => {
    console.log('\nPRODUCTS HA SIDO BORRADA')
    if (err) throw err;
    database.close();
  });
});


setTimeout(() => {
  client.connect(url, (err, database) => {
    if (err) throw err;
    const db = database.db(config.DB_NAME);
    db.createCollection('products', (err, res) => {
      if (err) throw err;
      console.log('Products creado correctamente');
      database.close();
    })
  });

  client.connect(url, (err, database) => {
    if (err) throw err;
    const db = database.db(config.DB_NAME);
    db.collection('products').insertMany(products, (err, res) => {
      if (err) throw err;
      console.log('Datos añadidos con exito');
      database.close();
    });
  });
}, 2000);
