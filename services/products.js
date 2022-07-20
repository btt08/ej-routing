const mongo = require('mongodb');
const client = mongo.MongoClient;

const user = 'admin';
const pwd = 'admin';

const myDb = 'concesionario';
const coleccion = 'coches';

const url = `mongodb+srv://${user}:${pwd}@cluster0.9x803bh.mongodb.net/?retryWrites=true&w=majority`;

client.connect(url, (err, database) => {
  if (err) throw err;

  const db = database.db(myDb);
  db.collection(coleccion).find({ "price": { "$lt": 30000 } }).toArray((err, results) => {
    if (err) throw err;

    console.log(results);
    database.close();
  })
});