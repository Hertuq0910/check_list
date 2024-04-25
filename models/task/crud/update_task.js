// taskModel.js

const { getCollection } = require('../../database/connection');


async function getTaskByIdentification(identification) {
  const checksCollection = await getCollection('checks');
  return await checksCollection.findOne({ identification: parseInt(identification) });
}

async function updateTaskByIdentification(identification, newData) {
  const checksCollection = await getCollection('checks');

  // Eliminar el campo type_notf_identification de newData si está presente
  if ('type_notf_identification' in newData) {
    delete newData.type_notf_identification;
  }

  // Realizar la actualización en la colección
  return await checksCollection.updateOne({ identification: parseInt(identification) }, { $set: newData });
}

module.exports = { getTaskByIdentification, updateTaskByIdentification };
