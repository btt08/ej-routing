/*
  - findProducts:
  Debemos de realizar diferentes búsquedas
  en la primera sacaremos el primer producto de la colección
  tendremos otra que devuelva todos ordenados por precio de menor a mayor pero limitando los resultados en 10 productos
  luego tendremos otra que saque todos aquellos coches que sean de color azul (ordenados por precio de mayor a menor)
  y por último, sacaremos aquel producto que sea de color rojo y tenga un precio de 53900.
*/
const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').findOne((err, results) => {
    console.log('\nSOLO EL PRIMER COCHE')
    if (err) throw err;
    console.table(results)
    database.close();
  });
});

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').find().sort({ 'price': 1 }).limit(10).toArray((err, results) => {
    console.log('\nTODOS LOS COCHES DE MENOR A MAYOR LIMITADO A 10')
    if (err) throw err;
    console.table(results)
    database.close();
  });
});


client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').find({ 'color': 'blue' }).sort({ 'price': -1 }).toArray((err, results) => {
    console.log('\nCOCHES AZULES DE MAYOR A MENOR')
    if (err) throw err;
    console.table(results)
    database.close();
  });
});

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('coches').find({ 'color': 'red', 'price': 53900 }).toArray((err, results) => {
    console.log('\nCOCHES ROJOS DE VALOR 53900')
    if (err) throw err;
    console.table(results)
    database.close();
  });
});