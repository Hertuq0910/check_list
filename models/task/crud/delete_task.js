// models/task/crud/delete_task.js

const { getCollection } = require('../../database/connection');

async function deleteCheckByIdentification(identification) {
  try {
    const checksCollection = await getCollection('checks');
    const result = await checksCollection.deleteOne({ identification: identification });
    
    if (result.deletedCount === 0) {
      throw new Error(`La nota con identificación ${identification} no fue encontrada`);
    }

    console.log(`Nota con identificación ${identification} eliminada correctamente`);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteCheckByIdentification };
