// models/task/crud/read_task.js

const { getCollection } = require('../../database/connection');
const { getTypeNotificationByIdRead } = require('../config/getTypeNotificationRead');

async function getCheckByIdentification(identification) {
  try {
    const checksCollection = await getCollection('checks');
    const check = await checksCollection.findOne({ identification });

    if (!check) {
      throw new Error(`Check con identificación ${identification} no encontrado`);
    }

    // Obtener el nombre del tipo de notificación relacionado al ObjectId
    const typeNotification = await getTypeNotificationByIdRead(check.type_notf);
    const typeName = typeNotification ? typeNotification.name : 'Tipo de notificación desconocido';

    // Crear un nuevo objeto que incluya solo las propiedades deseadas
    const result = {
      identification: check.identification,
      name: check.name,
      description: check.description,
      date_start: check.date_start,
      date_end: check.date_end,
      type_notification_name: typeName
    };

    return result;
  } catch (error) {
    throw error;
  }
}


module.exports = { getCheckByIdentification };
