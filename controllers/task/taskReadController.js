// controllers/taskReadController.js

const { getCheckByIdentification } = require('../../models/task/crud/read_task');

async function getTaskByIdentification(req, res) {
  try {
    const identification = parseInt(req.params.identification);
    const check = await getCheckByIdentification(identification);
    res.status(200).json(check);
  } catch (error) {
    res.status(404).json({ message: 'No se encontro la identificación.' });
  }
}

module.exports = { getTaskByIdentification };
