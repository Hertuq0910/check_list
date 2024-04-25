const { getCollection } = require('../../../models/database/connection');

async function getNextIdentification(collectionName) {
    try {
      const collection = await getCollection(collectionName);
  
      const lastDocument = await collection.find().sort({ identification: -1 }).limit(1).next();
  
      if (!lastDocument) {
        return 1;
      }
  
      const lastIdentification = lastDocument.identification;
      return lastIdentification + 1;
    } catch (error) {
      console.error('Error al obtener el próximo ID:', error);
      throw error;
    }
  }

  module.exports = { getNextIdentification };
