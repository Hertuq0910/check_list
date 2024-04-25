const { getCollection } = require('../../database/connection');

async function getTypeNotificationByIdRead(identification) {
    try {
      const typeNotificationsCollection = await getCollection('type_notifications');
      const typeNotification = await typeNotificationsCollection.findOne({ _id: identification });
  
      return typeNotification;
    } catch (error) {
      console.error('Error al obtener el tipo de notificación por identificación:', error);
      throw error;
    }
  }

  module.exports = { getTypeNotificationByIdRead };
