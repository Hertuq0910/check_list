const { getCollection } = require('../../../models/database/connection');
const { getTypeNotificationByIdentification } = require('../config/getTypeNotification');

async function getTypeNotificationObjectId(identification) {
  try {
    const typeNotification = await getTypeNotificationByIdentification(identification);
    if (!typeNotification) {
      throw new Error(`Tipo de notificación con identificación ${identification} no encontrado`);
    }
    return typeNotification._id;
  } catch (error) {
    console.error('Error al obtener el ObjectID del tipo de notificación:', error);
    throw error;
  }
}

async function updateCheckByIdentification(identification, newData) {
  try {
    const checksCollection = await getCollection('checks');

    // Obtener el ObjectID del tipo de notificación si se proporciona en los nuevos datos
    let typeNotfObjectId;
    if (newData.type_notf_identification) {
      typeNotfObjectId = await getTypeNotificationObjectId(newData.type_notf_identification);
      // Eliminar la identificación del tipo de notificación de los nuevos datos
      delete newData.type_notf_identification;
    }

    // Crear el objeto de actualización con los nuevos datos
    const updateData = { $set: newData };

    // Si se proporcionó la identificación del tipo de notificación, agregarla al objeto de actualización
    if (typeNotfObjectId) {
      updateData.$set.type_notf = typeNotfObjectId;
    }

    // Realizar la actualización en la colección
    const result = await checksCollection.updateOne({ identification: identification }, updateData);

    if (result.modifiedCount === 0) {
      throw new Error(`La nota con identificación ${identification} no fue encontrada`);
    }

    console.log(`Nota con identificación ${identification} actualizada correctamente`);

    return result;
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    throw error;
  }
}


module.exports = { updateCheckByIdentification };
