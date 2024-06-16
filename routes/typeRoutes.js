const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta: POST /api/types
// Desc: Crear un nuevo tipo de equipo (rol de administrador)
router.post('/', authMiddleware, typeController.createType);

// Ruta: GET /api/types
// Desc: Obtener todos los tipos de equipo (rol de administrador)
router.get('/', authMiddleware, typeController.getTypes);

module.exports = router;
