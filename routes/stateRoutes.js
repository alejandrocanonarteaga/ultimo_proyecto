const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta: POST /api/states
// Desc: Crear un nuevo estado de equipo (rol de administrador)
router.post('/', authMiddleware, stateController.createState);

// Ruta: GET /api/states
// Desc: Obtener todos los estados de equipo (rol de administrador)
router.get('/', authMiddleware, stateController.getStates);

// Ruta: PUT /api/states/:id
// Desc: Actualizar un estado de equipo existente por ID (rol de administrador)
router.put('/:id', authMiddleware, stateController.updateState);

// Ruta: DELETE /api/states/:id
// Desc: Eliminar un estado de equipo existente por ID (rol de administrador)
router.delete('/:id', authMiddleware, stateController.deleteState);

module.exports = router;
