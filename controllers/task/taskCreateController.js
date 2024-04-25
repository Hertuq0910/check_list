// controllers/taskController.js

const { createCheck } = require('../../models/task/crud/create_task');

async function createTask(req, res) {
  try {
    // Obtener los datos de la solicitud
    const taskData = req.body;
    
    // Convertir las cadenas de fecha a objetos Date
    taskData.date_start = new Date(taskData.date_start);
    taskData.date_end = new Date(taskData.date_end);

    // Llamar a la función para crear la tarea y pasarle los datos
    const newTask = await createCheck(taskData);

    res.status(201).json({ message: 'Tarea creada correctamente', data: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Error, no existe esa identificación.' });
  }
}

module.exports = { createTask };
