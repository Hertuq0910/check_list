const { getCollection } = require('../../database/connection');

async function getTypeNotificationByIdentification(identification) {
    try {
      const typeNotificationsCollection = await getCollection('type_notifications');
      const typeNotification = await typeNotificationsCollection.findOne({ identification: identification });
  
      return typeNotification;
    } catch (error) {
      console.error('Error al obtener el tipo de notificación por identificación:', error);
      throw error;
    }
  }

  module.exports = { getTypeNotificationByIdentification };
