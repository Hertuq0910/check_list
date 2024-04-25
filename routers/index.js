const express = require('express');
const { createTask } = require('../controllers/task/taskCreateController');
const { updateTask } = require('../controllers/task/taskUpdateController');
const { deleteTaskByIdentification } = require('../controllers/task/taskDeleteController');
const { getTaskByIdentification } = require('../controllers/task/taskReadController');

const router = express.Router();

/**
 * @openapi
 * /api/v1/create_tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags:
 *       - Task
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date
 *               date_end:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - date_start
 *               - date_end
 *     responses:
 *       '201':
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identification:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date_start:
 *                   type: string
 *                   format: date
 *                 date_end:
 *                   type: string
 *                   format: date
 *                 type_notification_name:
 *                   type: string
 *       '400':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 required:
 *                   - error
 */
router.post('/create_tasks', createTask);

/**
 * @openapi
 * /api/v1/update_tasks:
 *   post:
 *     summary: Actualiza una tarea existente
 *     tags:
 *       - Task
 *     parameters:   
 *       - in: header
 *         name: identification
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificación única de la tarea a actualizar
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date
 *               date_end:
 *                 type: string
 *                 format: date
 *               type_notf_identification:
 *                 type: integer
 *             minProperties: 1
 *     responses:
 *       '200':
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identification:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date_start:
 *                   type: string
 *                   format: date
 *                 date_end:
 *                   type: string
 *                   format: date
 *                 type_notification_name:
 *                   type: string
 *       '404':
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 required:
 *                   - error
 */
router.post('/update_tasks', updateTask);

/**
 * @openapi
 * /api/v1/delete_tasks/{identification}:
 *   delete:
 *     summary: Elimina una tarea por identificación
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificación única de la tarea a eliminar
 *     responses:
 *       '200':
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 required:
 *                   - message
 *       '404':
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 required:
 *                   - error
 */
router.delete('/delete_tasks/:identification', deleteTaskByIdentification);

/**
 * @openapi
 * /api/v1/read_tasks/{identification}:
 *   get:
 *     summary: Obtiene detalles de una tarea por identificación
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificación única de la tarea a obtener
 *     responses:
 *       '200':
 *         description: Detalles de la tarea obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identification:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date_start:
 *                   type: string
 *                   format: date
 *                 date_end:
 *                   type: string
 *                   format: date
 *                 type_notification_name:
 *                   type: string
 *       '404':
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 required:
 *                   - error
 */
router.get('/read_tasks/:identification', getTaskByIdentification);

module.exports = router;
