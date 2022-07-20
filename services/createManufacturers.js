/*
  Daremos de alta una nueva colección en nuestra base de datos llamada "manufacters".
  Aquí tendremos que importar el array de los fabricantes que se encontrará en modules para posteriormente usarlo para dar de alta cada uno de los fabricantes en nuestra colección manufacters.
  Añadirá de manera independiente otro fabricante no contemplado en nuestro array de fabricantes (con el mismo formato)
*/
const mongo = require('mongodb');
const client = mongo.MongoClient;
const config = require('../modules/configDB');
const manufacturers = require('../modules/manufacturers');

const url = `mongodb+srv://${config.USER}:${config.PWD}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.createCollection('manufacturers', (err, res) => {
    if (err) throw err;
    console.log('Manufacturers creado correctamente');
    database.close();
  })
});

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('manufacturers').insertMany(manufacturers, (err, res) => {
    if (err) throw err;
    console.log('Datos añadidos con exito');
    database.close();
  });
});

const newData = {
  name: "SKODA",
  cif: "Z16297554",
  address: "C. un poquito de por favor, 21, 14005 Córdoba"
};

client.connect(url, (err, database) => {
  if (err) throw err;
  const db = database.db(config.DB_NAME);
  db.collection('manufacturers').insertOne(newData, (err, res) => {
    if (err) throw err;
    console.log('Dato añadido con exito');
    database.close();
  });
});