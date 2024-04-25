// controllers/taskDeleteController.js

const { deleteCheckByIdentification } = require('../../models/task/crud/delete_task');

async function deleteTaskByIdentification(req, res) {
  try {
    // Convertir la identificación de la solicitud a un número entero
    const identification = parseInt(req.params.identification);
    await deleteCheckByIdentification(identification);
    res.status(200).json({ message: `Check con identificación ${identification} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error, no existe esa identificación.' });
  }
}

module.exports = { deleteTaskByIdentification };
