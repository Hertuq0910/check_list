// taskController.js

const { getTaskByIdentification, updateTaskByIdentification } = require('../../models/task/crud/update_task');
const { getTypeNotificationByIdentification } = require('../../models/task/config/getTypeNotification');

async function updateTask(req, res) {
  try {
    const identification = parseInt(req.headers.identification);
    let taskData = req.body;

    // Verificar si type_notf_identification está presente en la solicitud
    if ('type_notf_identification' in taskData) {
      // Si está presente, buscar el tipo de notificación correspondiente
      const typeNotification = await getTypeNotificationByIdentification(taskData.type_notf_identification);
      if (!typeNotification) {
        return res.status(404).json({ error: `Tipo de notificación con identificación ${taskData.type_notf_identification} no encontrado` });
      }
      // Asignar el ObjectId del type_notification a taskData.type_notf
      taskData.type_notf = typeNotification._id;
    } else {
      // Si type_notf_identification no está presente, mantener el valor actual de type_notf
      const existingTask = await getTaskByIdentification(identification);
      if (!existingTask) {
        return res.status(404).json({ error: `La tarea con identificación ${identification} no fue encontrada` });
      }
      taskData.type_notf = existingTask.type_notf;
    }

    // Convertir las cadenas de fecha a objetos Date
    if (taskData.date_start) {
      taskData.date_start = new Date(taskData.date_start);
    }
    if (taskData.date_end) {
      taskData.date_end = new Date(taskData.date_end);
    }

    // Verificar si la tarea existe antes de actualizarla
    const existingTask = await getTaskByIdentification(identification);
    if (!existingTask) {
      return res.status(404).json({ error: `La tarea con identificación ${identification} no fue encontrada` });
    }

    // Realizar la actualización de la tarea
    await updateTaskByIdentification(identification, taskData);

    return res.status(200).json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    console.error("Error en updateTask:", error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { updateTask };

