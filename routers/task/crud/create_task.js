const { getCollection } = require('../../../models/database/connection');
const { getNextIdentification } = require('../config/getNextIdentification');
const { getTypeNotificationByIdentification } = require('../config/getTypeNotification');


async function createCheck(noteData) {
  try {
    const checksCollection = await getCollection('checks');
    const nextIdentification = await getNextIdentification('checks');

    // Obtener el ID del tipo de notificación donde la identificación sea igual a 4
    const typeNotification = await getTypeNotificationByIdentification(5);

    if (!typeNotification) {
      throw new Error(`Tipo de notificación ${typeNotification.name} no encontrado`);
    }

    // Ajustar el orden de los campos en el objeto de datos de la nota
    const newNoteData = {
      identification: nextIdentification,
      name: noteData.name, // Corregir la asignación del campo 'name'
      description: noteData.description,
      date_start: noteData.date_start,
      date_end: noteData.date_end,
      type_notf: typeNotification._id
    };

    // Crear la nueva nota en la colección
    const result = await checksCollection.insertOne(newNoteData);
    return result.ops;
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw error;
  }
}

module.exports = { createCheck };
