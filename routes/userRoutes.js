const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta: POST /api/users
// Desc: Crear un nuevo usuario (rol de administrador)
router.post('/', authMiddleware, userController.createUser);

// Ruta: GET /api/users
// Desc: Obtener todos los usuarios (rol de administrador)
router.get('/', authMiddleware, userController.getUsers);

module.exports = router;
