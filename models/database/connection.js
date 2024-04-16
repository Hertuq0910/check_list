require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let clientInstance; // Variable para almacenar la instancia de cliente

async function connectToMongoDB() {
  try {
    if (!clientInstance) {
      clientInstance = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Conexión establecida correctamente');
    }
    return clientInstance; // Devolver directamente la instancia del cliente
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

async function getCollection(collectionName) {
  try {
    const client = await connectToMongoDB();
    const db = client.db('check_list'); // Acceder a la base de datos check_list
    return db.collection(collectionName);
  } catch (error) {
    console.error('Error al obtener la colección:', error);
    throw error;
  }
}


module.exports = { connectToMongoDB, getCollection };


/*connectToMongoDB: Esta función se encarga de establecer la conexión con la base de datos MongoDB. 
Utiliza una variable clientInstance para almacenar la instancia del cliente, de modo que si ya hay una conexión establecida, la función retornará esa instancia en lugar de crear una nueva.*/

/*getCollection: Esta función toma el nombre de una colección como argumento y devuelve la colección correspondiente de la base de datos MongoDB. 
Utiliza connectToMongoDB para asegurarse de que hay una conexión establecida antes de intentar acceder a la colección.*/